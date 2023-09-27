import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classes from 'classnames';
import styles from './CardDetailSecondSection.scss';
import { ButtonWrapper } from '../../../widgets';
import PlusIcon from '../../../icons/plusIcon';
import UpdatePhaseData from '../../../UpdatePhaseData/UpdatePhaseData';
import Edit from '../../../icons/edit';
import { generateFieldValueByFields } from '../../../../../utils/pipelineFieldValueGenerator';
import { StringUtils } from '../../../../../utils/stringUtils';
import MoveLeft from '../../../icons/moveLeft';
import Link from '../../../../Link';
import { openModal } from '../../store/actions';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../../store';
import TabsName from '../../../TabsName';
import { getPipelineFormData } from '../../../../../store/pipelineFormData/pipelineFormData.actions';
import { getCardHistory } from '../../../../../store/pipelineCardHistory/pipelineCardHistory.actions';
import { getPhaseFieldsData as getPhaseFieldsDataAction } from '../../../../../store/pipelinePhaseForm/pipelinePhaseForm.actions';

function CardDetailSecondSection({
  card,
  phases,
  startFormFields,
  phaseFields,
  phaseCardData,
  getFormData,
  phaseDetailsHistory,
  getHistory,
  phaseFieldsData,
  getPhaseFieldsData,
  modalFlag,
}) {
  const { dispatch } = useContext(ModalWrapperContext);
  const [fields, setFields] = useState([]);

  function openPipeSettingModal() {
    dispatch(
      openModal(MODAL_KEY_MAP.PIPE_SETTING, {
        actionId: TabsName.CREATE_CARD,
        pipeId: card?.pipe,
        phaseId: card.currentPhase,
      }),
    );
  }

  useEffect(() => {
    getHistory(card.id);
    getFormData('phase', card.currentPhase, card.id);
    getPhaseFieldsData(card.pipe);
  }, []);

  useEffect(() => {
    const phasesFields = [];
    if (phaseFieldsData) {
      phaseFieldsData.forEach(value => {
        if (value?.fields) phasesFields.push(...value.fields);
      });
    }

    setFields([...(startFormFields || []), ...(phasesFields || [])]);
  }, [phaseFieldsData, startFormFields]);

  function getPhaseName(phaseId) {
    return phases?.filter(phase => phase.id === phaseId)[0]?.name;
  }

  const fieldsName = useMemo(() => {
    const fieldsData = {};
    fields.forEach(data => {
      Object.assign(fieldsData, {
        [data.id]: data.properties?.label,
      });
    });
    return fieldsData;
  }, [startFormFields, fields, phaseFieldsData]);

  function wrapInQuot(value) {
    return <>&quot;{value}&quot;</>;
  }

  // eslint-disable-next-line react/prop-types
  function generateUser({ levantId, levantFullName }) {
    return (
      <Link
        to={`/lead/${levantId}`}
        onClick={e => {
          e.stopPropagation();
        }}
        target
      >
        {levantFullName}
      </Link>
    );
  }

  const generateFieldValueHistory = detail => (
    <>
      <div className={styles.cardHistoryContainer}>
        <div className={styles.editIconWrapper}>
          <Edit />
        </div>
        <div className={styles.cardHistoryDetail}>
          {generateUser(detail)}
          {' مقدار فیلد '}
          {wrapInQuot(fieldsName[detail?.fieldId])}
          {' را به '}
          {wrapInQuot(
            generateFieldValueByFields(detail?.value, fields, detail?.fieldId),
          )}
          {' تغییر داد.'}
        </div>
      </div>
      <div className={styles.historyDate}>
        {StringUtils.generateDurationTime(detail?.createdAt)}
      </div>
    </>
  );

  const generateMoveHistory = detail => (
    <>
      <div className={styles.cardHistoryContainer}>
        <div className={styles.iconWrapper}>
          <MoveLeft />
        </div>
        <div className={styles.cardHistoryDetail}>
          {generateUser(detail)}
          {' کارت را از فاز '}
          {wrapInQuot(getPhaseName(detail?.fromPhaseId))}
          {' به فاز '}
          {wrapInQuot(getPhaseName(detail?.toPhaseId))}
          {' منتقل کرد.'}
        </div>
      </div>
      <div className={styles.historyDate}>
        {StringUtils.generateDurationTime(detail?.createdAt)}
      </div>
    </>
  );

  const generateHistory = useMemo(
    () =>
      // eslint-disable-next-line array-callback-return,consistent-return
      phaseDetailsHistory.map(detail => {
        if (detail.formType && fieldsName[detail?.fieldId]) {
          return generateFieldValueHistory(detail);
        } else if (
          getPhaseName(detail?.fromPhaseId) &&
          getPhaseName(detail?.toPhaseId)
        ) {
          return generateMoveHistory(detail);
        }
        return '';
      }),
    [phaseDetailsHistory, fields],
  );

  const phaseDetailsActivities = useMemo(() => {
    if (phaseDetailsHistory) {
      return <div>{generateHistory}</div>;
    }
    return (
      <div className={styles.defaultText}>
        دراین کارت هیچ فعالیتی ثبت نشده‌است.
      </div>
    );
  }, [phaseDetailsHistory, fields]);

  return (
    <div
      className={classes(
        styles.cardDetail,
        styles.borderLeft,
        'second-section-cardDetail',
        'second-section-card-Detail',
        'second-section-border-left',
      )}
    >
      {modalFlag && (
        <div
          className={classes(styles.detailTitle, 'second-section-detail-title')}
        >
          جزییات فاز
        </div>
      )}
      <div
        className={classes(
          styles.detailContainer,
          'second-section-detail-container',
        )}
      >
        <div className="second-section-container phase-details">
          {!modalFlag && (
            <div
              className={classes(
                styles.detailTitle,
                'second-section-detail-title',
              )}
            >
              جزییات فاز
            </div>
          )}
          <div
            className={classes(
              styles.formWrapper,
              'second-section-form-Wrapper',
            )}
          >
            {!phaseFields?.length && (
              <>
                <div className={styles.defaultText}>
                  دراین قسمت هیچ فیلدی وجود ندارد.
                </div>
                <ButtonWrapper
                  onClick={openPipeSettingModal}
                  className={styles.editFieldsButton}
                  appearance="subtle"
                >
                  <PlusIcon />
                  <span className={styles.editButtonText}>
                    اضافه کردن بخش های دیگر به این کارت
                  </span>
                </ButtonWrapper>
              </>
            )}
            <UpdatePhaseData card={card} phaseCardData={phaseCardData} />
          </div>
        </div>
        <div className="second-section-container activities">
          <div
            className={classes(
              styles.historyContainer,
              'second-section-history-container',
            )}
          >
            <div className={classes(styles.historyTitle, 'historyTitle')}>
              فعالیت‌ها
            </div>
            {phaseDetailsActivities}
          </div>
        </div>
      </div>
    </div>
  );
}

