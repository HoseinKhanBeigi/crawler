import request from '../utils/request';

// GET /api/v3/{context}/contact-center/party-locations/{levantId}/{type}/{id}
const unmask = (levantId, type, locationId) =>
  request(
    `/contact-center/party-locations/${levantId}/${type}/${locationId}`,
  ).get({
    message: {
      error: 'خطای آنمسک!',
    },
  });

export default {
  unmask,
};
