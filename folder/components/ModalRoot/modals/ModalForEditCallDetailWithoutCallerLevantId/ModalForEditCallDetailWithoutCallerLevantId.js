import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Row, Descriptions, Col } from 'antd';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton';
import { MODAL_FOR_EDIT_CALL_DETAIL_WITHOUT_CALLER_LEVANTID } from '../../repository';
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
import CPSearchFilter from '../../../CP/CPSearchFilter';
import AddLeadForm from '../../../../components/AddLeadForm';
import s from './ModalForEditCallDetailWithoutCallerLevantId.scss';

const { Item } = Descriptions;
const ModalForEditCallDetailWithoutCallerLevantId = props => {
  const { data, templates: phoneCallTypes, levantId } = props;
  const { callType } = data;
  const [visible, setVisible] = useState(true);
  const [visibleSearchFilter, setVisibleSearchFilter] = useState(true);
  const [leadInfo, setLeadInfo] = useState(null);
  const [leadFormVisible, setLeadFormVisible] = useState(false);
  const [submitLabel, SetSubmitLabel] = useState('ثبت تماس');
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
    const { levantId: callerLevantId } = leadInfo;
    const obj = {
      ...form,
      levantId,
      callerLevantId,
      phoneNumber,
      voipCallId,
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

  const handleClickItem = item => setLeadInfo(item);

  const handleLeadSubmit = info => {
    if (info) setLeadInfo(info);
    SetSubmitLabel('ثبت تماس');
    setLeadFormVisible(false);
    setVisibleSearchFilter(false);
  };

  const toggleLeadForm = () => {
    const label = leadFormVisible ? 'ثبت تماس' : 'ثبت سرنخ';
    SetSubmitLabel(label);
    setLeadFormVisible(!leadFormVisible);
  };

  const renderUserInfoDesc = () => {
    const { mobilePhone, nationalCode } = leadInfo || {};
    return (
      <div className={s.desc_container}>
        <Descriptions layout="vertical" column={2}>
          <Item label="شماره تماس" className={s.label}>
            {mobilePhone || '---'}
          </Item>
          <Item label="کد ملی" className={s.label}>
            {nationalCode || '---'}
          </Item>
        </Descriptions>
      </div>
    );
  };

  const handelChange = value => {
    if (!value) setLeadInfo(null);
  };

  return (
    <CPModal
      title="ویرایش تماس"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_EDIT_CALL_DETAIL_WITHOUT_CALLER_LEVANTID}
    >
      {visibleSearchFilter && (
        <Row gutter={24}>
          <Col span={24} style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '12px' }}>
              نام مخاطب مورد نظر را جستجو کنید
            </span>
          </Col>
        </Row>
      )}
      <Row gutter={24} justify="center">
        {visibleSearchFilter && (
          <>
            <Col span={12}>
              <CPSearchFilter
                onClickItem={handleClickItem}
                size="medium"
                onChange={handelChange}
              />
            </Col>
            <Col span={12} style={{ paddingRight: '0!important' }}>
              <span style={{ paddingLeft: '12px' }}>یا</span>
              <CPButton onClick={toggleLeadForm} type="primary">
                {!leadFormVisible ? 'ثبت سرنخ' : 'ثبت تماس'}
              </CPButton>
            </Col>
          </>
        )}
        <Col span={24}>
          {!leadFormVisible && (
            <>
              {leadInfo &&
                submitLabel &&
                visibleSearchFilter &&
                renderUserInfoDesc()}
              <FormBuilder
                schema={schema(
                  phoneCallTypes,
                  followUpMessageVisibility,
                  setFollowUpMessageVisibility,
                )}
                onSubmit={handleSubmit}
                layout="vertical"
                submitLabel={submitLabel}
                loading={submitFormLoading}
              />
            </>
          )}
        </Col>
      </Row>
      {leadFormVisible && (
        <AddLeadForm
          isEditMode={false}
          submitLabel={submitLabel}
          onFormSubmit={handleLeadSubmit}
          inputPerRow={2}
        />
      )}
    </CPModal>
  );
};

ModalForEditCallDetailWithoutCallerLevantId.defaultProps = {
  templates: [],
  data: {},
  levantId: null,
};
ModalForEditCallDetailWithoutCallerLevantId.propTypes = {
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
)(withStyles(s)(ModalForEditCallDetailWithoutCallerLevantId));
