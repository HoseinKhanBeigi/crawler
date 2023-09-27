import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Formik, FieldArray } from 'formik';
import { Form } from 'antd';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './EditableNotificationForm.scss';
import CPButton from '../../../../components/CP/CPButton';
import DepartmentTitleForm from './components/DepartmentTitleForm/DepartmentTitleForm';
import CommunicationsForm from './components/CommunicationsForm/CommunicationsForm';
import serverMockData from '../../constants/serverMockData';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('این فیلد اجباری است'),
  communicationList: Yup.array().of(
    Yup.object().shape({
      notificationChannel: Yup.string().required('این فیلد اجباری است'),
      receipts: Yup.array()
        .when('notificationChannel', (notificationChannel, schema) =>
          notificationChannel === 'EMAIL'
            ? schema.of(
                Yup.string().email('لطفا ایمیل ها را به درستی وارد کنید'),
              )
            : schema.of(
                Yup.string().matches(/^(\+98|0098|98|0)?9\d{9}$/, {
                  message: 'لطفا شماره موبایل ها را به درستی وارد کنید',
                }),
              ),
        )
        .required('این فیلد اجباری است'),
    }),
  ),
});

const EditableNotificationForm = ({
  initialValues,
  onSubmit,
  closeFormHandler,
}) => {
  const communicationListOnChangeHandler = setFieldsHandler => inputName => value =>
    setFieldsHandler(inputName, value);
  return (
    <Formik
      onSubmit={values => {
        onSubmit(values);
      }}
      initialValues={initialValues || serverMockData}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange
      enableReinitialize
      onReset={closeFormHandler}
    >
      {formikProps => (
        <Form className={s.section} onSubmit={formikProps.handleSubmit}>
          <DepartmentTitleForm
            onBlur={formikProps.handleBlur}
            error={formikProps.errors.name}
            onChange={formikProps.handleChange}
            value={formikProps.values.name}
            touched={formikProps.touched.name}
          />
          <FieldArray name="communicationList" validateOnChange={false}>
            {arrayHelpers => (
              <>
                {formikProps.values.communicationList.map(
                  (communication, index) => (
                    <CommunicationsForm
                      key={communication.id}
                      index={index}
                      errors={formikProps.errors.communicationList}
                      handleDelete={() => {
                        arrayHelpers.remove(index);
                      }}
                      channelTypeValue={
                        formikProps.values.communicationList[index]
                          .notificationChannel
                      }
                      receiptsValue={
                        formikProps.values.communicationList[index].receipts
                      }
                      channelNotSelected={
                        formikProps.values.communicationList[index]
                          .notificationChannel === ''
                      }
                      handleChange={communicationListOnChangeHandler(
                        formikProps.setFieldValue,
                      )}
                    />
                  ),
                )}
                <CPButton
                  style={{ padding: 0 }}
                  icon="plus"
                  type="link"
                  onClick={() =>
                    arrayHelpers.push(
                      initialValues
                        ? {
                            notificationChannel: '',
                            receipts: [],
                          }
                        : {
                            id: Math.floor(Math.random() * 500),
                            notificationChannel: '',
                            receipts: [],
                          },
                    )
                  }
                >
                  افزودن راه ارتباطی جدید
                </CPButton>
              </>
            )}
          </FieldArray>
          <div className={s.controlButton}>
            <CPButton onClick={formikProps.handleReset}>انصراف</CPButton>
            <CPButton
              type="primary"
              htmlType="submit"
              style={{ marginRight: '10px' }}
              onClick={formikProps.handleSubmit}
            >
              {initialValues ? 'ثبت تغییرات' : 'ثبت اطلاعات'}
            </CPButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

EditableNotificationForm.defaultProps = {
  initialValues: undefined,
};

EditableNotificationForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  closeFormHandler: PropTypes.func.isRequired,
};

export default withStyles(s)(EditableNotificationForm);
