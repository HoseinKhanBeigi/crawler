import React, { memo } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Empty } from 'antd';
import cs from 'classnames';
import s from './CPEmpty.scss';
import noDataImg from './download.svg';

function CPEmpty(props) {
  const { className, description, imagestyle, image } = props;

  return (
    <div className={cs('CPEmpty', 'col-md-12', className)}>
      <Empty description={description} imagestyle={imagestyle} image={image} />
    </div>
  );
}

CPEmpty.propTypes = {
  className: PropTypes.string,
  description: PropTypes.node,
  imagestyle: PropTypes.object,
  image: PropTypes.node,
};

CPEmpty.defaultProps = {
  className: null,
  description: '',
  imagestyle: null,
  image: noDataImg,
};

export default withStyles(s)(memo(CPEmpty));
export const CPEmptyTest = CPEmpty;
