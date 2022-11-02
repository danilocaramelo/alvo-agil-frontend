import React, { useCallback, useState } from 'react';
import { Row, Tabs, Typography } from 'antd';
import './Participant.css';
import { FunctionForm, ParticipantForm, ParticipantTable } from '../../containers';
import { CustomDropdown } from '../../components/CustomDropdown';

const { Title } = Typography;

export function Participant() {
  const [participantFormVisible, setParticipantFormVisible] = useState<boolean>(false);
  const openParticipantForm = useCallback(() => setParticipantFormVisible(true), []);
  const closeParticipantForm = useCallback(() => setParticipantFormVisible(false), []);

  const [functionFormVisible, setFunctionFormVisible] = useState<boolean>(false);
  const openFunctionForm = useCallback(() => setFunctionFormVisible(true), []);
  const closeFunctionForm = useCallback(() => setFunctionFormVisible(false), []);

  const dropdownMenu = [
    { label: 'Novo Participante', onClick: openParticipantForm },
    { label: 'Nova Função', onClick: openFunctionForm },
  ];

  return (
    <>
      <Row justify='space-between' style={{ marginBottom: '20px' }}>
        <Title level={3} style={{ color: '#F58327' }}>
          Participantes
        </Title>
        <CustomDropdown menuItems={dropdownMenu} />
      </Row>
      <div className='card-container'>
        <Tabs type='card'>
          <Tabs.TabPane tab='Participantes' key='1'>
            <ParticipantTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ParticipantForm visible={participantFormVisible} closeModal={closeParticipantForm} />
      <FunctionForm visible={functionFormVisible} closeModal={closeFunctionForm} />
    </>
  );
}
