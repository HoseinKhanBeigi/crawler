import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input } from 'antd';
import s from './CPInputReadOnly.scss';

class CPInputReadOnly extends React.Component {
  static propTypes = {
    label: PropTypes.node,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    inline: PropTypes.bool,
    size: PropTypes.string,
    className: PropTypes.string,
    direction: PropTypes.string,
    value: PropTypes.node,
  };

  static defaultProps = {
    type: 'text',
    fullWidth: true,
    inline: true,
    size: 'default',
    className: '',
    value: null,
    label: '',
    direction: null,
  };

  render() {
    const {
      size,
      label,
      type,
      fullWidth,
      inline,
      className,
      value,
      direction,
    } = this.props;
    return (
      <div
        className={cs(
          'form-group',
          s.container,
          direction,
          { inline },
          className,
          {
            fullWidth,
          },
        )}
      >
        {label && <span className={s.controlLabel}>{label}</span>}

        <Input
          disabled
          className={s.input}
          type={type}
          size={size}
          value={value}
        />
        <i className="bar" />
      </div>
    );
  }
}

export default withStyles(s)(CPInputReadOnly);
