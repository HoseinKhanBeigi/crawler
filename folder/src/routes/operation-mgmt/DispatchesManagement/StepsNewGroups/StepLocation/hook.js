import { useReducer } from 'react';
import { updateDispatchGroup } from '../../../../../service/dispatchGroupServices';

const reducer = (state, action) => {
  switch (action.type) {
    case 'branchAdded':
      return [...state, ...action.payload];
    case 'branchRemoved':
      return [...action.payload];
    default:
      return state;
  }
};
const useSelectLocation = (initialState = [], onNextStep, data) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAddBranch = async (branchSelected, branches) => {
    const branchesSelectedData = branchSelected.map(item =>
      branches.find(branch => branch.value === item),
    );
    dispatch({ type: 'branchAdded', payload: branchesSelectedData });
  };

  const onRemoveBranch = async branch => {
    const newBranchesList = state.filter(item => item.value !== branch);
    dispatch({ type: 'branchRemoved', payload: newBranchesList });
  };

  const onSubmit = async () => {
    const branchApi = {};
    state.forEach(item => {
      branchApi[item.value] = item.text;
    });
    await updateDispatchGroup({
      id: data?.current?.id,
      branches: branchApi,
    });
    onNextStep({ branches: state });
  };

  return {
    branchesAddedList: state,
    onAddBranch,
    onRemoveBranch,
    onSubmit,
  };
};
export default useSelectLocation;
