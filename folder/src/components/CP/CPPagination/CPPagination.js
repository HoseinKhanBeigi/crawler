import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Pagination } from 'antd';
import s from './CPPagination.css';

class CPPanel extends React.Component {
  static propTypes = {
    showSizeChanger: PropTypes.bool,
    showQuickJumper: PropTypes.bool,
    size: PropTypes.string,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func,
    showTotal: PropTypes.func,
    onShowSizeChange: PropTypes.func,
  };

  static defaultProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    size: 'small',
    pageSize: 10,
    total: 0,
    current: 1,
    showTotal: () => {},
    onChange: () => {},
    onShowSizeChange: () => {},
  };

  render() {
    const {
      showQuickJumper,
      showSizeChanger,
      size,
      pageSize,
      total,
      onChange,
      current,
      onShowSizeChange,
      showTotal,
    } = this.props;
    return (
      total > 0 && (
        <Pagination
          size={size}
          pageSize={pageSize}
          total={total}
          showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          current={current}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          showTotal={showTotal}
        />
      )
    );
  }
}

export default withStyles(s)(CPPanel);
