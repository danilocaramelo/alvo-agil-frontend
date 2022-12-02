import { Avatar, Col, List, Popover, Row, Select, Skeleton, Tooltip, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TeamOutlined,
  IssuesCloseOutlined,
  CalendarOutlined,
  ToolOutlined,
  AimOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { AgilWheel, ParticipantDrawer } from '../../containers';
import { useCallback, useEffect, useState } from 'react';
import './style.scss';
import { data2 } from '../../mocks/datamock_copy';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeam, Team as TeamEntity, updateTeam } from '../../connections/team';
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
  const navigate = useNavigate();


  const teamTechnologies = teamData?.tecnologias;
  const teamCeremonies = teamData?.cerimonias;

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

  const removeTeamParticipant = useCallback(
    async (deleteId: number) => {
      const newParticipants = teamData?.participantes?.filter(
        (participant) => participant.cdParticipante !== deleteId,
      );
      const newTeam: TeamEntity = {
        ...teamData!,
        participantes: newParticipants ? [...newParticipants] : [],
      };
      await updateTeam(newTeam);
    },
    [teamData],
  );

  return (
    <div className='team-page'>
      <Row>
        <Col span={8}>
          <Row justify='center'>
            <Title level={2} className='team-name'>
              {teamData?.nmTime}
            </Title>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Row justify='center'>
            <CustomButton label='Criar nova avaliação' onClick={() => navigate('avaliation')}/>
          </Row>
          <Row justify='center' style={{ marginTop: 20 }}>
            <Select style={{ width: 120 }} defaultValue='1'>
              <Select.Option value='1'>17/09/2022</Select.Option>
              <Select.Option value='2'>23/10/2022</Select.Option>
            </Select>
          </Row>
          <AgilWheel data={data2} />
        </Col>
        <Col span={8}>
          <Row style={{ marginBottom: 10 }}>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Nº de pessoas'>
                <TeamOutlined className='team-description-icon' />
                <Text className='team-description-text'>
                  {teamData?.participantes?.length ?? 0}
                </Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Status'>
                <IssuesCloseOutlined className='team-description-icon' />
                <Text className='team-description-text'>
                  {teamData?.flTime === 'S' ? 'Ativo' : 'Inativo'}
                </Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Framework'>
                <ToolOutlined className='team-description-icon' />
                <Text className='team-description-text'>{teamData?.framework?.nmFramework}</Text>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Última nota'>
                <AimOutlined className='team-description-icon' />
                <Text className='team-description-text'>3.5</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data de início do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text className='team-description-text'>{teamData?.dtInicioTime}</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data final do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text className='team-description-text'>{teamData?.dtFinalizacaoTime}</Text>
              </Tooltip>
            </Col>
          </Row>
          <List
            header={<div>Tecnologias</div>}
            bordered
            dataSource={teamTechnologies}
            renderItem={(item) => <List.Item>{item?.nmTecnologia}</List.Item>}
            className='list'
            locale={{ emptyText: '' }}
          />
          <List
            header={<div>Cerimônias</div>}
            bordered
            dataSource={teamCeremonies}
            renderItem={(item) => <List.Item>{item?.nmCerimonia}</List.Item>}
            className='list'
          />
        </Col>
        <Col span={6} offset={1}>
          <Row justify='center' style={{ marginBottom: 20 }}>
            <CustomButton label='Adicionar participante' onClick={openAddParticipantModal} />
          </Row>
          <div
            id='scrollableDiv'
            style={{
              height: '400px',
              overflow: 'auto',
              padding: '0 16px',
              backgroundColor: '#fff',
              borderRadius: '10px',
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
                      description={
                        <Row justify='space-between'>
                          <div>{item.emailParticipante}</div>
                          <Popover
                            content={
                              <>
                                <div>Tem certeza que deseja excluir?</div>
                                <Row justify='center'>
                                  <CustomButton
                                    onClick={() => removeTeamParticipant(item.cdParticipante)}
                                    label='Confirma'
                                    color='orange'
                                    style={{ marginTop: '10px' }}
                                  />
                                </Row>
                              </>
                            }
                            trigger='click'
                          >
                            <DeleteOutlined style={{ color: 'red' }} />
                          </Popover>
                        </Row>
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
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
