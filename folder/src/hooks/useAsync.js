import { useCallback, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return { data: null, error: null, status: 'pending' };
    case 'resolve':
      return { data: action.data, error: null, status: 'resolved' };
    case 'reject':
      return { data: null, error: action.error, status: 'rejected' };
    default:
      throw new Error('action type not defined');
  }
};

const useAsync = (
  initialState = {
    status: 'idle',
    error: null,
    data: null,
  },
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const run = useCallback(promise => {
    if (promise && promise.constructor.name === 'Promise') {
      dispatch({ type: 'pending' });
      promise
        .then(data => dispatch({ type: 'resolve', data }))
        .catch(error => dispatch({ type: 'reject', error }));
    } else {
      throw new Error('invalid promise!');
    }
  }, []);

  return { ...state, loading: state.status === 'pending', run };
};
export default useAsync;
