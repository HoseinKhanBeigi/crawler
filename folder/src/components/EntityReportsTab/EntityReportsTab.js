import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './EntityReportsTab.scss';
import CPTab from '../CP/CPTab';

class EntityReportsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, data, defaultKey } = this.props;

    return (
      <div className={cs('EntityReportsTab', className)}>
        <CPTab
          tabPane={data}
          position="top"
          tabBarGutter={0}
          defaultKey={defaultKey}
        />
      </div>
    );
  }
}

EntityReportsTab.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  defaultKey: PropTypes.string,
};

EntityReportsTab.defaultProps = {
  className: null,
  data: null,
  defaultKey: '',
};

export default withStyles(s)(EntityReportsTab);
export const EntityReportsTabTest = EntityReportsTab;
