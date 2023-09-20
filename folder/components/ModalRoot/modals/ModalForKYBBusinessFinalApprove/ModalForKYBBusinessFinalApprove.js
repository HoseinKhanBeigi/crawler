import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Row, Divider } from 'antd';
import { connect } from 'react-redux';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_KYB_BUSINESS_FINAL_APPROVE } from '../../repository';
import CPButton from '../../../CP/CPButton/CPButton';
import StackHoldersTab from './components/StackHoldersTab';
import s from './ModalForKYBBusinessFinalApprove.scss';

import CompanyInfo from './components/CompanyInfo';
import {
  getOpportunitiesAction,
  postConfirmByQcAction,
  postRejectByQcAction,
} from '../../../../store/opportunities/opportunities.actions';
import CPMessage from '../../../CP/CPMessage';

const ModalForKYBBusinessFinalApprove = props => {
  const { opportunittyId, stakeHolders } = props;
  const [loading, setLoading] = useState(false);
  const [rejectByQcLoading, setRejectByQcLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const rejectByQc = async () => {
    setRejectByQcLoading(true);
    const response = await props.postRejectByQcAction(opportunittyId, true);
    if (response && !response?.err) {
      CPMessage('رد شد.', 'success');
      setRejectByQcLoading(false);
      reload();
      closeModal();
    } else {
      setRejectByQcLoading(false);
      CPMessage('خطا', 'error');
    }
  };

  const confirmByQc = async () => {
    setLoading(true);
    const response = await props.postConfirmByQcAction(opportunittyId, {});
    if (!response?.err) {
      setLoading(false);
      CPMessage('تایید شد.', 'success');
      reload();
      closeModal();
    } else {
      setLoading(false);
      CPMessage('خطا', 'error');
    }
  };

  const renderFooter = () => (
    <div className={s.footer}>
      <CPButton
        type="danger"
        style={{ marginLeft: 8 }}
        onClick={rejectByQc}
        loading={rejectByQcLoading}
      >
        رد همه اطلاعات
      </CPButton>
      <CPButton loading={loading} type="primary" onClick={confirmByQc}>
        تایید نهایی
      </CPButton>
    </div>
  );

  return (
    <CPModal
      title="تایید نهایی"
      visible={visible}
      onCancel={closeModal}
      footer={renderFooter()}
      width="75%"
      className={s.MODAL_FOR_KYB_BUSINESS_FINAL_APPROVE}
      modalType={MODAL_FOR_KYB_BUSINESS_FINAL_APPROVE}
    >
      <Row gutter={24}>
        <Col span={10} style={{ paddingLeft: 0 }}>
          <div style={{ backgroundColor: '#f5f5f5', padding: '18px 24px' }}>
            <h4>مشخصات شرکت</h4>
            <Divider />
            <CompanyInfo />
          </div>
        </Col>
        {stakeHolders?.length && (
          <Col span={14}>
            <div style={{ padding: '18px 0' }}>
              <h4>اعضا</h4>
              <Divider />
              <StackHoldersTab />
            </div>
          </Col>
        )}
      </Row>
    </CPModal>
  );
};
ModalForKYBBusinessFinalApprove.defaultProps = {
  opportunittyId: '',
};
ModalForKYBBusinessFinalApprove.propTypes = {
  postConfirmByQcAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  postRejectByQcAction: PropTypes.func.isRequired,
  stakeHolders: PropTypes.array.isRequired,
  opportunittyId: PropTypes.string,
};

const mapStateToProps = state => ({
  identificationWithDocsData: state?.opportunities?.identificationWithDocsData,
  opportunittyId: state?.opportunities?.currentUser?.id,
  stakeHolders:
    state.opportunities?.identificationWithDocsData?.businessStakeholdersDto
      ?.stakeholders,
});

const mapDispatch = {
  postRejectByQcAction,
  getOpportunitiesAction,
  postConfirmByQcAction,
};
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForKYBBusinessFinalApprove));
