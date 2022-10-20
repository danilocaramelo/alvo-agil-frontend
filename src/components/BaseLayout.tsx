import React, { useMemo, useState } from 'react';
import { PieChartOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuProps, Row, Layout, Menu, Typography, Button } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import paths from '../config/paths';
import { Home, Participant, Team, TeamsList } from '../pages';
import logo from '../assets/logo-white.png';

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
  getItem(<Link to={paths.HOME}>home</Link>, paths.HOME, <PieChartOutlined />),
  getItem(<Link to={paths.TEAMS}>teams</Link>, paths.TEAMS, <TeamOutlined />),
  getItem(<Link to={paths.PARTICIPANT}>participantes</Link>, paths.PARTICIPANT, <UserOutlined />),
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
            <Title style={{ margin: 0 }} level={4}>
              Olá, User (:
            </Title>
            <Button style={{ borderRadius: '6px' }} icon={<LogoutOutlined />} />
          </Row>
        </Header>
        <Content style={{ height: '100%', padding: '50px' }}>
          <Routes>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.TEAMS} element={<TeamsList />} />
            <Route path={paths.PARTICIPANT} element={<Participant />} />
            <Route path={paths.TEAM} element={<Team />} />
          </Routes>
        </Content>
      </Layout>
      {/* <Footer style={{ textAlign: 'center' }}>Meta Ágil ©2022 UCSAL</Footer> */}
    </Layout>
  );
}

export { BaseLayout };
