import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ToolContainer.scss';
import CPDivider from '../../../../components/CP/CPDivider';

const ToolContainer = ({ ToolRender, ResultRender, title, showResult }) => (
  <div className={s.container}>
    <div>
      <div className={s.card}>
        <div className={s.title}>{title}</div>
        <CPDivider className={s.divider} />
        {ToolRender}
      </div>
    </div>
    <div>{showResult && ResultRender}</div>
  </div>
);

ToolContainer.propTypes = {
  ToolRender: PropTypes.element.isRequired,
  ResultRender: PropTypes.element,
  title: PropTypes.string.isRequired,
  showResult: PropTypes.bool.isRequired,
};

ToolContainer.defaultProps = {
  ResultRender: null,
};
export default withStyles(s)(ToolContainer);
