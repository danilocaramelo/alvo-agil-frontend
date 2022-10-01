import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';

type CerimonyFormProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
};

export function CerimonyForm({ visible, setVisible }: CerimonyFormProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      closable={false}
      footer={null}
      centered
    >
      <Form onFinish={(values) => console.log(values)}>
        <Form.Item label="Nome da Cerimônia" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </Form.Item>
        <Row>
          <Button onClick={closeModal} style={{}}>Cancelar</Button>
          <Button htmlType="submit" type="primary">
            Enviar
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
