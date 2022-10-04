import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';
import { createCeremony, NewCeremony } from '../../../connections/ceremony';

type CerimonyFormProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  requestCeremonies: () => void;
};

export function CerimonyForm({ visible, setVisible, requestCeremonies }: CerimonyFormProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  const newCeremony = useCallback(async (values: NewCeremony) => {
    await createCeremony(values);
    requestCeremonies();
    closeModal();
  }, []);

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newCeremony}>
        <Form.Item label='Nome da Cerimônia' name='nmCerimonia'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flCerimonia'>
          <Select>
            <Select.Option value='S'>Ativo</Select.Option>
            <Select.Option value='N'>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Row>
          <Button onClick={closeModal} style={{}}>
            Cancelar
          </Button>
          <Button htmlType='submit' type='primary'>
            Enviar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
