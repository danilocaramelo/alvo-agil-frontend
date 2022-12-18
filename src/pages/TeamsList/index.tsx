import { Row, Tabs, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { CustomDropdown } from '../../components/CustomDropdown';
import { Ceremony, getCeremonies } from '../../connections/ceremony';
import { Framework, getFrameworks } from '../../connections/framework';
import { getTeams, Team } from '../../connections/team';
import { getTechnologies, Technology } from '../../connections/technology';
import {
  CeremoniesTable,
  CerimonyForm,
  FrameworksTable,
  TeamForm,
  TeamTable,
  FrameworkForm,
  TechnologiesTable,
  TechnologyForm,
} from '../../containers';

export function TeamsList() {
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [ceremonies, setCeremonies] = useState<Ceremony[] | undefined>([]);
  const [frameworks, setFrameworks] = useState<Framework[] | undefined>([]);
  const [technologies, setTechnologies] = useState<Technology[] | undefined>([]);
  const [teams, setTeams] = useState<Team[] | undefined>([]);

  const [teamFormVisible, setTeamFormVisible] = useState<boolean>(false);
  const openTeamForm = useCallback(() => setTeamFormVisible(true), []);
  const closeTeamForm = useCallback(() => setTeamFormVisible(false), []);

  const [cerimonyFormVisible, setCerimonyFormVisible] = useState<boolean>(false);
  const openCerimonyForm = useCallback(() => setCerimonyFormVisible(true), []);
  const closeCerimonyForm = useCallback(() => setCerimonyFormVisible(false), []);

  const [technologyFormVisible, setTechnologyFormVisible] = useState<boolean>(false);
  const openTechnologyForm = useCallback(() => setTechnologyFormVisible(true), []);
  const closeTechnologyForm = useCallback(() => setTechnologyFormVisible(false), []);

  const [frameworkFormVisible, setFrameworkFormVisible] = useState<boolean>(false);
  const openFrameworkForm = useCallback(() => setFrameworkFormVisible(true), []);
  const closeFrameworkForm = useCallback(() => setFrameworkFormVisible(false), []);

  const requestTeams = useCallback(async () => {
    setLoadingTable(true);
    const response = await getTeams();
    setTeams(response);
    setLoadingTable(false);
  }, []);

  const requestCeremonies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getCeremonies();
    setCeremonies(response);
    setLoadingTable(false);
  }, []);

  const requestFrameworks = useCallback(async () => {
    setLoadingTable(true);
    const response = await getFrameworks();
    setFrameworks(response);
    setLoadingTable(false);
  }, []);

  const requestTechnologies = useCallback(async () => {
    setLoadingTable(true);
    const response = await getTechnologies();
    setTechnologies(response);
    setLoadingTable(false);
  }, []);

  const dropdownMenu = [
    { label: 'Novo Time', onClick: openTeamForm },
    { label: 'Nova Cerimônia', onClick: openCerimonyForm },
    { label: 'Nova Tecnologia', onClick: openTechnologyForm },
    { label: 'Novo Framework', onClick: openFrameworkForm },
  ];
  const { Title } = Typography;

  useEffect(() => {
    requestCeremonies();
    requestFrameworks();
    requestTechnologies();
  }, []);

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
            <TeamTable
              teams={teams}
              requestTeams={requestTeams}
              loading={loadingTable}
              ceremonies={ceremonies}
              frameworks={frameworks}
              technologies={technologies}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Cerimônias' key='3'>
            <CeremoniesTable
              ceremonies={ceremonies}
              loading={loadingTable}
              requestCeremonies={requestCeremonies}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Tecnologias' key='4'>
            <TechnologiesTable
              requestTechnologies={requestTechnologies}
              technologies={technologies}
              loading={loadingTable}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Frameworks' key='5'>
            <FrameworksTable
              requestFrameworks={requestFrameworks}
              frameworks={frameworks}
              loading={loadingTable}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <TeamForm
        visible={teamFormVisible}
        closeModal={closeTeamForm}
        requestTeams={requestTeams}
        ceremonies={ceremonies}
        frameworks={frameworks}
        technologies={technologies}
      />
      <CerimonyForm
        visible={cerimonyFormVisible}
        closeModal={closeCerimonyForm}
        requestCeremonies={requestCeremonies}
      />
      <TechnologyForm
        visible={technologyFormVisible}
        closeModal={closeTechnologyForm}
        requestTechnologies={requestTechnologies}
      />
      <FrameworkForm
        visible={frameworkFormVisible}
        closeModal={closeFrameworkForm}
        requestFrameworks={requestFrameworks}
      />
    </>
  );
}
