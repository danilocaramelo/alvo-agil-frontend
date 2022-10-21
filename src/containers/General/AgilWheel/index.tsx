import { Sunburst } from '@ant-design/plots';
import { SunburstConfig } from '@ant-design/charts';
import { AgilWheelData } from './types';

type AgilWheelProps = {
  data: AgilWheelData;
};

export const AgilWheel = ({ data }: AgilWheelProps) => {
  const config = {
    data: data,
    innerRadius: 0.3,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    hierarchyConfig: {
      field: 'score',
      ignoreParentValue: true,
    },
    drilldown: {
      breadCrumb: {
        rootText: 'início',
      },
    },
  };

  return <Sunburst {...(config as SunburstConfig)} />;
};
