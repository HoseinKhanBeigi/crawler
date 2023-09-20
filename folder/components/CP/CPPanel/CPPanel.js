import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Collapse } from 'antd';
import s from './CPPanel.scss';

const { Panel } = Collapse;

class CPPanel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    key: PropTypes.number,
    bordered: PropTypes.bool,
    defaultActiveKey: PropTypes.string,
  };

  static defaultProps = {
    children: '',
    header: '',
    key: 1,
    bordered: false,
    defaultActiveKey: '',
  };

  render() {
    const { header, key, bordered, defaultActiveKey } = this.props;
    return (
      <Collapse
        bordered={bordered}
        defaultActiveKey={defaultActiveKey}
        className={s.root}
      >
        <Panel header={header} key={key}>
          {this.props.children}
        </Panel>
      </Collapse>
    );
  }
}

export default withStyles(s)(CPPanel);
