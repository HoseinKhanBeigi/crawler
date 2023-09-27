import request from '../utils/request';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../serviceConfig';

export function createPipeService(newPipeName) {
  const newPipe = {
    description: '',
    name: newPipeName,
    phases: [
      {
        cards: [],
        description: '',
        done: true,
        fields: [],
        name: 'inbox',
        order: 0,
        pipe: newPipeName,
      },
    ],
  };
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/pipe`,
  ).post(newPipe, { context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) });
}

export function deletePipeService(pipeId) {
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/pipe/${pipeId}`,
  ).delete({ context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) }, {});
}

export function updatePipelinePhaseService(pipeId, phaseId, name) {
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/phase`,
  ).put({
    pipe: pipeId,
    id: phaseId,
    name,
  });
}

export function deletePipelinePhaseService(phaseId) {
  return request(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT,
    )}/phase/${phaseId}`,
  ).delete();
}

export function updatePipelineForm(type, data) {
  if (type === 'start') {
    return request(
      `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/startForm`,
    ).put(data);
  }
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/phaseForm`,
  ).put(data);
}

export function createPipelineFormField(field) {
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/field`,
  ).post(field);
}

export function updatePipelineStartForm(data) {
  return request(
    `${resolveVariable(BASE_VARIABLE_KEYS.PIPELINE_MANAGEMENT)}/startForm`,
  ).put(data);
}
