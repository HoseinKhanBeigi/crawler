import {
  MODAL_FOR_ADD_CASE,
  MODAL_FOR_ADD_SESSION,
  MODAL_FOR_ADD_TASK,
  MODAL_FOR_LEAD_FORM,
  MODAL_FOR_PERSON_FORM,
  MODAL_FOR_PHONE_CALLS,
} from '../../components/ModalRoot/repository';
import { levantIds, sejamUsers } from '../../utils/operatorLevantIds';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import { Actions } from '../../utils/aclActions';

export const GET_UI_SETTINGS_REQUEST = 'GET_UI_SETTINGS_REQUEST';
export const GET_UI_SETTINGS_SUCCESS = 'GET_UI_SETTINGS_SUCCESS';
export const GET_UI_SETTINGS_FAILURE = 'GET_UI_SETTINGS_FAILURE';

export const POST_UI_SETTINGS_REQUEST = 'POST_UI_SETTINGS_REQUEST';
export const POST_UI_SETTINGS_SUCCESS = 'POST_UI_SETTINGS_SUCCESS';
export const POST_UI_SETTINGS_FAILURE = 'POST_UI_SETTINGS_FAILURE';

// tableId constants
export const PEOPLE_TABLE = 'PEOPLE_TABLE';
export const LEADS_TABLE = 'LEADS_TABLE';
export const LEGAL_LEAD_TABLE = 'LEGAL_LEAD_TABLE';
export const USERS_MANAGEMENT_TABLE = 'USERS_MANAGEMENT_TABLE';
export const PROFILE_CRM_ACTIVITIES_TABLE = 'PROFILE_CRM_ACTIVITIES_TABLE';
export const PROFILE_USER_ACTIVITIES_TABLE = 'PROFILE_USER_ACTIVITIES_TABLE';
export const ACTIVITY_LIST_CRM_ACTIVITIES_TABLE =
  'ACTIVITY_LIST_CRM_ACTIVITIES_TABLE';
export const REPORTS_USER_ACTIVITY_TABLE = 'REPORTS_USER_ACTIVITY_TABLE';
export const REPORT_USER_ACTIVITY_TABLE = 'REPORT_USER_ACTIVITY_TABLE';

export const MESSAGE_TEMPLATES_TABLE = 'MESSAGE_TEMPLATES_TABLE';
export const SYSTEMIC_MESSAGE_TEMPLATES_TABLE =
  'SYSTEMIC_MESSAGE_TEMPLATES_TABLE';
export const PHONE_CALL_TABLE = 'PHONE_CALL_TABLE';
export const OPPORTUNITIES_TABLE = 'OPPORTUNITIES_TABLE';
export const OPPORTUNITIES_PIPELINE_TABLE = 'OPPORTUNITIES_PIPELINE_TABLE';
export const CASE_TABLE = 'CASE_TABLE';
export const FACILITIES_TABLE = 'FACILITIES_TABLE';
export const EMPLOYEE_MANAGEMENT_TABLE = 'EMPLOYEE_MANAGEMENT_TABLE';
export const VIDEO_AUTHENTICATION_LIST_TABLE =
  'VIDEO_AUTHENTICATION_LIST_TABLE';
export const SESSION_LIST_TABLE = 'SESSION_LIST_TABLE';
export const SALE_OPPORTUNITY_LIST_TABLE = 'SALE_OPPORTUNITY_LIST_TABLE';
export const SALE_PRODUCTS_LIST_TABLE = 'SALE_PRODUCTS_LIST_TABLE';
export const PRODUCT_SETTING_TABLE = 'PRODUCT_SETTING_TABLE';
export const REPRESENTATIVE_TABLE = 'REPRESENTATIVE_TABLE';
export const AGENT_TABLE = 'AGENT_TABLE';
export const BRANCHES_LIST_TABLE = 'BRANCHES_LIST_TABLE';
export const ROLES_LIST_TABLE = 'ROLES_LIST_TABLE';
export const PORTFOLIO_TRANSACTION_HISTORY_TAB =
  'PORTFOLIO_TRANSACTION_HISTORY_TAB';
export const PORTFOLIO_ORDER_HISTORY_ETF_TAB =
  'PORTFOLIO_ORDER_HISTORY_ETF_TAB';
export const PORTFOLIO_ORDER_HISTORY_NOE_ETF_TAB =
  'PORTFOLIO_ORDER_HISTORY_NOE_ETF_TAB';
