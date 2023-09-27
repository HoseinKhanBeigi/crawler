import React from 'react';
import reportTabs from '../schemas/reportTabsSchema';
import ChartsContainer from './ChartsContainer';
import TabsFullpage from '../../../components/TabsFullpage/TabsFullpage';

const defaultChartIndex = '1';

const SaleReports = () => {
  const tabPane = reportTabs.map(({ title, icon, name, charts }, key) => ({
    key,
    tab: (
      <>
        {title}
        {icon}
      </>
    ),
    children: <ChartsContainer name={name} charts={charts} />,
  }));

  return <TabsFullpage tabPane={tabPane} defaultKey={defaultChartIndex} />;
};
export default SaleReports;
