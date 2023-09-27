import messages from './messages';

class SejamCodeErrorHandling {
  constructor(status) {
    this.status = status;
  }

  resp() {
    switch (this.status) {
      case 429:
        return {
          status: this.status,
          err: true,
          message: { ...messages.rateLimitExceeded },
        };
      case 4031:
      case 403:
        return {
          status: this.status,
          err: true,
          message: { ...messages.otpCodeError },
        };
      case 400:
      case 4004:
        return {
          status: this.status,
          err: true,
          message: { ...messages.sejamRegistrationIncomplete },
        };
      case 4010:
      case 401:
        return {
          status: this.status,
          err: true,
          message: { ...messages.sejamTokenInvalid },
        };
      case 404:
      case 4041:
        return {
          status: this.status,
          err: true,
          message: { ...messages.sejamUserNotExist },
        };
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
        return {
          status: this.status,
          err: true,
          message: { ...messages.serverErrorNotResponse },
        };
      default:
        return {};
    }
  }
}

export default SejamCodeErrorHandling;
