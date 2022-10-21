import { useCallback } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';
import { Quadrant } from '../../General/AgilWheel/types';

type CreateLaneModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createLane: (label: string, quadrant: string) => void;
  quadrants: Quadrant[];
};

export function CreateLaneModal({
  visible,
  setVisible,
  createLane,
  quadrants,
}: CreateLaneModalProps) {
  const closeModal = useCallback(() => setVisible(false), []);

  const newLane = useCallback(async (values: { label: string; quadrant: string }) => {
    createLane(values.label, values.quadrant);
    closeModal();
  }, []);

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newLane}>
        <Form.Item label='Nome da Raia' name='label'>
          <Input />
        </Form.Item>
        <Form.Item label='Nome do Quadrant' name='quadrant'>
          <Select>
            {quadrants.map((quadrant) => (
              <Select.Option key={quadrant.label} value={quadrant.label}>
                {quadrant.label}
              </Select.Option>
            ))}
          </Select>
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
