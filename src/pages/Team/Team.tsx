import { Button, Col, Row, Tabs } from 'antd';
import { useCallback, useState } from 'react';
import {
  CerimoniesTable,
  CerimonyForm,
  TeamForm,
  TeamTable,
} from '../../containers';

export function Team() {
  const [isCerimonyModalOpen, setIsCerimonyModalOpen] = useState(false);

  const openCerimonyModal = useCallback(() => setIsCerimonyModalOpen(true), []);

  return (
    <div className="card-container">
      <Tabs type="card">
        <Tabs.TabPane tab="Squads" key="1">
          <TeamTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cadastrar novo" key="2">
          <TeamForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cerimônias" key="3">
          <Button onClick={openCerimonyModal}>Nova Cerimonia</Button>
          <CerimoniesTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tecnolgias" key="4">
          <Button onClick={openCerimonyModal}>Nova Tecnologia</Button>
          <CerimoniesTable />
        </Tabs.TabPane>
      </Tabs>
      <CerimonyForm
        visible={isCerimonyModalOpen}
        setVisible={setIsCerimonyModalOpen}
      />
    </div>
  );
}
