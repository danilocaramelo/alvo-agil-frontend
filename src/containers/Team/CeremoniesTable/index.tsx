import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { Ceremony, getCeremonies } from '../../../connections/Ceremony';

export function CerimoniesTable() {
  const [ceremonies, setCeremonies] = useState<Ceremony[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const requestCeremonies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getCeremonies();
    setCeremonies(response);
    setLoadingTable(false);
  }, []);

  useEffect(() => {
    requestCeremonies();
  }, []);

  const columns: ColumnsType<Ceremony> = [
    {
      title: 'Nome',
      dataIndex: 'nmCerimonia',
      key: 'nmCerimonia',
    },
    {
      title: 'Status',
      key: 'flCerimonia',
      dataIndex: 'flCerimonia',
      render: (_, { flCerimonia }) =>
        flCerimonia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
  ];

  return (
    <div id='ceremonies-table'>
      <Table
        columns={columns}
        dataSource={ceremonies}
        loading={loadingTable}
        rowKey='cdCerimonia'
      />
    </div>
  );
}
