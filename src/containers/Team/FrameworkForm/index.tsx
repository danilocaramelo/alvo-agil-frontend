import { useCallback } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { createFramework, NewFramework } from '../../../connections/framework';
import { CustomModal } from '../../../components';
import { useForm } from 'antd/lib/form/Form';

type FrameworkFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestFrameworks: () => void;
};

export function FrameworkForm({ visible, closeModal, requestFrameworks }: FrameworkFormProps) {
  const [form] = useForm();

  const newFramework = useCallback(async (values: NewFramework) => {
    await createFramework(values);
    requestFrameworks();
    closeModal();
  }, []);

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={newFramework}
      okButtonText='Criar'
      form={form}
    >
      <Row>
        <Col span={16}>
          <Form.Item label='Framwork' name='nmFramework'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item label='Status' name='flFramework'>
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
