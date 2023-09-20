import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {
  postSendSmsAction,
  postSendWhatsAppAction,
} from '../../../store/sendSMS/sendSMS.actions';
import CPMessage from '../../CP/CPMessage';
import { getTemplatesAction } from '../../../store/phoneCalls/phoneCalls.actions';
import FormBuilder from '../../FormBuilder';
import { kianTableApi } from '../../KianTable/helpers/globalApi';
import { PROFILE_CRM_ACTIVITIES_TABLE } from '../../../store/settings/settings.constants';
import opportunityService from '../../../service/opportunityService';

const typeData = [
  {
    label: 'پیامک',
    value: 'SMS',
  },
  // {
  //   label: 'واتس‌اپ',
  //   value: 'WHATSAPP',
  // },
];

const SendSmsForm = props => {
  const {
    deSelectRows,
    levantId,
    smsTemplates,
    whatsAppTemplates,
    sendSmsLoading,
    whatsAppLoading,
    pipeline,
    onCancel,
    isGroupSms,
    leadType,
    leadIds,
  } = props;
  const [type, setType] = useState('SMS');
  const [tokenFields, setTokenFields] = useState([]);
  const [pipelineSmsLoading, setPipelineSmsLoading] = useState(false);

  useEffect(() => {
    props.getTemplatesAction(type);
  }, [type]);

  const makeTokens = formData => {
    const templates = type === 'SMS' ? smsTemplates : whatsAppTemplates;
    const message = templates?.find(s => s.id === formData.subject);
    const tokens = message.tokens || [];

    return tokens.map(token => ({
      name: token,
      value: formData[token],
    }));
  };

  const sendToPipeline = async body => {
    const { pipelineId, selectedProduct } = pipeline;
    setPipelineSmsLoading(true);
    await opportunityService.sendSmsToPipeline(
      pipelineId,
      selectedProduct,
      body,
    );
    setPipelineSmsLoading(false);
    deSelectRows();
  };

  const onSubmit = async (value, formik) => {
    const body = {
      levantId: !isGroupSms ? [levantId] : levantId,
      templateId: value.subject,
      tokens: makeTokens(value),
    };
    if (leadIds?.length > 0) body.leadIds = leadIds;
    if (pipeline) {
      sendToPipeline(body);
      return;
    }

    let result;
    if (value.type === 'SMS') {
      result = await props.postSendSmsAction(body, leadType);
    } else {
      result = await props.postSendWhatsAppAction(body);
    }

    if (result?.err) {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
    } else {
      CPMessage('با موفقیت ثبت شد.', 'success');
      formik.resetForm();
      props.onSubmit();
      deSelectRows();
      kianTableApi(PROFILE_CRM_ACTIVITIES_TABLE).refreshTable();
    }
  };

  const generateTokenFields = message => {
    const tokens = message.tokens || [];
    setTokenFields(
      tokens.map(token => ({
        name: token,
        label: token,
        type: 'input',
        validation: Yup.string().required('ضروری است!'),
        config: {
          placeholder: token,
          grid: 24,
          required: true,
        },
      })),
    );
  };

  const setMessageField = (subject, formik) => {
    const templates = type === 'SMS' ? smsTemplates : whatsAppTemplates;
    const message = templates?.find(s => s.id === subject);
    generateTokenFields(message);
    formik.setValues({
      subject,
      message: message?.content,
      type,
    });
  };

  const handleChangeType = (val, formik) => {
    setType(val);
    setTokenFields([]);
    formik.resetForm({
      type: val,
    });
  };

  const formSchema = () => {
    const templates = type === 'SMS' ? smsTemplates : whatsAppTemplates;
    return [
      {
        name: 'type',
        type: 'radio',
        data: typeData,
        onChange: handleChangeType,
      },
      {
        name: 'subject',
        label: 'موضوع',
        type: 'select',
        onChange: setMessageField,
        data: templates?.map(({ title, id }) => ({
          label: title,
          value: id,
        })),
        config: { placeholder: 'موضوع پیام را انتخاب نمایید', required: true },
      },
      {
        name: 'message',
        label: 'پیام',
        type: 'textarea',
        config: {
          rows: 4,
          placeholder: 'متن پیام...',
          required: true,
          readonly: true,
        },
      },
      ...tokenFields,
    ];
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <FormBuilder
      schema={formSchema()}
      initialValues={{ type: 'SMS' }}
      onSubmit={onSubmit}
      cancelLabel="انصراف"
      onCancel={handleCancel}
      loading={sendSmsLoading || whatsAppLoading || pipelineSmsLoading}
      submitLabel="ارسال"
    />
  );
};

SendSmsForm.propTypes = {
  postSendSmsAction: PropTypes.func.isRequired,
  levantId: PropTypes.array,
  sendSmsLoading: PropTypes.bool.isRequired,
  whatsAppLoading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  postSendWhatsAppAction: PropTypes.func.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  smsTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
  whatsAppTemplates: PropTypes.arrayOf(PropTypes.object).isRequired,
  deSelectRows: PropTypes.func,
  pipeline: PropTypes.object,
  onSubmit: PropTypes.func,
  isGroupSms: PropTypes.bool,
  leadType: PropTypes.string,
  leadIds: PropTypes.string,
};

SendSmsForm.defaultProps = {
  deSelectRows: () => {},
  pipeline: null,
  levantId: [],
  onCancel: () => {},
  onSubmit: () => {},
  isGroupSms: true,
  leadType: null,
  leadIds: null,
};

const mapState = state => ({
  leadData: state.lead.data,
  sendSmsLoading: state.sendSms.loading,
  whatsAppLoading: state.sendSms.postSendWhatsAppLoading,
  smsTemplates: state.phoneCalls.sms,
  whatsAppTemplates: state.phoneCalls.whatsapp,
  token: state.user.data && state.user.data.access_token,
  error: state.upload.error,
});

const mapDispatch = {
  postSendSmsAction,
  postSendWhatsAppAction,
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(SendSmsForm);
