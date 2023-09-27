import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Collapse, Divider, Form, Icon, Row, Typography } from 'antd';
import { Formik } from 'formik';
import cs from 'classnames';
import * as Yup from 'yup';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForMessageTemplate.scss';

import CPModal from '../../../CP/CPModal';
import CPInput from '../../../CP/CPInput';
import CPButton from '../../../CP/CPButton';
import CPTextArea from '../../../CP/CPTextArea';
import {
  createNewMessageTemplateAction,
  editMessageTemplateAction,
} from '../../../../store/messageTemplate/messageTemplate.actions';
import CPUploadInGluster from '../../../CP/CPUploadInGluster';
import LazyImage from '../../../LazyImage';
import { getFileExtensionFromPath } from '../../../../utils/string';
import CPSelect from '../../../CP/CPSelect';
import {
  messageType,
  MessageTypeEnum,
} from '../../../../routes/manual-message-templates/tableData';
import { MESSAGE_TEMPLATES_TABLE } from '../../../../store/settings/settings.constants';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { MODAL_FOR_MESSAGE_TEMPLATE } from '../../repository';

const { Item } = Form;
const { Panel } = Collapse;
const { Paragraph } = Typography;

const messageTokens = [
  '[%token1%]',
  '[%token2%]',
  '[%token3%]',
  '[%token4%]',
  '[%token5%]',
  '[%fullname%]',
  '[%firstname%]',
  '[%lastname%]',
  '[%levantid%]',
];

