import { Button, Card, Col, Row } from 'antd';
import { useCallback, useState } from 'react';
import { AgilWheel } from '../../containers';
import {
  AgilWheelData,
  AgilWheelElement,
  Quadrant,
} from '../../containers/General/AgilWheel/types';
import { CreateLaneModal } from '../../containers/Questions/CreateLaneModal';
import { CreateQuadrantModal } from '../../containers/Questions/CreateQuadrantModal';
import { CreateQuestionModal } from '../../containers/Questions/CreateQuestionModal';

export function Questions() {
  const [agilWheelData, setAgilWheelData] = useState<AgilWheelData>({
    label: 'Start',
    children: [],
  });
  const [createQuadrantModalVisible, setCreateQuadrantModalVisible] = useState<boolean>(false);
  const [createLaneModalVisible, setCreateLaneModalVisible] = useState<boolean>(false);
  const [createQuestionModalVisible, setCreateQuestionModalVisible] = useState<boolean>(false);
  const [quadrants, setQuadrants] = useState<Quadrant[]>([]);

  const createQuadrant = useCallback((label: string) => {
    const newElement: AgilWheelElement = { label, score: 1, children: [] };
    const newQuadrant: Quadrant = { label, lanes: [] };
    agilWheelData.children.push(newElement);
    quadrants.push(newQuadrant);
  }, []);

  const createLane = useCallback((label: string, quadrant: string) => {
    const newElement: AgilWheelElement = { label, score: 1 };
    const quadrantIndex = agilWheelData.children.findIndex((element) => element.label === quadrant);
    agilWheelData.children[quadrantIndex].children?.push(newElement);
  }, []);

  const createQuestion = useCallback((label: string, quadrant: string, lane: string) => {
    const newElement: AgilWheelElement = { label, score: 1 };
    const quadrantIndex = agilWheelData.children.findIndex((element) => element.label === quadrant);
    const laneIndex = agilWheelData.children[quadrantIndex].children?.findIndex(
      (element) => element.label === lane,
    );
    // agilWheelData.children[quadrantIndex].children[laneIndex].children.push(newElement);
  }, []);

  const openQuadrantModalVisible = useCallback(() => setCreateQuadrantModalVisible(true), []);
  const openLaneModalVisible = useCallback(() => setCreateLaneModalVisible(true), []);
  const openQuestionModalVisible = useCallback(() => setCreateQuestionModalVisible(true), []);

  return (
    <>
      <Row>
        <Button onClick={openQuadrantModalVisible}>Criar Quadrante</Button>
        <Button onClick={openLaneModalVisible}>Criar Raia</Button>
        <Button onClick={openQuestionModalVisible}>Criar Pergunta</Button>
      </Row>
      <Row>
        <Col span={12}>
          <AgilWheel data={agilWheelData} />
        </Col>
        <Col span={12}>
          <Card>
            <div>teste</div>
          </Card>
        </Col>
      </Row>
      <CreateQuadrantModal
        visible={createQuadrantModalVisible}
        setVisible={setCreateQuadrantModalVisible}
        createQuadrant={createQuadrant}
      />
      <CreateLaneModal
        visible={createLaneModalVisible}
        setVisible={setCreateLaneModalVisible}
        createLane={createLane}
        quadrants={quadrants}
      />
      <CreateQuestionModal
        visible={createQuestionModalVisible}
        setVisible={setCreateQuestionModalVisible}
        createQuestion={createQuestion}
        quadrants={quadrants}
      />
    </>
  );
}
