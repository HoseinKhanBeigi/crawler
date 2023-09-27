import request from '../utils/request';

export const sessionServices = {
  getSessionDetailById: id =>
    request(`session/${id}`).get({
      message: {
        error: 'خطای دریافت اطلاعات',
      },
    }),
  downloadSessionFile: fileId =>
    request(`sessionAttachment/${fileId}`).get({
      shouldBlob: true,
      message: {
        error: 'خطای دریافت فایل',
      },
    }),
  postSessionAttachment: file =>
    request('sessionAttachment').upload(file, {
      message: {
        error: 'خطا در آپلود فایل جلسه!',
        success: 'فایل مورد نظر با موفقیت آپلود شد.',
      },
      shouldPlain: true,
    }),
  removeSessionAttachmentById: id =>
    request(`sessionAttachment/${id}`).delete({
      message: {
        error: 'خطا در حذف فایل جلسه!',
        success: 'فایل مورد نظر با موفقیت حذف شد.',
      },
    }),
  putSession: body =>
    request('session').put(body, {
      message: {
        error: 'خطای ویرایش جلسه',
      },
    }),
  postNewSession: body =>
    request('session').post(body, {
      message: {
        error: 'خطای افزدن جلسه',
      },
    }),
  getCommentsBySessionId: id =>
    request(`sessionComment/${id}`).get({
      message: {
        error: 'خطای دریافت اطلاعات کامنت ها',
      },
    }),
  postNewComment: body =>
    request('sessionComment').post(body, {
      message: {
        success: 'کامنت با موفقیت ثبت شد',
        error: 'خطای ارسال کامنت',
      },
    }),
};
