import { Avatar, Col, Drawer, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type ParticipantDrawerProps = {
  showDrawer: boolean;
  closeDrawer: () => void;
};

const { Paragraph } = Typography;

export function ParticipantDrawer({ showDrawer, closeDrawer }: ParticipantDrawerProps) {
  return (
    <Drawer title='Participant Name' placement='right' visible={showDrawer} onClose={closeDrawer}>
      <Row align='middle'>
        <Col span={6}>
          <Avatar size={85} icon={<UserOutlined />} />
        </Col>
        <Col offset={2}>
          <Paragraph strong style={{ marginBottom: '3px ' }}>
            Status:{' '}
          </Paragraph>
          <Paragraph strong style={{ marginBottom: '3px ' }}>
            Data de início:{' '}
          </Paragraph>
          <Paragraph strong style={{ marginBottom: '3px ' }}>
            Data de fim:{' '}
          </Paragraph>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Paragraph strong>email: </Paragraph>
        <Paragraph strong>time: </Paragraph>
        <Paragraph strong>função: </Paragraph>
      </div>
    </Drawer>
  );
}
