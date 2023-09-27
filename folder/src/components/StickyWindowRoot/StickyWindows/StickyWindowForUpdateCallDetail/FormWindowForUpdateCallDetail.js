import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPStickyWindow from '../../../CP/CPStickyWindow';
import schema from './formSchema';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import { hideStickyWindowAction } from '../../../../store/stickyWindow/stickyWindow.actions';
import FormBuilder from '../../../FormBuilder';
import {
  getTemplatesAction,
  postAddCallDetailsAction,
} from '../../../../store/phoneCalls/phoneCalls.actions';
import { setCallDetailWindowDataAction } from '../../../../store/onComingCall/onComingCall.actions';
import { STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL } from '../StickyWindowRepository';
import CPMessage from '../../../CP/CPMessage';
import SearchFilterWithDetailBox from '../../../SearchFilterWithDetailBox';

const FormWindowForUpdateCallDetail = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { voipType, voipCallId, callInfo } = data;
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [callDetail, setCallDetail] = useState(null);
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const [searchDetail, setSearchDetail] = useState([]);

  useEffect(() => {
    props.getTemplatesAction('CALL');
  }, []);

  const handleSubmit = async formData => {
    if (callDetail) {
      const { levantId: callerLevantId } = callDetail;
      const { callerPhoneNumber: phoneNumber } = callInfo;
      setSubmitFormLoading(true);
      const body = {
        voipType,
        voipCallId,
        levantId,
        phoneNumber,
        context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
        callerLevantId,
        ...formData,
      };
      const result = await props.postAddCallDetailsAction(body);
      setSubmitFormLoading(false);
      if (!result.err) {
        CPMessage('با موفقیت ثبت شد.', 'success');
        props.hideStickyWindowAction({
          type: STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL,
        });
      } else CPMessage(result?.text, 'error');
    } else
      CPMessage('لطفا از کادر جستجو بالا یک شخص را انتخاب کنید!', 'warning');
  };

  const handleSearchItemClick = d => {
    setCallDetail(d);
    const { firstName, lastName } = d;
    setSearchDetail([
      { value: firstName, label: 'نام' },
      { value: lastName, label: 'نام خانوادگی' },
    ]);
  };

  return (
    <>
      <CPStickyWindow
        header="ثبت تماس ورودی"
        windowType={STICKY_WINDOW_FOR_UPDATE_CALL_DETAIL}
      >
        <SearchFilterWithDetailBox
          lists={searchDetail}
          onClickItem={handleSearchItemClick}
        />
        <FormBuilder
          onSubmit={handleSubmit}
          schema={schema(
            phoneCallTypes,
            followUpMessageVisibility,
            setFollowUpMessageVisibility,
          )}
          layout="vertical"
          submitLabel="ثبت تماس"
          loading={submitFormLoading}
        />
      </CPStickyWindow>
    </>
  );
};

FormWindowForUpdateCallDetail.defaultProps = {
  data: {},
  templates: [],
  levantId: '',
};

FormWindowForUpdateCallDetail.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  setCallDetailWindowDataAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
  data: PropTypes.object,
  levantId: PropTypes.string,
  getTemplatesAction: PropTypes.func.isRequired,
  postAddCallDetailsAction: PropTypes.func.isRequired,
  hideStickyWindowAction: PropTypes.func.isRequired,
};

const mapState = state => ({
  windowInfo: state.stickyWindow,
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
});
const mapDispatch = {
  setCallDetailWindowDataAction,
  postAddCallDetailsAction,
  getTemplatesAction,
  hideStickyWindowAction,
};

export default connect(mapState, mapDispatch)(FormWindowForUpdateCallDetail);
