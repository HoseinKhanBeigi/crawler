import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabsFullpage.scss';
import CPTab from '../CP/CPTab';

const TabsFullpage = props => (
  <div className={s.container}>
    <CPTab
      {...props}
      tabPane={props.tabPane.map(({ tab, ...args }) => ({
        ...args,
        tab: <span className={s.tab}>{tab}</span>,
      }))}
    />
  </div>
);

TabsFullpage.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  tabPane: PropTypes.array.isRequired,
  defaultKey: PropTypes.string.isRequired,
  operations: PropTypes.node,
  size: PropTypes.string,
  position: PropTypes.string,
  type: PropTypes.string,
  authorities: PropTypes.array.isRequired,
  getAclAuthoritiesListAction: PropTypes.func.isRequired,
};
TabsFullpage.defaultProps = {
  className: null,
  handleChange: () => {},
  operations: null,
  size: 'default',
  position: 'top',
  type: 'default',
};

export default withStyles(s)(TabsFullpage);
