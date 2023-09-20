import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Steps } from 'antd';
import withModal from '../../../../components/HOC/withModal';
import CPModal from '../../../CP/CPModal/CPModal';
import {
  MOADL_FOR_REJECT_VIDEO_KYC,
  MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST,
} from '../../repository';
import { VIDEO_AUTHENTICATION_LIST_TABLE } from '../../../../store/settings/settings.constants';
import CPButton from '../../../CP/CPButton';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import SelfiImageSection from '../../../KYCVideo/components/SelfiImageSection';
import SelfiVideoSection from '../../../KYCVideo/components/SelfiVideoSection';
import SignatureImageSection from '../../../KYCVideo/components/SignatureImageSection';
import CPAlert from '../../../CP/CPAlert';
import CPLoading from '../../../CP/CPLoading';
import HandleAclPermission from '../../../HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';
import CPPopConfirm from '../../../CP/CPPopConfirm/CPPopConfirm';

const { Step } = Steps;

const stepsStatus = ['PERSONAL_INFO', 'IMAGE', 'VIDEO', 'SIGNATURE'];

const ModalForReviewVideoKycRequest = props => {
  const { data, withApproveRejectButtons, withSignature } = props;
  const {
    firstName,
    lastName,
    status,
    persianRejectionCause,
    kycVideoResult,
    id,
  } = data;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const gestureExceptedResult = kycVideoResult?.filter(
    item => item.resultType === 'HAND_GESTURE_DETECTION',
  );
  const selfiImageKYCResult = kycVideoResult?.filter(
    item => item.resultType === 'FACE_RECOGNITION_IMAGE',
  );
  const videoSelfiKycResult = kycVideoResult?.filter(
    item => item.resultType === 'FACE_RECOGNITION_VIDEO',
  );
  const closeModal = () => {
    setVisible(false);
  };

  const openRejectModal = () => {
    props.showModalAction({
      type: MOADL_FOR_REJECT_VIDEO_KYC,
      props: {
        id,
        onSubmit: closeModal,
      },
    });
  };

  const handleApprove = () => {
    setLoading(true);
    videoAuthenticationService
      .postApproveVideoKyc(id)
      .then(() => {
        setTimeout(
          kianTableApi(VIDEO_AUTHENTICATION_LIST_TABLE).refreshTable,
          200,
        );
        setLoading(false);
        closeModal();
      })
      .catch(() => setLoading(false));
  };

  const renderFooter = () => (
    <Row>
      <HandleAclPermission wich={Actions.kycApproveCreate}>
        <CPPopConfirm
          okText="بلی"
          cancelText="خیر"
          title="آیا از ارسال این درخواست به سجام مطمئنید؟"
          onConfirm={handleApprove}
        >
          <CPButton loading={loading} type="primary">
            ارسال درخواست به سجام
          </CPButton>
        </CPPopConfirm>
      </HandleAclPermission>
      <HandleAclPermission wich={Actions.kycRejectCreate}>
        <CPButton
          type="danger"
          ghost
          style={{ marginRight: 8 }}
          onClick={openRejectModal}
        >
          رد کردن
        </CPButton>
      </HandleAclPermission>
    </Row>
  );

  // eslint-disable-next-line no-unused-vars
  const customDot = (dot, { s, index }) => <span>{dot}</span>;

  const renderSteps = () => (
    <Steps
      style={{ marginBottom: '24px' }}
      current={stepsStatus.indexOf(status)}
      size="small"
      progressDot={customDot}
      labelPlacement="vertical"
    >
      <Step
        title="ارسال اطلاعات"
        status={
          status === 'PERSONAL_INFO'
            ? 'error'
            : status === 'IMAGE' || status === 'VIDEO' || status === 'SIGNATURE'
            ? 'finish'
            : 'process'
        }
      />
      <Step
        title="ارسال عکس سلفی"
        status={
          status === 'IMAGE'
            ? 'error'
            : status === 'VIDEO' || status === 'SIGNATURE'
            ? 'finish'
            : 'wait'
        }
      />
      <Step
        title="ارسال ویدیو سلفی"
        status={
          status === 'VIDEO'
            ? 'error'
            : status === 'SIGNATURE'
            ? 'finish'
            : 'wait'
        }
      />
      {withSignature && (
        <Step
          title="نمونه امضا"
          status={
            status === 'SIGNATURE'
              ? 'error'
              : status === 'VIDEO' ||
                status === 'IMAGE' ||
                status === 'PERSONAL_INFO'
              ? 'wait'
              : 'process'
          }
        />
      )}
    </Steps>
  );

  return (
    <CPModal
      title={
        [firstName, lastName].filter(Boolean).join(' ') ||
        'مدال مشاهده احراز هویت'
      }
      visible={visible}
      footer={
        status === 'SUBMITTED' && withApproveRejectButtons && renderFooter()
      }
      onCancel={closeModal}
      onOk={handleApprove}
      width={592}
      modalType={MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST}
    >
      <CPLoading spinning={loading} tip="در حال ارسال درخواست به سجام">
        {stepsStatus.includes(status) && renderSteps()}
        {status === 'REJECTED' && persianRejectionCause && (
          <div style={{ marginBottom: 25 }}>
            <CPAlert showIcon type="error" message={persianRejectionCause} />
          </div>
        )}
        <SelfiImageSection
          id={id}
          selfiImageKYCResult={selfiImageKYCResult[0]}
          status={status}
        />
        <SelfiVideoSection
          id={id}
          status={status}
          videoSelfiKycResult={videoSelfiKycResult[0]}
          gestureExceptedResult={gestureExceptedResult[0]}
        />
        {withSignature && <SignatureImageSection status={status} id={id} />}
      </CPLoading>
    </CPModal>
  );
};

ModalForReviewVideoKycRequest.propTypes = {
  data: PropTypes.object.isRequired,
  showModalAction: PropTypes.func.isRequired,
  withApproveRejectButtons: PropTypes.bool,
  withSignature: PropTypes.bool,
};

ModalForReviewVideoKycRequest.defaultProps = {
  withApproveRejectButtons: true,
  withSignature: true,
};

export default withModal(ModalForReviewVideoKycRequest);
