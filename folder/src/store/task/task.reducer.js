import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  TASK_LIST_FAILURE,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
} from './task.constants';

const initialValue = {
  addTaskLoading: false,
  addTaskData: null,
  addTaskError: null,
  deleteTaskLoading: false,
  deleteTaskData: null,
  deleteTaskError: null,
  taskListLoading: false,
  taskListData: null,
  taskListError: null,
  loading: false,
  data: null,
  error: null,
};

export default function user(state = initialValue, action = {}) {
  switch (action.type) {
    case TASK_LIST_REQUEST: {
      return {
        ...state,
        taskListLoading: true,
      };
    }

    case TASK_LIST_SUCCESS: {
      return {
        ...state,
        taskListLoading: false,
        taskListData: action.payload,
      };
    }

    case TASK_LIST_FAILURE: {
      return {
        ...state,
        taskListLoading: false,
        taskListData: null,
        taskListError: action.payload,
      };
    }

    case DELETE_TASK_REQUEST: {
      return {
        ...state,
        deleteTaskLoading: true,
      };
    }

    case DELETE_TASK_SUCCESS: {
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskData: action.payload,
      };
    }

    case DELETE_TASK_FAILURE: {
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskData: null,
        deleteTaskError: action.payload,
      };
    }

    case ADD_TASK_REQUEST: {
      return {
        ...state,
        addTaskLoading: true,
      };
    }

    case ADD_TASK_SUCCESS: {
      return {
        ...state,
        addTaskLoading: false,
        addTaskData: action.payload,
      };
    }

    case ADD_TASK_FAILURE: {
      return {
        ...state,
        addTaskLoading: false,
        addTaskData: null,
        addTaskError: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
