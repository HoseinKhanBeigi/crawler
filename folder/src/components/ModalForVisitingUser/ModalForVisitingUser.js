import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForVisitingUser.scss';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import {
  anyModalClose,
  getOpportunitiesAction,
  putCancelMeetingAction,
  putCancelOpportunityAction,
  putKycDoneAction,
} from '../../store/opportunities/opportunities.actions';
import { getProductCodeSelector } from '../ModalForCheckIdentificationTabs/utils';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

class ModalForVisitingUser extends React.Component {
  handleSubmit = async () => {
    const { opportunityId } = this.props;
    const response = await this.props.putKycDoneAction('', opportunityId);
    if (response !== false) {
      CPMessage('ذخیره شد.', 'success');
    } else {
      CPMessage('خطا', 'error');
    }
    this.closeModal();
  };

  handleRemove = async (opportunityId, type = 'DOES_NOT_SIGN') => {
    // todo [LACK_OF_DOCUMENTS, DOES_NOT_SIGN, WRONG_PERSON]
    const response = await this.props.putCancelOpportunityAction(
      {},
      { opportunityId, cancelType: type, description: '' },
    );

    if (response) {
      CPMessage('حذف شد', 'success', 5);
    } else {
      CPMessage('خطا در ارسال اطلاعات', 'error', 5);
    }
    this.closeModal();
  };

  closeModal = () => {
    this.props.anyModalClose();
    this.props.getOpportunitiesAction();
  };

  handleCancel = async meetingId => {
    const response = await this.props.putCancelMeetingAction('', meetingId);
    if (response) {
      CPMessage('لغو شد', 'success');
    } else {
      CPMessage('خطا', 'error');
    }
    this.closeModal();
  };

  content = opportunityId => (
    <div className={s.popOver}>
      <CPButton
        onClick={() => {
          this.handleRemove(opportunityId, 'LACK_OF_DOCUMENTS');
        }}
        type="primary"
        size="small"
      >
        نقص مدارک دارد
      </CPButton>
      <CPButton
        onClick={() => {
          this.handleRemove(opportunityId, 'WRONG_PERSON');
        }}
        type="primary"
        size="small"
      >
        شخص همخوانی ندارد
      </CPButton>
      <CPButton
        onClick={() => {
          this.handleRemove(opportunityId, 'DOES_NOT_SIGN');
        }}
        type="primary"
        size="small"
      >
        امضا نکرد
      </CPButton>
    </div>
  );

  render() {
    const {
      className,
      visible,
      meetingId,
      cancelMeetingLoading,
      kycDoneLoading,
    } = this.props;

    const withoutRejectionProduct = () =>
      ['KYM'].includes(this.props.productCode);

    const withoutRejectionContext = () =>
      ['DOHI'].includes(resolveVariable(BASE_VARIABLE_KEYS.CONTEXT));

    const isWithRejection =
      !withoutRejectionProduct() && !withoutRejectionContext();

    return (
      <CPModal
        title="تعیین وضعیت احراز هویت"
        visible={visible}
        footer={false}
        onCancel={() => {
          this.closeModal();
        }}
        className={className}
        width={700}
      >
        <p className={s.mb}>مراحل احراز هویت فرد تایید یا رد شود؟</p>
        <div className="text-right">
          <CPButton
            htmlType="submit"
            type="primary"
            className="btn primary-btn"
            disabled={kycDoneLoading}
            onClick={() => {
              this.handleSubmit();
            }}
            loading={kycDoneLoading}
            // disabled={!isValid}
          >
            تایید احراز هویت
          </CPButton>
          {isWithRejection && (
            <CPButton
              onClick={() => {
                this.handleCancel(meetingId);
              }}
              className="btn default-btn margin-r-10"
              loading={cancelMeetingLoading}
              disabled={cancelMeetingLoading}
            >
              لغو قرار ملاقات
            </CPButton>
          )}
        </div>
      </CPModal>
    );
  }
}

ModalForVisitingUser.propTypes = {
  className: PropTypes.string,
  meetingId: PropTypes.string,
  opportunityId: PropTypes.string,
  putKycDoneAction: PropTypes.func.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  putCancelMeetingAction: PropTypes.func.isRequired,
  putCancelOpportunityAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  cancelMeetingLoading: PropTypes.bool.isRequired,
  kycDoneLoading: PropTypes.bool.isRequired,
  productCode: PropTypes.string.isRequired,
};

ModalForVisitingUser.defaultProps = {
  className: null,
  meetingId: null,
  opportunityId: null,
};

const mapState = state => ({
  meetingId: state.opportunities.currentUser?.meetingId,
  opportunityId: state.opportunities.currentUser?.id,
  visible: state.opportunities.anyModalVisible === 'modalForVisitingUser',
  cancelMeetingLoading: state.opportunities.cancelMeetingLoading,
  kycDoneLoading: state.opportunities.kycDoneLoading,
  productCode: getProductCodeSelector(state),
});

const mapDispatch = {
  putKycDoneAction,
  putCancelOpportunityAction,
  putCancelMeetingAction,
  anyModalClose,
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVisitingUser));
export const ModalForVisitingUserTest = ModalForVisitingUser;
