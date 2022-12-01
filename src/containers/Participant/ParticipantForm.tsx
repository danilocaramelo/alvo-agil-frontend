import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useCallback, useEffect, useState } from 'react';
import { CustomModal } from '../../components';
import {
  getParticipantFunctions,
  ParticipantFunction,
} from '../../connections/participantFunction';
import { createParticipant, NewParticipant } from '../../connections/particpant';
import { getTeams, Team } from '../../connections/team';

type ParticipantFormProps = {
  visible: boolean;
  closeModal: () => void;
};

type FormValues = {
  nmParticipante: string;
  flParticipante: 'S' | 'N';
  dtInicioParticipante: moment.Moment;
  dtFimParticipante?: moment.Moment;
  emailParticipante: string;
  cdFuncao: number;
};

export function ParticipantForm({ visible, closeModal }: ParticipantFormProps) {
  const [form] = useForm();
  const [participantFunctions, setParticipantFunctions] = useState<
    ParticipantFunction[] | undefined
  >([]);
  const [teams, setTeams] = useState<Team[] | undefined>([]);

  const requestTeams = useCallback(async () => {
    const response = await getTeams();
    setTeams(response);
  }, []);

  const requestParticipantFunctions = useCallback(async () => {
    const responseFrameworks = await getParticipantFunctions();
    setParticipantFunctions(responseFrameworks);
  }, []);

  useEffect(() => {
    requestParticipantFunctions();
    requestTeams();
  }, []);

  const newParticipant = useCallback(async (values: FormValues) => {
    const finalValues: NewParticipant = {
      ...values,
      dtInicioParticipante: values.dtInicioParticipante?.format('YYYY-MM-DD'),
      dtFimParticipante: values.dtFimParticipante
        ? values.dtFimParticipante.format('YYYY-MM-DD')
        : undefined,
    };
    await createParticipant(finalValues);
    requestTeams();
    closeModal();
  }, []);

  return (
    <CustomModal
      closeModal={closeModal}
      visible={visible}
      onFinish={newParticipant}
      okButtonText='Criar'
      form={form}
    >
      <>
        <Form.Item label='Nome' name='nmParticipante'>
          <Input />
        </Form.Item>
        <Row>
          <Col span={16}>
            <Form.Item label='Email' name='emailParticipante'>
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item label='Status' name='flParticipante'>
              <Select>
                <Select.Option value='S'>Ativo</Select.Option>
                <Select.Option value='N'>Inativo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label='início' name='dtInicioParticipante'>
              <DatePicker format='DD/MM/YYYY' />
            </Form.Item>
            <Form.Item label='fim' name='dtFimParticipante'>
              <DatePicker format='DD/MM/YYYY' />
            </Form.Item>
          </Col>
          <Col span={13} offset={1}>
            <Form.Item label='Time' name='time'>
              <Select>
                {teams?.map((team) => (
                  <Select.Option value={team.cdTime} key={team.cdTime}>
                    {team.nmTime}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Função' name='cdFuncao'>
              <Select>
                {participantFunctions?.map((participantFunction) => (
                  <Select.Option
                    value={participantFunction.cdFuncao}
                    key={participantFunction.cdFuncao}
                  >
                    {participantFunction.nmFuncao}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    </CustomModal>
  );
}
