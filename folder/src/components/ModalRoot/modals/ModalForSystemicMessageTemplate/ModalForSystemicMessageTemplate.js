import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Col, Form, Row, Icon, Typography } from 'antd';
import { Formik } from 'formik';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForSystemicMessageTemplate.scss';
import CPModal from '../../../CP/CPModal/CPModal';
import CPInput from '../../../CP/CPInput';
import CPButton from '../../../CP/CPButton';
import CPTextArea from '../../../CP/CPTextArea';
import systemicMessageTemplateService from '../../../../service/systemicTemplateMessageService';
import { MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE } from '../../repository';
import { SYSTEMIC_MESSAGE_TEMPLATES_TABLE } from '../../../../store/settings/settings.constants';
import CPSelect from '../../../CP/CPSelect';
import {
  messageType,
  MessageTypeEnum,
} from '../../../../routes/manual-message-templates/tableData';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';

const { Item } = Form;
const { Paragraph } = Typography;

const TEMPLATE_SECTION = [
  {
    value: 'CRM',
    text: 'سی آر ام',
  },
  {
    value: 'ONBOARDING',
    text: 'آنبوردینگ',
  },
];
const ModalForSystemicMessageTemplate = props => {
  const [visible, setVisible] = useState(true);
  const [attachmentToken] = useState(props.initialValues.attachmentToken);
  const [forceIsValid, setForceIsValid] = useState(false);
  const [templateSectionType, setTemplateSectionType] = useState(
    props.initialValues.templateSection || TEMPLATE_SECTION[0].value,
  );
  const [tokens, setTokens] = useState([]);
  const getModalDetail = () => {
    if (Object.keys(props.initialValues).length) {
      return {
        type: 'UPDATE',
        title: 'ویرایش قالب',
        uploadBtnTitle: attachmentToken
          ? 'تغییر فایل ضمیمه'
          : 'آپلود فایل ضمیمه',
      };
    }

    return {
      type: 'CREATE',
      title: 'ایجاد قالب',
      uploadBtnTitle: 'آپلود فایل ضمیمه',
    };
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    content: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    type:
      getModalDetail().type === 'CREATE'
        ? Yup.string().required('انتخاب این فیلد الزامی می باشد.')
        : '',
  });

  useEffect(() => {
    systemicMessageTemplateService
      .getSectionTokens(templateSectionType)
      .then(response => {
        setTokens(response.result);
      })
      .catch(err => err);
  }, [templateSectionType]);

  const onSubmit = values => {
    const { type } = getModalDetail();
    kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).setLoading(true);
    if (type === 'CREATE') {
      const body = {
        ...values,
        type: values.type === 'ALL' ? null : values.type,
        attachmentToken,
        templateSection: templateSectionType,
      };
      systemicMessageTemplateService
        .createNewSystemicMessage(body)
        .then(() => {
          setVisible(false);
          kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
        })
        .catch(() => {
          setVisible(false);
          kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
        });
    } else {
      const body = {
        ...values,
        attachmentToken,
        templateSection: templateSectionType,
      };
      systemicMessageTemplateService
        .editSystemicMessage(body)
        .then(() => {
          setVisible(false);
          kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
        })
        .catch(() => {
          setVisible(false);
          kianTableApi(SYSTEMIC_MESSAGE_TEMPLATES_TABLE).refreshTable();
        });
    }
  };

  const copyTokenOnMessageField = (token, setFieldValue, message) => () => {
    setFieldValue('content', `${message || ''} ${token}`);
  };

  const messageTypes = () =>
    Object.values(MessageTypeEnum)
      .map(type => ({
        value: type,
        text: messageType(type),
      }))
      .concat({ value: 'ALL', text: 'همه' });

  const isDisable = isValid => {
    const { type } = getModalDetail();
    if ((type === 'UPDATE' && forceIsValid) || isValid) return false;
    return !isValid;
  };

  const closeModal = () => {
    setVisible(false);
  };

  const getHelpText = (setFieldValue, message) =>
    tokens?.map(token => (
      <Paragraph
        copyable={{
          onCopy: copyTokenOnMessageField(token, setFieldValue, message),
        }}
        key={token}
        className={s.tokenItem}
      >
        {token}
      </Paragraph>
    ));

  return (
    <CPModal
      visible={visible}
      onCancel={closeModal}
      title={getModalDetail().title}
      modalType={MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE}
      footer={false}
    >
      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {formProps => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isValid,
            setFieldValue,
          } = formProps;
          return (
            <form onSubmit={handleSubmit}>
              <Row className={s.inputGroup}>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={errors.type && touched.type ? errors.type : ''}
                    hasFeedback={!!(values.type && touched.type)}
                    validateStatus={
                      errors.type && touched.type ? 'error' : 'success'
                    }
                  >
                    <div className={s.select_temp}>
                      <CPSelect
                        style={{ flexDirection: 'column' }}
                        className={s.select_temp}
                        placeholder="نوع مرجع را انتخاب نمایید..."
                        label=" مرجع:"
                        onChange={value => {
                          setTemplateSectionType(value);
                          setForceIsValid(true);
                        }}
                        disabled={getModalDetail().type === 'UPDATE'}
                        dataSource={TEMPLATE_SECTION}
                        name="templateSection"
                        defaultValue={templateSectionType}
                        value={templateSectionType}
                        isRequired
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row className={s.inputGroup}>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={errors.title && touched.title ? errors.title : ''}
                    hasFeedback={!!(values.title && touched.title)}
                    validateStatus={
                      errors.title && touched.title ? 'error' : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPInput
                        className={s.input}
                        data-cy="message-template-title"
                        label="موضوع قالب:"
                        isRequired
                        placeholder="موضوع..."
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Item>
                </Col>
                <Col span={12} className={s.templateInput}>
                  <Item
                    help={errors.type && touched.type ? errors.type : ''}
                    hasFeedback={!!(values.type && touched.type)}
                    validateStatus={
                      errors.type && touched.type ? 'error' : 'success'
                    }
                  >
                    <CPSelect
                      className={s.select_temp}
                      placeholder="نوع قالب را انتخاب نمایید..."
                      label="نوع قالب:"
                      onChange={value => setFieldValue('type', value)}
                      dataSource={messageTypes()}
                      name="type"
                      defaultValue={values.type}
                      value={values.type}
                      isRequired
                    />
                  </Item>
                </Col>
              </Row>
              <Row className={s.secondRow}>
                <Col span={24}>
                  <Item
                    help={
                      errors.content && touched.content ? errors.content : ''
                    }
                    hasFeedback={!!(values.content && touched.content)}
                    validateStatus={
                      errors.content && touched.content ? 'error' : 'success'
                    }
                  >
                    <div className={s.input}>
                      <CPTextArea
                        containerStyle={{ flexDirection: 'column' }}
                        data-cy="message-template-content"
                        label="متن قالب:"
                        onChange={handleChange}
                        value={values.content}
                        name="content"
                        type="text"
                        placeholder="متن قالب..."
                        onBlur={handleBlur}
                        rows={4}
                        isRequired
                      />
                    </div>
                  </Item>
                </Col>
              </Row>
              <Row className={s.tokenContainer}>
                {getHelpText(setFieldValue, values.content)}
              </Row>
              {values.type !== 'CALL' && props.initialValues.type !== 'CALL' && (
                <Row>
                  <Col className={s.info}>
                    <Icon type="info-circle" theme="filled" />
                    <p>
                      در هر پیام امکان استفاده از ۷ توکن وجود دارد. توکن‌ها را
                      کپی کرده و در متن خود استفاده نمایید. توکن‌هایی که به صورت
                      [%token?%] وارد شوند در زمان ارسال توسط اپراتور تکمیل
                      می‌گردند. توکن‌های دیگر توسط سیستم و با توجه به اطلاعات
                      کاربر به شکل خودکار تکمیل خواهد شد
                    </p>
                  </Col>
                </Row>
              )}
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
                    disabled={isDisable(isValid)}
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

ModalForSystemicMessageTemplate.propTypes = {
  initialValues: PropTypes.object,
};

ModalForSystemicMessageTemplate.defaultProps = {
  initialValues: {},
};

const mapState = ({ messageTemplate }) => ({
  loading: messageTemplate.uploading,
});

export default connect(mapState)(
  withStyles(s)(ModalForSystemicMessageTemplate),
);
