import { Col, Row, Typography } from 'antd';
import alvoAgilImage from '../../assets/AlvoAgil.png';
import alvoAgilCompactado from '../../assets/AlvoAgil-compactado.png';
const { Title } = Typography;
export function Home() {
  return (
    <Row justify='center' align='middle'>
      <Col>
        <img src={alvoAgilCompactado} style={{ width: 500, height: 400 }} />
        <Title level={4}>Mire na autoavaliação e acerte a produtividade</Title>
      </Col>
    </Row>
  );
}
