import React, { useCallback, useMemo } from 'react';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { MenuProps, Row, Layout, Menu, Typography, Button } from 'antd';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import paths from '../config/paths';
import { Avaliation, CreateAplication, Home, Participant, Team, TeamsList } from '../pages';
import icon from '../assets/icone.png';

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
  getItem(
    <Link to={paths.HOME}>home</Link>,
    paths.HOME,
    <PieChartOutlined style={{ color: '#2c00d5' }} />,
  ),
  getItem(
    <Link to={paths.TEAMS}>teams</Link>,
    paths.TEAMS,
    <TeamOutlined style={{ color: '#2c00d5' }} />,
  ),
  getItem(
    <Link to={paths.PARTICIPANT}>participantes</Link>,
    paths.PARTICIPANT,
    <UserOutlined style={{ color: '#2c00d5' }} />,
  ),
  getItem(
    <Link to={paths.CREATE_APLICATION}>perguntas</Link>,
    paths.CREATE_APLICATION,
    <QuestionOutlined style={{ color: '#2c00d5' }} />,
  ),
];

function BaseLayout() {
  // const [collapsed, setCollapsed] = useState(false);
  const menuKeyByPathname = useMemo(() => location.pathname || '/', [location.pathname]);
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    navigate('');
  }, []);

  return (
    <Layout style={{ height: '100%' }}>
      <Sider collapsed theme='light'>
        <div style={{ height: 60, width: 60 }} onClick={redirect}>
          <img style={{ height: 50, width: 50, marginLeft: 15, marginTop: 5 }} src={icon} />
        </div>
        <Menu
          style={{ marginTop: 20 }}
          theme='light'
          defaultSelectedKeys={[menuKeyByPathname]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: '#2c00d5' }}>
          <Row align='middle' justify='space-between' style={{ height: '100%' }}>
            <Title style={{ margin: 0, color: '#FFF' }} level={3}>
              Olá, User (:
            </Title>
            <Button
              style={{
                borderRadius: '6px',
                backgroundColor: '#F58327',
                color: '#fff',
                borderColor: '#F58327',
              }}
              icon={<LogoutOutlined />}
            />
          </Row>
        </Header>
        <Content style={{ height: '100%', padding: '50px' }}>
          <Routes>
            <Route path={paths.HOME} element={<Home />} />
            <Route path={paths.TEAMS} element={<TeamsList />} />
            <Route path={paths.PARTICIPANT} element={<Participant />} />
            <Route path={paths.TEAM} element={<Team />} />
            <Route path={paths.CREATE_APLICATION} element={<CreateAplication />} />
            <Route path={paths.AVALIATION} element={<Avaliation />} />
          </Routes>
        </Content>
      </Layout>
      {/* <Footer style={{ textAlign: 'center' }}>Meta Ágil ©2022 UCSAL</Footer> */}
    </Layout>
  );
}

export { BaseLayout };
