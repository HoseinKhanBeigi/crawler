import { resolveVariable, BASE_VARIABLE_KEYS } from '../serviceConfig';
import request from '../utils/request';

export const createDispatchGroup = body =>
  request(
    `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/dispatch-group/add`,
  ).post(body, {
    message: {
      error: 'خطا در ثبت گروه!',
    },
  });

export const deleteDispatchGroup = (body, id) =>
  request(`dispatch-group/${id}`).delete(body, {
    message: {
      error: 'خطا در حذف گروه!',
    },
  });

export const updateDispatchGroup = body =>
  request(`dispatch-group/update`).put(body, {
    message: {
      error: 'خطا در بروزرسانی گروه!',
    },
  });

export const getBranchCitiesDispatchGroup = body =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/branch/citites`,
  ).get(body, {
    message: {
      error: 'خطا در دریافت لیست شعب شهر های!',
    },
  });

export const getRepresentativiesCityDispatchGroup = (body, id) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/representative/all-in-cities?cityClassificationIds=${id}`,
  ).get(body, {
    message: {
      error: 'خطا در دریافت لیست نمایندگی های شهر!',
    },
  });

export const getBranchesRepresentativeDispatchGroup = (body, ids) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/branch/all-in-representatives?representativeIds=${ids}`,
  ).get(body, {
    message: {
      error: 'خطا در دریافت لیست نمایندگی های شهر!',
    },
  });

export const getAplicationsDispatchGroup = body =>
  request(`/organizations`).get(body, {
    message: {
      error: 'خطا در دریافت لیست اپلیکیشن ها!',
    },
  });

export const getCityDispatchGroup = body =>
  request(`/organizations`).get(body, {
    message: {
      success: 'گروه شما با موفقیت ثبت شد.',
      error: 'خطا در ثبت گروه!',
    },
  });

export const getListDispatchGroup = body =>
  request(`/dispatch-group/search?page=0&size=5&sort=id,DESC`).get(body, {
    message: {
      error: 'خطا در دریافت لیست گروه ها!',
    },
  });
