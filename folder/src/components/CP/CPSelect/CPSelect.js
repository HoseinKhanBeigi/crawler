import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Select } from 'antd';
import cs from 'classnames';
import s from './CPSelect.scss';

const CPOption = Select.Option;

const CPSelect = props => {
  const {
    onChange,
    dataSource,
    showSearch,
    value,
    defaultValue,
    defaultValues,
    disabled,
    label,
    editMode,
    inline,
    placeholder,
    className,
    name,
    onBlur,
    size,
    mode,
    dropdownStyle,
    dropdownClassName,
    withEdit,
    onEdit,
    isRequired,
    style,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(
    defaultValue || defaultValues,
  );

  useEffect(() => {
    setCurrentValue(defaultValue || defaultValues);
  }, [defaultValue, defaultValues]);

  const defaultData = defaultValue || defaultValues;
  const children = dataSource.map(option => (
    <CPOption key={option.id || option.value} value={option.value}>
      {option.text}
    </CPOption>
  ));

  const onChangeEditMode = () => {
    setIsEdit(true);
  };

  const onEditAction = () => {
    setIsEdit(false);
    onEdit(currentValue, name);
  };

  const onCancelEditAction = () => {
    setIsEdit(false);
    setCurrentValue(defaultValue);
  };

  const handleOnChange = (selectedValue, option) => {
    onChange(selectedValue, option);
    setCurrentValue(selectedValue);
  };

  useEffect(() => {
    setIsEdit(editMode);
  }, [editMode]);

  return value !== null ? (
    <div
      className={cs(
        className,
        inline ? 'inlineInput' : 'selectInput',
        s.select_box_container,
      )}
    >
      {label && (
        <span className={s.controlLabel}>
          {label}
          {isRequired ? <span className={s.validationStar}>*</span> : ''}
        </span>
      )}
      <Select
        showSearch={showSearch}
        style={{ width: '100%', ...(style && style) }}
        optionFilterProp="children"
        onChange={(selectedValue, option) =>
          handleOnChange(selectedValue, option)
        }
        onSelect={handleOnChange}
        disabled={disabled}
        name={name}
        value={currentValue}
        onBlur={onBlur}
        defaultValue={value || null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder={placeholder}
        size={size}
        mode={mode}
        dropdownStyle={dropdownStyle}
        dropdownClassName={dropdownClassName}
      >
        {children}
      </Select>
      {withEdit && (
        <div className={s.input_with_action}>
          {!isEdit ? (
            <Button
              shape="circle"
              icon="edit"
              className={s.btn_edit}
              onClick={onChangeEditMode}
            />
          ) : (
            <Button
              shape="circle"
              icon="check"
              className={s.btn_edit}
              onClick={onEditAction}
            />
          )}
        </div>
      )}
    </div>
  ) : (
    <div
      className={cs(
        className,
        inline ? 'inlineInput' : 'selectInput',
        s.select_box_container,
      )}
    >
      {label && (
        <span className={s.controlLabel}>
          {label}
          {isRequired ? <span className={s.validationStar}>*</span> : ''}
        </span>
      )}
      <Select
        showSearch={showSearch}
        style={{ width: '100%', ...(style && style) }}
        optionFilterProp="children"
        onChange={onChange}
        disabled={disabled && !isEdit}
        name={name}
        onSelect={handleOnChange}
        onBlur={onBlur}
        defaultValue={defaultData}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        placeholder={placeholder}
        size={size}
        value={currentValue}
        mode={mode}
        dropdownStyle={dropdownStyle}
        dropdownClassName={dropdownClassName}
      >
        {children}
      </Select>
      {withEdit && (
        <div className={s.input_with_action}>
          {!isEdit ? (
            <Button
              shape="circle"
              icon="edit"
              className={s.btn_edit}
              onClick={onChangeEditMode}
            />
          ) : (
            <div className={s.input_with_action}>
              <Button
                shape="circle"
                icon="check"
                className={s.btn_edit}
                onClick={onEditAction}
              />
              <Button
                shape="circle"
                icon="close"
                className={s.btn_edit}
                onClick={onCancelEditAction}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

CPSelect.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  showSearch: PropTypes.bool,
  editMode: PropTypes.bool,
  value: PropTypes.node,
  defaultValue: PropTypes.string,
  defaultValues: PropTypes.array,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  inline: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  size: PropTypes.string,
  mode: PropTypes.string,
  dropdownStyle: PropTypes.object,
  dropdownClassName: PropTypes.string,
  withEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  isRequired: PropTypes.bool,
  style: PropTypes.object,
};

CPSelect.defaultProps = {
  dataSource: [],
  onChange: () => {},
  onBlur: () => {},
  showSearch: false,
  value: null,
  defaultValue: null,
  defaultValues: [],
  disabled: false,
  editMode: false,
  label: '',
  inline: false,
  placeholder: '',
  className: '',
  name: null,
  size: 'default',
  mode: 'default',
  dropdownStyle: null,
  dropdownClassName: null,
  withEdit: false,
  style: undefined,
  onEdit: () => {},
  isRequired: false,
};

export default withStyles(s)(CPSelect);
