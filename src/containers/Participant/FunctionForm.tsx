import { Button, Card, Form, Input, Select } from 'antd';
import { useCallback } from 'react';
import {
  createParticipantFunction,
  ParticipantFunction,
} from '../../connections/participantFunction';

export function FunctionForm() {
  const newParticipantFunction = useCallback(async (values: ParticipantFunction) => {
    await createParticipantFunction(values);
  }, []);

  return (
    <Card>
      <Form onFinish={newParticipantFunction}>
        <Form.Item label='Nome da função' name='nmFuncao'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flFuncao'>
          <Select>
            <Select.Option value='S'>Ativo</Select.Option>
            <Select.Option value='N'>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Button htmlType='submit' type='primary'>
          Enviar
        </Button>
      </Form>
    </Card>
  );
}
