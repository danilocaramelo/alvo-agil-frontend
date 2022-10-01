import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { Framework, getFrameworks } from '../../../connections/framework';

export function FrameworksTable() {
  const [frameworks, setFrameworks] = useState<Framework[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const requestFrameworks = useCallback(async () => {
    setLoadingTable(true);
    const response = await getFrameworks();
    setFrameworks(response);
    setLoadingTable(false);
  }, []);

  useEffect(() => {
    requestFrameworks();
  }, []);

  const columns: ColumnsType<Framework> = [
    {
      title: 'Nome',
      dataIndex: 'nmFramework',
      key: 'nmFramework',
    },
    {
      title: 'Status',
      key: 'flFramework',
      dataIndex: 'flFramework',
      render: (_, { flFramework }) =>
        flFramework === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
  ];

  return (
    <div id='frameworks-table'>
      <Table
        columns={columns}
        dataSource={frameworks}
        loading={loadingTable}
        rowKey='cdFramework'
      />
    </div>
  );
}
