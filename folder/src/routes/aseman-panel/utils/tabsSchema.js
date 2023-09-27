import Icon from '@mdi/react';
import { mdiChartBar, mdiChartLine } from '@mdi/js';
import React from 'react';
import getPanelsConfig from './panelsConfig';

const panelSchema = panelType =>
  [
    {
      title: 'گزارش زمان‌مند',
      name: 'TIMEBASE',
      icon: <Icon path={mdiChartLine} size="16px" />,
      config: getPanelsConfig(panelType, 'TIMEBASE'),
    },
    {
      title: 'گزارش تجمعی',
      name: 'AGGREGATE',
      icon: <Icon path={mdiChartBar} size="16px" />,
      config: getPanelsConfig(panelType, 'AGGREGATE'),
    },
  ].filter(({ config }) => !!config);
export default panelSchema;
