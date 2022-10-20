import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { getParticipants, Participant } from '../../connections/particpant';

export function ParticipantTable() {
  const [participants, setParticipants] = useState<Participant[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const requestParticipants = useCallback(async () => {
    setLoadingTable(true);
    const response = await getParticipants();
    setParticipants(response);
    setLoadingTable(false);
  }, []);

  useEffect(() => {
    requestParticipants();
  }, []);

  const columns: ColumnsType<Participant> = [
    {
      title: 'Nome',
      dataIndex: 'nmParticipante',
      key: 'nmParticipante',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (_, { time }) => time ? time.nmTime : '-',
    },
    {
      title: 'Função',
      dataIndex: 'funcao',
      key: 'funcao',
      render: (_, { funcao }) => funcao?.nmFuncao,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { flParticipante }) =>
        flParticipante === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
  ];

  return (
    <div id='participant-table'>
      <Table columns={columns} dataSource={participants} loading={loadingTable} rowKey='cdTime' />
    </div>
  );
}
