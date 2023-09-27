import { useReducer } from 'react';

import {
  changeCRUDDropdownAction,
  changeMenuAccessSwitchAction,
  initStoreAction,
} from '../../Model/actions';
import aclFormReducer from '../../Model/reducer';
import {
  getCRUDDropdownDataSourceSelector,
  getCRUDDropdownValueSelector,
  getHasCRUDDropdownSelector,
  getMenuAccessSwitchDisabledStateSelector,
  getMenuAccessSwitchStateSelector,
} from '../../Model/selectors';

const initialState = [];

const useAclFormStore = () => {
  const [state, dispatch] = useReducer(aclFormReducer, initialState);

  // Actions
  const initStore = initStoreAction(dispatch);
  const changeMenuAccessSwitch = changeMenuAccessSwitchAction(dispatch);
  const changeCRUDDropdown = changeCRUDDropdownAction(dispatch);
  //---------------------------

  // selectors
  const getMenuAccessSwitchState = getMenuAccessSwitchStateSelector(state);
  const getMenuAccessSwitchDisabledState = getMenuAccessSwitchDisabledStateSelector(
    state,
  );
  const getCRUDDropdownDataSource = getCRUDDropdownDataSourceSelector(state);
  const getHasCRUDDropdown = getHasCRUDDropdownSelector(state);
  const getCRUDDropdownValue = getCRUDDropdownValueSelector(state);
  // --------------------------
  return {
    initStore,
    changeMenuAccessSwitch,
    changeCRUDDropdown,
    getMenuAccessSwitchState,
    getMenuAccessSwitchDisabledState,
    getCRUDDropdownDataSource,
    getHasCRUDDropdown,
    getCRUDDropdownValue,
    groupActions: state,
  };
};

export default useAclFormStore;
