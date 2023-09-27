import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_CALL_DETAIL } from '../../repository';
import {
  getTemplatesAction,
  putCallDetailAction,
  getCallDetailByIdAction,
} from '../../../../store/phoneCalls/phoneCalls.actions';
import { voipForm, manualForm } from './schema';
import FormBuilder from '../../../FormBuilder';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { PHONE_CALL_TABLE } from '../../../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import CPMessage from '../../../CP/CPMessage';
import CPLoading from '../../../CP/CPLoading';

const ModalForEditCallDetail = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { id } = data;
  const [visible, setVisible] = useState(true);
  const [followUpMessageVisibility, setFollowUpMessageVisibility] = useState(
    false,
  );
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [editInfo, setEditInfo] = useState(null);
  const handleSetDate = (value, name) => {
    setDate({ value, name });
  };
  const formSchema =
    data.source === 'voip'
      ? voipForm(
          phoneCallTypes,
          followUpMessageVisibility,
          setFollowUpMessageVisibility,
        )
      : manualForm(
          phoneCallTypes,
          handleSetDate,
          followUpMessageVisibility,
          setFollowUpMessageVisibility,
        );

  const closeModal = () => {
    setVisible(false);
  };

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
    setVisible(false);
  };
  const handleSubmit = async form => {
    setSubmitFormLoading(true);
    const { phoneNumber } = data;
    const { callType, timeDate } = form;
    const obj = {
      ...form,
      levantId,
      phoneNumber,
      voipType: callType,
      context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
      id,
    };
    if (date) {
      obj.startDate = date.value;
    } else obj.startDate = Date.parse(timeDate);
    const result = await props.putCallDetailAction(obj);
    setSubmitFormLoading(false);
    if (!result.err) {
      CPMessage('عملیات ویرایش با موفقیت انجام شد.', 'success');
      refreshAndCloseTable();
    } else CPMessage('خطا در انجام ویرایش!!', 'error');
  };

  return (
    <CPModal
      title="ویرایش تماس"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_EDIT_CALL_DETAIL}
    >
      <CPLoading spinning={!editInfo} tip="در حال دریافت اطلاعات تماس...">
        <FormBuilder
          enableReinitialize
          schema={formSchema}
          initialValues={editInfo}
          onSubmit={handleSubmit}
          layout="vertical"
          submitLabel="ویرایش تماس"
          loading={submitFormLoading}
        />
      </CPLoading>
    </CPModal>
  );
};

ModalForEditCallDetail.defaultProps = {
  templates: [],
  data: {},
  levantId: null,
};
ModalForEditCallDetail.propTypes = {
  data: PropTypes.object,
  levantId: PropTypes.number,
  templates: PropTypes.array,
  putCallDetailAction: PropTypes.func.isRequired,
  getCallDetailByIdAction: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatch)(ModalForEditCallDetail);
