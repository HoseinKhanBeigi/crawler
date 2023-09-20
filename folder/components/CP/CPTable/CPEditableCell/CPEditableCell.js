import React from 'react';
import { Input, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './CPEditableCell.scss';

class CPEditableCell extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    value: '',
    onChange: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: false,
    };
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };
  edit = () => {
    this.setState({ editable: true });
  };
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <Input
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.check}
            suffix={
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            }
          />
        ) : (
          <div className="row">
            <div className="col-lg-10 col-md-9 col-sm-9">{value || ' '}</div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(CPEditableCell);
