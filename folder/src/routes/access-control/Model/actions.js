import { storeActionTypes } from '../constants/storeActionTypes';

export const changeMenuAccessSwitchAction = dispatch => ({
  id,
  parentId,
  grantType,
  subFeatures,
  crudOperators,
}) => {
  dispatch({
    type: storeActionTypes.CHANGE_MENU_ACCESS_SWITCH,
    payload: {
      id,
      parentId,
      grantType,
      subFeatures,
      crudOperators,
    },
  });
};

export const changeCRUDDropdownAction = dispatch => ({
  id,
  parentId,
  grantType,
  actionType,
}) => {
  dispatch({
    type: storeActionTypes.CHANGE_CRUD_DROPDOWN,
    payload: {
      actionType,
      id,
      parentId,
      grantType,
    },
  });
};

export const initStoreAction = dispatch => allActions => {
  dispatch({
    type: storeActionTypes.INIT_STORE,
    payload: {
      allActions,
    },
  });
};
