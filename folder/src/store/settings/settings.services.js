import {
  BASE_VARIABLE_KEYS,
  FetchData,
  PostData,
  resolveVariable,
} from '../../serviceConfig';

export const uiSettingsUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/user/settings/web`;

export function createGetUISettings(fetch, token) {
  return async function getUISettings() {
    return FetchData(fetch, uiSettingsUrl(), token);
  };
}

export function createPostUISettings(fetch, token) {
  return async function postUISettings(body) {
    return PostData(fetch, uiSettingsUrl(), body, token);
  };
}
