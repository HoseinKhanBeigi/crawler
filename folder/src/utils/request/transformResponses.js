import saveAs from 'file-saver';
import CPMessage from '../../components/CP/CPMessage';

const withAdditionalInfo = async (response, requestTime) => {
  const { status, statusText } = response;
  const responseTime = new Date().getTime();

  try {
    const responseResult = response.data;
    let result = {};
    if (
      typeof responseResult !== 'object' ||
      Array.isArray(responseResult) ||
      responseResult.constructor.name === 'Blob'
    ) {
      result = { result: responseResult };
    } else {
      result = { ...responseResult };
    }

    return {
      ...result,
      additionalInfo: {
        url: response.request.url,
        ok: status < 400,
        status,
        statusText,
        requestTime,
        responseTime,
        timeSpent: `${responseTime - requestTime}ms`,
      },
    };
    // eslint-disable-next-line no-empty
  } catch {}
  return {
    result: response.data,
  };
};

export const transformResponses = (response, options) => {
  // show success or error message
  if (options.message) {
    const { info, success } = options.message;
    CPMessage(success || info, info ? 'info' : 'success');
  }

  // add additional info to response and return it to components
  if (options.shouldDownload) {
    return saveAs(response.data, options.fileName);
  }
  return withAdditionalInfo(response, options.requestTime);
};
