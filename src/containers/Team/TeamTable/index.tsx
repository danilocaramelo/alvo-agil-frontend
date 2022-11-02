import { Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { getTeams, Team } from '../../../connections/team';
import './TeamTable.scss';
import { CustomButton } from '../../../components';

export function TeamTable() {
  const [teams, setTeams] = useState<Team[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const navigate = useNavigate();
  const requestTeams = useCallback(async () => {
    setLoadingTable(true);
    const response = await getTeams();
    setTeams(response);
    setLoadingTable(false);
  }, []);

  useEffect(() => {
    requestTeams();
  }, []);

  const redirect = useCallback((teamId: number) => {
    navigate(teamId.toString());
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
            onClick={() => console.log()}
            style={{ marginRight: '10px' }}
          />
          <CustomButton icon={<DeleteOutlined />} onClick={() => console.log()} />
        </>
      ),
    },
  ];

  return (
    <div id='team-table'>
      <Table
        columns={columns}
        dataSource={teams}
        loading={loadingTable}
        rowKey='cdTime'
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
}
