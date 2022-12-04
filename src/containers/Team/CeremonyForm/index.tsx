import { useCallback } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { createCeremony, NewCeremony } from '../../../connections/ceremony';
import { CustomModal } from '../../../components';
import { useForm } from 'antd/lib/form/Form';

type CerimonyFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestCeremonies: () => void;
};

export function CerimonyForm({ visible, closeModal, requestCeremonies }: CerimonyFormProps) {
  const [form] = useForm();

  const newCeremony = useCallback(async (values: NewCeremony) => {
    await createCeremony(values);
    requestCeremonies();
    closeModal();
  }, []);

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={newCeremony}
      okButtonText='Criar'
      form={form}
    >
      <Row>
        <Col span={16}>
          <Form.Item label='Cerimônia' name='nmCerimonia'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item label='Status' name='flCerimonia'>
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
