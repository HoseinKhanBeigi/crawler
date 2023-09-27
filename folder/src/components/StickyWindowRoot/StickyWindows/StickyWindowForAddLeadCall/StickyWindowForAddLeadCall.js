import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPStickyWindow from '../../../CP/CPStickyWindow';
import AddLeadForm from '../../../../components/AddLeadForm';
import schema from './formSchema';
import FormBuilder from '../../../FormBuilder';
import { setCallDetailWindowDataAction } from '../../../../store/onComingCall/onComingCall.actions';
import {
  postAddCallDetailsAction,
  getTemplatesAction,
} from '../../../../store/phoneCalls/phoneCalls.actions';
import { STICKY_WINDOW_FOR_ADD_LEAD_CALL } from '../StickyWindowRepository';
import CPMessage from '../../../CP/CPMessage';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import { hideStickyWindowAction } from '../../../../store/stickyWindow/stickyWindow.actions';

const StickyWindowForAddLeadCall = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { voipType, voipCallId, callInfo, neededAction } = data;
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [isLeadsubmitted, setLeadSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState(null);
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const [windowTitle, setWindowTitle] = useState('اضافه کردن سرنخ');
  const needLeadUpdate = neededAction === 'FILL_UPDATE_LEAD_FORM';
  const { callerLevantId } = callInfo;

  useEffect(() => {
    props.getTemplatesAction('CALL');
  }, []);

  const handleSubmit = info => {
    if (info) {
      setLeadInfo(info);
      setLeadSubmitted(true);
      setWindowTitle('افزودن تماس');
    }
  };

  const handleAddCallSubmit = async formData => {
    const { levantId: leadLevantId } = leadInfo;
    const { callerPhoneNumber: phoneNumber } = callInfo;
    setSubmitFormLoading(true);
    const body = {
      voipType,
      voipCallId,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      phoneNumber,
      levantId,
      callerLevantId: leadLevantId,
      ...formData,
    };
    const result = await props.postAddCallDetailsAction(body);
    if (!result.err) {
      setSubmitFormLoading(false);
      CPMessage('با موفقیت ثبت شد.', 'success');
      props.hideStickyWindowAction({ type: STICKY_WINDOW_FOR_ADD_LEAD_CALL });
    } else CPMessage(result?.text, 'error');
  };

  return (
    <>
      <CPStickyWindow
        header={windowTitle}
        windowType={STICKY_WINDOW_FOR_ADD_LEAD_CALL}
      >
        {!isLeadsubmitted && !needLeadUpdate && (
          <>
            <AddLeadForm
              leadGenerationChannel="MANUAL_VOIP"
              isEditMode={false}
              onFormSubmit={handleSubmit}
              inputPerRow={1}
            />
          </>
        )}
        {!isLeadsubmitted && needLeadUpdate && (
          <>
            <AddLeadForm
              isEditMode
              levantId={callerLevantId}
              onFormSubmit={handleSubmit}
              inputPerRow={1}
            />
          </>
        )}
        {isLeadsubmitted && (
          <>
            <FormBuilder
              schema={schema(
                phoneCallTypes,
                followUpMessageVisibility,
                setFollowUpMessageVisibility,
              )}
              onSubmit={handleAddCallSubmit}
              layout="vertical"
              submitLabel="افزودن تماس"
              loading={submitFormLoading}
            />
          </>
        )}
      </CPStickyWindow>
    </>
  );
};

StickyWindowForAddLeadCall.defaultProps = {
  data: null,
  templates: [],
  levantId: '',
};
StickyWindowForAddLeadCall.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  setCallDetailWindowDataAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  levantId: PropTypes.string,
  templates: PropTypes.array,
  getTemplatesAction: PropTypes.func.isRequired,
  postAddCallDetailsAction: PropTypes.func.isRequired,
  hideStickyWindowAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
});
const mapDispatch = {
  setCallDetailWindowDataAction,
  getTemplatesAction,
  postAddCallDetailsAction,
  hideStickyWindowAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(StickyWindowForAddLeadCall);
