import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';

type CreateQuadrantModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createQuadrant: (label: string) => void;
};

export function CreateQuadrantModal({ visible, setVisible, createQuadrant }: CreateQuadrantModalProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  const newQuadrant = useCallback(async (values: { label: string }) => {
    createQuadrant(values.label);
    closeModal();
  }, []);

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newQuadrant}>
        <Form.Item label='Nome do Quadrante' name='label'>
          <Input />
        </Form.Item>
        <Row>
          <Button onClick={closeModal} style={{}}>
            Cancelar
          </Button>
          <Button htmlType='submit' type='primary'>
            Criar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
