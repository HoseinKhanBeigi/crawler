import request from '../utils/request';

// PUT /api/v3/{context}/case_management/case/edit
const putEditCase = body =>
  request(`case_management/case/edit`).put(body, {
    message: {
      success: 'ویرایش با موفقیت انجام شد.',
      error: 'خطا در انجام ویرایش!',
    },
  });

// GET /api/v3/{context}/case_management/case/show-case/{case-id}
const getCaseByCaseId = id =>
  request(`case_management/case/show-case/${id}`).get({
    message: {
      error: 'خطا در دریافت اطلاعات درخواست!',
    },
  });

// GET /api/v3/{context}/case_management/case/all/?{params}
const getAllCase = param =>
  request(`case_management/case/all/${param}`).get({
    message: {
      error: 'خطا در دریافت لیست درخواست !',
    },
  });

// GET /api/v3/{context}/case_management/case_answer/${id}/all
const getCaseAnswerListByCaseId = id =>
  request(`case_management/case_answer/${id}/all?sort=createdDate,desc`).get({
    message: {
      error: 'خطا در دریافت لیست درخواست ها!',
    },
  });

// POST /api/v3/{context}/party/qrs/{opportunityId}/generate
const postCaseAnswer = body =>
  request('case_management/case_answer/add').post(body, {
    message: {
      success: 'پیام شما با موفقیت ثبت شد.',
      error: 'خطا در ثبت پیام!',
    },
  });

export default {
  putEditCase,
  getCaseByCaseId,
  getAllCase,
  getCaseAnswerListByCaseId,
  postCaseAnswer,
};
