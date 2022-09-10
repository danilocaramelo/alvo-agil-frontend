import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { ReactNode, useMemo, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import paths from '../config/paths';
import { Home, Participant, Team } from '../pages';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type BaseLayoutProps = {
  children?: ReactNode;
};

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
  getItem(<Link to={paths.PARTICIPANT}>participantes</Link>, paths.PARTICIPANT , <UserOutlined />),
  getItem('Test crumb', 'sub1', <UserOutlined />, [
    getItem('first', '3'),
    getItem('second', '4'),
    getItem('third', '5'),
  ]),
];

function BaseLayout({ children }: BaseLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuKeyByPathname = useMemo(
    () => location.pathname || '/',
    [location.pathname],
  );

  console.log(location.pathname);

  return (
    <Layout style={{ height: '100%' }}>
      <Header></Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={[menuKeyByPathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content style={{ height: '100%', padding: '50px' }}>
          <Routes>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.TEAMS} element={<Team />} />
            <Route path={paths.PARTICIPANT} element={<Participant />} />
          </Routes>
        </Content>
      </Layout>
      {/* <Footer style={{ textAlign: 'center' }}>Meta Ágil ©2022 UCSAL</Footer> */}
    </Layout>
  );
}

export { BaseLayout };
