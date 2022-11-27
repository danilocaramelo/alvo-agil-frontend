import { Avatar, Col, List, Row, Select, Skeleton, Tooltip, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TeamOutlined,
  IssuesCloseOutlined,
  CalendarOutlined,
  ToolOutlined,
  AimOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AgilWheel, ParticipantDrawer } from '../../containers';
import { useCallback, useEffect, useState } from 'react';
import './style.scss';
import { data2 } from '../../containers/General/AgilWheel/datamock_copy';
import { useParams } from 'react-router-dom';
import { getTeam, Team as TeamEntity } from '../../connections/team';
import { CustomButton } from '../../components';
import { AddParticipantModal } from './AddParticipantModal';
const { Title, Text } = Typography;

export function Team() {
  const [showParticipantDrawer, setShowParticipantDrawer] = useState(false);
  const params = useParams();
  const teamId = params.id;
  const [teamData, setTeamData] = useState<TeamEntity>();
  const [loadingTeam, setLoadingTeam] = useState<boolean>(false);
  const [addParticipantModalVisible, setAddParticipantModalVisible] = useState<boolean>(false);

  const secondList = teamData?.tecnologias;

  const closeAddParticipantModal = useCallback(() => setAddParticipantModalVisible(false), []);
  const openAddParticipantModal = useCallback(() => {
    setAddParticipantModalVisible(true);
  }, []);

  const requestTeam = useCallback(async () => {
    setLoadingTeam(true);
    const response = await getTeam(Number(teamId));
    setTeamData(response);
    setLoadingTeam(false);
  }, []);

  useEffect(() => {
    requestTeam();
  }, []);

  const closeParticipantDrawer = useCallback(() => setShowParticipantDrawer(false), []);
  const openParticipantDrawer = useCallback(() => setShowParticipantDrawer(true), []);

  return (
    <div className='team-page'>
      <Row>
        <Col span={8}>
          <Row justify='center'>
            <Title level={2}>{teamData?.nmTime}</Title>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={{ marginBottom: 10 }}>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Nº de pessoas'>
                <TeamOutlined className='team-description-icon' />
                <Text>5</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Status'>
                <IssuesCloseOutlined className='team-description-icon' />
                <Text>{teamData?.flTime === 'S' ? 'Ativo' : 'Inativo'}</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Framework'>
                <ToolOutlined className='team-description-icon' />
                <Text>{teamData?.framework?.nmFramework}</Text>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Última nota'>
                <AimOutlined className='team-description-icon' />
                <Text>3.5</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data de início do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text>{teamData?.dtInicioTime}</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data final do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text>{teamData?.dtFinalizacaoTime}</Text>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align='middle'>
        <Col span={8}>
          <Row justify='center'>
            <Select style={{ width: 120 }} defaultValue='1'>
              <Select.Option value='1'>17/09/2022</Select.Option>
              <Select.Option value='2'>23/10/2022</Select.Option>
            </Select>
          </Row>
          <AgilWheel data={data2} />
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <CustomButton label='Adicionar participante' onClick={openAddParticipantModal} />
              <div
                id='scrollableDiv'
                style={{
                  height: '350px',
                  overflow: 'auto',
                  padding: '0 16px',
                  backgroundColor: '#fff',
                }}
              >
                <InfiniteScroll
                  dataLength={teamData?.participantes?.length ?? 0}
                  next={() => {
                    console.log();
                  }}
                  hasMore={loadingTeam}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  scrollableTarget='scrollableDiv'
                >
                  <List
                    dataSource={teamData?.participantes}
                    renderItem={(item) => (
                      <List.Item key={item.emailParticipante}>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={<a onClick={openParticipantDrawer}>{item.nmParticipante}</a>}
                          description={item.emailParticipante}
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Col>
            <Col span={12}>
              <List
                bordered
                dataSource={secondList}
                renderItem={(item) => <List.Item>{item.nmTecnologia}</List.Item>}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <ParticipantDrawer showDrawer={showParticipantDrawer} closeDrawer={closeParticipantDrawer} />
      <AddParticipantModal
        visible={addParticipantModalVisible}
        closeModal={closeAddParticipantModal}
        team={teamData}
      />
    </div>
  );
}
