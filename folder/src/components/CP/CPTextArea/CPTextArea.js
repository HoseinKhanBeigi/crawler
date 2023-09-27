import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Input } from 'antd';
import s from './CPTextArea.scss';
import { formatNumbers } from '../../../utils';
import CPMessage from '../CPMessage';

const { TextArea } = Input;

class CPTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      inputValue: this.props.value,
    };
  }

  onChange = async e => {
    const { faToEn, onChange } = this.props;
    if (faToEn) {
      const data = await formatNumbers(e.target.value);
      return onChange(data);
    }
    this.setState({ inputValue: e.target.value });
    return onChange(e);
  };

  onChangeEditMode = () => {
    this.setState({ editMode: true });
  };

  onCancelEditAction = () => {
    this.setState({ editMode: false });
    this.setState({ inputValue: this.props.value });
  };

  onEditAction = () => {
    if (this.state.inputValue === '' || this.state.inputValue === null) {
      CPMessage('پر کردن فیلد مربوطه الزامی میباشد.', 'warning');
      return false;
    }
    if (
      typeof this.props.name === 'object' &&
      this.props.name.name === 'street'
    ) {
      if (this.handleValidation('street')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (typeof this.props.name !== 'object' && !this.props.hasValidation) {
      this.props.onEditAction(this.state.inputValue, this.props.name);
      this.setState({ editMode: false });
      return true;
    }
    return true;
  };

  handleValidation = type => {
    if (
      (type === 'street' || type === 'STREET') &&
      !this.validateStreet(this.state.inputValue)
    ) {
      CPMessage('لطفا فقط حروف فارسی وارد کنید.', 'warning');
      return false;
    }
    if (
      (type === 'street' || type === 'STREET') &&
      !this.validateLengthStreet(this.state.inputValue)
    ) {
      CPMessage('شما مجاز به وارد کردن حداکثر 300 کارکتر هستید.', 'warning');
      return false;
    }
    return true;
  };

  validateLengthStreet = value => value && value.length <= 300;

  validateStreet = street => {
    const re = /^[-,،.چجحخهعغفقثصضگکمنتالبیسشوئدذؤةرژزطظءأيپۀكآ0123456789۰۱۲۳۴۵۶۷۸۹‌ ]+$/;
    return re.test(String(street).toLowerCase());
  };

  render() {
    const {
      id,
      label,
      autoSize,
      value,
      onPressEnter,
      placeholder,
      disabled,
      allowClear,
      onChange,
      name,
      className,
      onBlur,
      rows,
      withEdit,
      onEditAction,
      hasValidation,
      isRequired,
      containerStyle,
      ...otherProps
    } = this.props;
    return (
      <div className={s.container} style={containerStyle}>
        {label && (
          <span className="controlLabel">
            {label}
            {isRequired ? <span className={s.validationStar}>*</span> : ''}
          </span>
        )}
        <TextArea
          id={id}
          autoSize={autoSize}
          disabled={disabled && !this.state.editMode}
          onPressEnter={onPressEnter}
          placeholder={placeholder}
          onChange={e => {
            this.onChange(e);
          }}
          value={withEdit ? this.state.inputValue : value}
          name={name}
          className={className}
          onBlur={onBlur}
          rows={rows}
          {...otherProps}
        />
        {withEdit && (
          <div className={s.input_with_action}>
            {!this.state.editMode ? (
              <Button
                shape="circle"
                icon="edit"
                className={s.btn_edit}
                onClick={this.onChangeEditMode}
              />
            ) : (
              <div className={s.input_with_action}>
                <Button
                  shape="circle"
                  icon="check"
                  className={s.btn_edit}
                  onClick={this.onEditAction}
                />
                <Button
                  shape="circle"
                  icon="close"
                  className={s.btn_edit}
                  onClick={this.onCancelEditAction}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

CPTextArea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  autoSize: PropTypes.bool,
  value: PropTypes.string,
  onPressEnter: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  withEdit: PropTypes.bool,
  faToEn: PropTypes.bool,
  allowClear: PropTypes.bool,
  hasValidation: PropTypes.bool,
  onEditAction: () => {},
  isRequired: PropTypes.bool,
  containerStyle: PropTypes.object,
};

CPTextArea.defaultProps = {
  id: '',
  label: '',
  autoSize: false,
  allowClear: true,
  disabled: false,
  value: '',
  placeholder: '',
  name: '',
  onPressEnter: () => {},
  onChange: () => {},
  className: '',
  faToEn: false,
  onBlur: () => {},
  rows: 2,
  withEdit: false,
  hasValidation: true,
  onEditAction: PropTypes.func,
  isRequired: false,
  containerStyle: {},
};

export default withStyles(s)(CPTextArea);
