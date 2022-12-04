import { Avatar, Divider, Drawer, Row, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Participant } from '../../../connections/particpant';
import './style.scss';

type ParticipantDrawerProps = {
  showDrawer: boolean;
  closeDrawer: () => void;
  participant?: Participant;
};

const { Paragraph } = Typography;

export function ParticipantDrawer({
  showDrawer,
  closeDrawer,
  participant,
}: ParticipantDrawerProps) {
  return (
    <Drawer
      title={participant?.nmParticipante}
      placement='right'
      visible={showDrawer}
      onClose={closeDrawer}
      className='participant-drawer'
    >
      <Row align='middle' justify='center'>
        <Avatar size={120} icon={<UserOutlined />} />
      </Row>
      <Row justify='center' style={{ marginTop: 15 }}>
        {participant?.flParticipante === 'S' ? (
          <Tag className='status-tag' color='green'>
            Ativo
          </Tag>
        ) : (
          <Tag color='red'>Inativo</Tag>
        )}
      </Row>
      <Row justify='center' align='middle' style={{ marginTop: 10 }}>
        <Paragraph style={{ marginBottom: '3px ' }}>
          início: {participant?.dtInicioParticipante || '-'}
        </Paragraph>
        <Divider type='vertical' />
        <Paragraph style={{ marginBottom: '3px ' }}>
          fim: {participant?.dtFimParticipante || '-'}
        </Paragraph>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Row>
          <Paragraph strong className='label'>
            email:
          </Paragraph>
          <Paragraph>{participant?.emailParticipante}</Paragraph>
        </Row>
        <Row>
          <Paragraph strong className='label'>
            time:
          </Paragraph>
          <Paragraph>{participant?.time?.nmTime}</Paragraph>
        </Row>
        <Row>
          <Paragraph strong className='label'>
            função:
          </Paragraph>
          <Paragraph>{participant?.funcao?.nmFuncao}</Paragraph>
        </Row>
      </div>
    </Drawer>
  );
}
