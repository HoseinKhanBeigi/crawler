import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import CPSelect from '../../../../../components/CP/CPSelect/CPSelect';
import CPInput from '../../../../../components/CP/CPInput/CPInput';
import CPButton from '../../../../../components/CP/CPButton/CPButton';
// eslint-disable-next-line css-modules/no-unused-class
import s from './LegalValidationTool.scss';
import {persianNumToEnglishNum} from "../../../../../utils";

import { activityTypeList, finincialYears } from './enmus';

const { Item } = Form;

const LegalValidationForm = props => {
  const { onSubmit, isViewMode, loading, onResetForm } = props;
  const [isOnViewMode, setisOnViewMode] = useState(isViewMode);

  useEffect(() => {
    setisOnViewMode(isViewMode);
  }, [isViewMode]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    nationalCode: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    activityType: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    financialYear: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    equities: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    financialExpenses: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    operatingProfit: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    sale: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    totalAssets: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    totalCurrentAsset: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    totalCurrentDebt: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    totalFacilities: Yup.number()
      .required('پر کردن فیلد الزامی می باشد.')
      .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
  });

  return (
    <>
      <Formik
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formProps => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
            resetForm,
          } = formProps;
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={24}>
                  <div className={s.sectionTitle}>اطلاعات شرکت</div>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.nationalCode && touched.nationalCode
                        ? errors.nationalCode
                        : ''
                    }
                    hasFeedback={
                      !!(values.nationalCode && touched.nationalCode)
                    }
                    validateStatus={
                      errors.nationalCode && touched.nationalCode
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-nationalCode"
                        label="شناسه ملی"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="شناسه ملی را وارد کنید"
                        name="nationalCode"
                        onChange={handleChange}
                        value={values.nationalCode}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={errors.name && touched.name ? errors.name : ''}
                    hasFeedback={!!(values.name && touched.name)}
                    validateStatus={
                      errors.name && touched.name ? 'error' : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-name"
                        label="نام شرکت"
                        disabled={isOnViewMode}
                        isRequired
                        placeholder="نام شرکت را وارد کنید"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.financialYear && touched.financialYear
                        ? errors.financialYear
                        : ''
                    }
                    hasFeedback={
                      !!(values.financialYear && touched.financialYear)
                    }
                    validateStatus={
                      errors.financialYear && touched.financialYear
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.select_temp}>
                      <CPSelect
                        className={s.select_temp}
                        style={{ flexDirection: 'column' }}
                        placeholder="سال مالی را انتخاب کنید"
                        label="سال مالی"
                        disabled={isOnViewMode}
                        onChange={value =>
                          setFieldValue('financialYear', value)
                        }
                        defaultValue={values.financialYear}
                        dataSource={finincialYears}
                        name="financialYear"
                        value={values.financialYear}
                        isRequired
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={
                      errors.activityType && touched.activityType
                        ? errors.activityType
                        : ''
                    }
                    hasFeedback={
                      !!(values.activityType && touched.activityType)
                    }
                    validateStatus={
                      errors.activityType && touched.activityType
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.select_temp}>
                      <CPSelect
                        className={s.select_temp}
                        placeholder="نوع فعالیت را انتخاب کنید"
                        style={{ flexDirection: 'column' }}
                        label="نوع فعالیت"
                        disabled={isOnViewMode}
                        defaultValue={values.activityType}
                        onChange={value => setFieldValue('activityType', value)}
                        dataSource={activityTypeList}
                        name="activityType"
                        value={values.activityType}
                        isRequired
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className={s.sectionTitle}>اطلاعات مالی شرکت</div>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.totalCurrentAsset && touched.totalCurrentAsset
                        ? errors.totalCurrentAsset
                        : ''
                    }
                    hasFeedback={
                      !!(values.totalCurrentAsset && touched.totalCurrentAsset)
                    }
                    validateStatus={
                      errors.totalCurrentAsset && touched.totalCurrentAsset
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-totalCurrentAsset"
                        label="جمع دارایی جاری"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="جمع دارایی جاری را وارد کنید"
                        name="totalCurrentAsset"
                        onChange={handleChange}
                        value={values.totalCurrentAsset}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={
                      errors.totalAssets && touched.totalAssets
                        ? errors.totalAssets
                        : ''
                    }
                    hasFeedback={!!(values.totalAssets && touched.totalAssets)}
                    validateStatus={
                      errors.totalAssets && touched.totalAssets
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-totalAssets"
                        label="جمع کل دارایی ها"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="جمع کل دارایی ها را وارد کنید"
                        name="totalAssets"
                        onChange={handleChange}
                        value={values.totalAssets}
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.equities && touched.equities ? errors.equities : ''
                    }
                    hasFeedback={!!(values.equities && touched.equities)}
                    validateStatus={
                      errors.equities && touched.equities ? 'error' : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-equities"
                        label="جمع حقوق صاحبان سهام"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="نام شرکت را وارد کنید"
                        name="equities"
                        onChange={handleChange}
                        value={values.equities}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={
                      errors.totalFacilities && touched.totalFacilities
                        ? errors.totalFacilities
                        : ''
                    }
                    hasFeedback={
                      !!(values.totalFacilities && touched.totalFacilities)
                    }
                    validateStatus={
                      errors.totalFacilities && touched.totalFacilities
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-totalFacilities"
                        label="جمع تسهیلات اخذ شده"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="جمع تسهیلات اخذ شده را وارد کنید"
                        name="totalFacilities"
                        onChange={handleChange}
                        value={values.totalFacilities}
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.totalCurrentDebt && touched.totalCurrentDebt
                        ? errors.totalCurrentDebt
                        : ''
                    }
                    hasFeedback={
                      !!(values.totalCurrentDebt && touched.totalCurrentDebt)
                    }
                    validateStatus={
                      errors.totalCurrentDebt && touched.totalCurrentDebt
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-totalCurrentDebt"
                        label="جمع بدهی جاری"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="جمع بدهی جاری را وارد کنید"
                        name="totalCurrentDebt"
                        onChange={handleChange}
                        value={values.totalCurrentDebt}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={errors.sale && touched.sale ? errors.sale : ''}
                    hasFeedback={!!(values.sale && touched.sale)}
                    validateStatus={
                      errors.sale && touched.sale ? 'error' : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-sale"
                        label="فروش"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="مقدار فروش را وارد کنید"
                        name="sale"
                        onChange={handleChange}
                        value={values.sale}
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Item
                    help={
                      errors.operatingProfit && touched.operatingProfit
                        ? errors.operatingProfit
                        : ''
                    }
                    hasFeedback={
                      !!(values.operatingProfit && touched.operatingProfit)
                    }
                    validateStatus={
                      errors.operatingProfit && touched.operatingProfit
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-operatingProfit"
                        label="سود عملیاتی"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="سود عملیاتی را وارد کنید"
                        name="operatingProfit"
                        onChange={handleChange}
                        value={values.operatingProfit}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                    help={
                      errors.financialExpenses && touched.financialExpenses
                        ? errors.financialExpenses
                        : ''
                    }
                    hasFeedback={
                      !!(values.financialExpenses && touched.financialExpenses)
                    }
                    validateStatus={
                      errors.financialExpenses && touched.financialExpenses
                        ? 'error'
                        : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="legal-validation-financialExpenses"
                        label="هزینه مالی"
                        isRequired
                        disabled={isOnViewMode}
                        placeholder="هزینه مالی را وارد کنید"
                        name="financialExpenses"
                        onChange={handleChange}
                        value={values.financialExpenses}
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col className="text-left">
                  {!isOnViewMode ? (
                    <CPButton
                      data-cy="submit-message-template"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      محاسبه
                    </CPButton>
                  ) : (
                    <CPButton
                      onClick={() => {
                        resetForm({});
                        setisOnViewMode(false);
                        onResetForm(null);
                      }}
                      data-cy="submit-message-template"
                      type="primary"
                    >
                      محاسبه مجدد
                    </CPButton>
                  )}
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
LegalValidationForm.defaultProps = {
  isViewMode: false,
  loading: false,
  onResetForm: () => {},
};
LegalValidationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isViewMode: PropTypes.bool,
  loading: PropTypes.bool,
  onResetForm: PropTypes.func,
};
export default LegalValidationForm;
