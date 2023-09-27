import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPersonByMobileAction } from '../../store/person/person.actions';
import { getProductGroupsAction } from '../../store/getProducts/getProducts.actions';
import { columns, searchData } from './tableData';
import KianTable from '../../components/KianTable';
import withModal from '../../components/HOC/withModal';
import { PEOPLE_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import {
  DRAWER_FOR_GROUP_ASSIGN_TO,
  DRAWER_FOR_GROUP_TAGGING,
  DRAWER_FOR_SEND_GROUP_EMAIL,
  DRAWER_FOR_SEND_GROUP_MESSAGE,
  MODAL_FOR_DOWNLOAD_TABLE_EXCEL,
} from '../../components/ModalRoot/repository';
import { Actions } from '../../utils/aclActions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import history from '../../history';

const People = ({ productGroups, ...props }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const searchParam = history?.location?.search;

  useEffect(() => {
    props.getProductGroupsAction();
  }, []);

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const deSelectRows = () => {
    setSelectedRowKeys([]);
    setSelectedPeople([]);
  };

  const deselectAndRefreshTable = () => {
    deSelectRows();
    kianTableApi(PEOPLE_TABLE).refreshTable();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (rows, selected) => {
      setSelectedPeople(selected.map(i => i.levantId));
      setSelectedRowKeys(rows);
    },
  };

  const contextMenu = [
    {
      label: 'ارسال پیام',
      icon: 'message',
      authority: Actions.sendSms,
      action: row =>
        showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
          data: [row.levantId],
          deSelectRows,
        })(),
    },
    {
      label: 'ارسال ایمیل',
      icon: 'mail',
      authority: Actions.sendEmail,
      action: row =>
        showModal(DRAWER_FOR_SEND_GROUP_EMAIL)({
          selectedLevantIds: [row.levantId],
          deSelectRows,
        })(),
    },
    {
      label: 'برچسب زدن',
      icon: 'tag',
      authority: Actions.tagging,
      action: row =>
        showModal(DRAWER_FOR_GROUP_TAGGING)({
          taggedIds: [row.levantId],
          taggingClass: 'PEOPLE',
          name: `${row.firstName} ${row.lastName}`,
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
    {
      label: 'اختصاص دادن',
      icon: 'check-circle',
      authority: Actions.leadAssign,
      action: row =>
        showModal(DRAWER_FOR_GROUP_ASSIGN_TO)({
          selectedLeads: [row.levantId],
          deSelectRows: deselectAndRefreshTable,
        })(),
    },
  ];

  const actionButtons = [
    {
      tooltip: `ارسال پیام به ${selectedPeople.length} فرد انتخابی`,
      icon: 'message',
      authority: Actions.sendSms,
      action: showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
        data: selectedPeople,
        deSelectRows,
      }),
    },
    {
      tooltip: `ارسال ایمیل به ${selectedPeople.length} فرد انتخابی`,
      icon: 'mail',
      authority: Actions.sendEmail,
      action: showModal(DRAWER_FOR_SEND_GROUP_EMAIL)({
        selectedLevantIds: selectedPeople,
        deSelectRows,
      }),
    },
    {
      tooltip: `اختصاص دادن ${selectedPeople.length} فرد انتخابی`,
      icon: 'check-circle',
      authority: Actions.leadAssign,
      action: showModal(DRAWER_FOR_GROUP_ASSIGN_TO)({
        selectedLeads: selectedPeople,
        deSelectRows: deselectAndRefreshTable,
      }),
    },
    {
      tooltip: `برچسب زدن به ${selectedPeople.length} فرد انتخابی`,
      icon: 'tag',
      authority: Actions.tagging,
      action: showModal(DRAWER_FOR_GROUP_TAGGING)({
        taggedIds: selectedPeople,
        taggingClass: 'PEOPLE',
        deSelectRows: deselectAndRefreshTable,
      }),
    },
  ];

  const downloadExcelAction = () => () => {
    showModal(MODAL_FOR_DOWNLOAD_TABLE_EXCEL)({
      endpoint: `party/excel-report/person`,
      fileName: 'peopleReport',
      searchQuery: searchParam,
    });
  };

  return (
    <>
      <KianTable
        endpoint="party/search/person"
        searchData={searchData(productGroups)}
        showActionButtons={!!selectedPeople.length}
        actionButtons={actionButtons}
        rowSelection={rowSelection}
        contextMenu={contextMenu}
        downloadExcelAction={downloadExcelAction()}
        tableId={PEOPLE_TABLE}
        filterType="PERSON"
        headerTitle="افراد"
        columns={columns(resolveVariable(BASE_VARIABLE_KEYS.CONTEXT))}
        withSort={false}
      />
    </>
  );
};

People.propTypes = {
  getPersonByMobileAction: PropTypes.func.isRequired,
  getProductGroupsAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  productGroups: PropTypes.array.isRequired,
};
const mapDispatch = {
  getPersonByMobileAction,
  getProductGroupsAction,
};

const mapState = ({ getProducts }) => ({
  productGroups: getProducts.productGroupsData,
});

export default connect(mapState, mapDispatch)(withModal(People));
export const peopleTest = People;
