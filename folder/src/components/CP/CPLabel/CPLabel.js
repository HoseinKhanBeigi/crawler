/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './CPLabel.scss';

class CPLabel extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    labelClasses: PropTypes.string,
    children: PropTypes.node,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    position: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    labelClasses: null,
    children: '',
    position: 'right',
    onClick: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      children,
      label,
      position,
      onClick,
      labelClasses,
    } = this.props;

    let style;
    switch (position) {
      case 'right': {
        style = s.right;
        break;
      }
      case 'left': {
        style = s.left;
        break;
      }
      case 'bottom': {
        style = s.bottom;
        break;
      }
      case 'topCenter': {
        style = s.topCenter;
        break;
      }
      case 'bottomCenter': {
        style = s.bottomCenter;
        break;
      }
      default: {
        style = s.top;
        break;
      }
    }

    // todo remove eslint-disable
    return (
      <div className={cs(s.CPLabel, className, style)} onClick={onClick}>
        <span className={cs(s.label, labelClasses)}>{label}</span>
        {children && <span className={s.content}>{children}</span>}
      </div>
    );
  }
}

export default withStyles(s)(CPLabel);
export const CPLabelTest = CPLabel;
