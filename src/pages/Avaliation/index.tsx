/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Radio, Row, Select, Space, Typography } from 'antd';
import './style.scss';
import { CustomButton } from '../../components';
import { useCallback, useEffect, useState } from 'react';
import { Aplication, createAvaliation, getAplicationsList } from '../../connections/aplication';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

export function Avaliation() {
  const [aplications, setAplications] = useState<Aplication[] | undefined>([]);
  const [teste, setTeste] = useState<Aplication | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const teamId = params.id;

  const sendAvaliation = useCallback(async () => {
    if (teste) {
      teste.cdTime = Number(teamId);
      teste.dtAvaliacao = moment().format('YYYY-MM-DD');
      teste.label = `${teste.label} ${moment().format('DD-MM-YYYY')}`
      await createAvaliation(teste);
    }
  }, [teste]);

  const requestAplications = useCallback(async () => {
    setLoading(true);
    const response = await getAplicationsList();
    setAplications(response);
    setLoading(false);
  }, []);

  const selectAplication = useCallback(
    (value: string) => {
      const aplication = aplications?.find((element) => Number(value) === element.cdAplicacao);
      setTeste(aplication);
    },
    [aplications],
  );

  useEffect(() => {
    requestAplications();
  }, []);

  return (
    <div className='avaliation-page'>
      <Row justify='center'>
        <Select className='aplication-select' loading={loading} onSelect={selectAplication}>
          {aplications?.map((aplication: Aplication) => (
            <Select.Option key={aplication.cdAplicacao}>{aplication.label}</Select.Option>
          ))}
        </Select>
      </Row>
      <Row>
        <Col span={22} offset={2}>
          {teste &&
            teste.children?.map((layer) =>
              layer.children?.map((theme) =>
                theme.children?.map((question) => {
                  return (
                    <>
                      <Title key={question.label} level={5} className='question-title'>
                        {question.label}
                      </Title>
                      <Radio.Group
                        onChange={(item) => {
                          question.score = item.target.value;
                        }}
                      >
                        <Space>
                          <Radio value={1}>1</Radio>
                          <Radio value={2}>2</Radio>
                          <Radio value={3}>3</Radio>
                          <Radio value={4}>4</Radio>
                          <Radio value={5}>5</Radio>
                        </Space>
                      </Radio.Group>
                    </>
                  );
                }),
              ),
            )}
        </Col>
      </Row>
      <Row justify='center'>
        <CustomButton label='Enviar' onClick={sendAvaliation} />
      </Row>
    </div>
  );
}
