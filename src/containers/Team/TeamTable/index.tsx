import { Popover, Row, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteTeam, Team } from '../../../connections/team';
import './TeamTable.scss';
import { CustomButton } from '../../../components';
import { TeamForm } from '../TeamForm';
import { Framework } from '../../../connections/framework';
import { Ceremony } from '../../../connections/ceremony';
import { Technology } from '../../../connections/technology';

type TeamTableProps = {
  teams: Team[] | undefined;
  loading: boolean;
  requestTeams: () => void;
  frameworks?: Framework[];
  ceremonies?: Ceremony[];
  technologies?: Technology[];
};

export function TeamTable({
  teams,
  loading,
  requestTeams,
  frameworks,
  ceremonies,
  technologies,
}: TeamTableProps) {
  const navigate = useNavigate();
  const [teamFormVisible, setTeamFormVisible] = useState<boolean>(false);
  const closeTeamForm = useCallback(() => setTeamFormVisible(false), []);
  const [teamInitialValues, setTeamInitialValues] = useState<Team>();

  useEffect(() => {
    requestTeams();
  }, []);

  const redirect = useCallback((teamId: number) => {
    navigate(teamId.toString());
  }, []);

  const removeTeam = useCallback(async (ceremonyId: number) => {
    await deleteTeam(ceremonyId);
    requestTeams();
  }, []);

  const columns: ColumnsType<Team> = [
    {
      title: 'Nome',
      dataIndex: 'nmTime',
      key: 'nmTime',
      align: 'center',
    },
    {
      title: 'Data de início',
      dataIndex: 'dtInicioTime',
      key: 'dtInicioTime',
      align: 'center',
    },
    {
      title: 'Framework',
      dataIndex: 'framework',
      key: 'framework',
      render: (_, { framework }) => (framework ? framework.nmFramework : '-'),
      align: 'center',
    },
    {
      title: 'Status',
      key: 'flTime',
      dataIndex: 'flTime',
      align: 'center',
      render: (_, { flTime }) =>
        flTime === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      render: (_, team) => (
        <>
          <CustomButton
            onClick={() => redirect(team.cdTime)}
            icon={<EyeOutlined />}
            style={{ marginRight: '10px' }}
          />
          <CustomButton
            icon={<EditOutlined />}
            onClick={() => {
              setTeamInitialValues(team);
              setTeamFormVisible(true);
            }}
            style={{ marginRight: '10px' }}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <CustomButton
                    onClick={() => removeTeam(team.cdTime)}
                    label='Confirma'
                    color='orange'
                    style={{ marginTop: '10px' }}
                  />
                </Row>
              </>
            }
            trigger='click'
          >
            <CustomButton icon={<DeleteOutlined />} />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div id='team-table'>
      <Table
        columns={columns}
        dataSource={teams}
        loading={loading}
        rowKey='cdTime'
        pagination={{ pageSize: 4 }}
      />
      <TeamForm
        visible={teamFormVisible}
        closeModal={closeTeamForm}
        requestTeams={requestTeams}
        initialValues={teamInitialValues}
        ceremonies={ceremonies}
        frameworks={frameworks}
        technologies={technologies}
      />
    </div>
  );
}
