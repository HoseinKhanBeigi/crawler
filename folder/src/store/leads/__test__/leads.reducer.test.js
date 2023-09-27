/* eslint-env jest */
import { LEADS_REQUEST, LEADS_SUCCESS } from '../leads.constants';
import reducer from '../leads.reducer';

/**
 * It helps us to test reducers
 * every reducer is a simple pure function, so we only check different inputs
 */
describe('leads reducer', () => {
  const defaultState = {
    leadsAssignOperatorsLoading: false,
    leadsAssignOperatorsData: null,
    leadsAssignOperatorsError: null,
    loading: false,
    data: null,
    error: null,
  };

  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual(defaultState);
  });

  it('should handle leads REQUEST', () => {
    const action = { type: LEADS_REQUEST };
    const newState = reducer(undefined, action);

    expect(newState.loading).toBe(true);
  });

  it('should handle leads SUCCESS', () => {
    const initialState = { ...defaultState, loading: true };
    const action = { type: LEADS_SUCCESS, payload: { key: 'value' } };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.data).toEqual({ key: 'value' });
  });

  it('should handle leads SUCCESS', () => {
    const initialState = { ...defaultState, loading: true };
    const action = { type: LEADS_SUCCESS, payload: { key: 'value' } };
    const newState = reducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.data).toEqual({ key: 'value' });
  });
});
