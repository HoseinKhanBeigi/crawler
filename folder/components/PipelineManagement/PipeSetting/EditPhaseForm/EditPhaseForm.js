import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './EditPhaseForm.scss';
import SelectPhaseItem from './SelectPhaseItem';
import { updatePipelineForm } from '../../../../service/pipelineManagementService';
import { getPipelineForm } from '../../../../store/pipelineForm/pipelineForm.actions';
import { ObjectUtils } from '../../../../utils/objectUtils';
import SmartFormCreator from '../../SmartForm/SmartFormCreator/SmartFormCreator';
import { getPhaseFieldsData as getPhaseFieldsDataAction } from '../../../../store/pipelinePhaseForm/pipelinePhaseForm.actions';

function EditPhaseForm({
  onDone,
  selectedPhaseId,
  phases,
  forms,
  getPhaseForm,
  getPhaseFieldsData,
  pipeId,
}) {
  const [selectedPhase, setSelectedPhase] = useState(selectedPhaseId);

  async function submitPhaseForm(fields) {
    const currentPhaseForm = forms[selectedPhase];
    const fieldsId = fields?.map(item => item.id);
    const newStartForm = {
      ...currentPhaseForm,
      fields: fieldsId,
    };
    updatePipelineForm('phase', newStartForm)
      .then(async () => {
        getPhaseForm(selectedPhase);
        await getPhaseFieldsData(pipeId);
        onDone();
      })
      .catch(err => err);
  }

  useEffect(() => {
    if (!ObjectUtils.checkIfItsFilled(forms[selectedPhase])) {
      getPhaseForm(selectedPhase);
    }
  }, [selectedPhase]);

  function selectedPhaseChanged(id) {
    if (!ObjectUtils.checkIfItsFilled(forms[id])) {
      getPhaseForm(id);
    }
    setSelectedPhase(id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <SelectPhaseItem
          onChange={selectedPhaseChanged}
          items={phases}
          selectedId={selectedPhaseId}
          className={styles.selectBox}
        />
      </div>
      <SmartFormCreator
        onCancel={onDone}
        formParentId={selectedPhase}
        loading={false}
        onSubmit={submitPhaseForm}
        pipeId={pipeId}
        readOnly
      />
    </div>
  );
}

EditPhaseForm.propTypes = {
  onDone: PropTypes.func.isRequired,
  selectedPhaseId: PropTypes.string,
  pipeId: PropTypes.string.isRequired,
  phases: PropTypes.array.isRequired,
  forms: PropTypes.object.isRequired,
  getPhaseForm: PropTypes.func.isRequired,
  getPhaseFieldsData: PropTypes.func.isRequired,
};
EditPhaseForm.defaultProps = {
  selectedPhaseId: null,
};

const stateMap = store => ({
  forms: store.pipelineForm.data,
});

const dispatchMap = {
  getPhaseForm: phaseId => getPipelineForm('phase', phaseId),
  getPhaseFieldsData: getPhaseFieldsDataAction,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(EditPhaseForm));
