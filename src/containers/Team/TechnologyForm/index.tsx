import { useCallback } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { createTechnology, NewTechnology } from '../../../connections/technology';
import { CustomModal } from '../../../components';
import { useForm } from 'antd/lib/form/Form';

type TechnologyFormProps = {
  visible: boolean;
  closeModal: () => void;
  requestTechnologies: () => void;
};

export function TechnologyForm({ visible, closeModal, requestTechnologies }: TechnologyFormProps) {
  const [form] = useForm();

  const newTechnology = useCallback(async (values: NewTechnology) => {
    await createTechnology(values);
    requestTechnologies();
    closeModal();
  }, []);

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={newTechnology}
      okButtonText='Criar'
      form={form}
    >
      <Row>
        <Col span={16}>
          <Form.Item label='Tecnologia' name='nmTecnologia'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item label='Status' name='flTecnologia'>
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
