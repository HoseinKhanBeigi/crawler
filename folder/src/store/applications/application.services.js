import { mockService } from '../../serviceConfig';

const applicationsMockData = require('../../../restApiDesign/opportunities/applications');

export function createGetApplicationsRequest() {
  return async function applicationsRequest() {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: applicationsMockData,
      };
    }
    return {
      status: 200,
      err: false,
      resp: applicationsMockData,
    };
    // return FetchData(fetch, applicationsUrl(), token);
  };
}
