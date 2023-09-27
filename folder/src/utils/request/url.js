import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

const baseURL = (service, context, version, noContext) => {
  const defaultContext = resolveVariable(BASE_VARIABLE_KEYS.CONTEXT);
  const host = resolveVariable(BASE_VARIABLE_KEYS.HOST);
  return `${host}/${service || 'crm'}/api/${version || 'v3'}${
    noContext ? '' : `/${context || defaultContext}`
  }`;
};

const generateMainURL = ({ url, service, context, version, noContext }) =>
  url.startsWith('http')
    ? url
    : `${baseURL(service, context, version, noContext)}/${url}`;

export const generateURL = url => {
  if (typeof url === 'object') {
    const queryParams = new URLSearchParams(url.params).toString();
    return `${generateMainURL(url)}${
      url?.url?.includes('?') ? '' : '?'
    }${queryParams}`;
  }

  return generateMainURL({ url });
};
