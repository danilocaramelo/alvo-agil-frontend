import { useCallback, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CustomModal } from '../../../components';
import { AplicationElement, NewAplication } from '../../../connections/aplication';

type CreateQuestionModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createQuestion: (label: string, layer: string, theme: string) => void;
  agilWheelData: NewAplication;
};

export function CreateQuestionModal({
  visible,
  setVisible,
  createQuestion,
  agilWheelData,
}: CreateQuestionModalProps) {
  const [themes, setThemes] = useState<AplicationElement[] | undefined>([]);
  const closeModal = useCallback(() => setVisible(false), []);
  const [form] = useForm();

  const layers = agilWheelData.children;

  const onChangeFormValues = useCallback(
    (changedValues: { label: string; layer: string; theme: string }) => {
      if (changedValues.layer) {
        const selectLayer = layers.find((element) => element.label === changedValues.layer);
        setThemes(selectLayer?.children);
        form.setFieldValue('theme', undefined);
      }
    },
    [],
  );

  const newQuestion = useCallback(
    async (values: { label: string; layer: string; theme: string }) => {
      createQuestion(values.label, values.layer, values.theme);
      form.resetFields();
      closeModal();
    },
    [],
  );

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={newQuestion}
      onFormValuesChange={onChangeFormValues}
      form={form}
      okButtonText='Criar'
    >
      <>
        <Form.Item label='Nome da Pergunta' name='label'>
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
        <Form.Item label='Nome do Tema' name='theme'>
          <Select>
            {themes?.map((theme) => (
              <Select.Option key={theme.label} value={theme.label}>
                {theme.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </>
    </CustomModal>
  );
}
