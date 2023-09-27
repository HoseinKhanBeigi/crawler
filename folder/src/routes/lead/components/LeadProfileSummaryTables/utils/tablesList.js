import React from 'react';
import {
  CASE_TABLE,
  FACILITIES_TABLE,
  PHONE_CALL_TABLE,
  SALE_OPPORTUNITY_LIST_TABLE,
  SESSION_LIST_TABLE,
} from '../../../../../store/settings/settings.constants';
import { columns as saleOpportunitiesColumns } from '../../../../sales-opportunities/utils/columns';
import { columns as sessionsColumns } from '../../../../sessions/utils/columns';
import { columns as callLogColumns } from '../../../../phone-calls/tableData';
import { columns as caseColumns } from '../../../../case/tableData';
import { columns as facilityColumns } from '../../../../facility/tableData';
import {
  MODAL_FOR_ADD_CASE,
  MODAL_FOR_ADD_SALE_OPPORTUNITY,
  MODAL_FOR_ADD_SESSION,
  MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH,
} from '../../../../../components/ModalRoot/repository';
import {
  BASE_VARIABLE_KEYS,
  resolveVariable,
} from '../../../../../serviceConfig';
import EllipsisTruncateString from '../../../../../components/EllipsisTruncateString/EllipsisTruncateString';
import { Actions } from '../../../../../utils/aclActions';

const saleOpportunityDataIndexes = [
  'name',
  'saleProduct',
  'expectedBudget',
  'probability',
  'forecastDate',
  'closeDate',
];

const sessionDataIndexes = [
  'name',
  'sessionTypeTitle',
  'sessionStatus',
  'planners',
  'startDate',
  'endDate',
];
const caseDataIndexes = [
  'subject',
  'caseReporterFullName',
  'caseStatusType',
  'casePriorityType',
  'caseAssignFullName',
  'timeDate',
];
const callsDataIndexes = [
  'source',
  'callType',
  'voipStatusType',
  'subject',
  'operatorFullName',
  'timeDate',
];

const filteredSessionsColumns = sessionsColumns
  .filter(row => sessionDataIndexes.includes(row.dataIndex))
  .map(s => {
    if (s.dataIndex === 'name') {
      return {
        ...s,
        render: value => <EllipsisTruncateString text={value} />,
      };
    }
    return s;
  });

const filteredCaseColumns = caseColumns
  .filter(row => caseDataIndexes.includes(row.dataIndex))
  .map(s => {
    if (s.dataIndex === 'subject') {
      return {
        ...s,
        render: value => <EllipsisTruncateString text={value} />,
      };
    }
    return s;
  });

const filteredSaleOpportunity = saleStates =>
  saleOpportunitiesColumns({
    saleStates,
  })
    .filter(row => saleOpportunityDataIndexes.includes(row.dataIndex))
    .map(s => {
      if (s.dataIndex === 'name') {
        return {
          ...s,
          render: value => <EllipsisTruncateString text={value} />,
        };
      }
      return s;
    });

const filteredFacilityColumns = facilityColumns.map(item => {
  if (item.ellipsis) {
    return {
      ...item,
      render: value => <EllipsisTruncateString text={item.render(value)} />,
    };
  }
  return item;
});

function tablesList({ leadId, levantId, showModalAction, saleStates }) {
  const tabs = [
    {
      tabName: 'درخواست ها',
      title: 'لیست درخواست ها',
      authority: Actions.caseAllReadTab,
      action: () =>
        showModalAction({
          type: MODAL_FOR_ADD_CASE,
          props: {
            withSearch: false,
          },
        }),
      link: 'case',
      endPoint: 'case_management/case/all',
      tableId: CASE_TABLE,
      columns: filteredCaseColumns,
      query: {
        caseOwnerLevantId: levantId,
      },
    },
    {
      tabName: 'تماس ها',
      title: 'تماس های تلفنی',
      authority: Actions.callsAllTab,
      action: () =>
        showModalAction({ type: MODAL_FOR_MANUAL_ADD_CALL_WITHOUT_SEARCH }),
      link: 'phone-calls',
      endPoint: 'voip/all_call',
      tableId: PHONE_CALL_TABLE,
      columns: callLogColumns.filter(row =>
        callsDataIndexes.includes(row.dataIndex),
      ),
      query: {
        callerLevantId: levantId,
        sort: 'createdDate,desc',
      },
    },
  ];
  if (resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'KIAN_ADVISORY') {
    return [
      ...tabs,
      {
        tabName: 'جلسات',
        title: 'لیست جلسات',
        authority: Actions.session,
        action: () =>
          showModalAction({
            type: MODAL_FOR_ADD_SESSION,
            props: {
              withSessionFor: false,
            },
          }),
        link: 'session',
        endPoint: 'session',
        tableId: SESSION_LIST_TABLE,
        columns: filteredSessionsColumns,
        query: {
          sessionForLevantIds: levantId,
        },
      },
      {
        tabName: 'فرصت های فروش',
        title: 'فرصت های فروش',
        authority: Actions.salesOpportunitiesTab,
        action: () =>
          showModalAction({
            type: MODAL_FOR_ADD_SALE_OPPORTUNITY,
            props: {
              withLeadSearch: false,
            },
          }),
        link: 'sales-opportunities',
        endPoint: 'saleOpportunity',
        tableId: SALE_OPPORTUNITY_LIST_TABLE,
        columns: filteredSaleOpportunity(saleStates),
        query: {
          leadIds: leadId,
        },
      },
    ];
  } else if (
    resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'DEMO' ||
    resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'OIL'
  ) {
    return [
      ...tabs,
      {
        tabName: 'جلسات',
        title: 'لیست جلسات',
        authority: Actions.sessionAllRead,
        action: () =>
          showModalAction({
            type: MODAL_FOR_ADD_SESSION,
            props: {
              withSessionFor: false,
            },
          }),
        link: 'session',
        endPoint: 'session',
        tableId: SESSION_LIST_TABLE,
        columns: filteredSessionsColumns,
        query: {
          sessionForLevantIds: levantId,
        },
      },
      {
        tabName: 'درخواست تسهیلات',
        title: 'تاریخچه درخواست تسهیلات',
        authority: Actions.sessionAllRead, // TODO: correct the authority
        link: 'facility',
        endPoint: `leads/profile/facility-info`,
        tableId: FACILITIES_TABLE,
        columns: filteredFacilityColumns,
        query: {
          levantId,
        },
      },
    ];
  }
  return [
    {
      tabName: 'جلسات',
      title: 'لیست جلسات',
      authority: Actions.sessionAllRead,
      action: () =>
        showModalAction({
          type: MODAL_FOR_ADD_SESSION,
          props: {
            withSessionFor: false,
          },
        }),
      link: 'session',
      endPoint: 'session',
      tableId: SESSION_LIST_TABLE,
      columns: filteredSessionsColumns,
      query: {
        sessionForLevantIds: levantId,
      },
    },
    ...tabs,
  ];
}

export default tablesList;
