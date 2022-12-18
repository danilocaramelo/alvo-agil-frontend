/* eslint-disable @typescript-eslint/no-explicit-any */
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
    tooltip: {
      customContent: (title: any, data: any) => {
        return `<div class="graphic-legend" style="padding: 5px">${data[0]?.data?.data?.label}: ${
          data[0]?.data?.data?.score
            ? parseFloat(data[0]?.data?.data?.score).toFixed(1)
            : data[0]?.data?.data?.nota
            ? parseFloat(data[0]?.data?.data?.nota).toFixed(1)
            : ''
        }</div>`;
      },
    },
    drilldown: {
      breadCrumb: {
        rootText: 'início',
      },
    },
  };

  return <Sunburst {...(config as SunburstConfig)} />;
};
