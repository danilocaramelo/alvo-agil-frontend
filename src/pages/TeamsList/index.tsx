import { Row, Tabs, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { CustomDropdown } from '../../components/CustomDropdown';
import {
  CeremoniesTable,
  CerimonyForm,
  FrameworksTable,
  TeamForm,
  TeamTable,
} from '../../containers';
import { TechnologiesTable } from '../../containers/Team/TechnologiesTable';

export function TeamsList() {
  const [teamFormVisible, setTeamFormVisible] = useState<boolean>(false);
  const openTeamForm = useCallback(() => setTeamFormVisible(true), []);
  const closeTeamForm = useCallback(() => setTeamFormVisible(false), []);

  const [cerimonyFormVisible, setCerimonyFormVisible] = useState<boolean>(false);
  const openCerimonyForm = useCallback(() => setCerimonyFormVisible(true), []);
  const closeCerimonyForm = useCallback(() => setCerimonyFormVisible(false), []);

  const dropdownMenu = [
    { label: 'Novo Time', onClick: openTeamForm },
    { label: 'Nova Cerimônia', onClick: openCerimonyForm },
  ];
  const { Title } = Typography;

  return (
    <>
      <Row justify='space-between' style={{ marginBottom: '20px' }}>
        <Title level={3} style={{ color: '#F58327' }}>
          Times
        </Title>
        <CustomDropdown menuItems={dropdownMenu} />
      </Row>
      <div className='card-container'>
        <Tabs type='card'>
          <Tabs.TabPane tab='Squads' key='1'>
            <TeamTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Cerimônias' key='3'>
            <CeremoniesTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Tecnolgias' key='4'>
            <TechnologiesTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Frameworks' key='5'>
            <FrameworksTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <TeamForm visible={teamFormVisible} closeModal={closeTeamForm} />
      <CerimonyForm visible={cerimonyFormVisible} closeModal={closeCerimonyForm} />
    </>
  );
}