export const OPERATION_MANAGEMENT = 'OPERATION_MANAGEMENT';
export const KYC_LEVELS_TABLE = 'KYC_LEVELS_TABLE';
export const DISPATCH_GROUP_TABLE = 'DISPATCH_GROUP_TABLE';
export const TASK_MANAGEMENT_TABLE = 'TASK_MANAGEMENT_TABLE';

// default UI Settings

const ENV = resolveVariable(BASE_VARIABLE_KEYS.ENV_MODE);

export const INITIAL_UI_SETTINGS = {
  tables: {
    [PEOPLE_TABLE]: {
      hiddenColumns: [], // For reference
    },
  },
  globalSettings: {
    table: {
      theme: 'light',
      size: 'small',
    },
    shortcuts: {
      [MODAL_FOR_PERSON_FORM]: {
        shortcut: 'shift+u',
        label: 'فرد جدید',
        icon: 'user-add',
      },
      [MODAL_FOR_LEAD_FORM]: {
        shortcut: 'shift+l',
        label: 'سرنخ جدید',
        icon: 'user',
        authority: Actions.LeadCreateUserDefined,
      },
      [MODAL_FOR_ADD_TASK]: {
        shortcut: 'shift+t',
        label: 'کار جدید',
        icon: 'profile',
        authority: Actions.createTask,
      },
      [MODAL_FOR_PHONE_CALLS]: {
        shortcut: 'shift+p',
        label: 'تماس جدید',
        icon: 'phone',
        authority: Actions.voipCallCreate,
      },
      [MODAL_FOR_ADD_SESSION]: {
        shortcut: 'shift+m',
        label: 'جلسه جدید',
        icon: 'team',
        authority: Actions.sessionCreate,
      },
      [MODAL_FOR_ADD_CASE]: {
        shortcut: 'shift+c',
        label: 'درخواست جدید',
        icon: 'usergroup-add',
        authority: Actions.createCase,
      },
    },
    ui: {
      theme: 'default',
      font: 'IranYekan',
      fontSize: '13',
    },
    menu: currentUser => [
      {
        name: 'dashboard',
        icon: 'dashboard',
        link: '/',
        active: true,
      },
      {
        name: 'crm',
        icon: 'customer-service',
        key: 'sub1',
        active: !sejamUsers.includes(currentUser),
        submenu: [
          {
            name: 'leads',
            link: '/leads',
            active: true,
          },
          {
            name: 'people',
            link: '/people',
            active: true,
          },
          {
            name: 'opportunities',
            link: '/opportunities',
            active: true,
          },
          {
            name: 'saleOpportunities',
            link: '/sales-opportunities',
            active:
              resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'KIAN_ADVISORY',
          },
        ],
      },
      {
        name: 'dealings',
        icon: 'schedule',
        key: 'sub2',
        active: !sejamUsers.includes(currentUser),
        submenu: [
          {
            name: 'calls',
            link: '/phone-calls',
            active: true,
          },
        ],
      },
      {
        name: 'case',
        icon: 'usergroup-add',
        link: '/case',
        active: !sejamUsers.includes(currentUser),
      },
      {
        name: 'representatives',
        icon: 'bank',
        link: '/representatives',
        active: true,
      },
      {
        name: 'branches',
        icon: 'apartment',
        link: '/branches',
        active: true,
      },
      {
        name: 'reports',
        icon: 'bar-chart',
        link: '/reports',
        active: !sejamUsers.includes(currentUser),
      },
      {
        name: 'employeeManagement',
        icon: 'solution',
        link: '/employee-management',
        active:
          sejamUsers.includes(currentUser) || (ENV && ENV === 'production')
            ? levantIds.includes(currentUser)
            : true,
      },
      {
        name: 'settings',
        icon: 'setting',
        link: '/settings',
        active: !sejamUsers.includes(currentUser),
      },
      {
        name: 'tools',
        icon: 'tool',
        link: '/tools',
        active: !sejamUsers.includes(currentUser),
      },
      {
        name: 'videoAuthentication',
        icon: 'safety',
        link: '/videoKyc',
        active:
          ENV && ENV === 'production' ? levantIds.includes(currentUser) : true,
      },
      {
        name: 'sessions',
        icon: 'team',
        link: '/session',
        active: !sejamUsers.includes(currentUser),
      },
    ],
    language: 'fa-IR',
  },
};
