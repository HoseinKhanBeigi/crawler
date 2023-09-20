import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_VIEW_KYC_LEVEL } from '../../repository';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import KycLevelForm from '../../../../routes/kyc-level/components/KycLevelForm';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { KYC_LEVELS_TABLE } from '../../../../store/settings/settings.constants';
import kycLevelService from '../../../../service/kycLevelService';

const { Row } = RenderDetail;

const DrawerForViewKycLevel = ({
  editMode: initialEditMode,
  data: initialData,
}) => {
  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(initialEditMode);
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };

  const refreshTable = () => {
    kianTableApi(KYC_LEVELS_TABLE).refreshTable();
  };

  const editKycLevelHandler = async newData => {
    try {
      await kycLevelService.editKycLevel(data.id, newData);
      setData(prevData => ({ ...prevData, ...newData }));
      refreshTable();
      setEditMode(false);
    } catch (e) {
      // ...
    }
  };

  const title = `${editMode ? 'ویرایش' : `مشاهده`} سطح ${data?.name}`;

  const Content = editMode ? (
    <KycLevelForm
      onSubmit={editKycLevelHandler}
      onCancel={() => setEditMode(false)}
      initialValues={data}
    />
  ) : (
    <RenderDetail maxWidth={100}>
      <Row data={data?.name} title="نام سطح" />
      <Row data={data?.description} title="توضیحات سطح" />
      <Row
        data={Object.values(data?.kycElementListFull || {})}
        title="المان ها"
        type="tag"
      />
    </RenderDetail>
  );

  return (
    <KianDrawer
      title={title}
      visible={visible}
      onCancel={closeModal}
      onClose={closeModal}
      drawerId={DRAWER_FOR_VIEW_KYC_LEVEL}
      footer={!editMode}
      okText="ویرایش"
      onOk={() => setEditMode(true)}
    >
      {Content}
    </KianDrawer>
  );
};

DrawerForViewKycLevel.propTypes = {
  data: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
};

DrawerForViewKycLevel.defaultProps = {
  editMode: false,
};

export default DrawerForViewKycLevel;
