/* eslint-disable import/prefer-default-export */

import {
  GET_PIPE_FAILURE,
  GET_PIPE_REQUEST,
  GET_PIPE_SUCCESS,
  GET_PIPES_FAILURE,
  GET_PIPES_REQUEST,
  GET_PIPES_SUCCESS,
} from './pipelineManagement.constants';
import { formDataSuccess } from '../pipelineFormData/pipelineFormData.actions';
import { fetchPipelinePhaseSuccess } from '../pipelinePhase/pipelinePhase.actions';

export function pipesRequest() {
  return {
    type: GET_PIPES_REQUEST,
  };
}

export function pipesSuccess(data) {
  return {
    type: GET_PIPES_SUCCESS,
    payload: data,
  };
}

export function pipesFailure(error) {
  return {
    type: GET_PIPES_FAILURE,
    payload: error,
  };
}

export function pipeRequest() {
  return {
    type: GET_PIPE_REQUEST,
  };
}

export function pipeSuccess(data) {
  return {
    type: GET_PIPE_SUCCESS,
    payload: data,
  };
}

export function pipeFailure(error) {
  return {
    type: GET_PIPE_FAILURE,
    payload: error,
  };
}

function dispatchPipeCardsData(pipe, dispatch) {
  pipe.phases.forEach(phase =>
    phase.cards.forEach(card =>
      dispatch(
        formDataSuccess({ id: pipe.id, cardId: card.id, data: card.values }),
      ),
    ),
  );
}

export function getPipes() {
  return (dispatch, getState, { getPipesRequest }) => {
    dispatch(pipesRequest());
    return getPipesRequest({
      pageNo: 0,
      pageSize: 200,
      sortBy: 'id',
      sortType: 'ASC',
    }).then(data => {
      if (data.err) {
        dispatch(pipesFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipesSuccess(response));
      response.forEach(pipe => {
        dispatchPipeCardsData(pipe, dispatch);
        dispatch(
          fetchPipelinePhaseSuccess({
            pipeId: pipe.id,
            phases: pipe.phases,
          }),
        );
      });
      return response;
    });
  };
}

export function getPipe(pipeId) {
  return (dispatch, getState, { getPipeRequest }) => {
    dispatch(pipeRequest());
    return getPipeRequest(pipeId).then(data => {
      if (data.err) {
        dispatch(pipeFailure(data));
        return false;
      }
      const response = data.resp;
      dispatch(pipeSuccess(response));
      dispatchPipeCardsData(response, dispatch);
      dispatch(
        fetchPipelinePhaseSuccess({
          pipeId: response.id,
          phases: response.phases,
        }),
      );
      return response;
    });
  };
}
