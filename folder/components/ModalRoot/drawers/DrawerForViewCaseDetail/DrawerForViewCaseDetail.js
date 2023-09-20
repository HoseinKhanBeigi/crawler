import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_VIEW_CASE_DETAIL } from '../../repository';
import EditCaseForm from '../../../EditCaseForm/EditCaseForm';
import RenderDetail from '../../../RenderDetail/RenderDetail';
import convertToJalaliDate from '../../../../utils/date';
import applications from '../../../../../restApiDesign/opportunities/applications.json';
import {
  casePriorityTranslatedType,
  caseStatusTranslatedType,
} from '../../../../utils/caseTypes';
import caseManagementsService from '../../../../service/caseManagementsService';
import CPMessage from '../../../CP/CPMessage';
import CPLoading from '../../../CP/CPLoading';
import ViewCaseDetailDrawerUploadList from './ViewCaseDetailDrawerUploadList';
import Link from '../../../Link';

const { Row } = RenderDetail;

const DrawerForViewCaseDetail = props => {
  const [visible, setVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    caseManagementsService.getCaseByCaseId(props.data.id).then(
      response => {
        if (response.additionalInfo) {
          delete response.additionalInfo;
        }
        setLoading(false);
        setData(response);
      },
      () => {
        setLoading(false);
        CPMessage('خطا در دریافت اطلاعات درخواست!', 'error');
      },
    );
  }, [forceUpdate]);

  const closeDrawer = () => {
    setVisible(false);
  };

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const onFinishEditing = () => {
    setForceUpdate(p => p + 1);
    disableEditMode();
  };

  const Show = (
    <CPLoading spinning={loading} tip="در حال دریافت اطلاعات درخواست...">
      <RenderDetail maxWidth={100}>
        <Row data={data?.subject} title="عنوان" />
        <Row data={data?.caseOwnerFullName} title="مشتری" />
        <Row data={convertToJalaliDate(data?.timeDate)} title="تاریخ ایجاد" />
        <Row
          data={<p style={{ color: '#1890ff' }}>{data?.id}</p>}
          type="node"
          title="کد درخواست"
        />
        <Row
          data={applications.find(item => item.code === data?.channel)?.title}
          title="کانال ورودی"
        />
        <Row
          data={caseStatusTranslatedType[data?.caseStatusType]}
          type="tag"
          tagColor="blue"
          title="وضعیت"
        />
        <Row data={data?.caseAssignFullName} title="اپراتور" />
        <Row
          data={casePriorityTranslatedType[data?.casePriorityType]}
          title="اولویت"
        />
        <Row
          data={
            props.callTypeTemplates?.find(t => t.code === data?.caseType)?.title
          }
          title="دلیل درخواست"
        />
        <Row data={data?.description} title="توضیحات" />
        <Row
          data={
            data?.attachmentUrl &&
            data?.attachmentUrl.length && (
              <ViewCaseDetailDrawerUploadList files={data?.attachmentUrl} />
            )
          }
          title="ضمیمه"
          type="node"
        />
      </RenderDetail>
    </CPLoading>
  );

  return (
    <KianDrawer
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
      title="مشاهده درخواست"
      drawerId={DRAWER_FOR_VIEW_CASE_DETAIL}
      okText="ویرایش"
      onOk={enableEditMode}
      cancelText="بستن"
      footer={!editMode}
      renderHeader={
        <div style={{ display: 'flex' }}>
          <p>مشاهده درخواست</p>
          {data?.id && (
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <Link to={`/show-case/${data.id}`} target>
                <Icon
                  path={mdiOpenInNew}
                  style={{ width: '16px', marginRight: '8px' }}
                  color="#178ffe"
                />
              </Link>
            </div>
          )}
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

DrawerForViewCaseDetail.propTypes = {
  data: PropTypes.object.isRequired,
  callTypeTemplates: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  callTypeTemplates: state.phoneCalls.call,
});

export default connect(mapStateToProps)(DrawerForViewCaseDetail);
