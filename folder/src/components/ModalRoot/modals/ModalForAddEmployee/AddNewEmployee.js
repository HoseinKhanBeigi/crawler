import React, { useState } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Divider, Row, Form } from 'antd';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import CPInput from '../../../../components/CP/CPInput';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForAddEmployee.scss';
import CPLoading from '../../../CP/CPLoading';
import CPSelect from '../../../CP/CPSelect';
import CPButton from '../../../CP/CPButton';
import { postEmployeeRegisteredInfoDetail } from '../../../../store/employeeManagement/employeeManagement.actions';
import CPMessage from '../../../CP/CPMessage';
import { postRegisterNewEmployeeAction } from '../../../../store/Employee/employee.actions';
import { DatePickerWrapper } from '../../../PipelineManagement/widgets';
import { validationSchema } from './EmployeeInfoStepSchema';

const { Item } = Form;
const AddNewEmployee = props => {
  const { onChangeStep, okTitle, roles } = props;
  const [employeeSubmitLoading, setEmployeeSubmitLoading] = useState(false);

  const formData = {
    mobileNumber: '',
    nationalCode: '',
    email: '',
    birthdate: '',
    SelectedRole: '',
  };

  const roleListFactory = items => {
    const rolesList = items.map((item, index) => ({
      key: index,
      text: item.title,
      value: item.id,
    }));
    return rolesList;
  };

  const submitNewEmployee = async values => {
    const body = {
      mobilePhone: values.mobileNumber,
      nationalCode: values.nationalCode,
      email: values.email,
      birthDate: values.birthdate,
      aclGroupId: values.SelectedRole,
      unitId: props.unitId,
    };
    setEmployeeSubmitLoading(true);
    const result = await props.postRegisterNewEmployeeAction(body);
    if (!result.err) {
      CPMessage('مشخصات کاربر با موفقیت ثبت شد.', 'success');
      props.postEmployeeRegisteredInfoDetail({
        ...result,
        role: roles.find(role => role.id === values.SelectedRole),
      });
      setEmployeeSubmitLoading(false);
      onChangeStep();
    } else {
      CPMessage(result?.text, 'error');
      setEmployeeSubmitLoading(false);
    }
  };

  return (
    <Formik
      initialValues={formData}
      onReset={props.closeModal}
      onSubmit={values => submitNewEmployee(values)}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={s.formWrapper}>
            <div className="col">
              <small>
                کدملی<span className={s.required}>*</span>
              </small>
              <div>
                <Item
                  help={
                    errors.nationalCode && touched.nationalCode
                      ? errors.nationalCode
                      : ''
                  }
                  validateStatus={
                    errors.nationalCode && touched.nationalCode
                      ? 'error'
                      : 'success'
                  }
                >
                  <CPInput
                    className="margin-t-5"
                    onChange={handleChange}
                    value={values.nationalCode}
                    name="nationalCode"
                    placeholder="کد ملی"
                    inline
                    onBlur={handleBlur}
                  />
                </Item>
              </div>
            </div>
            <div className="col">
              <small>
                شماره همراه<span className={s.required}>*</span>
              </small>
              <div>
                <Item
                  help={
                    errors.mobileNumber && touched.mobileNumber
                      ? errors.mobileNumber
                      : ''
                  }
                  validateStatus={
                    errors.mobileNumber && touched.mobileNumber
                      ? 'error'
                      : 'success'
                  }
                >
                  <CPInput
                    className="margin-t-5"
                    onChange={handleChange}
                    value={values.mobileNumber}
                    name="mobileNumber"
                    placeholder="شماره همراه"
                    inline
                    onBlur={handleBlur}
                  />
                </Item>
              </div>
            </div>
            <div className="col">
              <small>
                تاریخ تولد<span className={s.required}>*</span>
              </small>
              <div>
                <Item
                  help={
                    errors.birthdate && touched.birthdate
                      ? errors.birthdate
                      : ''
                  }
                  validateStatus={
                    errors.birthdate && touched.birthdate ? 'error' : 'success'
                  }
                >
                  <div className={s.datePickerContainer}>
                    <div>
                      <DatePickerWrapper
                        inputJalaaliFormat="jYYYY/jM/jD"
                        onBlur={handleBlur}
                        isGregorian={false}
                        onChange={value => {
                          setFieldValue('birthdate', value);
                        }}
                        value={values.birthdate}
                        timePicker={false}
                        removable
                      />
                    </div>
                  </div>
                </Item>
              </div>
            </div>
            <div className="col">
              <small>ایمیل</small>
              <div>
                <Item
                  help={errors.email && touched.email ? errors.email : ''}
                  validateStatus={
                    errors.email && touched.email ? 'error' : 'success'
                  }
                >
                  <CPInput
                    className="margin-t-5"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    placeholder="ایمیل"
                    inline
                    onBlur={handleBlur}
                  />
                </Item>
              </div>
            </div>
          </div>
          <CPLoading spinning={!roles} tip="در حال دریافت لیست نقش ها...">
            <Row gutter={24}>
              <Col span={24}>
                <Divider />
                <Row gutter={24}>
                  <Col span={12}>
                    <small>
                      انتخاب نقش<span className={s.required}>*</span>
                    </small>
                    <Item
                      help={
                        errors.SelectedRole && touched.SelectedRole
                          ? errors.SelectedRole
                          : ''
                      }
                      validateStatus={
                        errors.SelectedRole && touched.SelectedRole
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPSelect
                        className="margin-t-5"
                        value={values.SelectedRole}
                        defaultValue="لطفا نقش را انتخاب کنید"
                        dataSource={roleListFactory(roles)}
                        onChange={value => {
                          setFieldValue('SelectedRole', value);
                        }}
                      />
                    </Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CPLoading>
          <Row gutter={24}>
            <Divider />
          </Row>
          <Row
            gutter={24}
            style={{ justifyContent: 'space-between', direction: 'ltr' }}
          >
            <Col span={24} style={{ textAlign: 'left' }}>
              <CPButton
                type="primary"
                htmlType="submit"
                className={s.button}
                loading={employeeSubmitLoading}
                onPress={handleSubmit}
              >
                {okTitle}
              </CPButton>
              <CPButton
                onClick={props.closeModal}
                className="btn default-btn margin-r-10"
              >
                انصراف
              </CPButton>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};
AddNewEmployee.propTypes = {
  onChangeStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  okTitle: PropTypes.string,
  postEmployeeRegisteredInfoDetail: PropTypes.func.isRequired,
  postRegisterNewEmployeeAction: PropTypes.func.isRequired,
  unitId: PropTypes.number.isRequired,
  roles: PropTypes.array.isRequired,
};
AddNewEmployee.defaultProps = {
  onChangeStep: () => {},
  okTitle: 'ثبت و گام بعدی',
};
const mapDispatch = {
  postEmployeeRegisteredInfoDetail,
  postRegisterNewEmployeeAction,
};
const stateMap = store => ({
  unitId: store.user?.currentUserInfoEmployee?.unit?.id,
});

export default connect(stateMap, mapDispatch)(withStyles(s)(AddNewEmployee));
