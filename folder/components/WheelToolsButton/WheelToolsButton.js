import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WheelToolsButton.scss';

const WheelToolsButton = ({ icon, tools, className, ...otherProps }) => {
  const [visibleTools, setVisibleTools] = useState(false);

  const toggleDisplayTools = () => {
    setVisibleTools(!visibleTools);
  };

  const renderTools = () =>
    tools.map((tool, index) => (
      <Tooltip title={tool.tooltip} key={tool.icon} placement="right">
        <Button
          style={{
            top: visibleTools ? -(index * 45) - 45 : 0,
            transform: `scale(${visibleTools ? 1.2 : 0.5})`,
          }}
          className={s.tool}
          icon={tool.icon}
          loading={tool.loading}
          disabled={tool.disabled}
          onClick={() => {
            tool.action();
            toggleDisplayTools();
          }}
          shape="circle"
        />
      </Tooltip>
    ));

  return (
    <div {...otherProps} className={className}>
      <div className={s.root}>
        <Button
          className={s.toolsMainButton}
          size="large"
          icon={icon}
          type="primary"
          shape="circle"
          onClick={toggleDisplayTools}
        />
        <div className={s.tools}>{renderTools()}</div>
      </div>
    </div>
  );
};

WheelToolsButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
      loading: PropTypes.bool,
    }),
  ).isRequired,
};

WheelToolsButton.defaultProps = {
  className: '',
};

export default withStyles(s)(WheelToolsButton);
