import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailRow from './DetailRow';

class RenderDetail extends Component {
  static Row = DetailRow;
  render() {
    return React?.Children?.map(this.props.children, row =>
      row
        ? React?.cloneElement(row, {
            titleMaxWidth: this.props.maxWidth,
          })
        : '',
    );
  }
}

RenderDetail.defaultProps = {
  maxWidth: undefined,
};

RenderDetail.propTypes = {
  maxWidth: PropTypes.number,
  children: PropTypes.element.isRequired,
};

export default RenderDetail;
