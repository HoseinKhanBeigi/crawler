import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withModal from '../../../HOC/withModal';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import {
  MODAL_FOR_PRODUCT_SETTING,
  DRAWER_FOR_PRODUCT_SETTING,
} from '../../repository';
import EditCaseForm from '../../../EditCaseForm/EditCaseForm';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import CPLoading from '../../../CP/CPLoading';

const { Row } = RenderDetail;

const DrawerForProductSetting = props => {
  const [visible, setVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [loading] = useState(false);
  const [data, setData] = useState(null);

  const showMessageModal = ({ ...initialValues }) => () => {
    props.showModalAction({
      type: MODAL_FOR_PRODUCT_SETTING,
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

  const getResult = type => {
    if (type === 'SUCCESS') {
      return 'موفق';
    } else if (type === 'FAIL') {
      return 'ناموفق';
    }
    return '';
  };

  const Show = (
    <CPLoading spinning={loading} tip="در حال دریافت اطلاعات درخواست...">
      <RenderDetail maxWidth={100}>
        <Row data={data?.productTitle} title="محصول" />
        <Row data={data?.actionStageTitle} title="اکشن" />
        <Row data={data?.notificationTemplateCode} title="کد قالب" />
        <Row data={getResult(data?.resultType)} title="نتیجه اکشن" />
        <Row
          data={data?.active ? 'فعال' : 'غیرفعال'}
          type="tag"
          tagColor={data?.active ? 'green' : 'red'}
          title="وضعیت"
        />
      </RenderDetail>
    </CPLoading>
  );

  return (
    <KianDrawer
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      title="مشاهده قالب"
      drawerId={DRAWER_FOR_PRODUCT_SETTING}
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

DrawerForProductSetting.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(DrawerForProductSetting);
