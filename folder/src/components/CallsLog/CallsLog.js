import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import KianTable from '../../components/KianTable';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { PHONE_CALL_TABLE } from '../../store/settings/settings.constants';
import withModal from '../../components/HOC/withModal';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import {
  MODAL_FOR_DOWNLOAD_TABLE_EXCEL,
  DRAWER_FOR_VIEW_CALL_DETAILS,
  DRAWER_FOR_EDIT_CALL_DETAILS_WITH_CALLER_LEVANTID,
  DRAWER_FOR_EDIT_CALL_DETAILS_WITHOUT_CALLER_LEVANTID,
  DRAWER_FOR_EDIT_CALL_DETAILS,
} from '../ModalRoot/repository';
import { Actions } from '../../utils/aclActions';
import CPMessage from '../CP/CPMessage';

const CallsLog = props => {
  const {
    templates: phoneCallTypes,
    columns,
    searchData,
    userLevantId,
    currentLevantId,
    activityButton,
  } = props;

  const endPoint = {
    all: userLevantId
      ? `voip/all_call?callerLevantId=${userLevantId}&sort=createdDate,desc`
      : 'voip/all_call?sort=createdDate,desc',
    myissuse: `voip/all_call?sort=createdDate,desc&levantId=${currentLevantId}`,
  };
  const [endpointState, setEndPointState] = useState(endPoint.all);

  const showModal2 = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  function showModal(row, type) {
    props.showModalAction({
      type,
      props: {
        data: row,
      },
    });
  }

  const handleEditModal = row => {
    const { id, callerLevantId } = row;
    if (id) showModal(row, DRAWER_FOR_EDIT_CALL_DETAILS);
    if (!id && callerLevantId)
      showModal(row, DRAWER_FOR_EDIT_CALL_DETAILS_WITH_CALLER_LEVANTID);
    if (!id && !callerLevantId)
      showModal(row, DRAWER_FOR_EDIT_CALL_DETAILS_WITHOUT_CALLER_LEVANTID);
  };

  const handleViewDetail = row => {
    const { id } = row;
    if (id) {
      props.showModalAction({
        type: DRAWER_FOR_VIEW_CALL_DETAILS,
        props: {
          data: row,
        },
      });
    } else CPMessage('جزییاتی برای این تماس ثبت نشده است', 'warning');
  };
  const contextMenu = [
    {
      label: 'نمایش',
      icon: 'eye',
      authority: Actions?.viewCallDetail,
      action: row => handleViewDetail(row),
    },
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.updateCallDetail,
      action: row => handleEditModal(row),
    },
  ];

  useEffect(() => {
    props.getTemplatesAction('CALL');
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    userLevantId && kianTableApi(PHONE_CALL_TABLE).refreshTable();
  }, [userLevantId]);

  const messagesData = () =>
    phoneCallTypes?.map(item => ({
      text: item.title,
      value: item.code,
    }));

  const downloadExcelAction = () => () => {
    showModal2(MODAL_FOR_DOWNLOAD_TABLE_EXCEL)({
      endpoint: 'contact-center/call-excel-report',
      fileName: 'CallCenterReport',
    });
  };
  const handleFilter = async value => {
    await setEndPointState(endPoint[value]);
    kianTableApi(PHONE_CALL_TABLE).refreshTable();
  };

  const filterButton = {
    onChange: handleFilter,
    defaultValue: 'all',
    buttons: [
      {
        label: 'همه تماس‌ها',
        value: 'all',
      },
      {
        label: 'تماس‌های من',
        value: 'myissuse',
      },
    ],
  };

  useEffect(() => {
    if (endpointState === endPoint.all) {
      handleFilter('all');
    }
  }, []);

  return (
    <KianTable
      endpoint={endpointState}
      downloadExcelAction={downloadExcelAction()}
      activityButton={activityButton}
      toggleButton={!userLevantId ? filterButton : {}}
      tableId={PHONE_CALL_TABLE}
      searchData={searchData(messagesData)}
      columns={columns}
      headerTitle="تماس ها"
      withSort={false}
      contextMenu={contextMenu}
    />
  );
};
CallsLog.defaultProps = {
  columns: [],
  searchData: [],
  userLevantId: '',
  activityButton: [],
  currentLevantId: '',
  templates: [],
};

CallsLog.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
  columns: PropTypes.array,
  userLevantId: PropTypes.string,
  currentLevantId: PropTypes.string,
  activityButton: PropTypes.array,
  searchData: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};

const mapState = ({ phoneCalls, neshanAuth }) => ({
  templates: phoneCalls.call,
  currentLevantId: neshanAuth?.jwt?.levantId,
});

const mapDispatch = {
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(withModal(CallsLog));
