import {
  mockService,
  FetchData,
  DeleteData,
  PostData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

const addTaskUrlMockData = mockService
  ? require('../../../restApiDesign/task/addTask')
  : {};

const deleteTaskUrlMockData = mockService
  ? require('../../../restApiDesign/task/deleteTask')
  : {};

const taskListMockData = mockService
  ? require('../../../restApiDesign/task/task')
  : {};

export const deleteTaskUrl = id =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/task/${id}`;
export const addTaskUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/task`;
export const taskListUrl = params =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/task/lead/${params}`;

export function createGetTaskListRequest(fetch, token) {
  return async function taskListRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: taskListMockData,
      };
    }
    return FetchData(fetch, taskListUrl(params), token);
  };
}

export function createGetDeleteTaskRequest(fetch, token) {
  return async function deleteTaskRequest(id) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: deleteTaskUrlMockData,
      };
    }
    return DeleteData(fetch, deleteTaskUrl(id), token);
  };
}

export function createGetAddTaskRequest(fetch, token) {
  return async function addTaskRequest(params) {
    if (mockService) {
      return {
        status: 200,
        err: false,
        resp: addTaskUrlMockData,
      };
    }
    return PostData(fetch, addTaskUrl(), params, token);
  };
}
