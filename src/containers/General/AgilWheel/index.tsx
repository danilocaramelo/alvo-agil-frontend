import { Sunburst } from '@ant-design/plots';
import { SunburstConfig } from '@ant-design/charts';
import { data } from './datamock';
import { Col, Row } from 'antd';

export const DemoSunburst = () => {
  const config = {
    data,
    innerRadius: 0.3,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    hierarchyConfig: {
      field: 'sum',
    },
    drilldown: {
      breadCrumb: {
        rootText: '起始',
      },
    },
  };

  return <Sunburst {...(config as SunburstConfig)} />;
};
