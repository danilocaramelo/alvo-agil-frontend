/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Card, Col, Collapse, Input, Popover, Result, Row, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { CustomButton } from '../../components';
import { AgilWheel } from '../../containers';
import { CreateThemeModal } from '../../containers/Questions/CreateThemeModal';
import { CreateLayerModal } from '../../containers/Questions/CreateLayerModal';
import { CreateQuestionModal } from '../../containers/Questions/CreateQuestionModal';
import './style.scss';
import { AplicationElement, createAplication, NewAplication } from '../../connections/aplication';

const { Panel } = Collapse;
const { Title } = Typography;

export function CreateAplication() {
  const [aplication] = useState<NewAplication>({
    label: '',
    dtAvaliacao: null,
    children: [],
  });
  const [createLayerModalVisible, setCreateLayerModalVisible] = useState<boolean>(false);
  const [createThemeModalVisible, setCreateThemeModalVisible] = useState<boolean>(false);
  const [createQuestionModalVisible, setCreateQuestionModalVisible] = useState<boolean>(false);

  const createLayer = useCallback(
    (label: string) => {
      const newElement: AplicationElement = { label, children: [], score: 1 };
      aplication.children.push(newElement);
    },
    [aplication],
  );

  const createTheme = useCallback(
    (label: string, layer: string) => {
      const newElement: AplicationElement = { label, children: [], score: 1 };
      const layerIndex = aplication.children.findIndex((element) => element.label === layer);
      aplication.children[layerIndex].children?.push(newElement);
    },
    [aplication],
  );

  const deleteTheme = useCallback(
    (label: string, layer: string) => () => {
      const layerIndex = aplication.children.findIndex((element) => element.label === layer);
      const themeIndex = aplication.children[layerIndex].children?.findIndex(
        (element) => element.label === label,
      );
      const newLayerChildren = aplication.children[layerIndex].children?.filter(
        (_, index) => index !== themeIndex,
      );
      aplication.children[layerIndex].children = newLayerChildren;
    },
    [aplication],
  );

  const createQuestion = useCallback(
    (label: string, layer: string, theme: string, peso: number) => {
      const newElement: AplicationElement = { label, score: 1, peso };
      const layerIndex = aplication.children.findIndex((element) => element.label === layer);
      const themeIndex = aplication.children[layerIndex].children?.findIndex(
        (element) => element.label === theme,
      );
      const targetLayer = aplication.children[layerIndex];
      const targetTheme = targetLayer ? targetLayer.children?.[themeIndex!] : null;
      if (targetTheme) {
        targetTheme.children?.push(newElement);
      }
      console.log(newElement);
    },
    [aplication],
  );

  const openLayerModalVisible = useCallback(() => setCreateLayerModalVisible(true), []);
  const openThemeModalVisible = useCallback(() => setCreateThemeModalVisible(true), []);
  const openQuestionModalVisible = useCallback(() => setCreateQuestionModalVisible(true), []);
  const hasTheme = useCallback(() => {
    return aplication.children?.some((layer) => layer.children?.length !== 0);
  }, [aplication]);

  const hasMinimalAplication = useCallback(() => {
    return !!aplication?.children?.[0]?.children?.[0]?.children?.length;
  }, [aplication]);

  const resetAplication = () => {
    aplication.children = [];
    aplication.label = '';
  };

  const newAplication = useCallback(async () => {
    await createAplication(aplication);
    resetAplication();
  }, [aplication]);

  return (
    <div className='question-page'>
      <div>
        <CustomButton onClick={openLayerModalVisible} label='criar camada' />
      </div>
      <div>
        <CustomButton
          onClick={openThemeModalVisible}
          label='criar tema'
          props={{ disabled: !aplication.children.length }}
        />
      </div>
      <div>
        <CustomButton
          onClick={openQuestionModalVisible}
          label='criar pergunta'
          props={{ disabled: !hasTheme() }}
        />
      </div>
      <Row align='middle' style={{ height: '440px' }}>
        <Col span={12}>
          <Row justify='center'>
            <Input
              placeholder='Título da aplicação'
              style={{ width: 200, borderRadius: 15 }}
              onChange={(element) => {
                aplication.label = element.target.value;
              }}
            />
          </Row>
          {aplication.children.length ? (
            <AgilWheel data={aplication} />
          ) : (
            <Result status='404' subTitle='Hum... nada por aqui ainda. Comece a criar :)' />
          )}
          <Row justify='center'>
            <CustomButton
              label='Criar aplicação'
              onClick={newAplication}
              props={{ disabled: !hasMinimalAplication() }}
            />
          </Row>
        </Col>
        <Col span={12} style={{ height: '100%' }}>
          <Card style={{ height: '100%' }}>
            {aplication.children[0]?.children?.length ? (
              <Collapse>
                {aplication.children.map((layer) =>
                  layer.children?.map((theme) => (
                    <Panel
                      key={theme.label}
                      header={
                        <Row justify='space-between'>
                          <div>{theme.label}</div>
                          <Popover
                            content={
                              <>
                                <div>Tem certeza que deseja excluir?</div>
                                <Row justify='center'>
                                  <CustomButton
                                    onClick={deleteTheme(theme.label, layer.label)}
                                    label='Confirma'
                                    color='orange'
                                    style={{ marginTop: '10px' }}
                                  />
                                </Row>
                              </>
                            }
                            trigger='click'
                          >
                            <DeleteOutlined />
                          </Popover>
                        </Row>
                      }
                      className='collapse-panel'
                    >
                      {theme.children?.map((question) => (
                        <p key={question.label}>{question.label}</p>
                      ))}
                    </Panel>
                  )),
                )}
              </Collapse>
            ) : (
              <Row align='middle' justify='center' style={{ height: '100%' }}>
                <Title level={5}>Quando você criar temas e perguntas eles aparecerão aqui (:</Title>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
      <CreateLayerModal
        visible={createLayerModalVisible}
        setVisible={setCreateLayerModalVisible}
        createLayer={createLayer}
      />
      <CreateThemeModal
        visible={createThemeModalVisible}
        setVisible={setCreateThemeModalVisible}
        createTheme={createTheme}
        agilWheelData={aplication}
      />
      <CreateQuestionModal
        visible={createQuestionModalVisible}
        setVisible={setCreateQuestionModalVisible}
        createQuestion={createQuestion}
        agilWheelData={aplication}
      />
    </div>
  );
}
