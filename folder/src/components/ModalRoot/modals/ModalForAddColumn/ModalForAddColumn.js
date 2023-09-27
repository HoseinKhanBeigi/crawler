import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { Formik } from 'formik';
import s from './ModalForAddColumn.scss';
import CPModal from '../../../CP/CPModal';
import CPSelect from '../../../CP/CPSelect';
import CPInput from '../../../CP/CPInput';
import {
  postFieldAction,
  putFieldAction,
} from '../../../../store/formSetting/formSetting.actions';
import {
  inputType,
  mask,
  informationClass,
  dataType,
  validationSchema,
} from './schema';
import CPSwitch from '../../../CP/CPSwitch';
import CPMessage from '../../../CP/CPMessage';
import CPDivider from '../../../CP/CPDivider';
import CPButton from '../../../CP/CPButton';
import { getLeadFormFieldsAction } from '../../../../store/lead/lead.actions';
import { removeTableDataFromLocalStorage } from '../../../KianTable/helpers/persist';
import { LEADS_TABLE } from '../../../../store/settings/settings.constants';
import { MODAL_FOR_ADD_COLUMN } from '../../repository';

const { Item } = Form;

const ModalForAddColumn = props => {
  const {
    className,
    type,
    initialValue,
    editMode,
    loading,
    onChange,
    columnName,
  } = props;
  const [visible, setVisible] = useState(true);
  const [selectedFieldType, setSelectedFieldType] = useState(
    editMode ? initialValue?.inputType : inputType[0].value,
  );
  const [showDefaultValue, setShowDefaultValue] = useState(false);
  const [formData] = useState({
    name: editMode ? initialValue?.name : '',
    inputType: editMode ? initialValue?.inputType : inputType[0].value,
    informationClass: editMode
      ? initialValue?.informationClass
      : informationClass[0].value,
    mask: editMode ? initialValue?.mask : mask[0].value,
    dataType: editMode ? initialValue?.dataType : dataType[0].value,
    defaultValues: editMode
      ? initialValue?.defaultValues?.map(item => item)
      : [],
    columnCategory: editMode ? initialValue?.columnCategory : 'OPTIONAL',
    type: editMode ? initialValue?.type : type,
    status: editMode ? initialValue?.status : 'ACTIVE',
  });

  const closeModal = () => {
    setVisible(false);
  };

  const submitForm = async (values, { resetForm }) => {
    const body = {
      ...values,
      id: editMode ? initialValue.id : undefined,
      columnCategory: values.columnCategory ? 'OPTIONAL' : 'MAIN',
    };

    const result = editMode
      ? await props.putFieldAction(body)
      : await props.postFieldAction(body);

    const messageSuccess = `فیلد با موفقیت ${
      editMode ? 'ویرایش' : 'ایجاد'
    } گردید. `;

    removeTableDataFromLocalStorage(LEADS_TABLE);

    if (!result?.err) {
      CPMessage(messageSuccess, 'success');
      setVisible(false);
      resetForm({});
      await props.getLeadFormFieldsAction(type);
      if (!editMode) {
        onChange('add', result, 'actives');
      } else {
        onChange('update', body, columnName);
      }
    } else if (result.status === 406) {
      CPMessage('فیلد تکراری می باشد.', 'error');
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  const showDefaultValueContent = e => {
    switch (e) {
      case 'DROPDOWN':
      case 'MULTIVALUE':
      case 'CHECKBOX':
      case 'RADIOBOX': {
        setShowDefaultValue(true);
        break;
      }
      default: {
        setShowDefaultValue(false);
        break;
      }
    }
    setSelectedFieldType(e);
  };
  return (
    <CPModal
      title={editMode ? `ویرایش ستون ${formData.name}` : 'افزودن ستون (فیلد)'}
      visible={visible}
      className={cs('ModalForAddColumn', className)}
      onCancel={closeModal}
      footer={null}
      modalType={MODAL_FOR_ADD_COLUMN}
    >
      <Formik
        initialValues={formData}
        enableReinitialize
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {prop => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
          } = prop;
          return (
            <form onSubmit={handleSubmit}>
              <Row type="flex" gutter={15}>
                <Col span={12}>
                  <Item
                    help={errors.name && touched.name ? errors.name : ''}
                    hasFeedback={!!(values.name && touched.name)}
                    validateStatus={
                      errors.name && touched.name ? 'error' : 'success'
                    }
                  >
                    <CPInput
                      label="عنوان فارسی فیلد"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      className="margin-b-5"
                    />
                  </Item>
                </Col>
                <Col span={12}>
                  <CPSelect
                    label="نوع فیلد"
                    dataSource={inputType}
                    defaultValue={values.inputType}
                    placeholder="انتخاب نوع ستون (فیلد)"
                    onBlur={handleBlur}
                    onChange={value => {
                      setFieldValue('inputType', value);
                      showDefaultValueContent(value);
                    }}
                    name="inputType"
                    className="margin-b-5"
                  />
                </Col>
                {(showDefaultValue ||
                  initialValue?.defaultValues?.length > 0) &&
                  (selectedFieldType === 'DROPDOWN' ||
                    selectedFieldType === 'MULTIVALUE') && (
                    <Col span={24}>
                      <small>این ستون باید حداقل یک زیر منو داشته باشد.</small>
                      <CPSelect
                        defaultValue={values.defaultValues}
                        placeholder="مقادیر پیش فرض"
                        onChange={selectedValues => {
                          setFieldValue('defaultValues', selectedValues);
                        }}
                        mode="tags"
                        className="margin-b-5"
                      />
                    </Col>
                  )}
                <Col span={12}>
                  <CPSelect
                    label="میزان اهمیت"
                    dataSource={informationClass}
                    defaultValue={values.informationClass}
                    placeholder="میزان اهمیت"
                    onBlur={handleBlur}
                    onChange={value => {
                      setFieldValue('informationClass', value);
                    }}
                    name="informationClass"
                    className="margin-b-5"
                  />
                </Col>
                {(selectedFieldType === 'INPUT' ||
                  selectedFieldType === 'CURRENCY') && (
                  <Col span={12}>
                    <CPSelect
                      dataSource={mask}
                      defaultValue={values.mask}
                      label="نوع نمایش"
                      onBlur={handleBlur}
                      onChange={value => {
                        setFieldValue('mask', value);
                      }}
                      name="mask"
                    />
                  </Col>
                )}
                <Col span={24}>
                  <CPSelect
                    label="نوع داده"
                    dataSource={dataType}
                    defaultValue={values.dataType}
                    placeholder="نوع داده"
                    onBlur={handleBlur}
                    onChange={value => {
                      setFieldValue('dataType', value);
                    }}
                    name="dataType"
                  />
                </Col>
                <Col className={s.activeStatus} span={24}>
                  <b>آیا می خواهید این فیلد اجباری باشد؟</b>
                  <CPSwitch
                    size="small"
                    checked={values.columnCategory}
                    onChange={e => {
                      setFieldValue('columnCategory', e);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <CPDivider />
                  <CPButton
                    loading={loading}
                    htmlType="submit"
                    className="btn primary-btn"
                  >
                    ثبت
                  </CPButton>
                  <CPButton
                    onClick={closeModal}
                    className="btn default-btn margin-r-5"
                  >
                    انصراف
                  </CPButton>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </CPModal>
  );
};

ModalForAddColumn.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  postFieldAction: PropTypes.func.isRequired,
  putFieldAction: PropTypes.func.isRequired,
  getLeadFormFieldsAction: PropTypes.func.isRequired,
  initialValue: PropTypes.object,
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  columnName: PropTypes.string,
};

ModalForAddColumn.defaultProps = {
  className: null,
  initialValue: null,
  type: '',
  editMode: false,
  loading: false,
  onChange: () => {},
  columnName: '',
};

const mapStateToProps = state => ({
  loading: state.formSetting.loading,
});

const mapDispatch = {
  postFieldAction,
  putFieldAction,
  getLeadFormFieldsAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForAddColumn));
export const ModalForImportLeadTest = ModalForAddColumn;
