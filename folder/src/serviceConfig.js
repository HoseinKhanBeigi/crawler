// import history from './history';
/* eslint-disable no-undef */
import { getContext } from '../src/utils/context';

// Change mockService name, To be able to export it
export { mockService } from './webConfig';
export {
  createFormBody,
  formData,
  FetchDownload,
  basicDownload,
  BasicFetchData,
  FetchData,
  PatchData,
  PostData,
  PostFileData,
  PutData,
  DeleteData,
  basicPostData,
} from './utils/request/requestHelpers';

const CONTEXT_MAP_STRING = (() => {
  if (
    typeof _CONTEXT_MAP_ !== 'undefined' &&
    _CONTEXT_MAP_.length > 0 &&
    _CONTEXT_MAP_ !== 'undefined'
  ) {
    // eslint-disable-line
    return _CONTEXT_MAP_; // eslint-disable-line
  } else if (process.env.CONTEXT_MAP && process.env.CONTEXT_MAP.length > 0) {
    return process.env.CONTEXT_MAP;
  }
  return '[{"name":"KIAN_ADVISORY","label":"کیان ادوایزری","abbr":"ka","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"KIAN_BUSINESS","label":"کیان بیزنس","abbr":"kb","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"KIAN_DIGITAL","label":"کیان دیجیتال","abbr":"kd","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"KIAN_LEASING","label":"کیان لیزینگ","abbr":"kl","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"KIAN_TRADE","label":"کیان ترید","abbr":"kt","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"BOURSEON","label":"بورسان","abbr":"bt","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"DEMO","label":"دمو","abbr":"demo","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"LEVANT","label":"لوانت","abbr":"levant","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"DOHI","label":"داهی","abbr":"dohi","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"DORSA","label":"درسا","abbr":"dorsa","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"IRANCR","label":"ایران‌سی‌آر","abbr":"irancr","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"},{"name":"OIL","label":"لیزینگ صنعت نفت","abbr":"oil","serverBaseUrl":"https://uat.kian.digital","neshanClientId":"crm-web","neshanBaseUrl":"https://uat.neshanid.com/auth/realms/KIAN","mqttUrl":"wss://emqx.uat.kian.digital/mqtt"}]';
})();

if (!CONTEXT_MAP_STRING || !(CONTEXT_MAP_STRING.length > 0)) {
  throw new Error('Context-map not found');
}

const CONTEXT_MAP = JSON.parse(CONTEXT_MAP_STRING);

export const hostName = (() => {
  if (process.env.BROWSER) {
    return document.location.hostname || _HOSTNAME_; // eslint-disable-line
  }
  return null;
})();

let contextMap = 'KIAN_TRADE';

if (hostName !== 'localhost' && hostName !== null && hostName.length > 12) {
  // const extractedString = hostName.substring(0, 2);

  const parts = hostName.split('.');
  const extractedString = parts[0];

  // eslint-disable-next-line camelcase
  const envContextFormContext_map_String = CONTEXT_MAP.find(
    e => e.abbr === extractedString,
  );
  // eslint-disable-next-line camelcase
  if (envContextFormContext_map_String === undefined) {
    contextMap = 'KIAN_TRADE';
  }
  contextMap = envContextFormContext_map_String.name;
} else {
  contextMap = 'KIAN_TRADE';
}

export const envContext = process.env.CONTEXT || contextMap; // eslint-disable-line

