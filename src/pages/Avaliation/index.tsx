import { Col, Radio, Row, Select, Space, Typography } from 'antd';
import './style.scss';
import { data2 } from '../../mocks/datamock_copy';
import { CustomButton } from '../../components';
import { useCallback, useEffect, useState } from 'react';
import { getAplicationsList } from '../../connections/aplication';

const { Title } = Typography;

export function Avaliation() {
  const [aplications, setAplications] = useState<any>([]);

  const sendAvaliation = useCallback(() => {
    console.log(data2);
  }, [data2]);

  const requestAplications = useCallback(async () => {
    const response = await getAplicationsList();
    setAplications(response);
    console.log(aplications);
  }, []);

  useEffect(() => {
    requestAplications();
    console.log(aplications);
  }, []);
  return (
    <div className='avaliation-page'>
      <Row justify='center'>
        <Select className='aplication-select'>
          <Select.Option>Aplicação padrão</Select.Option>
        </Select>
      </Row>
      <Row>
        <Col span={22} offset={2}>
          {data2.children.map((layer) =>
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
