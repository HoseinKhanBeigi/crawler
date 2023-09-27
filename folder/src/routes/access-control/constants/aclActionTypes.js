export const aclActionTypes = {
  MENU: 'MENU',
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  SUB_FEATURE: 'SUB_FEATURE',
};

export const crudActionsSortedByPriority = [
  aclActionTypes.READ,
  aclActionTypes.UPDATE,
  aclActionTypes.DELETE,
];
