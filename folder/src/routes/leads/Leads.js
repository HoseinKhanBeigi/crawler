import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchData } from './tableData';
import { getLeadsUsersAction } from '../../store/leads/leads.actions';
import KianTable from '../../components/KianTable';
import withModal from '../../components/HOC/withModal';
import { getTagsAction } from '../../store/tag/tag.actions';
import { LEADS_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import {
  DRAWER_FOR_GROUP_ASSIGN_TO,
  DRAWER_FOR_GROUP_TAGGING,
  DRAWER_FOR_SEND_GROUP_EMAIL,
  DRAWER_FOR_SEND_GROUP_MESSAGE,
  MODAL_FOR_BULK_UNTAG,
  MODAL_FOR_DO_ACTION_ON_LEADS,
  MODAL_FOR_DOWNLOAD_TABLE_EXCEL,
  MODAL_FOR_IMPORT_LEAD,
  MODAL_FOR_LEAD_FORM,
  MODAL_FOR_UN_ASSIGN,
  DRAWER_FOR_VIEW_AND_EDIT_LEAD,
  DRAWER_FOR_CONNECTION_MANAGEMENT,
} from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';
import history from '../../history';
import { INDIVIDUAL_LEAD } from './constant';

const Leads = props => {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const permissionSave = useRef({});
  const searchParams = history?.location?.search;

  useEffect(() => {
    if (!props.tags?.length) props.getTagsAction();
    props.getLeadsUsersAction();
  }, []);

  const getPermissionStatus = permission => {
    let getPermission = permissionSave?.current?.[permission];
    if (getPermission === undefined) {
      getPermission = props.authorities?.find(
        perm => perm?.code === permission,
      );
      permissionSave.current[permission] = getPermission;
    }
    return getPermission?.grantType;
  };

  const externalDataConverter = data => {
    if (!data?.tags) return data;

    const content = data?.content?.map(c => ({
      ...c,
      tags: data.tags[c.levantId],
    }));

    const columns = [
      {
        code: 'assignedTags',
        permission: getPermissionStatus(Actions.individualLeadUnTag),
        type: INDIVIDUAL_LEAD,
        name: 'برچسب',
        order: 1000,
      },
      ...data.columns,
    ];

    return {
      ...data,
      content,
      columns,
    };
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (rows, selected) => {
      setSelectedLeads(selected);
      setSelectedRowKeys(rows);
    },
  };

  const deSelectRows = () => {
    setSelectedRowKeys([]);
    setSelectedLeads([]);
  };

  const deselectAndRefreshTable = () => {
    deSelectRows();
    kianTableApi(LEADS_TABLE).refreshTable();
  };

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const statusIsNotAccess = (row, permission) => {
    if (
      permission[0]?.grantType === 'MINE' &&
      props.user?.levantId !== row?.aclLevantId?.toString()
    ) {
      return true;
    }
    return false;
  };

  const selectedLeadIds = selectedLeads.map(({ leadId }) => leadId);
  const selectedLevantIds = selectedLeads.map(({ levantId }) => levantId);

  const statusGroupIsNotAccess = permission => {
    let getPermission = permissionSave?.current?.[permission];
    if (getPermission === undefined) {
      getPermission = props.authorities?.find(
        perm => perm?.code === permission,
      );
      permissionSave.current[permission] = getPermission;
    }
    if (
      getPermission?.grantType === 'MINE' &&
      selectedLeads.some(
        ({ aclLevantId }) => props.user?.levantId !== aclLevantId?.toString(),
      )
    ) {
      return true;
    }
    return false;
  };

  const contextMenu = [
    {
      label: 'مشاهده و ویرایش',
      authority: Actions.leadUpdate,
      action: row =>
        showModal(DRAWER_FOR_VIEW_AND_EDIT_LEAD)({
          leadType: INDIVIDUAL_LEAD,
          tableIndex: LEADS_TABLE,
          levantId: row?.levantId,
          leadId: row?.leadId,
          title: 'مشاهده و ویرایش سرنخ حقیقی',
        })(),
    },
    {
      label: `ارسال پیام`,
      authority: Actions.individualLeadSendSms,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
          data: [row.levantId],
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows,
        })(),
    },
    {
      label: `ارسال ایمیل`,
      authority: Actions.individualLeadSendEmail,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(DRAWER_FOR_SEND_GROUP_EMAIL)({
          selectedLevantIds: [row.levantId],
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows,
        })(),
    },
    {
      label: `اختصاص دادن`,
      authority: Actions.individualLeadAssign,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(DRAWER_FOR_GROUP_ASSIGN_TO)({
          selectedLeads: [row.levantId],
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
    {
      label: `رفع مسئولیت`,
      authority: Actions.individualLeadUnAssign,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(MODAL_FOR_UN_ASSIGN)({
          selectedLeads: [row],
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
    {
      label: `برچسب زدن`,
      authority: Actions.individualLeadTag,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(DRAWER_FOR_GROUP_TAGGING)({
          taggedIds: [row.levantId],
          taggingClass: 'LEAD',
          name: `${row.firstName} ${row.lastName}`,
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
    {
      label: `تغییر وضعیت`,
      authority: Actions.individualLeadChangeStatus,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(MODAL_FOR_DO_ACTION_ON_LEADS)({
          selectedLeads: [row.levantId],
          modalData: {
            title: `تغییر وضعیت ${row.firstName} ${row.lastName}`,
            type: 'update',
          },
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
    {
      label: `مدیریت ارتباطات`,
      authority: Actions.leadRelationRead,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(DRAWER_FOR_CONNECTION_MANAGEMENT)({
          leadId: row.leadId,
          levantId: row.levantId,
        })(),
    },
    {
      label: `حذف`,
      authority: Actions.leadCreate,
      isNotAccess: statusIsNotAccess,
      action: row =>
        showModal(MODAL_FOR_DO_ACTION_ON_LEADS)({
          selectedLeads: [row.levantId],
          modalData: {
            title: `حذف ${row.firstName} ${row.lastName}`,
            type: 'delete',
          },
          type: INDIVIDUAL_LEAD,
          ids: [row.leadId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
  ];

  const activityButton = [
    {
      label: 'افزودن',
      icon: 'user-add',
      authority: Actions.LeadCreateUserDefined,
      action: showModal(MODAL_FOR_LEAD_FORM)({
        leadType: INDIVIDUAL_LEAD,
        tableIndex: LEADS_TABLE,
      }),
      loading: false,
    },
    {
      label: 'افزودن گروهی',
      icon: 'usergroup-add',
      authority: Actions.LeadCreateUserDefined,
      action: showModal(MODAL_FOR_IMPORT_LEAD)({
        leadType: INDIVIDUAL_LEAD,
        tableIndex: LEADS_TABLE,
      }),
    },
  ];

  const actionButtons = [
    {
      tooltip: `ارسال پیام به ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'message',
      authority: Actions.individualLeadSendSms,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
        data: selectedLevantIds,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        deSelectRows,
      }),
    },
    {
      tooltip: `ارسال ایمیل به ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'mail',
      authority: Actions.individualLeadSendEmail,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(DRAWER_FOR_SEND_GROUP_EMAIL)({
        selectedLevantIds,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        deSelectRows,
      }),
    },
    {
      tooltip: `اختصاص دادن ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'check-circle',
      authority: Actions.individualLeadAssign,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(DRAWER_FOR_GROUP_ASSIGN_TO)({
        selectedLeads: selectedLevantIds,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `رفع مسئولیت از ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'close-circle',
      authority: Actions.individualLeadUnAssign,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(MODAL_FOR_UN_ASSIGN)({
        selectedLeads,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `برچسب زدن به ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'tag',
      authority: Actions.individualLeadTag,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(DRAWER_FOR_GROUP_TAGGING)({
        taggedIds: selectedLevantIds,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        taggingClass: 'LEAD',
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `حذف برچسب از ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'disconnect',
      authority: Actions.individualLeadUnTag,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(MODAL_FOR_BULK_UNTAG)({
        tagged: selectedLeads,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        taggingClass: 'LEAD',
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `تغییر وضعیت ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'control',
      authority: Actions.individualLeadChangeStatus,
      isNotAccess: statusGroupIsNotAccess,
      action: showModal(MODAL_FOR_DO_ACTION_ON_LEADS)({
        selectedLeads: selectedLevantIds,
        ids: selectedLeadIds,
        type: INDIVIDUAL_LEAD,
        modalData: {
          title: `تغییر وضعیت ${selectedLeads.length} سرنخ انتخابی`,
          type: 'update',
        },
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `حذف ${selectedLeads.length} سرنخ انتخابی`,
      icon: 'delete',
      authority: Actions.leadCreate,
      action: showModal(MODAL_FOR_DO_ACTION_ON_LEADS)({
        selectedLeads,
        modalData: {
          title: `حذف ${selectedLeads.length} سرنخ انتخابی`,
          type: 'delete',
        },
        deSelectRows: deselectAndRefreshTable,
      }),
    },
  ];

  const downloadExcelAction = () => () => {
    showModal(MODAL_FOR_DOWNLOAD_TABLE_EXCEL)({
      endpoint: 'leads/person/export/dynamically/excel',
      fileName: 'LeadsReport',
      searchQuery: searchParams,
    });
  };

  return (
    <>
      <KianTable
        endpoint="leads/person/search"
        searchData={searchData(props.leadUsers, props.tags)}
        showActionButtons={!!selectedLeads.length}
        externalDataConverter={externalDataConverter}
        activityButton={activityButton}
        actionButtons={actionButtons}
        persistInLocalStorage={false}
        rowSelection={rowSelection}
        contextMenu={contextMenu}
        downloadExcelAction={downloadExcelAction()}
        tableId={LEADS_TABLE}
        filterType="LEAD"
        headerTitle="سرنخ حقیقی"
        excludeSearchFields={['createdDate', 'assignedTags']}
        withSort={false}
      />
    </>
  );
};

Leads.propTypes = {
  getLeadsUsersAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  leadUsers: PropTypes.array.isRequired,
  getTagsAction: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  authorities: PropTypes.array.isRequired,
};

const mapDispatch = {
  getLeadsUsersAction,
  getTagsAction,
};

const mapState = ({ leads, tag, user, acl }) => ({
  leadUsers: leads.getLeadsUsersData,
  tags: tag?.data?.content || [],
  user: user?.currentUserInfoEmployee,
  authorities: acl?.authorities,
});

export default connect(mapState, mapDispatch)(withModal(Leads));
