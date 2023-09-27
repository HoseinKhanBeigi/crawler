import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Descriptions, Divider } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_PHONE_CALL_DETAIL } from '../../repository';
import { getCallDetailByIdAction } from '../../../../store/phoneCalls/phoneCalls.actions';
import convertToJalaliDate from '../../../../utils/date';
import CPMessage from '../../../CP/CPMessage';
import CPLoading from '../../../CP/CPLoading';

const { Item } = Descriptions;
const ModalForPhoneCallDetail = props => {
  const { data } = props;
  const { id } = data;
  const [visible, setVisible] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await props.getCallDetailByIdAction(id);
      if (!result.err) {
        setDetail(result);
      } else CPMessage('خطا در دریافت اطلاعات تماس', 'error');
    })();
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CPModal
      title="جزییات تماس"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_PHONE_CALL_DETAIL}
    >
      <CPLoading spinning={!detail} tip="در حال دریافت اطلاعات تماس...">
        <Descriptions column={2}>
          <Item label="نام تماس گیرنده">
            {!detail?.callerFullName?.includes('null')
              ? detail?.callerFullName
              : '---'}
          </Item>
          <Item label="شماره تلفن">{detail?.phoneNumber}</Item>
          <Item label="منبع">{detail?.source}</Item>
          <Item label="موضوع">{detail?.subject}</Item>
          <Item label="تاریخ">{convertToJalaliDate(detail?.timeDate)}</Item>
          <Item label="مدت زمان">{detail?.duration} ثانیه </Item>
          <Item label="نوع تماس">{detail?.callType}</Item>
          <Item label="نیاز به پیگیری">
            {detail?.followUp === true ? 'دارد' : 'ندارد'}
          </Item>
          <Item label="شماره لوانت">{detail?.levantId || '---'}</Item>
          <Item label="نام اپراتور">{detail?.operatorFullName}</Item>
        </Descriptions>
        <Divider />
        <Descriptions column={1}>
          <Item label="پیام برای پیگیری">
            {detail?.followUpMessage || '---'}
          </Item>
          <Item label="توضیحات">{detail?.description || '---'}</Item>
        </Descriptions>
      </CPLoading>
    </CPModal>
  );
};

ModalForPhoneCallDetail.defaultProps = {
  data: {},
};
ModalForPhoneCallDetail.propTypes = {
  data: PropTypes.object,
  getCallDetailByIdAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  getCallDetailByIdAction,
};

export default connect(null, mapDispatch)(ModalForPhoneCallDetail);
