import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { connect } from 'react-redux';
import s from './ModalForLeadForm.scss';
import { getLeadAction } from '../../../../store/lead/lead.actions';
import AddLeadForm from '../../../../components/AddLeadForm';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_LEAD_FORM } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';

class ModalForLeadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    if (this.props.isEditMode) {
      this.props.getLeadAction(this.props.levantId);
    } else {
      kianTableApi(this.props.tableIndex).resetTable();
    }
    this.closeModal();
  };

  render() {
    const { title, className, isEditMode, levantId, leadType } = this.props;
    const { visible } = this.state;
    return (
      <CPModal
        className={cs(s.modalForAddLead, className)}
        title={title}
        visible={visible}
        onCancel={this.closeModal}
        footer={null}
        width={750}
        modalType={MODAL_FOR_LEAD_FORM}
      >
        <AddLeadForm
          leadType={leadType}
          isEditMode={isEditMode}
          onFormSubmit={this.handleSubmit}
          levantId={levantId}
          inputPerRow={3}
        />
      </CPModal>
    );
  }
}

ModalForLeadForm.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  isEditMode: PropTypes.bool,
  getLeadAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  leadType: PropTypes.string,
  tableIndex: PropTypes.string,
};

ModalForLeadForm.defaultProps = {
  title: 'افزودن سرنخ',
  leadType: '',
  className: '',
  isEditMode: false,
  levantId: null,
  tableIndex: '',
};

const mapDispatch = {
  getLeadAction,
};

export default connect(null, mapDispatch)(withStyles(s)(ModalForLeadForm));
export const AddLeadModalTest = ModalForLeadForm;
