import React from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../../../components/KianTable';
import { OPERATION_MANAGEMENT } from '../../../../store/settings/settings.constants';
import operationManagementTableSchema from '../utils/tableSchema';
import { operationManagementEndpoint } from '../constant';
import withModal from '../../../../components/HOC/withModal';
import tableContextMenu from '../utils/tabelContextMenu';

const OperationManagement = ({ title, showModalAction }) => (
  <KianTable
    title={title}
    headerTitle={title}
    tableId={OPERATION_MANAGEMENT}
    endpoint={operationManagementEndpoint()}
    columns={operationManagementTableSchema}
    withSort={false}
    contextMenu={tableContextMenu(showModalAction)}
  />
);

OperationManagement.propTypes = {
  title: PropTypes.string.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

export default withModal(OperationManagement);
