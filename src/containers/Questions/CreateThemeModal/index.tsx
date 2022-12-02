import { useCallback } from 'react';
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CustomModal } from '../../../components';
import { NewAplication } from '../../../connections/aplication';

type CreateThemeModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createTheme: (label: string, layer: string) => void;
  agilWheelData: NewAplication;
};

export function CreateThemeModal({
  visible,
  setVisible,
  createTheme,
  agilWheelData,
}: CreateThemeModalProps) {
  const closeModal = useCallback(() => setVisible(false), []);
  const [form] = useForm();
  const layers = agilWheelData.children;

  const newTheme = useCallback(async (values: { label: string; layer: string }) => {
    createTheme(values.label, values.layer);
    form.resetFields();
    closeModal();
  }, []);

  return (
    <CustomModal visible={visible} closeModal={closeModal} onFinish={newTheme} form={form} okButtonText='Criar'>
      <>
        <Form.Item label='Nome do Tema' name='label'>
          <Input />
        </Form.Item>
        <Form.Item label='Nome da Camada' name='layer'>
          <Select>
            {layers.map((layer) => (
              <Select.Option key={layer.label} value={layer.label}>
                {layer.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </>
    </CustomModal>
  );
}
