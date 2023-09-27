import {
  DO_ACTION_ON_MESSAGE_TEMPLATES_REQUEST,
  DO_ACTION_ON_MESSAGE_TEMPLATES_SUCCESS,
  DO_ACTION_ON_MESSAGE_TEMPLATES_FAILURE,
  CREATE_NEW_MESSAGE_TEMPLATE_REQUEST,
  CREATE_NEW_MESSAGE_TEMPLATE_SUCCESS,
  CREATE_NEW_MESSAGE_TEMPLATE_FAILURE,
  EDIT_MESSAGE_TEMPLATE_REQUEST,
  EDIT_MESSAGE_TEMPLATE_SUCCESS,
  EDIT_MESSAGE_TEMPLATE_FAILURE,
} from './messageTemplate.constants';

import CPMessage from '../../components/CP/CPMessage';

/* Doing action on message templates */
export function doActionOnMessageTemplatesAction(body) {
  return async (dispatch, getState, { doActionOnMessageTemplates }) => {
    dispatch({ type: DO_ACTION_ON_MESSAGE_TEMPLATES_REQUEST });

    const result = await doActionOnMessageTemplates(body);

    if (result.err) {
      CPMessage('خطای انجام عملیات بر روی پیام‌ها', 'error');
      return dispatch({ type: DO_ACTION_ON_MESSAGE_TEMPLATES_FAILURE });
    }

    switch (body.action) {
      case 'DELETE':
        CPMessage('پیام حذف گردید', 'success');
        break;
      case 'ACTIVATE':
        CPMessage('پیام فعال گردید', 'success');
        break;
      case 'DEACTIVATE':
        CPMessage('پیام غیرفعال گردید', 'success');
        break;
      default:
        CPMessage('وضعیت پیام تغییر یافت', 'success');
        break;
    }

    return dispatch({ type: DO_ACTION_ON_MESSAGE_TEMPLATES_SUCCESS });
  };
}

/* Create a new message template */
export function createNewMessageTemplateAction(body) {
  return async (dispatch, getState, { createNewMessageTemplate }) => {
    dispatch({ type: CREATE_NEW_MESSAGE_TEMPLATE_REQUEST });

    const result = await createNewMessageTemplate(body);

    if (result.err) {
      dispatch({ type: CREATE_NEW_MESSAGE_TEMPLATE_FAILURE });
      CPMessage('مشکلی در ایجاد پیام به‌وجود آمد!', 'error');
    } else {
      CPMessage('پیام جدید با موفقیت ایجاد گردید.', 'success');
      dispatch({ type: CREATE_NEW_MESSAGE_TEMPLATE_SUCCESS });
    }

    return result;
  };
}

/* Edit a message template */
export function editMessageTemplateAction(body) {
  return async (dispatch, getState, { editMessageTemplate }) => {
    dispatch({ type: EDIT_MESSAGE_TEMPLATE_REQUEST });

    const result = await editMessageTemplate(body);

    if (result.err) {
      dispatch({ type: EDIT_MESSAGE_TEMPLATE_FAILURE });
      CPMessage('مشکلی در ویرایش پیام به‌وجود آمد!', 'error');
    } else {
      dispatch({ type: EDIT_MESSAGE_TEMPLATE_SUCCESS });
      CPMessage('پیام با موفقیت ویرایش گردید.', 'success');
    }

    return result;
  };
}
