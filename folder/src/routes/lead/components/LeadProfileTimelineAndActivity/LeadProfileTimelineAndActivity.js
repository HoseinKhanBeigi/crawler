import React, { useEffect, useState } from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import cs from 'classnames';
import s from './LeadProfileTimelineAndActivity.scss';
import CPTab from '../../../../components/CP/CPTab';
import TimelineActivity from '../../../../components/TimelineActivity';
import {
  crmSearchData,
  generateCrmColumns,
} from '../LeadProfileSummaryTables/schema';
import activityService from '../../../../service/activityService';
import { PROFILE_CRM_ACTIVITIES_TABLE } from '../../../../store/settings/settings.constants';
import CrmActivityTable from '../../../../components/CrmActivityTable';
import leadService from '../../../../service/leadService';
import { Actions } from '../../../../utils/aclActions';

const LeadProfileTimelineAndActivity = ({ leadInfo, isBusinessLead }) => {
  const [crmActivitiesColumns, setCrmActivitiesColumns] = useState(
    generateCrmColumns(null),
  );
  const [actionTypes, setActionTypes] = useState({});
  const [crmUserList, setCrmUserList] = useState([]);

  const downloadExcel = () => () => {
    activityService.downloadActivitiesExcelReport(
      'CRM',
      leadInfo?.levantId,
      'CRM_PANEL',
    );
  };

  const getCrmUserLead = () => leadService.getCrmUserLead('ALL');

  const getActionsTypesList = () => activityService.getActivitiesActionTypes();

  useEffect(() => {
    getActionsTypesList().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      setActionTypes(response);
      setCrmActivitiesColumns(generateCrmColumns(response));
      setActionTypes(response);
    });
    getCrmUserLead().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmUserList(crmUser);
    });
  }, []);

  const timelineTabs = [
    {
      key: 2,
      tab: 'فعالیت ها',
      authority: Actions.activityAllRead,
      children: (
        <div
          className={cs(s.activityTableWrapper, isBusinessLead && s.business)}
        >
          <CrmActivityTable
            downloadExcelAction={downloadExcel}
            columns={crmActivitiesColumns}
            searchData={crmSearchData(actionTypes, crmUserList)}
            persistInLocalStorage={false}
            levantId={leadInfo?.levantId}
            panel="USER_CRM,BOTH_CRM"
            actionTypes={actionTypes}
            tableId={PROFILE_CRM_ACTIVITIES_TABLE}
          />
        </div>
      ),
    },
    {
      key: 1,
      tab: 'تایم لاین',
      authority: Actions.activityAllRead,
      children: (
        <TimelineActivity
          levantId={leadInfo?.levantId}
          isBusinessLead={isBusinessLead}
        />
      ),
    },
  ];
  return (
    <div className={s.timelineTabs}>
      <CPTab className={s.tabs} tabPane={timelineTabs} defaultKey="1" />
    </div>
  );
};

LeadProfileTimelineAndActivity.propTypes = {
  leadInfo: PropTypes.object.isRequired,
  isBusinessLead: PropTypes.bool,
};

LeadProfileTimelineAndActivity.defaultProps = {
  isBusinessLead: false,
};
export default withStyle(s)(LeadProfileTimelineAndActivity);
