import { storeActionTypes } from '../constants/storeActionTypes';
import AclAction from '../Controller/utils/AclAction';
import { aclActionGrantTypes } from '../constants/aclActionGrantTypes';
import { findActionById } from '../Controller/helpers';

/* eslint-disable no-param-reassign */

const cloneAclState = state => [...state]; // shallow copy

const addNewActionToState = (state, actionToAdd) => state.push(actionToAdd);

const changeMenuAccessSwitch = (state, action) => {
  const stateClone = cloneAclState(state);
  const { id, parentId, grantType } = action.payload;
  const toggleDefaultSwitchForSubFeatures = (targetAction, aclGrantType) => {
    targetAction.subFeatureIds.forEach(subFeatureId => {
      targetAction.subFeatures[subFeatureId].grantType = aclGrantType;
    });
  };
  const targetAction = findActionById(stateClone, id, parentId);
  targetAction.grantType = grantType;
  const isMainFeature = !parentId;
  if (isMainFeature) {
    if (grantType === aclActionGrantTypes.ENABLE) {
      toggleDefaultSwitchForSubFeatures(
        targetAction,
        aclActionGrantTypes.ENABLE,
      );
    } else {
      toggleDefaultSwitchForSubFeatures(
        targetAction,
        aclActionGrantTypes.DISABLE,
      );
    }
  }
  return stateClone;
};

const changeCRUDDropdown = (state, action) => {
  const stateClone = cloneAclState(state);
  const { id, parentId, grantType, actionType } = action.payload;
  const targetAction = findActionById(state, id, parentId);
  targetAction.crudOperators[actionType].grantType = grantType;
  return stateClone;
};

const initStore = (state, action) => {
  const stateClone = [];
  const { allActions } = action.payload;
  allActions.forEach(item => {
    const newAction = new AclAction(item);
    addNewActionToState(stateClone, newAction);
  });
  return stateClone;
};

const aclFormReducer = (state, action) => {
  switch (action.type) {
    case storeActionTypes.CHANGE_MENU_ACCESS_SWITCH:
      return changeMenuAccessSwitch(state, action);
    case storeActionTypes.CHANGE_CRUD_DROPDOWN:
      return changeCRUDDropdown(state, action);
    case storeActionTypes.INIT_STORE:
      return initStore(state, action);
    default:
      return state;
  }
};

export default aclFormReducer;
