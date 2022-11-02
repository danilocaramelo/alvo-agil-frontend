import React, { useMemo } from 'react';
import { PieChartOutlined, TeamOutlined, UserOutlined, LogoutOutlined, QuestionOutlined } from '@ant-design/icons';
import { MenuProps, Row, Layout, Menu, Typography, Button } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import paths from '../config/paths';
import { Home, Participant, Team, TeamsList } from '../pages';
import { Questions } from '../pages/Question';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={paths.HOME}>home</Link>, paths.HOME, <PieChartOutlined style={{color: '#2c00d5'}}/>),
  getItem(<Link to={paths.TEAMS}>teams</Link>, paths.TEAMS, <TeamOutlined style={{color: '#2c00d5'}}/>),
  getItem(<Link to={paths.PARTICIPANT}>participantes</Link>, paths.PARTICIPANT, <UserOutlined style={{color: '#2c00d5'}}/>),
  getItem(<Link to={paths.QUESTION}>perguntas</Link>, paths.QUESTION, <QuestionOutlined style={{color: '#2c00d5'}}/>),
];

function BaseLayout() {
  // const [collapsed, setCollapsed] = useState(false);
  const menuKeyByPathname = useMemo(() => location.pathname || '/', [location.pathname]);

  return (
    <Layout style={{ height: '100%' }}>
      <Sider collapsed theme='light'>
        <div style={{ height: 60 }}></div>
        <Menu theme='light' defaultSelectedKeys={[menuKeyByPathname]} mode='inline' items={items} />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <Row align='middle' justify='space-between' style={{ height: '100%' }}>
            <Title style={{ margin: 0, color: '#F58327' }} level={4}>
              Olá, User (:
            </Title>
            <Button style={{ borderRadius: '6px', color: '#F58327' }} icon={<LogoutOutlined />} />
          </Row>
        </Header>
        <Content style={{ height: '100%', padding: '50px' }}>
          <Routes>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.TEAMS} element={<TeamsList />} />
            <Route path={paths.PARTICIPANT} element={<Participant />} />
            <Route path={paths.TEAM} element={<Team />} />
            <Route path={paths.QUESTION} element={<Questions />} />
          </Routes>
        </Content>
      </Layout>
      {/* <Footer style={{ textAlign: 'center' }}>Meta Ágil ©2022 UCSAL</Footer> */}
    </Layout>
  );
}

export { BaseLayout };
