import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Cs from 'classnames';
import s from './CPCollapse.scss';

class CPCollapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleSection = e => {
    e.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    let toggle = s.close;
    let arrowRotate = 'rotate(-90deg)';
    if (this.state.isOpen) {
      toggle = s.open;
      arrowRotate = 'rotate(90deg)';
    }
    return (
      <>
        <div className={Cs(toggle, s.children_container)}>
          {this.props.children}
        </div>
        <div
          className={s.arrow_container}
          onClick={this.toggleSection}
          role="presentation"
        >
          <Icon
            className={s.arrow_more}
            type="double-left"
            style={{ transform: arrowRotate }}
          />
        </div>
      </>
    );
  }
}

CPCollapse.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(s)(CPCollapse);
