import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_COMPARE_VIDEO_KYC_SELFI_PHOTO } from '../../repository';
import PictureCard from '../../../KYCVideo/components/PictureCard';

const ModalForCompareVideoKycSelfiPhoto = props => {
  const { inquryImage, loadedImage } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title="مقایسه عکس ها"
      // className={s.modalForCompareVideoKycSelfiPhoto}
      footer={false}
      width="60%"
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_COMPARE_VIDEO_KYC_SELFI_PHOTO}
    >
      <>
        <div>
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ marginTop: 16 }}
          >
            <PictureCard
              height={568}
              title="عکس بارگذاری شده"
              src={loadedImage}
              loading={false}
            />
            <PictureCard
              height={568}
              title="عکس استعلام شده"
              src={inquryImage}
              loading={false}
            />
          </Row>
        </div>
      </>
    </CPModal>
  );
};

ModalForCompareVideoKycSelfiPhoto.propTypes = {
  inquryImage: PropTypes.string,
  loadedImage: PropTypes.string,
};
ModalForCompareVideoKycSelfiPhoto.defaultProps = {
  inquryImage: '',
  loadedImage: '',
};

export default ModalForCompareVideoKycSelfiPhoto;
