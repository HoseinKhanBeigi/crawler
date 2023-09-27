import React, { useEffect, useState } from 'react';
import CrmActivityTable from '../../components/CrmActivityTable';
import activityService from '../../service/activityService';
import leadService from '../../service/leadService';
import { generateCrmColumns } from '../../components/CrmActivityTable/tableData';
import { ACTIVITY_LIST_CRM_ACTIVITIES_TABLE } from '../../store/settings/settings.constants';
import { crmSearchData } from '../../components/CrmActivityTable/searchData';

const Activities = () => {
  const [actionTypes, setActionTypes] = useState({});
  const [columns, setColumns] = useState(generateCrmColumns(null));
  const [crmUserList, setCrmUserList] = useState([]);

  const getCrmUserLead = () => leadService.getCrmUserLead();

  useEffect(() => {
    activityService.getActivitiesActionTypes().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      setActionTypes(response);
      setColumns(generateCrmColumns(response));
    });
    getCrmUserLead().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmUserList(crmUser);
    });
  }, []);

  return (
    <>
      <CrmActivityTable
        panel="OPERATOR_CRM,BOTH_CRM"
        columns={columns}
        actionTypes={actionTypes}
        searchData={crmSearchData(actionTypes, true, crmUserList)}
        tableId={ACTIVITY_LIST_CRM_ACTIVITIES_TABLE}
      />
    </>
  );
};

export default Activities;
