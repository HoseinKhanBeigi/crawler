import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton/CPButton';
import s from './ModalForConfirmSejamRefetchInformation.scss';
import { MODAL_FOR_CONFIRM_SEJAM_REFETCH_INFORMATION } from '../../repository';
import { postSejamRefetchOtpCode } from '../../../../service/toolsService';

const ModalForConfirmSejamRefetchInformation = props => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data, onSuccess } = props;
  const { phoneNumber, nationalCode } = data;

  const closeModal = () => {
    setVisible(false);
  };

  const sendOtpCodeAndGetSejamInfo = () => {
    setLoading(true);
    const body = {
      mobileNo: phoneNumber,
      nationalCode,
      needReview: false,
    };
    postSejamRefetchOtpCode(body).then(
      response => {
        setLoading(false);
        onSuccess(response);
        closeModal();
      },
      () => {
        setLoading(false);
      },
    );
  };

  return (
    <CPModal
      modalType={MODAL_FOR_CONFIRM_SEJAM_REFETCH_INFORMATION}
      visible={visible}
      title="تایید و به روزرسانی اطلاعات"
      footer={false}
      onCancel={closeModal}
    >
      <div className={s.wrapper}>
        <Icon
          type="info-circle"
          theme="filled"
          style={{ color: '#1890ff', fontSize: '14px' }}
        />
        <div>
          <h4>
            آیا از به روزرسانی اطلاعات کاربر بر اساس اطلاعات جدید دریافت شده از
            سامانه سجام اطمینان دارید؟
          </h4>
          <div className={s.fieldTitle}>
            در صورت تایید. بازگردانی اطلاعات به حالت قبل امکان پذیر نخواهد بود.
          </div>
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={sendOtpCodeAndGetSejamInfo}
            type="primary"
          >
            تایید و به‌روزرسانی
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForConfirmSejamRefetchInformation.propTypes = {
  data: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};
ModalForConfirmSejamRefetchInformation.defaultProps = {
  onSuccess: () => {},
};

export default withStyles(s)(ModalForConfirmSejamRefetchInformation);
