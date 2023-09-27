import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  getCallDetailByIdAction,
  getTemplatesAction,
  putCallDetailAction,
} from '../../store/phoneCalls/phoneCalls.actions';
import {
  manualForm,
  voipForm,
} from '../ModalRoot/drawers/DrawerForEditCallDetail/schema';
import CPMessage from '../CP/CPMessage';
import { kianTableApi } from '../KianTable/helpers/globalApi';
import { PHONE_CALL_TABLE } from '../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import CPLoading from '../CP/CPLoading';
import FormBuilder from '../FormBuilder';
import partyService from '../../service/partyService';

function mapPhone(value) {
  if (/^(09(\d{9}))$/.test(value)) {
    return {
      phoneNumber: value,
      tel: null,
      telPrefix: null,
    };
  } else if (/^(0[1-8](\d{9}))$/.test(value)) {
    return {
      tel: value.substring(3, 11),
      telPrefix: value.substring(0, 3),
      phoneNumber: null
    };
  }
}

const EditCallDetailForm = props => {
  const {data, templates: phoneCallTypes, levantId, onCancel, onEdit} = props;
  const {id, callerLevantId} = data;
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [editInfo, setEditInfo] = useState(null);
  const [defaultPhone, setDefaultPhone] = useState(null);
  const [allPhoneNumbers, setAllPhoneNumbers] = useState(null);
  const handleSetDate = (value, name) => {
    setDate({value, name});
  };
  useEffect(() => {
    partyService.getPersonContactInfoByLevantId(callerLevantId).then(res => {
      const {homeAddressInfo, workAddressInfo, mobile, mobilePhone} = res;
      const phones = [];

      if (mobile || mobilePhone) {
        phones.push({value: mobile || mobilePhone,
          label: `${mobile || mobilePhone} (شماره همراه) `,})
      }

      if (homeAddressInfo.tel) {
        phones.push({
          value: homeAddressInfo.telPrefix + homeAddressInfo.tel,
          label: `${`${homeAddressInfo.telPrefix}-${homeAddressInfo.tel}`} (شماره محل سکونت) `,
        });
      }

      if (workAddressInfo.tel) {
        phones.push({
          value: workAddressInfo.telPrefix + workAddressInfo.tel,
          label: `${`${workAddressInfo.telPrefix}-${workAddressInfo.tel}`} (شماره محل کار) `,
        });
      }

      setAllPhoneNumbers(phones);
    });
  }, []);

  const formSchema =
    data.source === 'voip'
      ? voipForm(
        phoneCallTypes,
        followUpMessageVisibility,
        setFollowUpMessageVisibility,
        allPhoneNumbers,
      )
      : manualForm(
        phoneCallTypes,
        handleSetDate,
        followUpMessageVisibility,
        setFollowUpMessageVisibility,
        allPhoneNumbers,
      );

  useEffect(() => {
    (async () => {
      const result = await props.getCallDetailByIdAction(id);
      if (!result.err) {
        setEditInfo(result);
      } else CPMessage('خطا در دریافت اطلاعات تماس برای ویرایش!', 'error');
    })();
  }, []);
  const refreshAndCloseTable = () => {
    kianTableApi(PHONE_CALL_TABLE).refreshTable();
    onCancel();
  };
  const handleSubmit = async form => {
    setSubmitFormLoading(true);
    const {callType, timeDate, tel, phoneNumber, callNumber} = form;
    const mappedData = mapPhone(callNumber)
    const obj = {
      ...form,
      levantId,
      voipType: callType,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      id,
      ...mappedData
    };
    if (date) {
      obj.startDate = date.value;
    } else obj.startDate = Date.parse(timeDate);
    const result = await props.putCallDetailAction(obj);
    if (onEdit) onEdit(obj);
    setSubmitFormLoading(false);
    if (!result.err) {
      CPMessage('عملیات ویرایش با موفقیت انجام شد.', 'success');
      refreshAndCloseTable();
    } else CPMessage('خطا در انجام ویرایش!!', 'error');
  };

  return (
    <CPLoading spinning={!editInfo} tip="در حال دریافت اطلاعات تماس...">
      <FormBuilder
        enableReinitialize
        schema={formSchema}
        initialValues={editInfo}
        onSubmit={handleSubmit}
        layout="vertical"
        submitLabel="ویرایش تماس"
        onCancel={onCancel}
        cancelLabel="انصراف"
        loading={submitFormLoading}
      />
    </CPLoading>
  );
};

EditCallDetailForm.defaultProps = {
  templates: [],
  data: {},
  levantId: null,
  onEdit: undefined,
};
EditCallDetailForm.propTypes = {
  data: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  levantId: PropTypes.number,
  templates: PropTypes.array,
  putCallDetailAction: PropTypes.func.isRequired,
  getCallDetailByIdAction: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
};

const mapDispatch = {
  getTemplatesAction,
  putCallDetailAction,
  getCallDetailByIdAction,
};
const mapStateToProps = state => ({
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
});
export default connect(mapStateToProps, mapDispatch)(EditCallDetailForm);
