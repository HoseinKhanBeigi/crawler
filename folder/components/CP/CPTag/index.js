import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ClassNames from 'classnames';
import s from './style.scss';
import CPPopConfirm from '../../CP/CPPopConfirm';

class CPTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { color, closable, onClose, className } = this.props;
    return (
      <>
        <span
          style={{ background: color }}
          className={ClassNames(s.cpTag, className)}
        >
          {closable && (
            <CPPopConfirm
              okText="بلی"
              cancelText="خیر"
              title="آیا از حذف این برچسب اطمینان دارید ؟"
              onConfirm={() => {
                onClose();
              }}
              placement="topRight"
            >
              <Icon className={s.cpTag_icon} type="close" />
            </CPPopConfirm>
          )}
          {this.props.children}
        </span>
      </>
    );
  }
}

CPTag.defaultProps = {
  onClose: () => {},
  closable: false,
  className: [],
};
CPTag.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.array,
  color: PropTypes.string.isRequired,
  closable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default withStyles(s)(CPTag);
