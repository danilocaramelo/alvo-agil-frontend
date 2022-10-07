import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
  getParticipantFunctions,
  ParticipantFunction,
} from '../../connections/participantFunction';
import { getTeams, Team } from '../../connections/team';

export function ParticipantForm() {
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

  return (
    <Card>
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item label='Nome do Participante' name='nmParticipante'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flParticipante'>
          <Select>
            <Select.Option value='S'>Ativo</Select.Option>
            <Select.Option value='N'>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Data de início' name='dtInicioParticipante'>
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label='Data de fim' name='dtFimParticipante'>
          <DatePicker format='DD/MM/YYYY' />
        </Form.Item>
        <Form.Item label='Email' name='emailParticipante'>
          <Input />
        </Form.Item>
        <Form.Item label='Time' name='time'>
          <Select>
            {teams?.map((team) => (
              <Select.Option
                value={team.cdTime}
                key={team.cdTime}
              >
                {team.nmTime}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Função' name='funcao'>
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
        <Button htmlType='submit' type='primary'>
          Enviar
        </Button>
      </Form>
    </Card>
  );
}
