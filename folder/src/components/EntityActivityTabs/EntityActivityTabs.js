import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { Spin } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from './EntityActivityTabs.scss';
import CPTab from '../CP/CPTab';
import {
  generateCrmColumns,
  generateUserActvityColumns,
} from '../CrmActivityTable/tableData';
import activityService from '../../service/activityService';
import leadService from '../../service/leadService';
import {
  crmSearchData,
  userActivitiesSearchData,
} from '../CrmActivityTable/searchData';
import CrmActivityTable from '../CrmActivityTable';
import {
  PROFILE_CRM_ACTIVITIES_TABLE,
  PROFILE_USER_ACTIVITIES_TABLE,
} from '../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

const EntityActivityTabs = props => {
  const { levantId } = props;
  const [crmActivitiesColumns, setCrmActivitiesColumns] = useState(
    generateCrmColumns(null),
  );
  const [userActivitiesColumns, setUserActivitiesColumns] = useState([]);
  const [actionTypes, setActionTypes] = useState({});
  const [crmUserList, setCrmUserList] = useState([]);
  const downloadExcel = (applicationName, panel) => () => {
    activityService.downloadActivitiesExcelReport(
      applicationName,
      levantId,
      panel,
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
      setUserActivitiesColumns(generateUserActvityColumns(response));
      setActionTypes(response);
    });
    getCrmUserLead().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmUserList(crmUser);
    });
  }, [levantId]);
  const activityTab = [
    {
      key: '2',
      tab: (
        <>
          <span className={s.tabTitle}>فعالیت های پنل سی آر ام</span>
        </>
      ),
      children: (
        <div className={s.activityCrmKianTableContainer}>
          <CrmActivityTable
            downloadExcelAction={downloadExcel('CRM', 'CRM_PANEL,ALL')}
            columns={crmActivitiesColumns}
            searchData={crmSearchData(actionTypes, true, crmUserList)}
            persistInLocalStorage={false}
            levantId={levantId}
            panel="USER_CRM,BOTH_CRM"
            actionTypes={actionTypes}
            tableId={PROFILE_CRM_ACTIVITIES_TABLE}
          />
        </div>
      ),
    },
    {
      key: '1',
      tab: (
        <>
          <span className={s.tabTitle}>فعالیت های کاربر</span>
        </>
      ),
      children: (
        <div className={s.activityCrmKianTableContainer}>
          {userActivitiesColumns.length > 0 && (
            <CrmActivityTable
              actionTypes={actionTypes}
              downloadExcelAction={downloadExcel(
                resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
              )}
              columns={userActivitiesColumns}
              searchData={userActivitiesSearchData(actionTypes)}
              persistInLocalStorage={false}
              levantId={levantId}
              panel="USER_APP"
              tableId={PROFILE_USER_ACTIVITIES_TABLE}
            />
          )}
          {userActivitiesColumns.length === 0 && (
            <div className={s.loadingContainer}>
              <Spin />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={cs(s.root, s.tabsBoxShadow)}>
        <CPTab
          className={s.root}
          defaultKey="2"
          position="top"
          tabPane={activityTab}
        />
      </div>
    </>
  );
};

EntityActivityTabs.propTypes = {
  levantId: PropTypes.string.isRequired,
};

export default withStyles(s)(EntityActivityTabs);
