import { useCallback } from 'react';
import { Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CustomModal } from '../../../components';

type CreateLayerModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createLayer: (label: string) => void;
};

export function CreateLayerModal({ visible, setVisible, createLayer }: CreateLayerModalProps) {
  const closeModal = useCallback(() => setVisible(false), []);
  const [form] = useForm();

  const newLayer = useCallback(async (values: { label: string }) => {
    createLayer(values.label);
    form.resetFields();
    closeModal();
  }, []);

  return (
    <CustomModal
      okButtonText='Criar'
      visible={visible}
      closeModal={closeModal}
      onFinish={newLayer}
      form={form}
    >
      <Form.Item label='Nome da Camada' name='label'>
        <Input />
      </Form.Item>
    </CustomModal>
  );
}
