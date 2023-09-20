import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import classes from 'classnames';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './CardDetailsPanel.scss';
import convertToJalaliDate from '../../../../../../utils/date';
import GenerateStartFormFields from '../../../../GenerateStartFormFields/GenerateStartFormFields';
import Link from '../../../../../Link';
import { updatePipelineCard } from '../../../../../../store/pipelineCard/pipelineCard.actions';
import { getPipe as getPipeAction } from '../../../../../../store/pipelineManagement/pipelineManagement.actions';
import { getPhaseFieldsData } from '../../../../../../store/pipelinePhaseForm/pipelinePhaseForm.actions';
import { getPipelineCardFieldData } from '../../../../../../store/PipelineCardFieldData/pipelineCardFieldData.actions';
import CPDivider from '../../../../../CP/CPDivider';
import Accordion from '../HistoryAccordion/Accordion';
import { getCardHistory } from '../../../../../../store/pipelineCardHistory/pipelineCardHistory.actions';

function CardDetailsPanel({
  card,
  startFormFields,
  cardData,
  updateCard,
  getPipe,
  phaseFieldsData,
  pipelineCardFieldData,
  getPhaseFieldsDataAction,
  getPipelineCardFieldDataAction,
  getHistory,
}) {
  async function editFields(value, id) {
    try {
      const updatedCard = {
        id: card?.id,
        values: {
          [id]: value,
        },
      };
      await updateCard(updatedCard, card.currentPhase);
      await getPipe(card.pipe);
      await getHistory(card.id);
      await getPhaseFieldsDataAction(card.pipe);
    } catch (e) {
      // TODO: handle error
    }
  }

  useEffect(() => {
    getPhaseFieldsDataAction(card.pipe);
    getPipelineCardFieldDataAction(card.id);
  }, []);

  function getFieldValue(field) {
    const filteredFields = pipelineCardFieldData?.filter(
      item => item.fieldId === field.id,
    );
    const value = filteredFields[0]?.value;
    if (value) {
      if (field.fieldType.name === 'date') {
        return convertToJalaliDate(value, 'HH:mm - jYYYY/jMM/jDD');
      }
      return value;
    }
    return 'بدون داده';
  }
  const generateStartForm = useMemo(() => {
    if (cardData) {
      return startFormFields?.map(field => (
        <GenerateStartFormFields
          values={cardData[field.id]}
          cardId={field.id}
          startFormFields={startFormFields}
          editFields={editFields}
          field={field}
        />
      ));
    }
    return <></>;
  }, [startFormFields, cardData]);

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
  const historyItemRendered = useMemo(
    () => (
      <Accordion
        items={phaseFieldsData}
        card={card}
        getFieldValue={getFieldValue}
      />
    ),
    [phaseFieldsData, pipelineCardFieldData],
  );
  return (
    <div
      className={classes(
        styles.cardDetailsWrapper,
        'card-Details-Panel-Wrapper',
      )}
    >
      <div className={styles.formWrapper}>
        <span className={styles.formTitle}>فرم اولیه</span>
        <div className={classes(styles.initialForm, 'initial-form')}>
          {generateStartForm?.length ? (
            <>
              {generateStartForm}
              <div className={styles.cardDetailContainer}>
                <span className={styles.cardDetailTitle}>زمان ایجاد کارت</span>
                <span className={styles.cardDetailValue}>
                  {convertToJalaliDate(
                    card?.createdAt,
                    'HH:mm - jYYYY/jMM/jDD',
                  )}
                </span>
              </div>
              <div className={styles.cardDetailContainer}>
                <span className={styles.cardDetailTitle}>ایجاد کننده</span>
                <span className={styles.cardDetailValue}>
                  {generateUser({
                    levantId: card?.levantId,
                    levantFullName: card?.levantFullName,
                  })}
                </span>
              </div>
            </>
          ) : (
            <div className={styles.defaultText}>
              دراین قسمت هیچ فیلدی وجود ندارد.
            </div>
          )}
        </div>
      </div>
      <CPDivider solid />
      <div className={styles.historyDetailsWrapper}>
        <div className={styles.formTitle}>تاریخچه قرارگیری در فازها </div>
        <div className={styles.historyWrapper}>{historyItemRendered}</div>
      </div>
    </div>
  );
}

CardDetailsPanel.propTypes = {
  card: PropTypes.object.isRequired,
  startFormFields: PropTypes.object.isRequired,
  cardData: PropTypes.object.isRequired,
  updateCard: PropTypes.func.isRequired,
  getPipe: PropTypes.func.isRequired,
  getPhaseFieldsDataAction: PropTypes.func.isRequired,
  phaseFieldsData: PropTypes.array.isRequired,
  pipelineCardFieldData: PropTypes.array.isRequired,
  getHistory: PropTypes.func.isRequired,
  getPipelineCardFieldDataAction: PropTypes.func.isRequired,
};

const stateMap = (store, { card }) => {
  const cardData = store.pipelineFormData.data[card?.pipe]
    ? store.pipelineFormData.data[card?.pipe][card.id]
    : null;
  return {
    startFormFields: store.pipelineForm.data[card?.pipe]?.fields,
    cardData,
    phaseFieldsData: store.phaseFieldsData.data,
    pipelineCardFieldData: store.pipelineCardFieldData.data,
  };
};

const dispatchMap = {
  updateCard: updatePipelineCard,
  getPipe: getPipeAction,
  getPhaseFieldsDataAction: getPhaseFieldsData,
  getPipelineCardFieldDataAction: getPipelineCardFieldData,
  getHistory: getCardHistory,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(CardDetailsPanel));
