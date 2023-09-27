/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';
import mockStore from '../../../../tools/mocks/storeMock';
import ErrorHandling from '../../../utils/errorHandling';
import {
  getLeadsAction,
  getLeadsAssignOperatorsAction,
} from '../leads.actions';
import {
  LEADS_ASSIGN_OPERATORS_FAILURE,
  LEADS_ASSIGN_OPERATORS_REQUEST,
  LEADS_ASSIGN_OPERATORS_SUCCESS,
  LEADS_FAILURE,
  LEADS_REQUEST,
  LEADS_SUCCESS,
} from '../leads.constants';

describe('actions', () => {
  /**
   * here we restore fetch mock after each action,
   * so that the results of previous actions do not have effect on next ones
   */
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create the SUCCESS when fetching is done', () => {
    /**
     * at first we mock the fetch requests, to provide us with our scenario results
     * note that it should be an object, otherwise it will return all response data
     */
    fetchMock.mock('*', { data: 'value' });

    /**
     * here we call the mock store, and use it to dispatch actions
     */
    const store = mockStore();

    /**
     * here we provide an array of desired actions, if the test passes
     */
    const expectedActions = [
      { type: LEADS_REQUEST },
      { type: LEADS_SUCCESS, payload: { data: 'value' } },
    ];

    /**
     * the main test action happens here
     */
    return store.dispatch(getLeadsAction('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create the FAILURE when fetching fails', () => {
    fetchMock.mock('*', 500);

    const expectedActions = [
      { type: LEADS_REQUEST },
      { type: LEADS_FAILURE, payload: ErrorHandling.serverError() },
    ];
    const store = mockStore();

    return store.dispatch(getLeadsAction('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should get lead assign operators successfully', () => {
    fetchMock.mock('*', { data: 'value' });
    const store = mockStore();

    const expectedActions = [
      { type: LEADS_ASSIGN_OPERATORS_REQUEST },
      {
        type: LEADS_ASSIGN_OPERATORS_SUCCESS,
        payload: { data: 'value' },
      },
    ];

    return store.dispatch(getLeadsAssignOperatorsAction('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create FAILURE when fetching fails', () => {
    fetchMock.mock('*', 500);
    const store = mockStore();

    const expectedActions = [
      { type: LEADS_ASSIGN_OPERATORS_REQUEST },
      {
        type: LEADS_ASSIGN_OPERATORS_FAILURE,
        payload: ErrorHandling.serverError(500),
      },
    ];
    store.dispatch(getLeadsAssignOperatorsAction('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
