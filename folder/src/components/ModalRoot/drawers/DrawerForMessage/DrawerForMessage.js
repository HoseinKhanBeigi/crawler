import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withModal from '../../../HOC/withModal';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import {
  DRAWER_FOR_VIEW_CASE_DETAIL,
  MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE,
} from '../../repository';
import EditCaseForm from '../../../EditCaseForm/EditCaseForm';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import convertToJalaliDate from '../../../../utils/date';
import CPLoading from '../../../CP/CPLoading';

const { Row } = RenderDetail;

const DrawerForMessage = props => {
  const [visible, setVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [loading] = useState(false);
  const [data, setData] = useState(null);

  const showMessageModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: MODAL_FOR_SYSTEMIC_MESSAGE_TEMPLATE,
      props: {
        initialValues,
      },
    });
  };

  useEffect(() => {
    setData(props?.initialValues);
  }, [forceUpdate]);

  const closeDrawer = () => {
    setVisible(false);
  };

  const enableEditMode = () => {
    closeDrawer();
    showMessageModal(data)();
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const onFinishEditing = () => {
    setForceUpdate(p => p + 1);
    disableEditMode();
  };

  const getTemplateType = type => {
    if (type === 'SMS') {
      return 'پیامک';
    } else if (type === 'WHATSAPP') {
      return 'واتس‌آپ';
    } else if (type === 'EMAIL') {
      return 'ایمیل';
    } else if (type === 'CASE') {
      return 'درخواست';
    } else if (type === 'CALL') {
      return 'تماس';
    } else if (type === 'SESSION') {
      return 'جلسه';
    } else if (type === 'ALL') {
      return 'همه';
    }
    return '';
  };

  const Show = (
    <CPLoading spinning={loading} tip="در حال دریافت اطلاعات درخواست...">
      <RenderDetail maxWidth={100}>
        <Row data={data?.title} title="موضوع قالب" />
        <Row data={getTemplateType(data?.type)} title="نوع قالب" />
        <Row data={data?.code} title="کدقالب" />
        <Row data={convertToJalaliDate(data?.timeDate)} title="تاریخ ایجاد" />
        <Row data={data?.createdByName} title="ایجادکننده" />
        <Row
          data={data?.status === 'ACTIVE' ? 'فعال' : 'غیرفعال'}
          type="tag"
          tagColor={data?.status === 'ACTIVE' ? 'green' : 'red'}
          title="وضعیت"
        />
        <Row data={data?.content} title="توضیحات" />
      </RenderDetail>
    </CPLoading>
  );

  return (
    <KianDrawer
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      title="مشاهده قالب"
      drawerId={DRAWER_FOR_VIEW_CASE_DETAIL}
      okText="ویرایش"
      onOk={enableEditMode}
      cancelText="بستن"
      footer={!editMode}
      renderHeader={
        <div style={{ display: 'flex' }}>
          <p>مشاهده قالب</p>
        </div>
      }
    >
      {editMode ? (
        <EditCaseForm
          data={data}
          onFinish={onFinishEditing}
          onCancel={disableEditMode}
        />
      ) : (
        Show
      )}
    </KianDrawer>
  );
};

DrawerForMessage.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(DrawerForMessage);
