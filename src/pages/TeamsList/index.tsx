import { Tabs } from 'antd';
import { CeremoniesTable, FrameworksTable, TeamForm, TeamTable } from '../../containers';
import { TechnologiesTable } from '../../containers/Team/TechnologiesTable';

export function TeamsList() {
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
  );
}
