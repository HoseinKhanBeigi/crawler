import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import CPMessage from '../../CP/CPMessage';
import { getTemplatesAction } from '../../../store/phoneCalls/phoneCalls.actions';
import FormBuilder from '../../FormBuilder';
import { kianTableApi } from '../../../components/KianTable/helpers/globalApi';
import { postSendEmailAction } from '../../../store/sendEmail/sendEmail.actions';
import { PROFILE_CRM_ACTIVITIES_TABLE } from '../../../store/settings/settings.constants';

const SendEmailForm = props => {
  const {
    levantId,
    loading,
    templates,
    isBulk,
    levantIds,
    onCancel,
    leadType,
    leadIds,
  } = props;
  const [tokenFields, setTokenFields] = useState([]);

  useEffect(() => {
    props.getTemplatesAction('EMAIL');
  }, []);

  const makeTokens = formData => {
    const message = templates?.find(s => s.id === formData.subject);
    const tokens = message.tokens || [];

    return tokens.map(token => ({
      name: token,
      value: formData[token],
    }));
  };

  const onSubmit = async (value, formik) => {
    const body = {
      templateId: value.subject,
      tokens: makeTokens(value),
    };

    if (leadIds?.length > 0) {
      body.leadIds = leadIds;
    }
    if (isBulk) {
      body.levantIds = levantIds;
    } else {
      body.levantId = levantId;
      body.to = value.to;
    }

    const result = await props.postSendEmailAction(body, isBulk, leadType);

    if (result?.err) {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
    } else {
      CPMessage('با موفقیت ارسال شد.', 'success');
      if (isBulk) {
        props.onSubmit();
      } else {
        formik.resetForm();
        props.onSubmit();
        kianTableApi(PROFILE_CRM_ACTIVITIES_TABLE).refreshTable();
      }
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
    const message = templates?.find(s => s.id === subject);
    generateTokenFields(message);
    formik.setValues({
      ...formik.values,
      subject,
      message: message?.content,
    });
  };

  const getFormSchema = () => {
    const formSchema = [];
    if (!isBulk) {
      formSchema.push({
        name: 'to',
        label: 'ارسال به',
        type: 'input',
        validation: Yup.string()
          .email('آدرس ایمیل صحیح نمی‌باشد')
          .required('ایمیل را وارد نمایید'),
        config: {
          placeholder: 'آدرس ایمیل',
          required: true,
        },
      });
    }

    formSchema.push(
      {
        name: 'subject',
        label: 'موضوع',
        type: 'select',
        validation: Yup.string().required('وارد کردن این فیلد ضروری می‌باشد'),
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
        validation: Yup.string().required('وارد کردن این فیلد ضروری می‌باشد'),
        config: {
          rows: 4,
          placeholder: 'متن پیام...',
          required: true,
          readonly: true,
        },
      },
      ...tokenFields,
    );

    return formSchema;
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <FormBuilder
      schema={getFormSchema()}
      onSubmit={onSubmit}
      cancelLabel="انصراف"
      onCancel={handleCancel}
      loading={loading}
      submitLabel="ارسال ایمیل"
    />
  );
};

SendEmailForm.propTypes = {
  postSendEmailAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isBulk: PropTypes.bool,
  getTemplatesAction: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object),
  onCancel: PropTypes.func,
  levantIds: PropTypes.array,
  onSubmit: PropTypes.func,
  leadType: PropTypes.string,
  leadIds: PropTypes.string,
};

SendEmailForm.defaultProps = {
  levantId: null,
  templates: null,
  isBulk: false,
  levantIds: [],
  onCancel: () => {},
  onSubmit: () => {},
  leadType: null,
  leadIds: null,
};

const mapState = state => ({
  loading: state.sendEmail.loading,
  templates: state.phoneCalls.email,
});

const mapDispatch = {
  postSendEmailAction,
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(SendEmailForm);
