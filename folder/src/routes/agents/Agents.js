import React from 'react';
import PropTypes from 'prop-types';
import { columns } from './tableData';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import {
  DRAWER_FOR_VIEW_UNIT_DETAIL,
  MODAL_FOR_ADD_AGENT,
  MODAL_FOR_DELETE_UNIT,
  MODAL_FOR_EDIT_UNIT,
  MODAL_FOR_TOGGLE_UNIT_ACTIVATION,
} from '../../components/ModalRoot/repository';
import withModal from '../../components/HOC/withModal';
import KianTable from '../../components/KianTable/KianTable';
import { AGENT_TABLE } from '../../store/settings/settings.constants';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { unitToggleActivationLabel } from '../../components/Unit/utils/unitHelpers';
import unitSearchSchema from '../../components/Unit/utils/unitSearchSchema';
import useUnit from '../../components/Unit/hooks/useUnit';
import { Actions } from '../../utils/aclActions';

const unitType = 'AGENT';

const Representative = props => {
  const { parentId } = props;
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
    kianTableApi(AGENT_TABLE).refreshTable();
  };

  const activityButton = [
    {
      label: 'کارگزار جدید',
      icon: 'plus',
      authority: Actions.agentRegisterCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_AGENT,
        }),
    },
  ];

  const generateContextMenu = () => {
    const defaults = [
      {
        label: 'مشاهده',
        authority: Actions.agentFindByCode,
        action: row =>
          props.showModalAction({
            type: DRAWER_FOR_VIEW_UNIT_DETAIL,
            props: {
              data: row,
              unitType,
            },
          }),
      },
    ];
    if (!parentId) {
      defaults.push(
        {
          label: 'ویرایش',
          icon: 'edit',
          authority: Actions.agentRegisterCreate,
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
          label: rowData => unitToggleActivationLabel(rowData?.status),
          authority: Actions.agentChangeStatus,
          action: data =>
            showModal(MODAL_FOR_TOGGLE_UNIT_ACTIVATION)({
              data,
              unitType,
              onStatusChange: refreshTable,
            })(),
        },
        {
          label: () => <span style={{ color: 'red' }}>حذف</span>,
          authority: Actions.agentDelete,
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
      );
    }
    return defaults;
  };
  return (
    <KianTable
      endpoint={
        !parentId
          ? `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/agent`
          : `${resolveVariable(
              BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
            )}/agent?example.parentId=${parentId}`
      }
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
      contextMenu={generateContextMenu()}
      tableId={AGENT_TABLE}
      columns={columns}
      headerTitle="کارگزار ها"
      persistInLocalStorage={false}
    />
  );
};
Representative.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
};
export default withModal(Representative);
