import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import s from './ModalForProductSetting.scss';
import { MODAL_FOR_PRODUCT_SETTING } from '../../repository';
import { PRODUCT_SETTING_TABLE } from '../../../../store/settings/settings.constants';
import pipelineService from '../../../../service/pipelineServices';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton';
import CPSelect from '../../../CP/CPSelect';
import CPTextArea from '../../../CP/CPTextArea/CPTextArea';
import productSettingService from '../../../../service/productSettingService';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { selectProductAction } from '../../../../store/getProducts/getProducts.actions';

const { Item } = Form;

const operationTypes = [
  { value: 'ACTION_REJECT', text: 'رد عمل' },
  { value: 'ACTION_DONE', text: 'اجرای عمل' },
  { value: 'OTP', text: 'کد او تی پی' },
];

const resultTypes = [
  { value: 'SUCCESS', text: 'موفق' },
  { value: 'FAILED', text: 'ناموفق' },
];
const smsRecpientType = [
  { value: 'ONBOARDED', text: 'شخص آنبورد شونده' },
  { value: 'ONBOARDER', text: ' آنبورد کننده' },
  { value: 'BOTH', text: 'آنبورد شونده و آنبورد کننده ' },
  { value: 'BUSINESS_ADMIN', text: 'نماینده شرکت' },
  { value: 'KYC_STAKEHOLDER', text: 'ذینفع کی وای سی شده' },
  { value: 'NON_KYC_STAKEHOLDER', text: 'ذینفع کی وای سی نشده ' },
  { value: 'KYC_GUARANTOR', text: 'ضامن احراز هویت شده' },
  { value: 'NON_KYC_GUARANTOR', text: 'ضامن احرازهویت نشده' },
];

