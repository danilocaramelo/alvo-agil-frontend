import { Col, Row } from 'antd';
import { TeamForm, TeamTable } from '../containers';

export function Team() {
  return (
    <>
      <Row align="middle" style={{ height: '100%' }}>
        <Col span={14} offset={1}>
          <TeamTable />
        </Col>
        <Col span={7} offset={1}>
          <TeamForm />
        </Col>
      </Row>
    </>
  );
}
