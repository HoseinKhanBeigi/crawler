export const findActionById = (state, id, parentId) =>
  !parentId
    ? state.find(item => item.id === id)
    : state[state.findIndex(item => item.id === parentId)]?.subFeatures[id];

export const prepareGetAclGroupByIdServiceResult = allActions => {
  /*
there are two types of id in service action dto
{
  id: number
  action: {
  id: number
}
we use first id for our hierarchy form business
and action.id as actionId for service call
*/
  const fixActionObject = action => {
    const { action: ac, ...other } = action;
    const newAction = { ...other };
    Object.entries(ac).forEach(([key, value]) => {
      if (key === 'id') {
        newAction.actionId = value;
        return;
      }
      newAction[key] = value;
    });
    newAction.subFeatures = newAction.subFeatures.map(item =>
      fixActionObject(item),
    );
    newAction.crudOperators = newAction.crudOperators.map(item =>
      fixActionObject(item),
    );
    return newAction;
  };
  return allActions.map(item => fixActionObject(item));
};
