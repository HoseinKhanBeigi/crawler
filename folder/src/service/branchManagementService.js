import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

// GET /branch-management/api/v1/branch
const getBranchList = () =>
  request({
    url: `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/branch`,
  }).get({
    message: { error: 'خطای دریافت لیست شعب!' },
  });

// POST branch-management/api/v1/KIAN_BUSINESS/unit-employee/status/activate/{unitEmployeeId}
const activateEmployeeInUnit = unitId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/unit-employee/status/activate/${unitId}`,
  ).post(
    {},
    {
      message: {
        success: 'تغیر وضعیت کارمند با موفقیت انجام شد.',
        error: 'خطا در تغییر وضعیت کارمند!',
      },
    },
  );

// POST branch-management/api/v1/KIAN_BUSINESS/unit-employee/status/inactivate/{unitEmployeeId}
const inactivateEmployeeInUnit = unitId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/unit-employee/status/inactivate/${unitId}`,
  ).post(
    {},
    {
      message: {
        success: 'تغیر وضعیت کارمند با موفقیت انجام شد.',
        error: 'خطا در تغییر وضعیت کارمند!',
      },
    },
  );

// POST branch-management/api/v1/KIAN_BUSINESS/unit-employee/status/inactivate-in-organization/{userId}
const InactivateEmployeeInOrganization = userId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/unit-employee/status/inactivate-in-organization/${userId}`,
  ).post(
    {},
    {
      message: {
        success: 'تغیر وضعیت کارمند با موفقیت انجام شد.',
        error: 'خطا در تغییر وضعیت کارمند!',
      },
    },
  );

// POST branch-management/api/v1/KIAN_BUSINESS/unitemployee/status/activate/{id}
const postToggleEmployeeActivation = ({ id, status }) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/unit-employee/status/${status.toLowerCase()}/${id}`,
  ).post(
    {},
    {
      message: {
        success: 'تغیر وضعیت کارمند با موفقیت انجام شد.',
        error: 'خطا در تغییر وضعیت کارمند!',
      },
    },
  );

// PUT /api/v3/{context}/accesses/change-product-pipelines
const putChangeProductPipelineUserAccess = (body, userId) =>
  request(`accesses/change-product-pipelines?userId=${userId}`).put(body, {
    message: {
      success: 'تخصیص پایپ لاین با موفقیت انجام شد.',
    },
  });

// PATCH /api/v1/employee/make-employee-onduty
const patchOnDutyEmployee = levantId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/employee/make-employee-onduty?levantId=${levantId}`,
  ).patch(null, {
    message: {
      success: ' تغییر وضعیت سازمانی کاربر با موفقیت انجام شد.',
      error: 'خطا در تغییر وضعیت سازمانی کارمند!',
    },
  });

// PATCH /api/v1/employee/make-employee-offwork
const patchOffWorkEmployee = levantId =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/employee/make-employee-offwork?levantId=${levantId}`,
  ).patch(null, {
    message: {
      success: ' تغییر وضعیت سازمانی کاربر با موفقیت انجام شد.',
      error: 'خطا در تغییر وضعیت سازمانی کارمند!',
    },
  });

// POST /api/v1/employee/change-employee-branch?levantId=${levantId}&newBranchCode=${selectedBranch}
const postChangeEmployeeBranch = ({ levantId, selectedBranch }) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/employee/change-employee-branch?levantId=${levantId}&newBranchCode=${selectedBranch}`,
  ).post(null, {
    message: {
      success: 'تغییر شعبه کاربر با موفقیت انجام شد.',
      error: 'خطا در تغییر شعبه کارمند!',
    },
  });

// GET /api/v3/{context}/accesses/user-access
const getUserPipelineProductList = userId =>
  request({
    url: `accesses/user-access?userId=${userId}`,
  }).get({
    message: { error: 'خطا در دریافت لیست پایپ لاین های این کارمند!' },
  });

// GET /api/v1/role
const getRoleList = () =>
  request({
    url: `${resolveVariable(BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL)}/role`,
  }).get({
    message: { error: 'خطا در دریافت لیست نقش!' },
  });

// POST /api/v3/{context}/voip_mapper/add
const postAddingOrganizationInfo = body =>
  request('voip_mapper/add').post(body, {
    message: {
      success: 'مشخصات سازمانی با موفقیت ثبت شد.',
      error: 'خطا در ثبت مشخصات سازمانی!',
    },
  });

// PUT /api/v3/{context}/voip_mapper/edit
const putEditEmployeeVoipInfo = body =>
  request('voip_mapper/edit').put(body, {
    message: {
      success: 'ویرایش اطلاعات سازمانی با موفقیت انجام شد.',
    },
  });

// GET /api/v3/{context}/voip_mapper/all
const getEmployeeVoipInfo = levantId =>
  request({
    url: `voip_mapper/all?levantId=${levantId}`,
  }).get({
    message: { error: 'خطا در دریافت اطلاعات سازمانی!' },
  });

// GET /api/v3/{context}/voip_mapper/mapper-by-id/{levantId}
const getEmployeeVoipInfoBylevantId = levantId =>
  request({
    url: `voip_mapper/mapper-by-levant-id/${levantId}`,
  }).get({
    message: { error: 'خطا در دریافت اطلاعات ویپ!' },
  });

// POST /api/v1/employee/upload-profile-image
const postUploadProfileImage = (body, levantId) =>
  request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/employee/upload-profile-image?levantId=${levantId}`,
  ).post(body, {
    message: {
      success: 'تصویر پروفایل با موفقیت آپلود شد.',
      error: 'خطا در آپلود تصویر پروفایل!',
    },
    shouldUpload: true,
  });

// GET /branch-management/api/v1/{context}/employee/all-in-current-unit
const getAllCurrentUnitEmployee = () =>
  request({
    url: `${resolveVariable(
      BASE_VARIABLE_KEYS.BRANCH_MANAGEMENT_URL,
    )}/employee/all-in-current-unit`,
  }).get({
    message: { error: 'خطا در دریافت لیست کارمندان واحد جاری!' },
  });

export default {
  getBranchList,
  putChangeProductPipelineUserAccess,
  postChangeEmployeeBranch,
  patchOffWorkEmployee,
  patchOnDutyEmployee,
  getUserPipelineProductList,
  getRoleList,
  postAddingOrganizationInfo,
  putEditEmployeeVoipInfo,
  getEmployeeVoipInfo,
  getEmployeeVoipInfoBylevantId,
  postUploadProfileImage,
  postToggleEmployeeActivation,
  getAllCurrentUnitEmployee,
  activateEmployeeInUnit,
  inactivateEmployeeInUnit,
  InactivateEmployeeInOrganization,
};
