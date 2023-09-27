import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonWrapper } from '../widgets';
import styles from './UpdatePhaseData.scss';
import SmartFormGenerator from '../SmartForm/SmartFormGenerator/SmartFormGenerator';
import { ObjectUtils } from '../../../utils/objectUtils';
import { updatePipelineCardPhaseData } from '../../../store/pipelineFormData/pipelineFormData.actions';
import { getCardHistory } from '../../../store/pipelineCardHistory/pipelineCardHistory.actions';
import { getPhaseFieldsData as getPhaseFieldsDataAction } from '../../../store/pipelinePhaseForm/pipelinePhaseForm.actions';

function UpdatePhaseData({
  card,
  phaseCardData,
  fields,
  updateCardPhaseData,
  getHistory,
  getPhaseFieldsData,
}) {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const phaseValue = useMemo(() => {
    const values = {};
    if (ObjectUtils.checkIfItsFilled(phaseCardData)) {
      Object.keys(phaseCardData)?.forEach(id => {
        values[id] = phaseCardData[id]?.value;
      });
    }
    return values;
  }, [phaseCardData]);

  // eslint-disable-next-line consistent-return
  async function update(data) {
    try {
      await updateCardPhaseData(card.currentPhase, card.id, data);
      await getHistory(card.id);
      await getPhaseFieldsData(card.pipe);
    } catch (e) {
      // TODO: handle error
      return e;
    }
  }

  function handleFormStateChange({ isDirty }) {
    setIsFormDirty(isDirty);
  }

  return (
    <SmartFormGenerator
      onFormStateChange={handleFormStateChange}
      fields={fields}
      onSubmit={update}
      values={phaseValue}
      readonly={false}
    >
      <div className={styles.startFormButtonWrapper}>
        <ButtonWrapper
          type="submit"
          className={styles.submitButton}
          appearance="primary"
          isDisabled={!isFormDirty}
        >
          <span>ذخیره تغییرات</span>
        </ButtonWrapper>
      </div>
    </SmartFormGenerator>
  );
}

UpdatePhaseData.propTypes = {
  card: PropTypes.object.isRequired,
  phaseCardData: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  updateCardPhaseData: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  getPhaseFieldsData: PropTypes.func.isRequired,
};

const stateMap = (store, { card }) => ({
  fields: store.pipelineForm.data[card.currentPhase]?.fields,
});

const dispatchMap = {
  updateCardPhaseData: updatePipelineCardPhaseData,
  getHistory: getCardHistory,
  getPhaseFieldsData: getPhaseFieldsDataAction,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(UpdatePhaseData));
