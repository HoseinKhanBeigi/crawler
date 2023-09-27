import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import KianTable from '../../components/KianTable';
import activityService from '../../service/activityService';
import { reportColumns } from './columns';
import { searchData } from './searchData';
import { REPORT_USER_ACTIVITY_TABLE } from '../../store/settings/settings.constants';

const Report = props => {
  const { levantId } = props;
  const [actionTypes, setActionTypes] = useState({});

  const endPoint = `activity?levantId=${levantId}`;

  useEffect(() => {
    activityService.getActivitiesActionTypes().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      setActionTypes(response);
    });
  }, []);

  return (
    <>
      <>
        <KianTable
          searchData={searchData(actionTypes)}
          endpoint={endPoint}
          withSort={false}
          headerTitle="گزارشات"
          tableId={REPORT_USER_ACTIVITY_TABLE}
          columns={reportColumns(actionTypes)}
          persistInLocalStorage={false}
        />
      </>
    </>
  );
};

Report.defaultProps = {
  levantId: '',
};

Report.propTypes = {
  levantId: PropTypes.string,
};

export default Report;
