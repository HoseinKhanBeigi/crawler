import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Progress } from 'antd';
import cs from 'classnames';
import s from './CPProgress.scss';

class CPProgress extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    percent: PropTypes.number,
    status: PropTypes.oneOf(['success', 'exception', 'active']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    format: PropTypes.func,
    showInfo: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    percent: 0,
    status: null,
    type: 'dashboard',
    max: null,
    width: 100,
    strokeWidth: 10,
    strokeColor: '',
    format: () => {},
    showInfo: true,
  };

  render() {
    const {
      className,
      percent,
      status,
      max,
      width,
      type,
      strokeWidth,
      strokeColor,
      format,
      showInfo,
    } = this.props;
    let statusValue;
    if (max && max < percent) {
      statusValue = 'exception';
    } else if (max && max === percent) {
      statusValue = 'success';
    } else {
      statusValue = status;
    }
    return (
      <span className={cs('CPProgress', className)}>
        <Progress
          {...(type === 'dashboard' ? { gapDegree: 100 } : null)}
          percent={percent}
          {...(statusValue ? { status: statusValue } : null)}
          type={type}
          width={width}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          format={format}
          showInfo={showInfo}
        />
      </span>
    );
  }
}

export default withStyles(s)(CPProgress);
export const CPProgressTest = CPProgress;
