import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForVerifySejam.scss';
import CPModal from '../CP/CPModal';
import CPInput from '../CP/CPInput';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import {
  anyModalClose,
  getOpportunitiesAction,
  getSejamByOpportunityIdAction,
  putRejectSejamCodeAction,
  putVerifySejamCodeAction,
} from '../../store/opportunities/opportunities.actions';

class ModalForVerifySejam extends React.Component {
  closeModal = () => {
    this.props.anyModalClose();
  };

  verifyCode = async () => {
    const { currentUser } = this.props;
    await this.props.putVerifySejamCodeAction({
      opportunityId: currentUser.id,
    });
    await this.props.getOpportunitiesAction();
    this.props.anyModalClose();
  };

  rejectCode = async () => {
    const { currentUser } = this.props;
    await this.props.putRejectSejamCodeAction({
      opportunityId: currentUser.id,
    });
    await this.props.getOpportunitiesAction();
    this.props.anyModalClose();
  };

  render() {
    const { className, visible, sejamCode } = this.props;

    return (
      <CPModal
        visible={visible}
        footer={false}
        onCancel={this.closeModal}
        className={cs(visible && s.modalForVerifySejam, className)}
        width={370}
      >
        <div className="row">
          <div className="col-md-12">
            <h4>
              <Icon type="info-circle" theme="twoTone" className={s.icon} />
              <b>کد سجام مورد تایید شما می باشد؟</b>
            </h4>
            <CPInput
              className="margin-t-10"
              // label="کد"
              disabled
              value={sejamCode?.code || 'کد یافت نشد'}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 margin-t-10 text-left">
            <CPDivider />
            <CPButton className="btn primary-btn" onClick={this.verifyCode}>
              بله
            </CPButton>
            <CPButton className="btn" onClick={this.rejectCode}>
              خیر
            </CPButton>
          </div>
        </div>
      </CPModal>
    );
  }
}

ModalForVerifySejam.propTypes = {
  anyModalClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  sejamCode: PropTypes.object,
  putRejectSejamCodeAction: PropTypes.func.isRequired,
  putVerifySejamCodeAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

ModalForVerifySejam.defaultProps = {
  className: null,
  sejamCode: null,
  currentUser: null,
};

const mapState = state => ({
  visible: state.opportunities.anyModalVisible === 'modalForVerifySejam',
  sejamCode: state.opportunities.getSejamByOpportunityIdData,
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
  anyModalClose,
  getSejamByOpportunityIdAction,
  putRejectSejamCodeAction,
  putVerifySejamCodeAction,
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVerifySejam));
export const ModalForVerifySejamTest = ModalForVerifySejam;
