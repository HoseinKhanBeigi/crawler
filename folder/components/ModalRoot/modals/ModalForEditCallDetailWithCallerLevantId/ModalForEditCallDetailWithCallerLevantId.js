import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_EDIT_CALL_DETAIL_WITH_CALLER_LEVANTID } from '../../repository';
import {
  getTemplatesAction,
  postAddCallDetailsAction,
} from '../../../../store/phoneCalls/phoneCalls.actions';
import { schema } from './schema';
import FormBuilder from '../../../FormBuilder/FormBuilder';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { PHONE_CALL_TABLE } from '../../../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import CPMessage from '../../../CP/CPMessage/CPMessage';

const ModalForEditCallDetailWithCallerLevantId = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { callerLevantId, callType } = data;
  const [visible, setVisible] = useState(true);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const closeModal = () => {
    setVisible(false);
  };

  const refreshAndCloseTable = () => {
    kianTableApi(PHONE_CALL_TABLE).refreshTable();
    setVisible(false);
  };
  const handleSubmit = async form => {
    setSubmitFormLoading(true);
    const { phoneNumber, voipCallId } = data;
    const obj = {
      ...form,
      levantId,
      voipCallId,
      callerLevantId,
      phoneNumber,
      voipType: callType,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
    };
    const result = await props.postAddCallDetailsAction(obj);
    setSubmitFormLoading(false);
    if (!result.err) {
      CPMessage('عملیات ثبت با موفقیت انجام شد.', 'success');
      refreshAndCloseTable();
    } else CPMessage('خطا در انجام ثبت!!', 'error');
  };

  return (
    <CPModal
      title="ویرایش تماس"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_EDIT_CALL_DETAIL_WITH_CALLER_LEVANTID}
    >
      <FormBuilder
        schema={schema(
          phoneCallTypes,
          followUpMessageVisibility,
          setFollowUpMessageVisibility,
        )}
        onSubmit={handleSubmit}
        layout="vertical"
        submitLabel="ثبت تماس"
        loading={submitFormLoading}
      />
    </CPModal>
  );
};

ModalForEditCallDetailWithCallerLevantId.defaultProps = {
  templates: [],
  data: {},
  levantId: null,
};
ModalForEditCallDetailWithCallerLevantId.propTypes = {
  data: PropTypes.object,
  levantId: PropTypes.number,
  templates: PropTypes.array,
  postAddCallDetailsAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  getTemplatesAction,
  postAddCallDetailsAction,
};
const mapStateToProps = state => ({
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
});
export default connect(
  mapStateToProps,
  mapDispatch,
)(ModalForEditCallDetailWithCallerLevantId);
