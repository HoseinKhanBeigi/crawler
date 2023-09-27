import { aclActionGrantTypes } from '../constants/aclActionGrantTypes';
import { findActionById } from '../Controller/helpers';

export const getMenuAccessSwitchStateSelector = state => ({ parentId, id }) =>
  findActionById(state, id, parentId)?.grantType === aclActionGrantTypes.ENABLE;

export const getMenuAccessSwitchDisabledStateSelector = state => ({
  parentId,
}) => {
  const isSubFeature = !!parentId;
  if (isSubFeature) {
    const parentGrantType = findActionById(state, parentId, null)?.grantType;
    return !parentGrantType || parentGrantType === aclActionGrantTypes.DISABLE;
  }
  return false;
};

export const getHasCRUDDropdownSelector = state => (
  { parentId, id },
  aclActionType,
) => {
  const action = findActionById(state, id, parentId);
  return (
    action?.grantType === aclActionGrantTypes.ENABLE &&
    !!action?.crudOperators[aclActionType]
  );
};

export const getCRUDDropdownDataSourceSelector = state => (
  { id, parentId },
  aclActionType,
) =>
  findActionById(state, id, parentId)?.crudOperators[aclActionType]
    ?.dataSource || [];

export const getCRUDDropdownValueSelector = state => (
  { id, parentId },
  aclActionType,
) =>
  findActionById(state, id, parentId)?.crudOperators[aclActionType]?.grantType;
