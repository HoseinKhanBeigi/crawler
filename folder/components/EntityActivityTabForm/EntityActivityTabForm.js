import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EntityActivityTabForm.scss';
import CPTab from '../CP/CPTab';

const EntityActivityTabForm = props => {
  const { data, hasShadow, defaultKey, inDrawer } = props;
  return (
    <div
      className={cs(
        s.root,
        inDrawer ? s.drawerWrapper : s.wrapper,
        hasShadow ? s.tabsBoxShadow : s.tabsBox,
      )}
    >
      <CPTab
        tabPane={data}
        position="top"
        tabBarGutter={0}
        defaultKey={defaultKey}
      />
    </div>
  );
};

EntityActivityTabForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  hasShadow: PropTypes.bool,
  defaultKey: PropTypes.string,
  inDrawer: PropTypes.bool,
};

EntityActivityTabForm.defaultProps = {
  data: [],
  hasShadow: false,
  defaultKey: '',
  inDrawer: false,
};

export default withStyles(s)(memo(EntityActivityTabForm));
