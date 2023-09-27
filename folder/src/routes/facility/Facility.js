import React from 'react';
import PropTypes from 'prop-types';
import { columns } from './tableData';
import withModal from '../../components/HOC/withModal';
import KianTable from '../../components/KianTable';
import { FACILITIES_TABLE } from '../../store/settings/settings.constants';

const Facility = props => {
  const { levantId } = props;
  const endPoint = `leads/profile/facility-info?levantId=${levantId}`;

  return (
    <>
      <KianTable
        endpoint={endPoint}
        withSearch={false}
        withSort={false}
        withContextMenu={false}
        tableId={FACILITIES_TABLE}
        columns={columns}
        headerTitle="درخواست تسهیلات"
        persistInLocalStorage={false}
      />
    </>
  );
};

Facility.propTypes = {
  levantId: PropTypes.string.isRequired,
};

export default withModal(Facility);
