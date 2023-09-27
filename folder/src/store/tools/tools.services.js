import {
  PostData,
  resolveVariable,
  BASE_VARIABLE_KEYS,
} from '../../serviceConfig';

export const checkSEJAMUrl = () => {
  const context = resolveVariable(BASE_VARIABLE_KEYS.CONTEXT);
  return `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/sjm/inquire?context=${context}`;
};
export const inquiryImageAndInfoUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/sitaad/info-and-image`;
export const inquiryInfoUrl = () =>
  `${resolveVariable(BASE_VARIABLE_KEYS.BASE_URL)}/sitaad/inquire`;
export const shahCarUrl = () =>
  `${resolveVariable(
    BASE_VARIABLE_KEYS.BASE_URL,
  )}/shahkar/phone-ownership-inquiry`;
export function createCheckSEJAMRequest(fetch, token) {
  return async function getCheckSEJAMRequest(body) {
    return PostData(fetch, checkSEJAMUrl(), body, token);
  };
}

export function createInquiryImageAndInfoRequest(fetch, token) {
  return async function postInquiryImageAndInfoRequest(body) {
    return PostData(fetch, inquiryImageAndInfoUrl(), body, token);
  };
}

export function createInquiryInfoRequest(fetch, token) {
  return async function postInquiryInfoRequest(body) {
    return PostData(fetch, inquiryInfoUrl(), body, token);
  };
}

export function createCheckShahCarRequest(fetch, token) {
  return async function postCheckShahCarRequest(body) {
    return PostData(fetch, shahCarUrl(), body, token);
  };
}
