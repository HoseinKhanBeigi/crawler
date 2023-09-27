import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UnMaskMobileNumber.scss';
import CPPopConfirm from '../CP/CPPopConfirm';
import Link from '../Link';
import CPMessage from '../CP/CPMessage';
import { getPartyPhoneNumberByLevantIdAction } from '../../store/lead/lead.actions';
import CPModal from '../CP/CPModal';
import PhoneLogActivityForm from '../PhoneLogActivityForm';

class UnMaskMobileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      showLogActivityForm: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.levantId !== this.props.levantId) {
      this.setState({
        phoneNumber: null,
      });
    }
  }

  submitUnMask = async () => {
    const { openModal, error } = this.props;
    const response = await this.props.getPartyPhoneNumberByLevantIdAction({
      levantId: this.props.levantId,
      type: 'MOBILE',
      id: this.props.id,
    });

    if (!error || response) {
      this.setState({
        phoneNumber: response.locationValue,
        showLogActivityForm: openModal,
      });
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  render() {
    const { title, popConfirmTitle, levantId } = this.props;
    const { phoneNumber, showLogActivityForm } = this.state;

    return (
      <div className={s.unMaskMobileNumber}>
        {!phoneNumber ? (
          <CPPopConfirm
            title={popConfirmTitle}
            okText="بله"
            cancelText="خیر"
            onConfirm={e => {
              e.stopPropagation();
              this.submitUnMask();
            }}
          >
            <Link
              to="/#"
              onClick={e => {
                e.stopPropagation();
              }}
              className={
                phoneNumber !== '' ? 'maskPhoneNumber' : 'unMaskPhoneNumber'
              }
            >
              {phoneNumber || title}
            </Link>
          </CPPopConfirm>
        ) : (
          <p>{phoneNumber}</p>
        )}
        {showLogActivityForm && (
          <CPModal
            closable
            title="ثبت تماس"
            visible={showLogActivityForm}
            footer={null}
            className="notClosable"
          >
            <PhoneLogActivityForm
              hasCancel
              levantId={levantId}
              handleCancel={() =>
                this.setState({
                  showLogActivityForm: false,
                })
              }
            />
          </CPModal>
        )}
      </div>
    );
  }
}

UnMaskMobileNumber.propTypes = {
  title: PropTypes.string,
  popConfirmTitle: PropTypes.string,
  levantId: PropTypes.string.isRequired,
  getPartyPhoneNumberByLevantIdAction: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

UnMaskMobileNumber.defaultProps = {
  title: '',
  popConfirmTitle: '',
  openModal: true,
  error: false,
};

const mapStateToProps = state => ({
  error: state.lead.getPartyPhoneNumberByLevantIdError,
});

const mapDispatch = {
  getPartyPhoneNumberByLevantIdAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(UnMaskMobileNumber));
export const UnMaskMobileNumberTest = UnMaskMobileNumber;
