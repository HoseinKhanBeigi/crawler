import React, { useState } from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_SHOW_MEETING_DETAILS } from '../../repository';
import convertToJalaliDate from '../../../../utils/date';

const ModalForShowMeetingDetails = ({ currentUser }) => {
  const { firstName, lastName, meeting } = currentUser;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title={`جزئیات قرار ملاقات ${firstName} ${lastName}`}
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_SHOW_MEETING_DETAILS}
    >
      {meeting.inPerson ? (
        <Alert
          type="info"
          message="مراجعه به کارگزاری"
          description="این کاربر جهت احراز هویت به کارگزاری مراجعه خواهد کرد."
        />
      ) : (
        <div style={{ lineHeight: 2 }}>
          <p>
            آدرس: <span>{meeting.street || 'اطلاعاتی در دسترس نیست!'}</span>
          </p>
          <p>
            کد پستی:{' '}
            <span>{meeting.postalCode || 'اطلاعاتی در دسترس نیست!'}</span>
          </p>
          <p>
            تاریخ:{' '}
            <span>
              {convertToJalaliDate(meeting?.fromDate)} ساعت{' '}
              {convertToJalaliDate(meeting?.fromDate, 'HH')} تا{' '}
              {convertToJalaliDate(meeting?.toDate, 'HH')}
            </span>
          </p>
        </div>
      )}
    </CPModal>
  );
};

ModalForShowMeetingDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default ModalForShowMeetingDetails;
