import React from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../../../components/KianTable/KianTable';
import withModal from '../../../../components/HOC/withModal';
import { DISPATCH_GROUP_TABLE } from '../../../../store/settings/settings.constants';
import { DISPATCH_GROUP_URL } from './constant';
import { MODAL_FOR_ADD_DISPATCH_GROUP } from '../../../../components/ModalRoot/repository';
import { Actions } from '../../../../utils/aclActions';
import { columns, contextMenu } from './schema';

const DispatchesManagementTable = ({ showModalAction }) => {
  const activityButton = [
    {
      label: 'گروه جدید',
      icon: 'plus',
      authority: Actions.dispatchGroupsCreate,
      action: () => showModalAction({ type: MODAL_FOR_ADD_DISPATCH_GROUP }),
      loading: false,
    },
  ];

  return (
    <KianTable
      title="گروه ها"
      headerTitle="گروه ها"
      activityButton={activityButton}
      tableId={DISPATCH_GROUP_TABLE}
      endpoint={DISPATCH_GROUP_URL}
      columns={columns}
      withSort={false}
      contextMenu={contextMenu(showModalAction)}
    />
  );
};

DispatchesManagementTable.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(DispatchesManagementTable);
