export function checkSEJAMAction(body) {
  return (dispatch, getState, { getCheckSEJAMRequest }) =>
    getCheckSEJAMRequest(body).then(data => {
      if (data.err) {
        return data;
      }
      return data.resp;
    });
}

export function InquiryImageAndInfo(body) {
  return (dispatch, getState, { postInquiryImageAndInfoRequest }) =>
    postInquiryImageAndInfoRequest(body).then(data => {
      if (data.err) {
        return data;
      }
      return data.resp;
    });
}

export function InquiryInfo(body) {
  return (dispatch, getState, { postInquiryInfoRequest }) =>
    postInquiryInfoRequest(body).then(data => {
      if (data.err) {
        return data;
      }
      return data.resp;
    });
}

export function CheckShahCar(body) {
  return (dispatch, getState, { postCheckShahCarRequest }) =>
    postCheckShahCarRequest(body).then(data => {
      if (data.err) {
        return data;
      }
      return data.resp;
    });
}
