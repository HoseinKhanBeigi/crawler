import React from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../../components/KianTable';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../serviceConfig';
import gridSchema from '../utils/gridSchema';
import { KYC_LEVELS_TABLE } from '../../../store/settings/settings.constants';
import withModal from '../../../components/HOC/withModal';
import { Actions } from '../../../utils/aclActions';
import {
  DRAWER_FOR_VIEW_KYC_LEVEL,
  MODAL_FOR_ADD_KYC_LEVEL,
  MODAL_FOR_DELETE_CONFIRMATION,
} from '../../../components/ModalRoot/repository';
import { kianTableApi } from '../../../components/KianTable/helpers/globalApi';
import kycLevelService from '../../../service/kycLevelService';

const tableTitle = 'سطوح احراز هویت';

const KycLevel = ({ showModalAction }) => {
  const activityButton = [
    {
      label: 'سطح جدید',
      icon: 'plus',
      authority: Actions.kycLevelCreate,
      action: () => showModalAction({ type: MODAL_FOR_ADD_KYC_LEVEL }),
    },
  ];

  const contextMenu = [
    {
      label: `مشاهده`,
      authority: Actions.kycLevelRead,
      action: data =>
        showModalAction({
          type: DRAWER_FOR_VIEW_KYC_LEVEL,
          props: {
            data,
          },
        }),
    },
    {
      label: `ویرایش`,
      authority: Actions.kycLevelUpdate,
      action: data =>
        showModalAction({
          type: DRAWER_FOR_VIEW_KYC_LEVEL,
          props: {
            data,
            editMode: true,
          },
        }),
    },
    {
      label: () => <p style={{ color: 'red' }}>حذف</p>,
      authority: Actions.kycLevelDelete,
      action: row =>
        showModalAction({
          type: MODAL_FOR_DELETE_CONFIRMATION,
          props: {
            title: 'حذف سطح احراز هویت',
            onConfirm: async () => {
              try {
                await kycLevelService.deleteKycLevel(row.name);
                kianTableApi(KYC_LEVELS_TABLE).refreshTable();
                return Promise.resolve();
              } catch (e) {
                return Promise.reject();
              }
            },
            detail: [
              { value: row.name, label: 'نام سطح' },
              { value: row.id, label: 'شناسه سطح' },
            ],
          },
        }),
    },
  ];
  return (
    <KianTable
      headerTitle={tableTitle}
      title={tableTitle}
      endpoint={`${resolveVariable(
        BASE_VARIABLE_KEYS.PARTY_KYC_LEVEL_BASE_URL,
      )}/all`}
      columns={gridSchema}
      withSearch={false}
      withSort={false}
      persistInLocalStorage={false}
      tableId={KYC_LEVELS_TABLE}
      contextMenu={contextMenu}
      activityButton={activityButton}
    />
  );
};

KycLevel.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(KycLevel);
