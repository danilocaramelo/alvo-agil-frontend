import React, { useCallback, useEffect, useState } from 'react';
import { Row, Tabs, Typography } from 'antd';
import './style.scss';
import { FunctionForm, FunctionsTable, ParticipantForm, ParticipantTable } from '../../containers';
import { CustomDropdown } from '../../components/CustomDropdown';
import { FunctionElement, getFunctions } from '../../connections/functions';
import { getParticipants, Participant as ParticipantElement } from '../../connections/particpant';

const { Title } = Typography;

export function Participant() {
  const [loading, setLoading] = useState<boolean>(false);
  const [functions, setFunctions] = useState<FunctionElement[] | undefined>([]);
  const [participants, setParticipants] = useState<ParticipantElement[] | undefined>([]);

  const [participantFormVisible, setParticipantFormVisible] = useState<boolean>(false);
  const openParticipantForm = useCallback(() => setParticipantFormVisible(true), []);
  const closeParticipantForm = useCallback(() => setParticipantFormVisible(false), []);

  const [functionFormVisible, setFunctionFormVisible] = useState<boolean>(false);
  const openFunctionForm = useCallback(() => setFunctionFormVisible(true), []);
  const closeFunctionForm = useCallback(() => setFunctionFormVisible(false), []);

  const requestFunctions = useCallback(async () => {
    setLoading(true);
    const response = await getFunctions();
    setFunctions(response);
    setLoading(false);
  }, []);

  const requestParticipants = useCallback(async () => {
    setLoading(true);
    const response = await getParticipants();
    setParticipants(response);
    setLoading(false);
  }, []);

  const dropdownMenu = [
    { label: 'Novo Participante', onClick: openParticipantForm },
    { label: 'Nova Função', onClick: openFunctionForm },
  ];

  useEffect(() => {
    requestFunctions();
  }, []);

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
            <ParticipantTable
              requestParticipants={requestParticipants}
              participants={participants}
              loading={loading}
              participantFunctions={functions}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Funções' key='2'>
            <FunctionsTable
              functions={functions}
              loading={loading}
              requestFunctions={requestFunctions}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ParticipantForm
        visible={participantFormVisible}
        closeModal={closeParticipantForm}
        requestParticipants={requestParticipants}
        participantFunctions={functions}
      />
      <FunctionForm
        visible={functionFormVisible}
        closeModal={closeFunctionForm}
        requestFunctions={requestFunctions}
      />
    </>
  );
}
