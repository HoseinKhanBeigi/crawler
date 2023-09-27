import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import { DRAWER_FOR_VIEW_CALL_DETAILS } from '../../repository';
import { getCallDetailByIdAction } from '../../../../store/phoneCalls/phoneCalls.actions';
import convertToJalaliDate from '../../../../utils/date';
import CPMessage from '../../../CP/CPMessage';
import CPLoading from '../../../CP/CPLoading';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import RenderDetailRow from '../../../../routes/sessions/components/SessionDrawer/components/RenderDetailRow/RenderDetailRow';
import EditCallDetailForm from '../../../EditCallDetailForm/EditCallDetailForm';

const DrawerForViewCallDetails = props => {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(props.data);
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
  }, [data]);

  const closeModal = () => {
    setVisible(false);
  };

  const turnOnEditMode = () => {
    setEditMode(true);
  };
  const closeEditMode = () => {
    setEditMode(false);
  };

  const onEdit = obj => {
    setData(obj);
  };
  return (
    <KianDrawer
      title="جزییات تماس"
      visible={visible}
      onCancel={closeModal}
      onClose={closeModal}
      drawerId={DRAWER_FOR_VIEW_CALL_DETAILS}
      okText="ویرایش"
      onOk={turnOnEditMode}
      cancelText="بستن"
      footer={!editMode}
    >
      {editMode ? (
        <EditCallDetailForm
          data={data}
          onCancel={closeEditMode}
          onEdit={onEdit}
        />
      ) : (
        <CPLoading spinning={!detail} tip="در حال دریافت اطلاعات تماس...">
          <RenderDetailRow
            title="نام تماس گیرنده"
            data={
              !detail?.callerFullName?.includes('null')
                ? detail?.callerFullName
                : '---'
            }
          />
          <RenderDetailRow title="شماره تلفن" data={detail?.callNumber} />
          <RenderDetailRow title="منبع" data={detail?.source} />
          <RenderDetailRow title="موضوع" data={detail?.subject} />
          <RenderDetailRow
            title="تاریخ"
            data={convertToJalaliDate(detail?.timeDate)}
          />
          <RenderDetailRow
            title="مدت زمان"
            data={`${detail?.duration} ثانیه`}
          />
          <RenderDetailRow title="نوع تماس" data={detail?.callType} />
          <RenderDetailRow
            title="نیاز به پیگیری"
            data={detail?.followUp === true ? 'دارد' : 'ندارد'}
          />
          <RenderDetailRow
            title="شماره لوانت"
            data={detail?.levantId || '---'}
          />
          <RenderDetailRow
            title="نام اپراتور"
            data={detail?.operatorFullName}
          />
          <Divider />
          <RenderDetailRow
            title="پیام برای پیگیری"
            data={detail?.followUpMessage || '---'}
          />
          <RenderDetailRow
            title="توضیحات"
            data={detail?.description || '---'}
          />
        </CPLoading>
      )}
    </KianDrawer>
  );
};

DrawerForViewCallDetails.defaultProps = {
  data: {},
};
DrawerForViewCallDetails.propTypes = {
  data: PropTypes.object,
  getCallDetailByIdAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  getCallDetailByIdAction,
};

export default connect(null, mapDispatch)(DrawerForViewCallDetails);
