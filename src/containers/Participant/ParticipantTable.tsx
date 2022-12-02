import { Popover, Row, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteParticipant, getParticipants, Participant } from '../../connections/particpant';
import { ParticipantDrawer } from './ParticipantDrawer';
import { CustomButton } from '../../components';

export function ParticipantTable() {
  const [participants, setParticipants] = useState<Participant[] | undefined>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | undefined>();
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
  const openParticipantDrawer = useCallback(
    (participant: Participant) => () => {
      setSelectedParticipant(participant);
      setShowParticipantDrawer(true);
    },
    [],
  );

  const removeParticipant = useCallback(async (participantId: number) => {
    await deleteParticipant(participantId);
    requestParticipants();
  }, []);

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
            onClick={openParticipantDrawer(participant)}
            icon={<EyeOutlined />}
          />
          <CustomButton
            style={{ marginRight: '10px' }}
            onClick={() => console.log()}
            icon={<EditOutlined />}
          />
          <Popover
            content={
              <>
                <div>Tem certeza que deseja excluir?</div>
                <Row justify='center'>
                  <CustomButton
                    onClick={() => removeParticipant(participant.cdParticipante)}
                    label='Confirma'
                    color='orange'
                    style={{ marginTop: '10px' }}
                  />
                </Row>
              </>
            }
            trigger='click'
          >
            <CustomButton icon={<DeleteOutlined />} />
          </Popover>
        </>
      ),
    },
  ];

  return (
    <>
      <div id='participant-table'>
        <Table
          columns={columns}
          dataSource={participants}
          loading={loadingTable}
          rowKey='cdTime'
          pagination={{ pageSize: 4 }}
        />
      </div>
      <ParticipantDrawer
        participant={selectedParticipant}
        showDrawer={showParticipantDrawer}
        closeDrawer={closeParticipantDrawer}
      />
    </>
  );
}
