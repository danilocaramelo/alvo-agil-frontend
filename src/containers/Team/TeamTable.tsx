import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export function TeamTable() {
  interface DataType {
    key: string;
    name: string;
    startDate: string;
    framework: string;
    status: 'ativo' | 'inativo';
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Data de início',
      dataIndex: 'startDate',
      key: 'age',
    },
    {
      title: 'Framework',
      dataIndex: 'framework',
      key: 'address',
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
      name: 'Time 1',
      startDate: '09/10/2022',
      framework: 'Spring Boot',
      status: 'ativo',
    },
    {
      key: '2',
      name: 'Time 2',
      startDate: '09/10/2022',
      framework: 'React',
      status: 'inativo',
    },
    {
      key: '3',
      name: 'Time 3',
      startDate: '09/10/2022',
      framework: 'React',
      status: 'ativo',
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
