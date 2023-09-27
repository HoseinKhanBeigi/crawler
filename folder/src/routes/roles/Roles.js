import React from 'react';
import PropTypes from 'prop-types';
import { ROLES_LIST_TABLE } from '../../store/settings/settings.constants';
import { columns } from './tableSchema';
import KianTable from '../../components/KianTable';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import history from '../../history';
import aclFormService from '../../service/aclFormService';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import { Actions } from '../../utils/aclActions';
import withModal from '../../components/HOC/withModal';
import { MODAL_FOR_DELETE_CONFIRMATION } from '../../components/ModalRoot/repository';

const Roles = ({ title, showModalAction }) => {
  const activityButton = [
    {
      label: 'دسترسی جدید',
      icon: 'plus',
      authority: Actions.aclGroupCreate,
      action: () => history.push('/access-control'),
    },
  ];

  const showModal = type => modalProps => () => {
    showModalAction({
      type,
      props: modalProps,
    });
  };

  const contextMenu = [
    {
      authority: Actions.aclGroupLoad,
      label: `مشاهده`,
      action: row => history.push(`/access-control?groupId=${row.id}`),
    },
    {
      label: `ویرایش`,
      authority: Actions.aclGroupUpdate,
      action: row =>
        history.push(`/access-control?groupId=${row.id}&editMode=true`),
    },
    {
      label: () => <p style={{ color: 'red' }}>حذف</p>,
      authority: Actions.aclGroupDelete,
      action: row =>
        showModal(MODAL_FOR_DELETE_CONFIRMATION)({
          title: 'حذف دسترسی',
          onConfirm: async () => {
            try {
              await aclFormService.deleteAclGroupById(row.id);
              kianTableApi(ROLES_LIST_TABLE).refreshTable();
              return Promise.resolve();
            } catch (e) {
              return Promise.reject();
            }
          },
          detail: [
            { value: row.title, label: 'نام دسترسی' },
            { value: row.code, label: 'کد دسترسی' },
          ],
        })(),
    },
  ];
  return (
    <KianTable
      withSearch={false}
      bordered={false}
      endpoint={`${resolveVariable(
        BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
      )}/acl-group/grid?sortDirection=DESC`}
      activityButton={activityButton}
      withSort={false}
      tableId={ROLES_LIST_TABLE}
      contextMenu={contextMenu}
      columns={columns}
      headerTitle={title}
      persistInLocalStorage={false}
    />
  );
};

Roles.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withModal(Roles);
