import { useCallback, useState } from 'react';
import { Button, Form, Input, Modal, Row, Select } from 'antd';
import { Quadrant } from '../../General/AgilWheel/types';

type CreateQuestionModalProps = {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  createQuestion: (label: string, quadrant: string, lane: string) => void;
  quadrants: Quadrant[];
};

export function CreateQuestionModal({
  visible,
  setVisible,
  createQuestion,
  quadrants,
}: CreateQuestionModalProps) {
  const [lanes, setLanes] = useState<string[] | undefined>([]);
  const closeModal = useCallback(() => setVisible(false), []);

  const onChangeFormValues = useCallback(
    (values: { label: string; quadrant: string; lane: string }) => {
      if (values.quadrant) {
        const selectQuadrant = quadrants.find((element) => element.label === values.quadrant);
        setLanes(selectQuadrant?.lanes);
      }
    },
    [],
  );

  const newQuestion = useCallback(
    async (values: { label: string; quadrant: string; lane: string }) => {
      createQuestion(values.label, values.quadrant, values.lane);
      closeModal();
    },
    [],
  );

  return (
    <Modal visible={visible} onCancel={closeModal} closable={false} footer={null} centered>
      <Form onFinish={newQuestion} onValuesChange={onChangeFormValues}>
        <Form.Item label='Nome da Pergunta' name='label'>
          <Input />
        </Form.Item>
        <Form.Item label='Nome do Quadrante' name='quadrant'>
          <Select>
            {quadrants.map((quadrant) => (
              <Select.Option key={quadrant.label} value={quadrant.label}>
                {quadrant.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Nome da Lane' name='lane'>
          <Select>
            {lanes?.map((lane) => (
              <Select.Option key={lane} value={lane}>
                {lane}
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
