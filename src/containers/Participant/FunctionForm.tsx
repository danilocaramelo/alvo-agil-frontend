import { Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useCallback } from 'react';
import { CustomModal } from '../../components';
import {
  createParticipantFunction,
  ParticipantFunction,
} from '../../connections/participantFunction';

type FunctionFormProps = {
  visible: boolean;
  closeModal: () => void;
};

export function FunctionForm({ visible, closeModal }: FunctionFormProps) {
  const [form] = useForm();
  const newParticipantFunction = useCallback(async (values: ParticipantFunction) => {
    await createParticipantFunction(values);
  }, []);

  return (
    <CustomModal
      closeModal={closeModal}
      visible={visible}
      onFinish={newParticipantFunction}
      okButtonText='Criar'
      form={form}
    >
      <Row>
        <Col span={16}>
          <Form.Item label='Nome' name='nmFuncao'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item label='Status' name='flFuncao'>
            <Select>
              <Select.Option value='S'>Ativo</Select.Option>
              <Select.Option value='N'>Inativo</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </CustomModal>
  );
}
