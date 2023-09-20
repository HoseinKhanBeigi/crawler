import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './EditPipelineSettingForm.scss';
import { ButtonWrapper } from '../../widgets';
import CPInput from '../../../CP/CPInput';
import CPSelect from '../../../CP/CPSelect';
import { getPipelineForm } from '../../../../store/pipelineForm/pipelineForm.actions';
import {
  getPipeParameter,
  updatePipeParameter,
} from '../../../../store/pipelineParameters/pipelineParameters.action';

function EditPipelineSettingForm({
  onDone,
  pipeId,
  getForm,
  startFormFields,
  updatePipelineParameter,
  getSetting,
  defaultPipeParameter,
}) {
  const loading = false;
  const [phaseName, setPhaseName] = useState('فاز');
  const [cardName, setCardName] = useState(startFormFields[0]?.id || '');

  const cardTitleOptions = fields => {
    const list = [];
    fields.forEach(field => {
      list.push({
        value: field.id,
        text: field.properties.label,
      });
    });
    return list;
  };

  function submitPipelineSettingForm() {
    updatePipelineParameter(pipeId, [
      {
        key: 'DEFAULT_PHASE_NAME',
        value: phaseName,
      },
      {
        key: 'CARD_TITLE_ID',
        value: cardName,
      },
    ])
      .then(() => {
        getSetting(pipeId);
        onDone();
      })
      .catch(err => err);
  }
  useEffect(() => {
    getForm('start', pipeId);
    getSetting(pipeId);
  }, []);
  useEffect(() => {
    if (defaultPipeParameter.DEFAULT_PHASE_NAME)
      setPhaseName(defaultPipeParameter.DEFAULT_PHASE_NAME);
    if (defaultPipeParameter.CARD_TITLE_ID)
      setCardName(defaultPipeParameter?.CARD_TITLE_ID);
  }, [defaultPipeParameter]);

  return (
    <div className={styles.container}>
      <div className={styles.settingFormContainer}>
        <div className={styles.settingForm}>
          <div className={styles.formRow}>
            <small>نام پیش فرض فازها</small>
            <CPInput
              placeholder={phaseName || 'فاز'}
              value={phaseName}
              onChange={e => {
                setPhaseName(e.target.value);
              }}
              type="text"
            />
          </div>
          <div className={styles.formRow}>
            <small>نام کارت</small>
            <CPSelect
              className={styles.marginLeft0}
              defaultValue={cardName || 'انتخاب کنید'}
              dataSource={cardTitleOptions(startFormFields) || []}
              onChange={value => {
                setCardName(value);
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <ButtonWrapper
          appearance="subtle"
          onClick={onDone}
          className={styles.cancel}
        >
          لغو
        </ButtonWrapper>
        <ButtonWrapper
          appearance="primary"
          onClick={submitPipelineSettingForm}
          className={styles.submit}
          loading={loading}
        >
          ذخیره
        </ButtonWrapper>
      </div>
    </div>
  );
}

EditPipelineSettingForm.propTypes = {
  onDone: PropTypes.func.isRequired,
  pipeId: PropTypes.string.isRequired,
  getForm: PropTypes.func.isRequired,
  startFormFields: PropTypes.array,
  updatePipelineParameter: PropTypes.func.isRequired,
  getSetting: PropTypes.func.isRequired,
  defaultPipeParameter: PropTypes.object,
};

EditPipelineSettingForm.defaultProps = {
  startFormFields: [],
  defaultPipeParameter: {},
};

const stateMap = (store, { pipeId }) => ({
  startFormFields: store.pipelineForm.data[pipeId]?.fields || [],
  defaultPipeParameter: store.pipelineParameters.data.PIPE_SETTING,
});

const dispatchMap = {
  getForm: getPipelineForm,
  getSetting: getPipeParameter,
  updatePipelineParameter: (pipeId, setting) =>
    updatePipeParameter(pipeId, setting),
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(EditPipelineSettingForm));
