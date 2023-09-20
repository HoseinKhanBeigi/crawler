import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import cs from 'classnames';
import ReactToPrint from 'react-to-print';
import s from './ModalForCheckAppointmentsCard.scss';
import CPButton from '../CP/CPButton';
import CPPopConfirm from '../CP/CPPopConfirm';
import { getCityName, getProvinceName } from '../../utils';
import CPAlert from '../CP/CPAlert';
import { postPrintActivityAction } from '../../store/documentToken/documentToken.actions';
import { getCrmActivitiesAction } from '../../store/newActivities/newActivities.actions';
import { pageSizeInTableList } from '../../webConfig';
import { getAddressStringByPostCodeAction } from '../../store/opportunities/opportunities.actions';
import { getPartyPhoneNumberByLevantIdAction } from '../../store/lead/lead.actions';

const moment = require('moment-jalaali');

const pagination = `page=0&size=${pageSizeInTableList}`;

class ModalForCheckAppointmentsCard extends React.Component {
  constructor(props) {
    super(props);
    this.cardRef = null;
    this.state = {
      addressByPostCode: null,
      loadingPostalCodeAddress: false,
      unMaskedPhoneNumber: null,
    };
  }

  unMaskPhoneNumber = async () => {
    const {
      currentUser: { phoneNO, levantId, mobilePhoneDTO },
    } = this.props;

    if (phoneNO?.includes('*')) {
      const response = await this.props.getPartyPhoneNumberByLevantIdAction({
        levantId,
        type: 'MOBILE',
        id: mobilePhoneDTO?.partyLocationId,
      });

      if (response?.locationValue) {
        this.setState({ unMaskedPhoneNumber: response.locationValue });
      }
    }
  };

  checkPostCode = async postCode => {
    this.setState({
      loadingPostalCodeAddress: true,
    });
    const response = await this.props.getAddressStringByPostCodeAction(
      postCode,
    );
    this.setState({
      addressByPostCode: {
        postCode,
        message: response?.ErrorMessage || response?.Value,
      },
      loadingPostalCodeAddress: false,
    });
  };

  submitLogActivity = async () => {
    const { targetLevantId } = this.props;
    const body = {
      targetLevantId,
    };
    const response = await this.props.postPrintActivityAction(body);
    if (!response.err) {
      this.props.getCrmActivitiesAction({
        levantId: targetLevantId,
        pagination,
      });
    }

    return false;
  };

