import { Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { getParticipants, Participant } from '../../connections/particpant';
import { ParticipantDrawer } from './ParticipantDrawer';
import { CustomButton } from '../../components';

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
      align: 'center',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      render: (_, { time }) => (time ? time.nmTime : '-'),
    },
    {
      title: 'Função',
      dataIndex: 'funcao',
      align: 'center',
      key: 'funcao',
      render: (_, { funcao }) => funcao?.nmFuncao,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (_, { flParticipante }) =>
        flParticipante === 'S' ? <Tag color='green'>Ativo</Tag> : <Tag color='red'>Inativo</Tag>,
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      render: (_, participant) => (
        <>
          <CustomButton
            style={{ marginRight: '10px' }}
            onClick={openParticipantDrawer}
            icon={<EyeOutlined />}
          />
          <CustomButton
            style={{ marginRight: '10px' }}
            onClick={() => console.log()}
            icon={<EditOutlined />}
          />
          <CustomButton
            style={{ marginRight: '10px' }}
            onClick={() => console.log()}
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div id='participant-table'>
        <Table columns={columns} dataSource={participants} loading={loadingTable} rowKey='cdTime' />
      </div>
      <ParticipantDrawer showDrawer={showParticipantDrawer} closeDrawer={closeParticipantDrawer} />
    </>
  );
}
