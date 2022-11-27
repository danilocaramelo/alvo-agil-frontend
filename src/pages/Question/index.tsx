import { Button, Card, Col, Collapse, Result, Row, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { CustomButton } from '../../components';
import { AgilWheel } from '../../containers';
import { AgilWheelData, AgilWheelElement } from '../../containers/General/AgilWheel/types';
import { CreateThemeModal } from '../../containers/Questions/CreateThemeModal';
import { CreateLayerModal } from '../../containers/Questions/CreateLayerModal';
import { CreateQuestionModal } from '../../containers/Questions/CreateQuestionModal';
import './style.scss';

const { Panel } = Collapse;
const { Title } = Typography;

export function Questions() {
  const [agilWheelData] = useState<AgilWheelData>({
    label: 'Start',
    data: 'YYYY-MM-DD',
    children: [],
  });
  const [createLayerModalVisible, setCreateLayerModalVisible] = useState<boolean>(false);
  const [createThemeModalVisible, setCreateThemeModalVisible] = useState<boolean>(false);
  const [createQuestionModalVisible, setCreateQuestionModalVisible] = useState<boolean>(false);

  const createLayer = useCallback((label: string) => {
    const newElement: AgilWheelElement = { label, score: 1, children: [] };
    agilWheelData.children.push(newElement);
  }, []);

  const createTheme = useCallback((label: string, layer: string) => {
    const newElement: AgilWheelElement = { label, score: 1, children: [] };
    const layerIndex = agilWheelData.children.findIndex((element) => element.label === layer);
    agilWheelData.children[layerIndex].children?.push(newElement);
  }, []);

  const createQuestion = useCallback((label: string, layer: string, theme: string) => {
    const newElement: AgilWheelElement = { label, score: 1 };
    const layerIndex = agilWheelData.children.findIndex((element) => element.label === layer);
    const themeIndex = agilWheelData.children[layerIndex].children?.findIndex(
      (element) => element.label === theme,
    );
    const targetLayer = agilWheelData.children[layerIndex];
    const targetTheme = targetLayer ? targetLayer.children![themeIndex!] : null;
    if (targetTheme) {
      targetTheme.children!.push(newElement);
    }
  }, []);

  const openLayerModalVisible = useCallback(() => setCreateLayerModalVisible(true), []);
  const openThemeModalVisible = useCallback(() => setCreateThemeModalVisible(true), []);
  const openQuestionModalVisible = useCallback(() => setCreateQuestionModalVisible(true), []);

  return (
    <div className='question-page'>
      <div>
        <CustomButton onClick={openLayerModalVisible} label='criar camada' />
      </div>
      <div>
        <Button
          style={{
            borderRadius: '10px',
            fontSize: '12px',
            backgroundColor: '#2c00d5',
            color: '#fff',
          }}
          onClick={openThemeModalVisible}
        >
          criar tema
        </Button>
      </div>
      <div>
        <Button
          style={{
            borderRadius: '10px',
            fontSize: '12px',
            backgroundColor: '#2c00d5',
            color: '#fff',
          }}
          onClick={openQuestionModalVisible}
        >
          criar pergunta
        </Button>
      </div>
      <Row align='middle' style={{ height: '440px' }}>
        <Col span={12}>
          {agilWheelData.children.length ? (
            <AgilWheel data={agilWheelData} />
          ) : (
            <Result status='404' subTitle='Hum... nada por aqui ainda. Comece a criar :)' />
          )}
        </Col>
        <Col span={12} style={{ height: '100%' }}>
          <Card style={{ height: '100%' }}>
            {agilWheelData.children[0]?.children?.length ? (
              <Collapse>
                {agilWheelData.children.map((layer) =>
                  layer.children?.map((theme) => (
                    <Panel key={theme.label} header={theme.label} className='collapse-panel'>
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
        agilWheelData={agilWheelData}
      />
      <CreateQuestionModal
        visible={createQuestionModalVisible}
        setVisible={setCreateQuestionModalVisible}
        createQuestion={createQuestion}
        agilWheelData={agilWheelData}
      />
    </div>
  );
}
