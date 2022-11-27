import { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row, Select } from 'antd';
import { CustomModal } from '../../components';
import { useForm } from 'antd/lib/form/Form';
import { getParticipants, Participant } from '../../connections/particpant';
import { Team, updateTeam } from '../../connections/team';

type AddParticipantModalProps = {
  visible: boolean;
  closeModal: () => void;
  team: Team | undefined;
  //   requestCeremonies: () => void;
};

export function AddParticipantModal({
  visible,
  closeModal,
  //   requestCeremonies,
  team,
}: AddParticipantModalProps) {
  const [form] = useForm();
  const [participants, setParticipants] = useState<Participant[] | undefined>([]);
  const updateTeamParticipants = useCallback(async (values: Participant[]) => {
    if (team) {
      const newTeam: Team = { ...team, participantes: values };
      await updateTeam(newTeam);
    }
    // requestCeremonies();
    closeModal();
  }, []);

  const requestParticipants = useCallback(async () => {
    const response = await getParticipants();
    setParticipants(response);
  }, []);

  useEffect(() => {
    requestParticipants();
  }, []);

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={(values) => console.log(values)}
      okButtonText='Criar'
      form={form}
    >
      <Row>
        <Col span={24}>
          <Form.Item label='Participantes' name='participantes'>
            <Select mode='multiple'>
              {participants?.map((participant) => (
                <Select.Option value={participant.cdParticipante} key={participant.cdParticipante}>
                  {participant.nmParticipante}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </CustomModal>
  );
}
