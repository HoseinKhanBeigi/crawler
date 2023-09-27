import React from 'react';
import PropTypes from 'prop-types';
import { columns } from './tableData';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import {
  DRAWER_FOR_VIEW_UNIT_DETAIL,
  MODAL_FOR_ADD_REPRESENTATIVE,
  MODAL_FOR_DELETE_UNIT,
  MODAL_FOR_EDIT_UNIT,
  MODAL_FOR_TOGGLE_UNIT_ACTIVATION,
} from '../../components/ModalRoot/repository';
import withModal from '../../components/HOC/withModal';
import KianTable from '../../components/KianTable';
import { REPRESENTATIVE_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { unitToggleActivationLabel } from '../../components/Unit/utils/unitHelpers';
import history from '../../history';
import unitSearchSchema from '../../components/Unit/utils/unitSearchSchema';
import useUnit from '../../components/Unit/hooks/useUnit';
import { Actions } from '../../utils/aclActions';

const unitType = 'REPRESENTATIVE';

const Representative = props => {
  const {
    searchLeadResult,
    cities,
    provinces,
    searchLeadHandler,
    filterCitiesHandler,
  } = useUnit();

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const refreshTable = () => {
    kianTableApi(REPRESENTATIVE_TABLE).refreshTable();
  };

  const activityButton = [
    {
      label: 'نمایندگی جدید',
      icon: 'plus',
      authority: Actions.representativeCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_REPRESENTATIVE,
        }),
    },
  ];

  const contextMenu = [
    {
      label: 'مشاهده',
      authority: Actions.representativeFindByCode,
      action: row =>
        props.showModalAction({
          type: DRAWER_FOR_VIEW_UNIT_DETAIL,
          props: {
            data: row,
            unitType,
          },
        }),
    },
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.representativeCreate,
      action: row =>
        props.showModalAction({
          type: MODAL_FOR_EDIT_UNIT,
          props: {
            data: row,
            unitType,
          },
        }),
    },
    {
      label: 'لیست شعبه‌ها',
      authority: Actions.branchAllRead,
      action: row => history.push(`/branches/${row.id}`),
    },
    {
      label: rowData => unitToggleActivationLabel(rowData?.status),
      authority: Actions.representativeChangeStatus,
      action: data =>
        showModal(MODAL_FOR_TOGGLE_UNIT_ACTIVATION)({
          data,
          unitType,
          onStatusChange: refreshTable,
        })(),
    },
    {
      label: () => <span style={{ color: 'red' }}>حذف</span>,
      authority: Actions.representativeDelete,
      action: row =>
        props.showModalAction({
          type: MODAL_FOR_DELETE_UNIT,
          props: {
            data: row,
            unitType,
            onFinish: refreshTable,
          },
        }),
    },
  ];

  return (
    <KianTable
      endpoint={`${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/representative?example.unitType=REPRESENTATIVE`}
      searchData={unitSearchSchema({
        cities,
        onSearchLead: searchLeadHandler,
        searchLeadResult,
        onFilterCities: filterCitiesHandler,
        provinces,
        unitType,
      })}
      activityButton={activityButton}
      withSort={false}
      contextMenu={contextMenu}
      tableId={REPRESENTATIVE_TABLE}
      columns={columns}
      headerTitle="نمایندگی‌ها"
      persistInLocalStorage={false}
    />
  );
};
Representative.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};
export default withModal(Representative);
