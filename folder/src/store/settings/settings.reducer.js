import {
  GET_UI_SETTINGS_FAILURE,
  GET_UI_SETTINGS_REQUEST,
  GET_UI_SETTINGS_SUCCESS,
  POST_UI_SETTINGS_FAILURE,
  POST_UI_SETTINGS_REQUEST,
  POST_UI_SETTINGS_SUCCESS,
  INITIAL_UI_SETTINGS,
} from './settings.constants';

// set all default ui settings here
const initialValue = {
  settings: INITIAL_UI_SETTINGS,
  error: false,
  loading: false,
  saving: false,
};

export default function settings(state = initialValue, action = {}) {
  switch (action.type) {
    case GET_UI_SETTINGS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_UI_SETTINGS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_UI_SETTINGS_SUCCESS: {
      let stateValue = INITIAL_UI_SETTINGS;
      if (action.payload?.setting) {
        stateValue = Object.assign(
          JSON.parse(action.payload?.setting),
          INITIAL_UI_SETTINGS,
        );
      }
      return {
        ...state,
        loading: false,
        error: false,
        settings: stateValue,
      };
    }

    case POST_UI_SETTINGS_REQUEST: {
      return {
        ...state,
        saving: true,
        error: false,
        settings: action.payload,
      };
    }
    case POST_UI_SETTINGS_FAILURE: {
      return {
        ...state,
        saving: false,
        error: true,
      };
    }
    case POST_UI_SETTINGS_SUCCESS: {
      return {
        ...state,
        saving: false,
        error: false,
      };
    }

    default: {
      return state;
    }
  }
}
