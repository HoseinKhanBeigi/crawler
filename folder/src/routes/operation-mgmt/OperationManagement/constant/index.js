import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';

const operationManagementEndpointQueryParams = new URLSearchParams({
  'example.unitType': 'BRANCH',
  sortDirection: 'DESC',
  'example.operationType': 'OPERATIONAL',
}).toString();

export const operationManagementEndpoint = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
  )}/branch?${operationManagementEndpointQueryParams}`;
