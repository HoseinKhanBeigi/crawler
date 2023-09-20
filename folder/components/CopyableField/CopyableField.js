import React, { useState } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const CopyableField = props => {
  const [isShown, setIsShown] = useState(false);
  const [iconColor, setIconColor] = useState('#1890ff');
  const layoutStyle = { display: 'flex', alignItems: 'center' };
  const iconStyle = {
    visibility: isShown ? 'visible' : 'hidden',
    color: iconColor,
  };

  const copyText = () => {
    navigator.clipboard.writeText(props.copyText).then(setIconColor('green'));
    setTimeout(() => setIconColor('#1890ff'), 1000);
  };

  return (
    <div
      style={layoutStyle}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {props.children}
      <Icon onClick={() => copyText()} style={iconStyle} type="copy" />
    </div>
  );
};

CopyableField.propTypes = {
  copyText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CopyableField;
