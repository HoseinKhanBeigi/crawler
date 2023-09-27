import React from 'react';
import PropTypes from 'prop-types';
import { AsemanPanelContextProvider } from '../store';
import tabsSchema from '../utils/tabsSchema';
import TabsFullpage from '../../../components/TabsFullpage/TabsFullpage';
import PanelLayout from './PanelLayout';

const defaultChartIndex = '1';

const Tabs = ({ type }) => {
  const tabPane = tabsSchema(type).map(
    ({ title, icon, config, name }, key) => ({
      key,
      tab: (
        <>
          {title}
          {icon}
        </>
      ),
      children: <PanelLayout config={config} name={name} />,
    }),
  );
  return (
    <AsemanPanelContextProvider>
      <TabsFullpage tabPane={tabPane} defaultKey={defaultChartIndex} />
    </AsemanPanelContextProvider>
  );
};
Tabs.propTypes = {
  type: PropTypes.oneOf(['BUSINESS', 'PROVIDER', 'CHANNEL']).isRequired,
};

export default Tabs;
