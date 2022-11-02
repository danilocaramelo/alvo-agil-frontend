import { useCallback } from 'react';
import { Form, Input, Select } from 'antd';
import { createCeremony, NewCeremony } from '../../../connections/ceremony';
import { CustomModal } from '../../../components';
import { useForm } from 'antd/lib/form/Form';

type CerimonyFormProps = {
  visible: boolean;
  closeModal: () => void;
  // requestCeremonies: () => void;
};

export function CerimonyForm({ visible, closeModal }: CerimonyFormProps) {
  const [form] = useForm();

  const newCeremony = useCallback(async (values: NewCeremony) => {
    await createCeremony(values);
    // requestCeremonies();
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
      <>
        <Form.Item label='Nome da Cerimônia' name='nmCerimonia'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flCerimonia'>
          <Select>
            <Select.Option value='S'>Ativo</Select.Option>
            <Select.Option value='N'>Inativo</Select.Option>
          </Select>
        </Form.Item>
      </>
    </CustomModal>
  );
}