  render() {
    const {
      value,
      approveMeetingLoading,
      currentUser: { firstName, lastName, phoneNO, hasLegalAge, nationalCode },
      cancelOpportunityLoading,
    } = this.props;
    const {
      addressByPostCode,
      loadingPostalCodeAddress,
      unMaskedPhoneNumber,
    } = this.state;
    let { city, description, postalCode, state, street } = value;
    const { status, fromDate, toDate, id } = value;

    moment.loadPersian({ dialect: 'persian-modern' });
    const day = moment(fromDate).format('dddd jD jMMMM jYYYY ');
    const start = moment(fromDate).format('HH:mm');
    const end = moment(toDate).format('HH:mm');

    city = city !== null ? getCityName(city) : '---';
    state = state !== null ? getProvinceName(state) : '---';
    street = street || '....';
    postalCode = postalCode || '....';
    description = description || '....';

    let className;
    switch (status) {
      case 'DONE':
        className = s.doneCard;
        break;
      case 'INIT':
        className = s.initCard;
        break;
      case 'APPROVE':
        className = s.confirmedCard;
        break;
      default:
        className = s.cancelCard;
    }

    return (
      <div
        dir="rtl"
        className={
          status === 'CANCEL'
            ? cs(s.meeting, s.cancel, className)
            : cs(s.meeting, className)
        }
        ref={el => {
          this.cardRef = el;
        }}
      >
        <h3
          className={s.name}
        >{`سرکار خانم / جناب آقای : ${firstName} ${lastName}`}</h3>
        <p className={s.addressText}>
          <span>آدرس مراجعه حضوری:</span>
          {value.street === 'شعب کارگزاری'
            ? value.street
            : `استان: ${state}، شهر:  ${city}، ${street}`}
        </p>
        <div className={s.locationData}>
          <p>
            <span>کد پستی: </span>
            {`${postalCode}`}
          </p>
          <p>
            <span>تاریخ مراجعه:</span>
            {`${day}`}
          </p>
          <p>
            <span>زمان مراجعه:</span>
            {`${start} تا ${end}`}
          </p>
        </div>
        <div className={s.locationData}>
          <p>
            <span>شماره موبایل: </span>
            <span style={{ direction: 'ltr', display: 'inline-block' }}>
              {unMaskedPhoneNumber || phoneNO}
            </span>
          </p>
          <p>
            <span>کد ملی: </span>
            {nationalCode}
          </p>
          <p style={{ textAlign: 'center' }}>
            {hasLegalAge === false ? <strong>زیر ۱۸ سال</strong> : null}
          </p>
        </div>
        <div>
          <CPButton
            type="ghost"
            size="small"
            onClick={() => {
              this.checkPostCode(postalCode);
            }}
            loading={loadingPostalCodeAddress}
            className={cs(s.postCodeCheck, 'no-print')}
          >
            بررسی کد پستی
          </CPButton>
          {addressByPostCode?.postCode === postalCode && (
            <CPAlert type="warning" message={addressByPostCode?.message} />
          )}
        </div>
        <p className={description === '....' ? 'no-print' : ''}>
          <span>توضیحات: </span>
          {description}
        </p>
        <hr />
        <div className={s.footer}>
          <div>
            {status === 'INIT' && (
              <React.Fragment>
                <CPPopConfirm
                  title="آیا از کد پستی استعلام گرفته اید؟"
                  okText="بله"
                  cancelText="خیر"
                  onConfirm={() => {
                    this.props.handleMeetingApprove(id);
                  }}
                >
                  <CPButton
                    className={s.done}
                    type="primary"
                    size="small"
                    loading={approveMeetingLoading}
                  >
                    تایید زمان و آدرس قرار ملاقات
                  </CPButton>
                </CPPopConfirm>
                <CPPopConfirm
                  title="آیا از لغو قرار ملاقات اطمینان دارید؟"
                  okText="بله، لغو شود"
                  okType="danger"
                  cancelText="خیر"
                  onConfirm={() => {
                    this.props.handleCancel(id);
                  }}
                >
                  <CPButton
                    className={s.cancel}
                    type="danger"
                    size="small"
                    loading={cancelOpportunityLoading}
                  >
                    لغو قرار ملاقات
                  </CPButton>
                </CPPopConfirm>
              </React.Fragment>
            )}
            {status === 'APPROVE' && (
              <React.Fragment>
                <span className={s.waitingText}>
                  زمان ملاقات تایید شد. در انتظار احراز هویت حضوری کاربر ..
                </span>
              </React.Fragment>
            )}
            {status === 'DONE' && (
              <span className={s.waitingText}>
                احراز هویت انجام و تایید شد. در انتظار فعالسازی توسط کاربر ..
              </span>
            )}
            {status === 'CANCEL' && (
              <CPButton type="default" size="small" disabled>
                لغو شده است
              </CPButton>
            )}
          </div>
          <ReactToPrint
            trigger={() => (
              <Icon className={cs(s.previewAction)} type="printer" />
            )}
            content={() => this.cardRef}
            onAfterPrint={this.submitLogActivity}
            onBeforeGetContent={this.unMaskPhoneNumber}
          />
        </div>
      </div>
    );
  }
}

ModalForCheckAppointmentsCard.propTypes = {
  value: PropTypes.object,
  approveMeetingLoading: PropTypes.bool.isRequired,
  cancelOpportunityLoading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  targetLevantId: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleMeetingApprove: PropTypes.func.isRequired,
  getAddressStringByPostCodeAction: PropTypes.func.isRequired,
  getPartyPhoneNumberByLevantIdAction: PropTypes.func.isRequired,
  postPrintActivityAction: PropTypes.func.isRequired,
  getCrmActivitiesAction: PropTypes.func.isRequired,
};

ModalForCheckAppointmentsCard.defaultProps = {
  value: null,
  currentUser: null,
  targetLevantId: null,
};

const mapState = state => ({
  approveMeetingLoading: state.opportunities.approveMeetingLoading,
  cancelOpportunityLoading: state.opportunities.cancelOpportunityLoading,
  currentUser: state.opportunities.currentUser,
  targetLevantId: state?.neshanAuth?.jwt?.levantId,
});

const mapDispatch = {
  getPartyPhoneNumberByLevantIdAction,
  getAddressStringByPostCodeAction,
  postPrintActivityAction,
  getCrmActivitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForCheckAppointmentsCard));
export const ModalForCheckAppointmentsCardTest = ModalForCheckAppointmentsCard;
