import { Button, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { getParticipants, Participant } from '../../connections/particpant';
import { ParticipantDrawer } from './ParticipantDrawer';

export function ParticipantTable() {
  const [participants, setParticipants] = useState<Participant[] | undefined>([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showParticipantDrawer, setShowParticipantDrawer] = useState(false);

  const requestParticipants = useCallback(async () => {
    setLoadingTable(true);
    const response = await getParticipants();
    setParticipants(response);
    setLoadingTable(false);
  }, []);

  console.log(showParticipantDrawer);
  useEffect(() => {
    requestParticipants();
  }, []);

  const closeParticipantDrawer = useCallback(() => setShowParticipantDrawer(false), []);
  const openParticipantDrawer = useCallback(() => setShowParticipantDrawer(true), []);

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
      render: (_, { time }) => (time ? time.nmTime : '-'),
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
    {
      title: 'Ações',
      key: 'actions',
      render: (_, participant) => (
        <>
          <Button onClick={openParticipantDrawer} icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </>
      ),
    },
  ];

  return (
    <>
      <div id='participant-table'>
        <Table columns={columns} dataSource={participants} loading={loadingTable} rowKey='cdTime' />
      </div>
      <ParticipantDrawer
        showDrawer={showParticipantDrawer}
        closeDrawer={closeParticipantDrawer}
      />
    </>
  );
}