const ModalForMessageTemplate = props => {
  const [visible, setVisible] = useState(true);
  const [attachmentToken, setAttachmentToken] = useState(
    props.initialValues.attachmentToken,
  );
  const [forceIsValid, setForceIsValid] = useState(false);

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

  const onSubmit = async values => {
    const { type } = getModalDetail();
    let finalAction = kianTableApi(MESSAGE_TEMPLATES_TABLE).refreshTable;
    let result;
    if (type === 'CREATE') {
      result = await props.createNewMessageTemplateAction({
        ...values,
        type: values.type === 'ALL' ? null : values.type,
        attachmentToken,
        templateSection: 'CRM',
      });
      finalAction = kianTableApi(MESSAGE_TEMPLATES_TABLE).resetTable;
    } else {
      result = await props.editMessageTemplateAction({
        ...values,
        attachmentToken,
        templateSection: 'CRM',
      });
    }

    if (!result.err) {
      setVisible(false);
      finalAction();
    }
  };

  const copyTokenOnMessageField = (token, setFieldValue, message) => () => {
    setFieldValue('content', `${message || ''} ${token}`);
  };

  const getHelpText = (setFieldValue, message) => (
    <div className="help-box">
      <Paragraph>
        در هر پیام امکان استفاده از ۵ توکن وجود دارد. توکن‌ها را کپی کرده و در
        متن خود استفاده نمایید. توکن‌هایی که به صورت [%token?%] وارد شوند در
        زمان ارسال توسط اپراتور تکمیل می‌گردند. توکن‌های دیگر توسط سیستم و با
        توجه به اطلاعات کاربر به شکل خودکار تکمیل خواهد شد.
      </Paragraph>
      <Divider />
      <div className="helper-tokens">
        {messageTokens.map(token => (
          <Paragraph
            copyable={{
              onCopy: copyTokenOnMessageField(token, setFieldValue, message),
            }}
            code
            key={token}
          >
            {token}
          </Paragraph>
        ))}
      </div>
    </div>
  );

  const deleteAttachment = () => {
    setAttachmentToken(null);
    setForceIsValid(true);
  };

  const messageTypes = () =>
    Object.values(MessageTypeEnum)
      .map(type => ({
        value: type,
        text: messageType(type),
      }))
      .concat({ value: 'ALL', text: 'همه' });

  const renderAttachmentImage = () => {
    const DeleteButton = getModalDetail().type !== 'CREATE' && (
      <Icon type="close" title="حذف ضمیمه" onClick={deleteAttachment} />
    );

    if (attachmentToken) {
      const fileExt = getFileExtensionFromPath(attachmentToken);
      switch (fileExt) {
        case 'jpg':
        case 'png':
          return (
            <div className="deletable-wrapper">
              {DeleteButton}
              <LazyImage getTokenBefore path={attachmentToken} />
            </div>
          );
        default:
          return (
            <span>
              {DeleteButton}
              فایل {fileExt} غیر قابل نمایش...
            </span>
          );
      }
    } else {
      return null;
    }
  };

  const onUpload = data => {
    const { name } = data[0];
    setAttachmentToken(name);
    setForceIsValid(true);
  };

  const isDisable = isValid => {
    const { type } = getModalDetail();
    if ((type === 'UPDATE' && forceIsValid) || isValid) return false;
    return !isValid;
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      visible={visible}
      onCancel={closeModal}
      title={getModalDetail().title}
      modalType={MODAL_FOR_MESSAGE_TEMPLATE}
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
            <form className={s.root} onSubmit={handleSubmit}>
              <Row>
                <Col span={24}>
                  <Item
                    help={errors.title && touched.title ? errors.title : ''}
                    hasFeedback={!!(values.title && touched.title)}
                    validateStatus={
                      errors.title && touched.title ? 'error' : 'success'
                    }
                  >
                    <CPInput
                      className={cs(s.input, 'margin-b-5')}
                      data-cy="message-template-title"
                      label="موضوع قالب:"
                      placeholder="موضوع..."
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      onBlur={handleBlur}
                    />
                  </Item>
                </Col>
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
                    <CPTextArea
                      className={cs(s.textArea, 'margin-b-5')}
                      data-cy="message-template-content"
                      label="متن قالب:"
                      onChange={handleChange}
                      value={values.content}
                      name="content"
                      type="text"
                      placeholder="متن قالب..."
                      onBlur={handleBlur}
                      rows={4}
                    />
                  </Item>
                </Col>
                {getModalDetail().type === 'CREATE' && (
                  <Col span={24}>
                    <Item
                      help={errors.type && touched.type ? errors.type : ''}
                      hasFeedback={!!(values.type && touched.type)}
                      validateStatus={
                        errors.type && touched.type ? 'error' : 'success'
                      }
                    >
                      <CPSelect
                        className={cs(s.select, 'margin-b-5')}
                        placeholder="نوع قالب را انتخاب نمایید..."
                        label="نوع قالب:"
                        onChange={value => setFieldValue('type', value)}
                        dataSource={messageTypes()}
                        name="type"
                        value={values.type}
                      />
                    </Item>
                  </Col>
                )}
              </Row>
              {values.type !== 'SMS' &&
                props.initialValues.type !== 'SMS' &&
                values.type !== 'CALL' &&
                props.initialValues.type !== 'CALL' && (
                  <Row type="flex" justify="start">
                    <Col span={8} className="image-preview">
                      {renderAttachmentImage()}
                    </Col>
                    <Col span={16} className="upload-box">
                      <CPUploadInGluster
                        onUpload={onUpload}
                        title={getModalDetail().uploadBtnTitle}
                      />
                    </Col>
                  </Row>
                )}
              {values.type !== 'CALL' && props.initialValues.type !== 'CALL' && (
                <Row>
                  <Divider style={{ marginBottom: 0 }} />
                  <Col>
                    <Collapse bordered={false}>
                      <Panel header="راهنمای استفاده از قالب جدید" key="help">
                        {getHelpText(setFieldValue, values.content)}
                      </Panel>
                    </Collapse>
                  </Col>
                  <Divider style={{ marginTop: 0 }} />
                </Row>
              )}
              <Row>
                <Col className="text-left">
                  <CPButton onClick={closeModal}>انصراف</CPButton>
                  <CPButton
                    data-cy="submit-message-template"
                    type="primary"
                    htmlType="submit"
                    className="margin-r-5"
                    loading={props.loading}
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

ModalForMessageTemplate.propTypes = {
  createNewMessageTemplateAction: PropTypes.func.isRequired,
  editMessageTemplateAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  initialValues: PropTypes.object,
};

ModalForMessageTemplate.defaultProps = {
  initialValues: {},
};

const mapState = ({ messageTemplate }) => ({
  loading: messageTemplate.uploading,
});

const mapDispatch = {
  createNewMessageTemplateAction,
  editMessageTemplateAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForMessageTemplate));
