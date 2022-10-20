import { Avatar, Col, Divider, List, Row, Select, Skeleton, Tooltip, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TeamOutlined,
  IssuesCloseOutlined,
  CalendarOutlined,
  ToolOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { DemoSunburst } from '../../containers';
import { useEffect, useState } from 'react';
import './style.scss';
const { Title, Text } = Typography;

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export function Team() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const secondList = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className='team-page'>
      <Row>
        <Col span={8}>
          <Row justify='center'>
            <Title level={2}>Nome do Time</Title>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={{ marginBottom: 10 }}>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Nº de pessoas'>
                <TeamOutlined className='team-description-icon' />
                <Text>5</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Status'>
                <IssuesCloseOutlined className='team-description-icon' />
                <Text>Ativo</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Framework'>
                <ToolOutlined className='team-description-icon' />
                <Text>Scrum</Text>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Última nota'>
                <AimOutlined className='team-description-icon' />
                <Text>3.5</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data de início do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text>18/07/2022</Text>
              </Tooltip>
            </Col>
            <Col className='team-description-item' span={8}>
              <Tooltip title='Data final do time'>
                <CalendarOutlined className='team-description-icon' />
                <Text>18/12/2022</Text>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row align='middle'>
        <Col span={8}>
          <Row justify='center'>
            <Select style={{ width: 120 }} defaultValue='1'>
              <Select.Option value='1'>17/09/2022</Select.Option>
              <Select.Option value='2'>23/10/2022</Select.Option>
            </Select>
          </Row>
          <DemoSunburst />
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <div
                id='scrollableDiv'
                style={{
                  height: '350px',
                  overflow: 'auto',
                  padding: '0 16px',
                  backgroundColor: '#fff',
                }}
              >
                <InfiniteScroll
                  dataLength={data.length}
                  next={loadMoreData}
                  hasMore={data.length < 50}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  scrollableTarget='scrollableDiv'
                >
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.picture.large} />}
                          title={<a href='https://ant.design'>{item.name.last}</a>}
                          description={item.email}
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Col>
            <Col span={12}>
              <List
                bordered
                dataSource={secondList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
