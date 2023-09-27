import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import CPStickyWindow from '../../../CP/CPStickyWindow';
import { hideStickyWindowAction } from '../../../../store/stickyWindow/stickyWindow.actions';
import schema from './fromSchema';
import FormBuilder from '../../../FormBuilder';
import { STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL } from '../StickyWindowRepository';
import CPMessage from '../../../CP/CPMessage';
import {
  getTemplatesAction,
  postAddCallDetailsAction,
} from '../../../../store/phoneCalls/phoneCalls.actions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';

const FormWindowForRegisterCallDetail = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { callInfo, voipType, voipCallId } = data;
  const {
    callerFullName,
    callerPhoneNumber: phoneNumber,
    callerNationalCode,
    callerLevantId,
  } = callInfo;
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const { Item } = Descriptions;

  useEffect(() => {
    props.getTemplatesAction('CALL');
  }, []);

  const handleSubmit = async formData => {
    setSubmitFormLoading(true);
    const body = {
      voipType,
      voipCallId,
      levantId,
      type: 'پیگیری سهام عدالت',
      phoneNumber,
      callerLevantId,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      ...formData,
    };
    const result = await props.postAddCallDetailsAction(body);
    setSubmitFormLoading(false);
    if (!result.err) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      props.hideStickyWindowAction({
        type: STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL,
      });
    } else CPMessage(result?.text, 'error');
  };

  return (
    <>
      <CPStickyWindow
        header="اضافه کردن تماس"
        windowType={STICKY_WINDOW_FOR_REGISTER_CALL_DETAIL}
      >
        <Descriptions column={1}>
          <Item label="شماره تلفن : ">{phoneNumber || 'ندارد'}</Item>
          <Item label="کد ملی : ">{callerNationalCode || 'ندارد'}</Item>
          <Item label="نام : ">{callerFullName || 'ندارد'}</Item>
        </Descriptions>
        <FormBuilder
          schema={schema(
            phoneCallTypes,
            followUpMessageVisibility,
            setFollowUpMessageVisibility,
          )}
          onSubmit={handleSubmit}
          layout="vertical"
          submitLabel="ثبت اطلاعات"
          loading={submitFormLoading}
        />
      </CPStickyWindow>
    </>
  );
};

FormWindowForRegisterCallDetail.defaultProps = {
  data: {},
  templates: [],
  levantId: '',
};
const mapStateToProps = state => ({
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
});
FormWindowForRegisterCallDetail.propTypes = {
  data: PropTypes.object,
  templates: PropTypes.array,
  levantId: PropTypes.string,
  getTemplatesAction: PropTypes.func.isRequired,
  hideStickyWindowAction: PropTypes.func.isRequired,
  postAddCallDetailsAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  postAddCallDetailsAction,
  getTemplatesAction,
  hideStickyWindowAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(FormWindowForRegisterCallDetail);
