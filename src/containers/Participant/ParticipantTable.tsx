import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function ParticipantTable() {
  interface DataType {
    key: string;
    name: string;
    status: 'ativo' | 'inativo';
    team: string;
    role: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Função',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) =>
        status === 'ativo' ? (
          <Tag color="green">{status}</Tag>
        ) : (
          <Tag color="red">{status}</Tag>
        ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'Gustavo',
      status: 'ativo',
      team: 'Time 1',
      role: 'backend',
    },
    {
      key: '2',
      name: 'Clara',
      status: 'ativo',
      team: 'Time 1',
      role: 'backend',
    },
    {
      key: '3',
      name: 'Maria',
      status: 'inativo',
      team: 'Time 2',
      role: 'mobile',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
