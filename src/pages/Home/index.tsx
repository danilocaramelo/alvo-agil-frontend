import { Col, Row, Typography } from 'antd';
import alvoAgilCompactado from '../../assets/AlvoAgil-compactado.png';
const { Title } = Typography;
export function Home() {
  return (
    <Row justify='center' align='middle'>
      <Col>
        <img
          src={alvoAgilCompactado}
          style={{ width: 500, height: 400 }}
          alt='Icone do Alvo Agil com título Alvo Agil'
        />
        <Title level={4}>Mire na autoavaliação e acerte a produtividade</Title>
      </Col>
    </Row>
  );
}
