import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import cs from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getAclAuthoritiesListAction } from '../../../store/acl/acl.actions';
import s from './CPTab.scss';
import { isAclSkipped } from '../../../utils/aclActions';

const { TabPane } = Tabs;

const CPTab = props => {
  const {
    className,
    handleChange,
    defaultKey,
    tabPane,
    operations,
    size,
    position,
    type,
    authorities,
  } = props;
  const [finalTabs, setFinalTabs] = useState(tabPane);

  const setAuthorizationItem = () => {
    const final = [];
    tabPane?.forEach(item => {
      const couldShow = authorities?.filter(au => au?.code === item?.authority);
      if ((item?.authority && couldShow?.length) || !item?.authority)
        final.push(item);
    });
    if (!isAclSkipped(authorities)) setFinalTabs(final);
  };

  const getAclAuthoritiesList = async () => {
    await props.getAclAuthoritiesListAction();
  };

  useEffect(() => {
    if (authorities) {
      setAuthorizationItem();
    } else {
      getAclAuthoritiesList();
    }
  }, [tabPane]);

  return (
    !!finalTabs.length && (
      <Tabs
        className={cs(s.CPTab, className)}
        defaultActiveKey={defaultKey}
        onChange={handleChange}
        tabBarExtraContent={operations}
        size={size}
        tabPosition={position}
        type={type}
      >
        {finalTabs.map(tabItem => (
          <TabPane
            tab={tabItem.tab}
            key={tabItem.key}
            disabled={tabItem.disabled}
            forceRender={tabItem.forceRender || false}
          >
            {tabItem.children}
          </TabPane>
        ))}
      </Tabs>
    )
  );
};

CPTab.propTypes = {
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
CPTab.defaultProps = {
  className: null,
  handleChange: () => {},
  operations: null,
  size: 'default',
  position: 'top',
  type: 'default',
};
const mapDispatch = {
  getAclAuthoritiesListAction,
};
const mapState = ({ acl }) => ({
  authorities: acl?.authorities,
});

export default connect(mapState, mapDispatch)(withStyles(s)(CPTab));
export const CPTabTest = CPTab;
