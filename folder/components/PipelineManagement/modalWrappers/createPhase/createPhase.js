/* eslint-disable css-modules/no-unused-class */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from '../../DetailedPipe/DetailedPipe.scss';
import { ButtonWrapper } from '../../widgets';
import { StringUtils } from '../../../../utils/stringUtils';
import { getPipe as getPipeAction } from '../../../../store/pipelineManagement/pipelineManagement.actions';
import { createPipelinePhase } from '../../../../store/pipelinePhase/pipelinePhase.actions';
import { getPipeParameter } from '../../../../store/pipelineParameters/pipelineParameters.action';

function CreatePhase({
  onClose,
  pipeId,
  phases,
  createPhase,
  getPipe,
  getSetting,
  defaultPhaseName,
}) {
  const [name, setName] = useState('فاز');

  const onChangePhaseHandler = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (defaultPhaseName) {
      setName(defaultPhaseName);
    }
  }, [defaultPhaseName]);

  useEffect(() => {
    getSetting(pipeId);
  }, []);

  async function submit() {
    if (StringUtils.isItFilled(name)) {
      const phase = {
        cards: [],
        description: '',
        done: true,
        fields: [],
        order: (phases[phases?.length - 1]?.order || 0) + 1,
        pipe: pipeId,
        name,
      };
      await createPhase(phase, pipeId);
      await getPipe(pipeId);
      onClose();
    }
  }

  return (
    <div className={styles.startFormContainer}>
      <div className={styles.startFormTitle}>ایجاد فاز جدید</div>
      <div className={styles.cardName}>نام فاز</div>
      <input
        value={name}
        onChange={onChangePhaseHandler}
        className={styles.input}
      />
      <ButtonWrapper
        appearance="primary"
        onClick={submit}
        className={styles.createCardButton}
      >
        ایجاد فاز جدید
      </ButtonWrapper>
    </div>
  );
}

CreatePhase.defaultProps = {
  phases: [],
};

CreatePhase.propTypes = {
  onClose: PropTypes.func.isRequired,
  pipeId: PropTypes.string.isRequired,
  phases: PropTypes.array,
  createPhase: PropTypes.func.isRequired,
  getPipe: PropTypes.func.isRequired,
  getSetting: PropTypes.func.isRequired,
  defaultPhaseName: PropTypes.object.isRequired,
};

const stateMap = (
  { pipelinePhase: phases, pipelineParameters },
  { pipeId },
) => ({
  phases: phases?.data[pipeId],
  defaultPhaseName: pipelineParameters.data.PIPE_SETTING.DEFAULT_PHASE_NAME,
});

const dispatchMap = {
  getPipe: getPipeAction,
  createPhase: createPipelinePhase,
  getSetting: getPipeParameter,
};

export default connect(stateMap, dispatchMap)(withStyles(styles)(CreatePhase));
