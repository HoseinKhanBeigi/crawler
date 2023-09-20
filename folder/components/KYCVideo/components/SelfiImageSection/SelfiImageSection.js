import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row } from 'antd';
import { mdiScaleBalance } from '@mdi/js';
import MdiIcon from '@mdi/react';
import PropTypes from 'prop-types';
import withModal from '../../../HOC/withModal';
import s from './SelfiImageSection.scss';
import PictureCard from '../../components/PictureCard';
import { MODAL_FOR_COMPARE_VIDEO_KYC_SELFI_PHOTO } from '../../../ModalRoot/repository';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import BadgeStatus from '../BadgeStatus';

const hasInquiryImage = [
  'SIGNATURE',
  'SUBMITTED',
  'APPROVED',
  'VIDEO',
  'IMAGE',
  'REJECTED',
];

const SelfiImageSection = props => {
  const {
    id,
    selfiImageKYCResult,
    status,
    handleChange,
    withApproveButton,
    stateData,
    rejectedByQC,
    primary,
  } = props;
  const [selfiInquiryImage, setSelfiInquiryImage] = useState(null);
  const [selfiInquiryImageLoading, setSelfiInquiryImageLoading] = useState(
    false,
  );
  const [selfiPartyDocumentImage, setSelfiPartyDocumentImage] = useState(null);
  const [
    selfiPartyDocumentImageLoading,
    setSelfiPartyDocumentImageLoading,
  ] = useState(null);
  const { kycSelfieImageStatus } = stateData;
  const shouldShowBadgeStatus =
    status !== 'PERSONAL_INFO' && selfiImageKYCResult?.resultType;

  const openPlayBackModal = () => {
    props.showModalAction({
      type: MODAL_FOR_COMPARE_VIDEO_KYC_SELFI_PHOTO,
      props: {
        inquryImage: selfiInquiryImage,
        loadedImage: selfiPartyDocumentImage,
      },
    });
  };

  useEffect(() => {
    const getPartyDocumentImage = () => {
      setSelfiPartyDocumentImageLoading(true);
      videoAuthenticationService
        .getKycVideoDownloadFile(id, 'SELFIE_IMAGE')
        .then(response => {
          const src = window.URL.createObjectURL(response.result);
          setSelfiPartyDocumentImage(src);
        })
        .finally(() => setSelfiPartyDocumentImageLoading(false));
    };
    const getInquiryImage = () => {
      setSelfiInquiryImageLoading(true);
      videoAuthenticationService
        .getKycVideoDownloadFile(id, 'INQUIRY_IMAGE')
        .then(response => {
          const src = window.URL.createObjectURL(response.result);
          setSelfiInquiryImage(src);
        })
        .finally(() => setSelfiInquiryImageLoading(false));
    };
    if (hasInquiryImage.includes(status) && selfiImageKYCResult?.resultType) {
      getInquiryImage();
      getPartyDocumentImage();
    }
  }, [status]);

  return (
    <>
      <Row
        gutter={24}
        type="flex"
        justify="space-between"
        style={{ marginTop: 16 }}
      >
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          style={{
            padding: !withApproveButton ? '0 15px' : '0',
            width: !withApproveButton ? '100%' : 'auto',
          }}
        >
          <div className={s.row}>
            <span
              className={s.selfi_pic_title}
              style={{
                paddingLeft: withApproveButton ? '12px' : '0',
              }}
            >
              عکس سلفی
            </span>
            {shouldShowBadgeStatus && (
              <BadgeStatus isVerify={selfiImageKYCResult?.verified} />
            )}
          </div>
        </Row>
        {withApproveButton && (
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={kycSelfieImageStatus}
            item="kycSelfieImageStatus"
            rejectedByQC={rejectedByQC}
          />
        )}
      </Row>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginTop: 16, position: 'relative' }}
      >
        <PictureCard
          title="عکس بارگذاری شده"
          src={selfiPartyDocumentImage}
          loading={selfiPartyDocumentImageLoading}
        />
        <PictureCard
          title="عکس استعلام شده"
          src={selfiInquiryImage}
          loading={selfiInquiryImageLoading}
        />
        {selfiPartyDocumentImage?.length && selfiInquiryImage?.length && (
          <div className={s.mdiIconContainer}>
            <MdiIcon
              className={s.compareAction}
              size="24px"
              path={mdiScaleBalance}
              onClick={openPlayBackModal}
            />
          </div>
        )}
      </Row>
    </>
  );
};

SelfiImageSection.propTypes = {
  id: PropTypes.string,
  selfiImageKYCResult: PropTypes.object,
  showModalAction: PropTypes.func.isRequired,
  status: PropTypes.string,
  withApproveButton: PropTypes.bool,
  stateData: PropTypes.object,
  handleChange: PropTypes.func,
  rejectedByQC: PropTypes.bool,
  primary: PropTypes.string,
};
SelfiImageSection.defaultProps = {
  id: '',
  handleChange: () => {},
  withApproveButton: false,
  selfiImageKYCResult: {},
  status: '',
  rejectedByQC: false,
  stateData: {},
  primary: '',
};
export default withModal(withStyles(s)(SelfiImageSection));
