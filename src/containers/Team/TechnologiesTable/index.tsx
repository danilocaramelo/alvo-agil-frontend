import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { getTechnologies, Technology } from '../../../connections/technology';

export function TechnologiesTable() {
  const [technologies, setTechnologies] = useState<Technology[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const requestTechnologies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getTechnologies();
    setTechnologies(response);
    setLoadingTable(false);
  }, []);

  useEffect(() => {
    requestTechnologies();
  }, []);

  const columns: ColumnsType<Technology> = [
    {
      title: 'Nome',
      dataIndex: 'nmTecnologia',
      key: 'nmTecnologia',
    },
    {
      title: 'Status',
      key: 'flTecnologia',
      dataIndex: 'flTecnologia',
      render: (_, { flTecnologia }) =>
        flTecnologia === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
  ];

  return (
    <div id='technologies-table'>
      <Table
        columns={columns}
        dataSource={technologies}
        loading={loadingTable}
        rowKey='cdTecnologia'
      />
    </div>
  );
}
