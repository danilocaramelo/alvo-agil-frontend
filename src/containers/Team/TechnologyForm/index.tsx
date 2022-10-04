import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';
import { createTechnology, NewTechnology } from '../../../connections/technology';

type TechnologyFormProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  requestTechnologies: () => void;
};

export function TechnologyForm({ visible, setVisible, requestTechnologies }: TechnologyFormProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  const newTechnology = useCallback(async (values: NewTechnology) => {
    await createTechnology(values);
    requestTechnologies();
    closeModal();
  }, []);

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newTechnology}>
        <Form.Item label='Nome da Tecnologia' name='nmTecnologia'>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='flTecnologia'>
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
