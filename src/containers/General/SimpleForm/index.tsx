import { Col, Form, Input, Row, Select } from 'antd';
import { CustomModal } from '../../../components';
import { useForm } from 'antd/lib/form/Form';
import { useCallback } from 'react';

type SimpleFormProps = {
  visible: boolean;
  closeModal: () => void;
  request: () => void;
  submit: (arg: any) => void;
  type: SimpleFormTypes;
  initialValues?: any;
};

export enum SimpleFormTypes {
  FRAMEWORK = 'FRAMEWORK',
  CEREMONY = 'CEREMONY',
  TECHNOLOGY = 'TECHNOLOGY',
  FUNCTION = 'FUNCTION',
}

const TypesProperties = {
  [SimpleFormTypes.FRAMEWORK]: {
    name: 'nmFramework',
    label: 'Framework',
    status: 'flFramework',
    id: 'cdFramework',
  },
  [SimpleFormTypes.CEREMONY]: {
    name: 'nmCerimonia',
    label: 'Cerimônia',
    status: 'flCerimonia',
    id: 'cdCerimonia',
  },
  [SimpleFormTypes.TECHNOLOGY]: {
    name: 'nmTecnologia',
    label: 'Tecnologia',
    status: 'flTecnologia',
    id: 'cdTecnologia',
  },
  [SimpleFormTypes.FUNCTION]: {
    name: 'nmFuncao',
    label: 'Função',
    status: 'flFuncao',
    id: 'cdFuncao',
  },
};

export function SimpleForm({
  visible,
  closeModal,
  submit,
  request,
  type,
  initialValues,
}: SimpleFormProps) {
  const [form] = useForm();

  if (initialValues) {
    form.setFieldsValue(initialValues);
  }

  const onFinish = useCallback(async (values: any) => {
    await submit(values);
    request();
    form.resetFields();
    closeModal();
  }, []);

  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      onFinish={onFinish}
      okButtonText='Criar'
      form={form}
      initialValues={initialValues}
    >
      <Row>
        <Col span={16}>
          <Form.Item label={TypesProperties[type].label} name={TypesProperties[type].name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={7} offset={1}>
          <Form.Item label='Status' name={TypesProperties[type].status}>
            <Select>
              <Select.Option value='S'>Ativo</Select.Option>
              <Select.Option value='N'>Inativo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={TypesProperties[type].id} style={{ display: 'none' }} />
        </Col>
      </Row>
    </CustomModal>
  );
}
