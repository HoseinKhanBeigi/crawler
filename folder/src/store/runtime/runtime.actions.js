/* eslint-disable import/prefer-default-export */

import { SET_RUNTIME_VARIABLE } from './runtime.constants';

export function setRuntimeVariable({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}

export function setName() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: SET_RUNTIME_VARIABLE,
        payload: {
          name: 'test',
          value: '1234',
        },
      });
    });
  };
}

export function loadMenu({ menu }) {
  return (dispatch, getState, { getMenu }) => {
    const storedData = (menu && menu.data) || null;
    if (!storedData) {
      dispatch(setName());
      return getMenu(getState().runtime.initialNow)
        .then(data => {
          dispatch(
            setRuntimeVariable({
              name: 'javad',
              value: data,
            }),
          );
        })
        .catch(error => {
          dispatch(setName(error));
        });
    }
    return storedData;
  };
}
