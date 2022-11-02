import React from 'react';
import { Tabs } from 'antd';
import './Participant.css';
import { FunctionForm, ParticipantForm, ParticipantTable } from '../../containers';
import { PlusOutlined } from '@ant-design/icons';
import { CustomButton } from '../../components';

export function Participant() {
  return (
    <>
      <div className='card-container'>
        <Tabs type='card'>
          <Tabs.TabPane tab='Participantes' key='1'>
            <ParticipantTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Cadastrar novo' key='2'>
            <ParticipantForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Nova função' key='3'>
            <FunctionForm />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
