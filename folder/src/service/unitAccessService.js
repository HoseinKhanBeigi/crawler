import axios from 'axios';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';
import request from '../utils/request';

const baseURL = resolveVariable(BASE_VARIABLE_KEYS.UNIT_ACCESS_URL);

const unitAccessApiInstance = axios.create({
  baseURL,
});

const unitAccessApi = token => {
  unitAccessApiInstance.defaults.headers.Authorization = `Bearer ${token}`;
  return unitAccessApiInstance;
};

const unitAccessService = {
  getAllAccessibleUnit(options = { customToken: null }) {
    if (options?.customToken) {
      return unitAccessApi(options?.customToken).get(
        `/get-all-accessible-unit`,
      );
    }
    return request(`${baseURL}/get-all-accessible-unit`).get();
  },
  readAllAccessibleUnit(options = { customToken: null }) {
    if (options?.customToken) {
      return unitAccessApi(options?.customToken).get(
        `/read-all-accessible-unit`,
      );
    }
    return request(`${baseURL}/read-all-accessible-unit`).get();
  },
  setDefaultUnit(unitId, options = { customToken: null }) {
    if (options?.customToken) {
      return unitAccessApi(options.customToken).put(`/default/${unitId}`);
    }
    return request(`${baseURL}/default/${unitId}`).put(
      {},
      {
        message: {
          error: 'خطای تغییر واحد سازمانی پیشفرض',
          success: 'واحد سازمانی پیشفرض با موفقیت ثبت شد',
        },
      },
    );
  },
  changeCurrentUnit(unitCode) {
    return request(`${baseURL}/${unitCode}`).put(
      {},
      {
        message: {
          error: 'خطای تغییر واحد سازمانی',
          success: 'واحد سازمانی با موفقیت تغییر کرد',
        },
      },
    );
  },
};
export default unitAccessService;
