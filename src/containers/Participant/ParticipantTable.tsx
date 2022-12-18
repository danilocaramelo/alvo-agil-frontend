import { Popover, Row, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCallback, useEffect, useState } from 'react';
import { deleteParticipant, Participant } from '../../connections/particpant';
import { ParticipantDrawer } from './ParticipantDrawer';
import { CustomButton } from '../../components';
import { ParticipantForm } from './ParticipantForm';
import { ParticipantFunction } from '../../connections/participantFunction';

type ParticipantTableProps = {
  participants: Participant[] | undefined;
  loading: boolean;
  requestParticipants: () => void;
  participantFunctions?: ParticipantFunction[];
};

export function ParticipantTable({
  participants,
  loading,
  requestParticipants,
  participantFunctions,
}: ParticipantTableProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | undefined>();
  const [showParticipantDrawer, setShowParticipantDrawer] = useState(false);
  const [participantFormVisible, setParticipantFormVisible] = useState(false);
  const [participantInitialValues, setParticipantInitialValues] = useState<Participant>();

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

  const closeParticipantForm = useCallback(() => setParticipantFormVisible(false), []);

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
            onClick={() => {
              setParticipantInitialValues(participant);
              setParticipantFormVisible(true);
            }}
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
          loading={loading}
          rowKey='cdTime'
          pagination={{ pageSize: 4 }}
        />
      </div>
      <ParticipantDrawer
        participant={selectedParticipant}
        showDrawer={showParticipantDrawer}
        closeDrawer={closeParticipantDrawer}
      />
      <ParticipantForm
        visible={participantFormVisible}
        closeModal={closeParticipantForm}
        requestParticipants={requestParticipants}
        initialValues={participantInitialValues}
        participantFunctions={participantFunctions}
      />
    </>
  );
}
