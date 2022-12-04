import { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row, Select } from 'antd';
import { CustomModal } from '../../components';
import { useForm } from 'antd/lib/form/Form';
import { getParticipants, Participant } from '../../connections/particpant';
import { NewTeam, Team, updateTeam } from '../../connections/team';

type AddParticipantModalProps = {
  visible: boolean;
  closeModal: () => void;
  team: Team | undefined;
  requestTeam: () => void;
};

export function AddParticipantModal({
  visible,
  closeModal,
  requestTeam,
  team,
}: AddParticipantModalProps) {
  const [form] = useForm();
  const [participants, setParticipants] = useState<Participant[] | undefined>([]);

  const updateTeamParticipants = useCallback(
    async (values: { participantes: string[] }) => {
      const framework = team?.framework?.cdFramework
        ? String(team?.framework?.cdFramework)
        : undefined;
      const technologies = team?.tecnologias?.map((technology) => String(technology.cdTecnologia));
      const ceremonies = team?.cerimonias?.map((ceremony) => String(ceremony.cdCerimonia));
      const newParticipants = team?.participantes
        ? [...values.participantes, ...team.participantes]
        : values.participantes;
      const finalParticipants = newParticipants.map((cdParticipante) => String(cdParticipante));
      const newTeam: NewTeam = {
        ...team,
        framework,
        tecnologias: technologies,
        cerimonias: ceremonies,
        participantes: finalParticipants,
      };
      await updateTeam(newTeam);
      requestTeam();
      closeModal();
    },
    [participants],
  );

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
      onFinish={updateTeamParticipants}
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