export const BASE_VARIABLE_KEYS = {
  CONTEXT: 'context',
  TITLE: 'title',
  HOST: 'host',
  AUTH_HOST: 'authHost',
  AUTH_CLIENT_ID: 'authClientId',
  MQTT_URL: 'mqttUrl',
  MQTT_CLIENT_ID: 'mqttClientId',
  MQTT_USER_NAME: 'mqttUserName',
  MQTT_PASSWORD: 'mqttPassword',
  MQTT_CLEAN: 'mqttClean',
  ENV_MODE: 'envMode',
  BASE_URL: 'baseUrl',
  GLUSTER_URL: 'glusterUrl',
  MANAGEMENT_CONSOLE_URL: 'managementConsoleUrl',
  CONFIGURATION: 'configuration',
  AUTH_RESET_PASSWORD_URL: 'authResetPasswordUrl',
  AUTH_BASE_URL: 'authBaseUrl',
  MANAGEMENT_URL: 'managementUrl',
  PARTY_URL: 'partyUrl',
  RESOURCE_MANAGEMENT_URL: 'resourceManagementUrl',
  OPPORTUNITY_URL: 'opportunityUrl',
  BRANCH_MANAGEMENT_URL: 'branchManagementUrl',
  BRANCH_URL: 'branchUrl',
  PARTY_KYC_LEVEL_BASE_URL: 'partyKycLevelBaseUrl',
  UNIT_ACCESS_URL: 'unitAccessUrl',
  PIPELINE_MANAGEMENT: 'pipelineManagement',
  LEAD_RELATION: 'leadRelation',
  ABBR: 'abbr',
};

let baseVariables = {
  notFilled: true,
};

export function refreshVariables(hostedAddress, defaultContext) {
  const contextConfig = getContext(hostedAddress, defaultContext, CONTEXT_MAP);
  if (contextConfig) {
    const env = process.env.ENV || 'local';
    const envMode = typeof _ENV_ !== 'undefined' ? _ENV_ : env; // eslint-disable-line
    const context = contextConfig?.name || '';
    const abbr = contextConfig?.abbr || '';
    const title = contextConfig?.label || 'لوانت';
    const host = contextConfig?.serverBaseUrl || '';
    const authHost = contextConfig?.neshanBaseUrl || '';
    const authClientId = contextConfig?.neshanClientId || '';
    const mqttUrl = contextConfig?.mqttUrl || '';
    const mqttClientId = contextConfig?.mqttClientId || '';
    const mqttUserName = contextConfig?.mqttUserName || '';
    const mqttPassword = contextConfig?.mqttPassword || '';
    const mqttClean = contextConfig?.mqttClean || '';

    baseVariables = {
      context,
      host,
      abbr,
      authHost,
      authClientId,
      mqttUrl,
      mqttClientId,
      mqttUserName,
      mqttPassword,
      mqttClean,
      envMode,
      title,
      baseUrl: `${host}/crm/api/v3/${context}`,
      leadRelation: `${host}/crm/api/v3/${context}/lead-relation`,
      glusterUrl: `${host}/glusterproxy/api/v1`,
      managementConsoleUrl: `${host}/kd-mc/api/v1/managementConsole`,
      configuration: `${host}/configuration/api/v1`,
      authResetPasswordUrl: `${authHost}/login-actions/reset-credentials?client_id=${authClientId}-web&changePass=true`,
      authBaseUrl: `${authHost}/protocol/openid-connect`,
      managementUrl: `${host}/crm/api/v3/${context}/management`,
      partyUrl: `${host}/crm/api/v3/${context}/party`,
      resourceManagementUrl: `${host}/crm/api/v3/${context}/resource-management`,
      opportunityUrl: `${host}/crm/api/v3/${context}/opportunity`,
      unitAccessUrl: `${host}/branch-management/api/v1/${context}/unit-access`,
      branchManagementUrl: `${host}/branch-management/api/v1/${context}`,
      partyKycLevelBaseUrl: `${host}/crm/api/v3/${context}/party/kyc-level`,
      pipelineManagement: `${host}/sheida`,
    };
  } else if (process.env.BROWSER && !contextConfig) {
    throw new Error(`Config not found for host: ${hostedAddress}`);
  }
}

export function resolveVariable(key) {
  if (baseVariables.notFilled) {
    refreshVariables(hostName, envContext);
  }
  if (key in baseVariables) {
    return baseVariables[key];
  }
  console.error(`key: "${key}" not found in baseVariables`);
  return undefined;
}
