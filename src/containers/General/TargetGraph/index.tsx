import { Sunburst } from '@ant-design/plots';
import { SunburstConfig } from '@ant-design/charts';
import { Aplication, NewAplication } from '../../../connections/aplication';

type AplicationProps = {
  data: Aplication | NewAplication | undefined;
};

const emptyData: Aplication = {
  cdAplicacao: 0,
  label: '',
  children: [],
};

export const TargetGraph = ({ data }: AplicationProps) => {
  const config = {
    data: data ? data : emptyData,
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

  console.log(data);

  return <Sunburst {...(config as SunburstConfig)} />;
};
