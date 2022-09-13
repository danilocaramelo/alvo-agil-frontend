import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function CerimoniesTable() {
  interface DataType {
    key: string;
    name: string;
    status: 'ativo' | 'inativo';
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
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
      name: 'Cerimonia 1',
      status: 'ativo',
    },
    {
      key: '2',
      name: 'Cerimonia 2',
      status: 'inativo',
    },
    {
      key: '3',
      name: 'Cerimonia 3',
      status: 'ativo',
    },
  ];

  return (
    <div id="team-table">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
