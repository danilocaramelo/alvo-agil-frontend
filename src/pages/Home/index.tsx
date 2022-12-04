import { Col, Row, Typography } from 'antd';
import alvoAgilImage from '../../assets/AlvoAgil.png';

const { Title } = Typography;
export function Home() {
  return (
    <Row justify='center' align='middle'>
      <Col>
        <img src={alvoAgilImage} style={{ width: 400, height: 400 }} />
        <Title level={4}>Mire na autoavaliação e acerte a produtividade</Title>
      </Col>
    </Row>
  );
}