CardDetailSecondSection.propTypes = {
  card: PropTypes.object.isRequired,
  phases: PropTypes.object.isRequired,
  startFormFields: PropTypes.array.isRequired,
  phaseFields: PropTypes.array.isRequired,
  phaseCardData: PropTypes.object.isRequired,
  getFormData: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  phaseDetailsHistory: PropTypes.object.isRequired,
  phaseFieldsData: PropTypes.object.isRequired,
  getPhaseFieldsData: PropTypes.func.isRequired,
  modalFlag: PropTypes.bool.isRequired,
};

const stateMap = (store, { card }) => ({
  phaseCardData: store.pipelineFormData.data[card.currentPhase]
    ? store.pipelineFormData.data[card.currentPhase][card.id]
    : null,
  phases: store.pipelinePhase.data[card?.pipe],
  startFormFields: store.pipelineForm.data[card?.pipe]?.fields,
  phaseFields: store.pipelineForm.data[card?.currentPhase]?.fields,
  phaseDetailsHistory: store.cardHistory.data,
  phaseFieldsData: store.phaseFieldsData?.data,
});

const dispatchMap = {
  getFormData: getPipelineFormData,
  getHistory: getCardHistory,
  getPhaseFieldsData: getPhaseFieldsDataAction,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(CardDetailSecondSection));
