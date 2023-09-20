import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLeadColumnsAndValuesAction } from '../../../../store/lead/lead.actions';
import AddLeadForm from '../../../AddLeadForm/AddLeadForm';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { DRAWER_FOR_VIEW_AND_EDIT_LEAD } from '../../repository';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForViewAndEditLead = props => {
  const {
    title,
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
    <KianDrawer
      title={title}
      visible={visible}
      onCancel={closeModal}
      onClose={closeModal}
      drawerId={DRAWER_FOR_VIEW_AND_EDIT_LEAD}
    >
      <AddLeadForm
        initialValue={initialValues}
        leadType={leadType}
        isEditMode
        onFormSubmit={handleSubmit}
        levantId={levantId}
        inputPerRow={2}
      />
    </KianDrawer>
  );
};

DrawerForViewAndEditLead.propTypes = {
  title: PropTypes.string,
  getLeadColumnsAndValuesAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  leadPersonColumnsAndValues: PropTypes.object,
  leadType: PropTypes.string,
  tableIndex: PropTypes.string,
  leadId: PropTypes.string,
};

DrawerForViewAndEditLead.defaultProps = {
  title: 'ویرایش سرنخ',
  leadType: '',
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

export default connect(mapStateToProps, mapDispatch)(DrawerForViewAndEditLead);
