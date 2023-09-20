import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPipelineForm } from '../../../../store/pipelineForm/pipelineForm.actions';
import { updatePipelineForm } from '../../../../service/pipelineManagementService';
import SmartFormCreator from '../../SmartForm/SmartFormCreator/SmartFormCreator';

function EditStartForm({ onDone, pipeId, startForm, getStartForm }) {
  const loading = false;

  function submitStartForm(fields) {
    const fieldsId = fields?.map(field => field.id);
    const newStartForm = {
      ...startForm,
      fields: fieldsId,
    };
    updatePipelineForm('start', newStartForm)
      .then(() => {
        getStartForm(pipeId);
        onDone();
      })
      .catch(err => err);
  }

  return (
    <SmartFormCreator
      loading={loading}
      onCancel={onDone}
      formParentId={pipeId}
      onSubmit={submitStartForm}
      pipeId={pipeId}
      canEditTitle
      readOnly
    />
  );
}

EditStartForm.propTypes = {
  onDone: PropTypes.func.isRequired,
  pipeId: PropTypes.string.isRequired,
  getStartForm: PropTypes.func.isRequired,
  startForm: PropTypes.object.isRequired,
};

const stateMap = (store, { pipeId }) => ({
  startForm: store.pipelineForm.data[pipeId],
});

const dispatchMap = {
  getStartForm: pipeId => getPipelineForm('start', pipeId),
};

export default connect(stateMap, dispatchMap)(EditStartForm);
