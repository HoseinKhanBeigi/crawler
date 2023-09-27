import request from '../utils/request';

// PUT /api/v3/{context}/task-management/save/
const putAddTask = body =>
  request('task-management/save').put(body, {
    message: {
      success: 'افزودن کار با موفقیت انجام شد.',
      error: 'خطا در افزودن کار! !',
    },
  });

// PUT /api/v3/{context}/task-management/edit
const postUpdateTask = body =>
  request('task-management/edit').post(body, {
    message: {
      success: 'ویرایش با موفقیت انجام شد.',
      error: 'خطا در انجام ویرایش!',
    },
  });

// POST crm/api/v3/KIAN_DIGITAL/task-management/change-status/61/IN_PROGRESS
const postChangeTaskStatus = ({ id, status }) =>
  request(`task-management/change-status/${id}/${status}`).post(null, {
    message: {
      success: 'تغییر وضعیت تسک با موفقیت انجام شد.',
      error: 'خطا در تغییر وضعیت تسک!',
    },
  });

// DELETE crm/api/v3/KIAN_DIGITAL/task-management/61
const deleteTask = id =>
  request(`task-management/${id}`).delete(null, {
    message: {
      success: 'حذف تسک با موفقیت انجام شد.',
      error: 'خطا در حذف تسک!',
    },
  });

// GET crm/api/v3/{context}/task-management/{task_id}
const getTaskById = id =>
  request(`task-management/${id}`).get({
    message: {
      error: 'خطا در دریافت اطلاعات تسک!',
    },
  });

export default {
  putAddTask,
  postUpdateTask,
  getTaskById,
  postChangeTaskStatus,
  deleteTask,
};
