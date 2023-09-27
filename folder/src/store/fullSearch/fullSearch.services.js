import {
  FetchData,
  mockService,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const searchMockData = mockService
  ? require('../../../restApiDesign/search')
  : {};

export const allFullSearchUrl = (
  params,
  partyType,
  isAll,
  filterActives,
  // eslint-disable-next-line no-unused-vars
  ignoreContext = true,
) =>
  isAll
    ? `${resolveVariable(
        BASE_VARIABLE_KEYS.PARTY_URL,
      )}/fullsearch/all?page=0&size=10&query=${params}&ignoreContext=${true}&partyType=${partyType}`
    : `${resolveVariable(
        BASE_VARIABLE_KEYS.PARTY_URL,
      )}/fullsearch/all?filterActives=${filterActives}&page=0&size=10&query=${params}&ignoreContext=${true}`;

export function createGetFullSearchRequest(fetch, token) {
  return async function fullSearchRequest(
    params,
    isAll,
    filterActives,
    ignoreContext = true,
  ) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: searchMockData,
      };
    }
    return FetchData(
      fetch,
      allFullSearchUrl(params, isAll, filterActives, ignoreContext),
      token,
    );
  };
}
