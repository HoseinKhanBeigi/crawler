import React, { useState } from 'react';
import normalizeCss from 'normalize.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { SketchPicker } from 'react-color';
import s from './ColorItem.scss';

const ColorItem = props => {
  const [visible, setVisible] = useState(false);
  const { title, value, onChange, className } = props;

  return (
    <div className={cs(s.root, className)}>
      <span className="controlLabel">{title}</span>
      <div
        role="presentation"
        className={s.color}
        style={{
          background: value,
        }}
        onClick={() => setVisible(!visible)}
      />
      {visible && (
        <div className={s.popover}>
          <div
            role="presentation"
            className={s.cover}
            onClick={() => setVisible(!visible)}
          />
          <SketchPicker
            color={value}
            onChange={color => {
              onChange(color.hex);
            }}
          />
        </div>
      )}
    </div>
  );
};

ColorItem.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ColorItem.defaultProps = {
  onChange: () => {},
  className: '',
  value: '#1890ff',
};

export default withStyles(normalizeCss, s)(ColorItem);
