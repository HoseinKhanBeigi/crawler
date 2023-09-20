import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Button } from 'antd';
import s from './CPInput.scss';
import { formatNumbers } from '../../../utils/index';
import CPMessage from '../CPMessage';

class CPInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      inputValue: this.props.value,
    };
  }

  // if faToEn true, replace persian numbers to English
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

  onEditAction = () => {
    if (this.state.inputValue === '' || this.state.inputValue === null) {
      CPMessage('پر کردن فیلد مربوطه الزامی میباشد.', 'warning');
      return false;
    }
    if (
      (typeof this.props.name === 'object' &&
        (this.props.name.name === 'EMAIL' ||
          this.props.name.name === 'emailAddress' ||
          this.props.name.name === 'email')) ||
      (typeof this.props.name !== 'object' && this.props.name === 'email')
    ) {
      if (this.handleValidation('email')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (typeof this.props.name === 'object' && this.props.name.name === 'tel') {
      if (this.handleValidation('tel')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (
      typeof this.props.name === 'object' &&
      this.props.name.name === 'telPrefix'
    ) {
      if (this.handleValidation('telPrefix')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (
      typeof this.props.name === 'object' &&
      this.props.name.name === 'postalCode'
    ) {
      if (this.handleValidation('postalCode')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (
      typeof this.props.name !== 'object' &&
      this.props.name === 'firstName'
    ) {
      if (this.handleValidation('firstName')) {
        this.props.onEditAction(this.state.inputValue, this.props.name);
        this.setState({ editMode: false });
        return true;
      }
    }
    if (typeof this.props.name !== 'object' && this.props.name === 'lastName') {
      if (this.handleValidation('lastName')) {
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
    this.props.onEditAction(this.state.inputValue, this.props.name);
    this.setState({ editMode: false });
    return true;
  };

  onCancelEditAction = () => {
    this.setState({ editMode: false });
    this.setState({ inputValue: this.props.value });
  };

  handleValidation = type => {
    if (
      (type === 'EMAIL' || type === 'email' || type === 'emailAddress') &&
      !this.validateEmail(this.state.inputValue)
    ) {
      CPMessage('ایمیل وارد شده معتبر نمی باشد', 'warning');
      return false;
    }
    if (type === 'tel' && !this.validateTel(this.state.inputValue)) {
      CPMessage('شماره تماس وارد شده معتبر نمی باشد', 'warning');
      return false;
    }
    if (
      type === 'telPrefix' &&
      !this.validateTelPrefix(this.state.inputValue)
    ) {
      CPMessage(' کد شهر وارد شده معتبر نمی باشد', 'warning');
      return false;
    }
    if (
      type === 'postalCode' &&
      !this.validatePostalCode(this.state.inputValue)
    ) {
      CPMessage(' کد پستی وارد شده معتبر نمی باشد', 'warning');
      return false;
    }
    if (
      type === 'firstName' &&
      !this.validateFirstName(this.state.inputValue)
    ) {
      CPMessage(' فقط حروف فارسی مجاز است.', 'warning');
      return false;
    }
    if (
      type === 'firstName' &&
      !this.validateFirstNameLength(this.state.inputValue)
    ) {
      CPMessage('تعداد حروف وارد شده بیشتر از حد مجاز است!', 'warning');
      return false;
    }
    if (type === 'lastName' && !this.validateLastName(this.state.inputValue)) {
      CPMessage(' فقط حروف فارسی مجاز است.', 'warning');
      return false;
    }
    if (
      type === 'lastName' &&
      !this.validateLastNameLength(this.state.inputValue)
    ) {
      CPMessage('تعداد حروف وارد شده بیشتر از حد مجاز است!.', 'warning');
      return false;
    }
    return true;
  };

  validateFirstNameLength = value =>
    value && value.length >= 2 && value.length <= 40;

  validateLastNameLength = value =>
    value && value.length >= 2 && value.length <= 50;

  validateEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateFirstName = firstName => {
    const re = /^[چجحخهعغفقثصضگکمنتالبیسشوئدذؤةرژزطظءأيكپۀآ ‌]+$/;
    return re.test(String(firstName).toLowerCase());
  };

  validateLastName = lastName => {
    const re = /^[چجحخهعغفقثصضگکمنتالبیسشوئدذؤةرژزطظءأيكپۀآ ‌]+$/;
    return re.test(String(lastName).toLowerCase());
  };

  validateTel = tel => {
    const telReg = /^([0-9]{8})$/;
    return telReg.test(String(tel).toLowerCase());
  };

  validateTelPrefix = telPrefix => {
    const telPre = /^(0[1-9]{2})$/;
    return telPre.test(String(telPrefix).toLowerCase());
  };

  validatePostalCode = postalCode => {
    const postalReg = /^([0-9]{10})$/;
    return postalReg.test(String(postalCode).toLowerCase());
  };
  render() {
    const {
      size,
      label,
      placeholder,
      type,
      addonBefore,
      addonAfter,
      fullWidth,
      inline,
      onChange,
      className,
      value,
      prefix,
      suffix,
      direction,
      ref,
      hintText,
      MDInput,
      disabled,
      name,
      onBlur,
      maxLength,
      faToEn,
      autoFocus,
      withEdit,
      onEditAction,
      hasValidation,
      isRequired,
      inputMode,
      ...otherProps
    } = this.props;

    return (
      <React.Fragment>
        {MDInput ? (
          <div
            className={cs(s.formGroup, direction, className, {
              fullWidth,
            })}
            ref={ref}
          >
            <input
              autoFocus={autoFocus} // eslint-disable-line
              disabled={disabled}
              name={name}
              type={type}
              onChange={onChange}
              placeholder={hintText}
              onBlur={onBlur}
              value={value}
              inputMode={inputMode}
              maxLength={maxLength}
            />
            <span className={s.label}>{label}</span>
            <i className={s.bar} />
          </div>
        ) : (
          <div
            className={cs(
              'form-group',
              s.input,
              direction,
              { inline },
              className,
              {
                fullWidth,
              },
            )}
            ref={ref}
          >
            {label && (
              <span className="controlLabel">
                {label}
                {isRequired ? <span className={s.validationStar}>*</span> : ''}
              </span>
            )}
            <Input
              autoFocus={autoFocus}
              inputMode={inputMode}
              type={type}
              required={false}
              name={name}
              onChange={e => {
                this.onChange(e);
              }}
              placeholder={placeholder}
              size={size}
              value={withEdit ? this.state.inputValue : value}
              prefix={prefix}
              suffix={suffix}
              addonBefore={addonBefore}
              addonAfter={addonAfter}
              maxLength={maxLength}
              disabled={disabled && !this.state.editMode}
              onBlur={onBlur}
              {...otherProps}
            />
            <i className="bar" />
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
        )}
      </React.Fragment>
    );
  }
}

CPInput.defaultProps = {
  placeholder: null,
  type: 'text',
  addonBefore: '',
  addonAfter: null,
  fullWidth: true,
  inline: false,
  size: 'default',
  className: '',
  prefix: '',
  suffix: '',
  value: null,
  label: '',
  direction: null,
  inputMode: '',
  ref: null,
  onChange: () => {},
  hintText: '',
  MDInput: false,
  disabled: false,
  name: null,
  onBlur: () => {},
  maxLength: null,
  faToEn: false,
  autoFocus: false,
  withEdit: false,
  hasValidation: false,
  onEditAction: () => {},
  isRequired: false,
};

CPInput.propTypes = {
  label: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  addonBefore: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  addonAfter: PropTypes.string,
  fullWidth: PropTypes.bool,
  inline: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  direction: PropTypes.string,
  value: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  onChange: PropTypes.func,
  ref: PropTypes.func,
  hintText: PropTypes.string,
  MDInput: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  maxLength: PropTypes.number,
  faToEn: PropTypes.bool,
  autoFocus: PropTypes.bool,
  withEdit: PropTypes.bool,
  onEditAction: PropTypes.func,
  hasValidation: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default withStyles(s)(CPInput);
