import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

// GET /{host}/crm/api/v3/${context}/party/
const getClassification = category =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.PARTY_URL,
    )}/classifications/${category}`,
  ).get({
    message: {
      error: 'خطای دریافت اطلاعات دسته‌های کسب‌و‌کار',
    },
  });

// GET /{host}/crm/api/v3/${context}/party
const getClassificationSubcategories = category =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.PARTY_URL,
    )}/categories/businessCategories/${category}`,
  ).get({
    message: {
      error: 'خطای دریافت اطلاعات کد تکمیلی صنف',
    },
  });
// GET /api/v1/party-locations/person-contact-info
const getPersonContactInfoByLevantId = levantId =>
  request(`party/party-locations/person-contact-info?levantId=${levantId}`).get(
    {
      message: {
        error: 'خطای دریافت اطلاعات کد تکمیلی صنف',
      },
    },
  );

export default {
  getClassificationSubcategories,
  getClassification,
  getPersonContactInfoByLevantId,
};
