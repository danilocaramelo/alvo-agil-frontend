import { Button, Tabs } from 'antd';
import { useCallback, useState } from 'react';
import {
  CerimoniesTable,
  CerimonyForm,
  FrameworksTable,
  TeamForm,
  TeamTable,
} from '../../containers';
import { TechnologiesTable } from '../../containers/Team/TechnologiesTable';

export function Team() {
  const [isCerimonyModalOpen, setIsCerimonyModalOpen] = useState(false);

  const openCerimonyModal = useCallback(() => setIsCerimonyModalOpen(true), []);

  return (
    <div className='card-container'>
      <Tabs type='card'>
        <Tabs.TabPane tab='Squads' key='1'>
          <TeamTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Cadastrar novo' key='2'>
          <TeamForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Cerimônias' key='3'>
          <Button onClick={openCerimonyModal}>Nova Cerimonia</Button>
          <CerimoniesTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tecnolgias' key='4'>
          <Button onClick={openCerimonyModal}>Nova Tecnologia</Button>
          <TechnologiesTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Frameworks' key='5'>
          <Button onClick={openCerimonyModal}>Nova Framework</Button>
          <FrameworksTable />
        </Tabs.TabPane>
      </Tabs>
      <CerimonyForm visible={isCerimonyModalOpen} setVisible={setIsCerimonyModalOpen} />
    </div>
  );
}
