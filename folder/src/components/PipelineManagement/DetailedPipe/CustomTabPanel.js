/* eslint-disable css-modules/no-unused-class */
import React from 'react';
import PropTypes from 'prop-types';
import { useTabPanel } from '@atlaskit/tabs';
import styles from './DetailedPipe.scss';

function CustomTabPanel({ children }) {
  const tabPanelAttributes = useTabPanel();

  return (
    <div className={styles.tabContainer} {...tabPanelAttributes}>
      {children}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CustomTabPanel;