const ModalForProductSetting = ({ products, ...props }) => {
  const [visible, setVisible] = useState(true);
  const [attachmentToken] = useState(props.initialValues.attachmentToken);
  const [actions, setActions] = useState();
  const [pipelines, setPipelines] = useState();
  const [productCode, setProductCode] = useState(
    props.initialValues.productCode,
  );
  const [pipelineId, setPipelineId] = useState(props.initialValues.pipelineId);
  const [templateValue, setTemplateValue] = useState();
  const [templates, setTemplates] = useState([]);
  const [templateCode, setTemplateCode] = useState(
    props.initialValues.notificationTemplateCode,
  );

  const getProductId = () =>
    products.filter(product => product.code === productCode)[0]?.id;

  const getActions = () => {
    if (productCode && pipelineId) {
      pipelineService
        .getPipelineProductActions(productCode, pipelineId)
        .then(res => {
          setActions(res.result);
        })
        .catch(err => err);
    }
  };

  const getProductPipeline = () => {
    if (productCode) {
      pipelineService
        .getPipelines(productCode)
        .then(res => setPipelines(res.result))
        .catch(err => err);
    }
  };

  const getSystemicTemplate = () => {
    productSettingService
      .getTemplates()
      .then(response => setTemplates(response.result))
      .catch(err => err);
  };

  useEffect(() => {
    getSystemicTemplate();
  }, []);

  useEffect(() => {
    getProductPipeline();
  }, [productCode, props.initialValues.productCode]);

  const getModalDetail = () => {
    if (Object.keys(props.initialValues).length) {
      return {
        type: 'UPDATE',
        title: 'ویرایش پیکربندی',
        uploadBtnTitle: attachmentToken
          ? 'تغییر فایل ضمیمه'
          : 'آپلود فایل ضمیمه',
      };
    }
    return {
      type: 'CREATE',
      title: 'ایجاد پیکربندی',
      uploadBtnTitle: attachmentToken ? 'تغییر فایل ضمیمه' : 'آپلود فایل ضمیمه',
    };
  };

  const closeModal = () => {
    setVisible(false);
  };

  const productTypes = useMemo(() => {
    if (products) {
      return products.map(item => ({
        text: item?.title,
        value: item?.code,
      }));
    }
    return [];
  }, [products]);

  const actionTypes = useMemo(() => {
    if (actions) {
      return Object.values(actions).map(action => ({
        value: action?.id,
        text: action?.name,
      }));
    }
    return [];
  }, [actions]);

  const pipelineTypes = useMemo(() => {
    if (pipelines) {
      return Object.values(pipelines)?.map(pipeline => ({
        value: pipeline?.id,
        text: pipeline?.title,
      }));
    }
    return [];
  }, [pipelines]);

  const templateTypes = useMemo(() => {
    if (templates) {
      return templates.map(pipeline => ({
        value: pipeline?.code,
        text: pipeline?.title,
      }));
    }
    return [];
  }, [templates]);

  function pipelineOnchange(value) {
    setPipelineId(value);
  }
  useEffect(() => {
    getActions();
  }, [pipelineId]);

  useEffect(() => {
    if (templateCode) {
      const newTemplateValue = templates.filter(
        template => template.code === templateCode,
      )[0]?.content;
      setTemplateValue(newTemplateValue);
    }
  }, [templateCode, templates]);

  const onSubmit = values => {
    const { type } = getModalDetail();
    const productId = getProductId();
    if (type === 'CREATE') {
      const body = {
        ...values,
        productId,
      };
      productSettingService
        .createNewProductSetting(body)
        .then(() => {
          setVisible(false);
          kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
        })
        .catch(() => {
          setVisible(false);
          kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
        });
    } else {
      const body = {
        ...values,
      };
      productSettingService
        .editProductSetting(body)
        .then(() => {
          setVisible(false);
          kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
        })
        .catch(() => {
          setVisible(false);
          kianTableApi(PRODUCT_SETTING_TABLE).refreshTable();
        });
    }
  };
  return (
    <CPModal
      visible={visible}
      onCancel={closeModal}
      title={getModalDetail().title}
      modalType={MODAL_FOR_PRODUCT_SETTING}
      footer={false}
    >
      <Formik
        initialValues={props.initialValues}
        // validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {formProps => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            setFieldValue,
          } = formProps;
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.operationType && touched.operationType
                        ? errors.operationType
                        : ''
                    }
                    hasFeedback={
                      !!(values.operationType && touched.operationType)
                    }
                    validateStatus={
                      errors.operationType && touched.operationType
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="نوع عمل"
                      onChange={value => setFieldValue('operationType', value)}
                      dataSource={operationTypes}
                      name="operationType"
                      defaultValue={values.operationType}
                      value={values.operationType}
                      isRequired
                    />
                  </Item>
                </Col>
              </Row>
              <Row className={s.inputGroup}>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.productId && touched.productId
                        ? errors.productId
                        : ''
                    }
                    hasFeedback={!!(values.productId && touched.productId)}
                    validateStatus={
                      errors.productId && touched.productId
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="محصول"
                      onChange={value => {
                        // setFieldValue('productId', value);
                        setProductCode(value);
                      }}
                      dataSource={productTypes}
                      name="productCode"
                      defaultValue={values.productCode}
                      value={values.productCode}
                      isRequired
                    />
                  </Item>
                </Col>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.pipelineId && touched.pipelineId
                        ? errors.pipelineId
                        : ''
                    }
                    hasFeedback={!!(values.pipelineId && touched.pipelineId)}
                    validateStatus={
                      errors.pipelineId && touched.pipelineId
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="پایپ‌لاین"
                      onChange={value => {
                        setFieldValue('pipelineId', value);
                        pipelineOnchange(value);
                      }}
                      dataSource={pipelineTypes}
                      name="pipelineId"
                      defaultValue={pipelineId}
                      value={pipelineId}
                      isRequired
                    />
                  </Item>
                </Col>
              </Row>
              <Row className={s.inputGroup}>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.actionStageId && touched.actionStageId
                        ? errors.actionStageId
                        : ''
                    }
                    hasFeedback={
                      !!(values.actionStageId && touched.actionStageId)
                    }
                    validateStatus={
                      errors.actionStageId && touched.actionStageId
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="اکشن"
                      onChange={value => setFieldValue('actionStageId', value)}
                      dataSource={actionTypes}
                      name="actionStageId"
                      defaultValue={values.actionStageId}
                      value={values.actionStageId}
                      isRequired
                    />
                  </Item>
                </Col>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.resultType && touched.resultType
                        ? errors.resultType
                        : ''
                    }
                    hasFeedback={!!(values.resultType && touched.resultType)}
                    validateStatus={
                      errors.resultType && touched.resultType
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="نتیجه اکشن"
                      onChange={value => setFieldValue('resultType', value)}
                      dataSource={resultTypes}
                      name="resultType"
                      defaultValue={values.resultType}
                      value={values.resultType}
                      isRequired
                    />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={
                      errors.smsRecipientType && touched.smsRecipientType
                        ? errors.smsRecipientType
                        : ''
                    }
                    hasFeedback={
                      !!(values.smsRecipientType && touched.smsRecipientType)
                    }
                    validateStatus={
                      errors.smsRecipientType && touched.smsRecipientType
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="نوع مخاطب"
                      onChange={value =>
                        setFieldValue('smsRecipientType', value)
                      }
                      dataSource={smsRecpientType}
                      name="smsRecipientType"
                      defaultValue={values.smsRecipientType}
                      value={values.smsRecipientType}
                      isRequired
                    />
                  </Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} className={s.templateInput}>
                  <Item
                    help={errors.type && touched.type ? errors.type : ''}
                    hasFeedback={!!(values.type && touched.type)}
                    validateStatus={
                      errors.type && touched.type ? 'error' : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="انتخاب کنید"
                      label="قالب"
                      onChange={value => {
                        setFieldValue('notificationTemplateCode', value);
                        setTemplateCode(value);
                      }}
                      dataSource={templateTypes}
                      name="notificationTemplateCode"
                      defaultValue={values.notificationTemplateCode}
                      value={values.notificationTemplateCode}
                      isRequired
                    />
                    <CPTextArea
                      className={s.textAreaContainer}
                      onChange={value => setTemplateValue(value)}
                      value={templateValue}
                      name="templateValue"
                      placeholder="جزئیات"
                      inline
                    />
                  </Item>
                </Col>
              </Row>

              <Row className={s.footerRow}>
                <Col className="text-left">
                  <CPButton onClick={closeModal} className={s.cancelButton}>
                    انصراف
                  </CPButton>
                  <CPButton
                    data-cy="submit-message-template"
                    type="primary"
                    htmlType="submit"
                    className={s.modalButton}
                  >
                    {getModalDetail().title}
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
ModalForProductSetting.propTypes = {
  initialValues: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

const mapState = state => ({
  products: state.getProducts.data,
});
const mapDispatch = {
  selectProductAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForProductSetting));
