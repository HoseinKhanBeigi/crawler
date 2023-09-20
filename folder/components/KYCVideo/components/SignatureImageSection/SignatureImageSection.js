import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import s from './SignatureImageSection.scss';
import PictureCard from '../PictureCard/PictureCard';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';

const hasSignauture = ['SUBMITTED', 'APPROVED', 'REJECTED'];

const SignatureImageSection = props => {
  const {
    id,
    status,
    handleChange,
    withApproveButton,
    stateData,
    rejectedByQC,
    primary,
  } = props;
  const [signatureImageSrc, setSignatureImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const { kycSignatureImageStatus } = stateData;

  useEffect(() => {
    const getImage = () => {
      setLoading(true);
      videoAuthenticationService
        .getKycVideoDownloadFile(id, 'SIGNATURE_IMAGE')
        .then(
          response => {
            const src = window.URL.createObjectURL(response?.result);
            setSignatureImageSrc(src);
            setLoading(false);
          },
          () => setLoading(false),
        );
    };
    if (hasSignauture.includes(status)) getImage();
  }, []);

  return (
    <>
      <Row
        gutter={24}
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginTop: '16px' }}
      >
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          style={{
            marginTop: 16,
            padding: withApproveButton ? '0 15px' : '0',
            width: !withApproveButton ? '100%' : 'auto',
          }}
        >
          <span
            className={s.selfi_pic_title}
            style={{ paddingLeft: withApproveButton ? '12px' : '0' }}
          >
            نمونه امضا
          </span>
        </Row>
        {withApproveButton && (
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={kycSignatureImageStatus}
            item="kycSignatureImageStatus"
            rejectedByQC={rejectedByQC}
          />
        )}
      </Row>
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style={{ marginTop: 16 }}
      >
        <PictureCard
          withExpand
          title="عکس بارگذاری شده"
          src={signatureImageSrc}
          loading={loading}
        />
      </Row>
    </>
  );
};

SignatureImageSection.propTypes = {
  id: PropTypes.string,
  status: PropTypes.string,
  withApproveButton: PropTypes.bool,
  stateData: PropTypes.object,
  handleChange: PropTypes.func,
  rejectedByQC: PropTypes.bool,
  primary: PropTypes.string,
};
SignatureImageSection.defaultProps = {
  id: '',
  status: '',
  handleChange: () => {},
  withApproveButton: false,
  rejectedByQC: false,
  stateData: {},
  primary: '',
};
export default withStyles(s)(SignatureImageSection);
