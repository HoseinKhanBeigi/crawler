import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForCheckAppointments.scss';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import ModalForCheckAppointmentsCard from '../ModalForCheckAppointmentsCard';
import {
  anyModalClose,
  anyModalOpen,
  checkAppointmentsCloseModal,
  getApplicationAction,
  getOpportunitiesAction,
  putApproveMeetingAction,
  putCancelMeetingAction,
} from '../../store/opportunities/opportunities.actions';

class ModalForCheckAppointments extends React.Component {
  closeModal = (shouldReload = true) => {
    this.props.anyModalClose();
    if (shouldReload) this.props.getOpportunitiesAction();
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

  // close meetings list modal then get user application and open setMeetingModal.
  // TODO: Should change api in backend, because this api not exist and now we call applications to fetch address (Backend)
  openSetMeetingModal = async () => {
    const { currentUser } = this.props;
    // close current modal
    await this.props.checkAppointmentsCloseModal();
    // get user application(addresses)
    await this.props.getApplicationAction(currentUser.applicationId);
    // open setMeetingModal
    await this.props.anyModalOpen('modalForSetMeeting');
  };

  handleMeetingApprove = async levantId => {
    const response = await this.props.putApproveMeetingAction('', { levantId });
    if (response) {
      CPMessage('تایید شد', 'success');
    } else {
      CPMessage('خطا', 'error');
    }
    this.closeModal();
  };

  handleMeetings = () => {
    const { checkAppointments } = this.props;
    if (!checkAppointments) {
      return <div />;
    }

    const array = [];
    checkAppointments.forEach(item => {
      if (item.status === 'INIT' || item.status === 'DONE') {
        array.unshift(item);
      } else {
        array.push(item);
      }
    });

    if (array.length < 1) {
      return (
        <div className={s.notFound}>
          <Icon type="schedule" />
          <h4>هیچ قرار ملاقاتی تنظیم نشده است</h4>
        </div>
      );
    }

    return array.map(value => (
      <ModalForCheckAppointmentsCard
        value={value}
        handleMeetingApprove={this.handleMeetingApprove}
        handleCancel={this.handleCancel}
        key={value.id}
      />
    ));
  };

  render() {
    const { className, visible, checkAppointments } = this.props;
    const initMeetingFound = checkAppointments
      ? checkAppointments.find(i => i.status === 'INIT')
      : null;

    return (
      <CPModal
        title="قرارهای ملاقات"
        visible={visible}
        footer={false}
        onCancel={() => {
          this.closeModal(false);
        }}
        className={cs(className, s.modalBody)}
        width={800}
      >
        {visible && <div>{this.handleMeetings()}</div>}
        <div className="text-right">
          {!initMeetingFound && (
            <CPButton
              onClick={this.openSetMeetingModal}
              type="primary"
              className={s.addButton}
            >
              افزودن قرار ملاقات
            </CPButton>
          )}
          <CPButton
            onClick={() => {
              this.closeModal(false);
            }}
            className={cs('btn', 'default-btn', s.closeModalBtn)}
          >
            بستن
          </CPButton>
        </div>
      </CPModal>
    );
  }
}

ModalForCheckAppointments.propTypes = {
  className: PropTypes.string,
  checkAppointments: PropTypes.array,
  checkAppointmentsCloseModal: PropTypes.func.isRequired,
  putCancelMeetingAction: PropTypes.func.isRequired,
  putApproveMeetingAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  getApplicationAction: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  anyModalOpen: PropTypes.func.isRequired,
  anyModalClose: PropTypes.func.isRequired,
};

ModalForCheckAppointments.defaultProps = {
  className: null,
  checkAppointments: null,
  currentUser: {},
};

const mapState = state => ({
  checkAppointments: state.opportunities.checkAppointmentsData,
  visible: state.opportunities.anyModalVisible === 'modalForCheckAppointments',
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
  checkAppointmentsCloseModal,
  putCancelMeetingAction,
  putApproveMeetingAction,
  getOpportunitiesAction,
  getApplicationAction,
  anyModalOpen,
  anyModalClose,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForCheckAppointments));
export const ModalForCheckAppointmentsTest = ModalForCheckAppointments;
