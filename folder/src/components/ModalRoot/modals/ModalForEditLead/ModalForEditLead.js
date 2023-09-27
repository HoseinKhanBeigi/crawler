import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import { connect } from 'react-redux';
import s from './ModalForEditLead.scss';
import { getLeadColumnsAndValuesAction } from '../../../../store/lead/lead.actions';
import AddLeadForm from '../../../AddLeadForm/AddLeadForm';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_EDIT_LEAD } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';

const ModalForEditLead = props => {
  const {
    title,
    className,
    levantId,
    leadType,
    tableIndex,
    leadId,
    leadPersonColumnsAndValues,
  } = props;
  const [visible, setVisible] = useState(true);
  const [initialValues, setInitialValues] = useState(null);
  const closeModal = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    kianTableApi(tableIndex).resetTable();
    closeModal();
  };

  useEffect(() => {
    props.getLeadColumnsAndValuesAction(leadType, leadId);
  }, []);

  useEffect(() => {
    const personFieldValues = leadPersonColumnsAndValues?.columns?.map(
      ({ id, columnCategory, code }) => ({
        id,
        value:
          leadPersonColumnsAndValues?.columnValues?.find(
            ({ partyColumnKeyDto: { leadColumnId } }) => leadColumnId === id,
          )?.value || null,
        isRequired: columnCategory === 'MAIN',
        code,
      }),
    );
    setInitialValues(personFieldValues);
  }, [leadPersonColumnsAndValues]);
  return (
    <CPModal
      className={cs(s.modalForAddLead, className)}
      title={title}
      visible={visible}
      onCancel={closeModal}
      footer={null}
      width={750}
      modalType={MODAL_FOR_EDIT_LEAD}
    >
      <AddLeadForm
        initialValues={initialValues}
        leadType={leadType}
        isEditMode
        onFormSubmit={handleSubmit}
        levantId={levantId}
        inputPerRow={2}
      />
    </CPModal>
  );
};

ModalForEditLead.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  getLeadColumnsAndValuesAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  leadPersonColumnsAndValues: PropTypes.object,
  leadType: PropTypes.string,
  tableIndex: PropTypes.string,
  leadId: PropTypes.string,
};

ModalForEditLead.defaultProps = {
  title: 'ویرایش سرنخ',
  leadType: '',
  className: '',
  levantId: null,
  tableIndex: '',
  leadId: '',
  leadPersonColumnsAndValues: null,
};

const mapStateToProps = state => ({
  leadPersonColumnsAndValues: state.lead.leadPersonColumnsAndValues,
});

const mapDispatch = {
  getLeadColumnsAndValuesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForEditLead));
export const AddLeadModalTest = ModalForEditLead;
