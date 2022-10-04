import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';
import { createFramework, NewFramework } from '../../../connections/framework';

type FrameworkFormProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  requestFrameworks: () => void;
};

export function FrameworkForm({ visible, setVisible, requestFrameworks }: FrameworkFormProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  const newFramework = useCallback(async (values: NewFramework) => {
    await createFramework(values);
    requestFrameworks();
    closeModal();
  }, []);

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newFramework}>
        <Form.Item label='Nome do Framework' name='nmFramework'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flFramework'>
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
