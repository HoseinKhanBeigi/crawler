import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import s from './LogActivityForm.scss';
import CPInput from '../CP/CPInput';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import { postLogActivityAction } from '../../store/activities/activities.actions';
import { kianTableApi } from '../KianTable/helpers/globalApi';
import { PROFILE_CRM_ACTIVITIES_TABLE } from '../../store/settings/settings.constants';

const { Item } = Form;

const LogActivityForm = props => {
  const [data] = useState('');
  const { levantId, activityType, loading } = props;

  async function addActivity(value, { resetForm }) {
    const body = {
      activityType,
      data: value.data,
    };
    const result = await props.postLogActivityAction({ levantId, body });
    if (result?.err) {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    } else {
      CPMessage('با موفقیت ثبت شد.', 'success');
      resetForm({});
      kianTableApi(PROFILE_CRM_ACTIVITIES_TABLE).refreshTable();
    }
  }

  const validationSchema = Yup.object().shape({
    data: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
  });
  return (
    <div className={s.logActivityForm}>
      <Formik
        initialValues={data}
        onSubmit={addActivity}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {prop => {
          const {
            errors,
            touched,
            values,
            handleSubmit,
            handleChange,
            handleBlur,
          } = prop;
          return (
            <form onSubmit={handleSubmit}>
              <Row type="flex">
                <Col span={24}>
                  <Item
                    help={errors.data && touched.data ? errors.data : ''}
                    hasFeedback={!!(values.data && touched.data)}
                    validateStatus={
                      errors.data && touched.data ? 'error' : 'success'
                    }
                  >
                    <CPInput
                      className="margin-b-5"
                      name="data"
                      type="text"
                      value={values.data}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Item>
                </Col>
                <Col span={24} className="text-left">
                  <CPButton
                    htmlType="submit"
                    className="btn primary-btn margin-t-10"
                    loading={loading}
                  >
                    ثبت
                  </CPButton>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

LogActivityForm.propTypes = {
  activityType: PropTypes.string,
  levantId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  postLogActivityAction: PropTypes.func.isRequired,
};

LogActivityForm.defaultProps = {
  activityType: '',
  levantId: '',
};

const mapStateToProps = () => {};

const mapDispatch = {
  postLogActivityAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(LogActivityForm));
