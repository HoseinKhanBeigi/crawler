import React, { useEffect, useMemo, useState } from 'react';
import classes from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './CardDetail.scss';
import { getPipelineForm } from '../../../../store/pipelineForm/pipelineForm.actions';
import { getPipelineFormData } from '../../../../store/pipelineFormData/pipelineFormData.actions';
import { generateFieldValueByFields } from '../../../../utils/pipelineFieldValueGenerator';
import Envelope from '../../icons/Envelope';
import Message from '../../icons/Message';
import Task from '../../icons/Task';
import CPButton from '../../../CP/CPButton';
import { MODAL_FOR_ADD_TASK } from '../../../ModalRoot/repository';
import WithModal from '../../../HOC/withModal';
import CardDetailMoveToSection from './cardDetailMoveToSection/CardDetailMoveToSection';
import CardDetailSecondSection from './cardDetailSecondSection/CardDetailSecondSection';
import CardDetailFirstSection from './cardDetailFirstSection/CardDetailFirstSection';
import { getPipe as getPipeAction } from '../../../../store/pipelineManagement/pipelineManagement.actions';

function CardDetail({
  card,
  phases,
  close,
  startFormFields,
  phaseFields,
  cardData,
  getForm,
  getFormData,
  cardTitle: cardTitleId,
  showModalAction,
  getPipe,
  modalFlag,
}) {
  const [cardTitle, setCardTitle] = useState('');

  function fieldToDataRow(field) {
    if (card?.values) {
      setCardTitle(
        Object.keys(card?.values).includes(field) ? card.values[field] : '',
      );
    }
    return '';
  }

  useEffect(() => {
    fieldToDataRow(cardTitleId);
  }, cardTitleId);

  const fields = [...(startFormFields || []), ...(phaseFields || [])];

  useEffect(() => {
    if (!startFormFields) {
      getForm('start', card.pipe);
    }
    if (!phaseFields) {
      getForm('phase', card.currentPhase);
    }
    if (!cardData) {
      getFormData('start', card.pipe, card.id);
    }
    getPipe(card.pipe);
  }, [card]);

  const validatedCardTitle = useMemo(() => {
    if (cardTitle) {
      return cardTitle;
    } else if (
      cardData &&
      startFormFields &&
      cardData[startFormFields[0]?.id]
    ) {
      return generateFieldValueByFields(
        cardData[startFormFields[0]?.id],
        fields,
        startFormFields[0]?.id,
      );
    }
    return 'بدون داده';
  }, [cardData, startFormFields, cardTitle]);

  function showModal() {
    close();
    showModalAction({
      type: MODAL_FOR_ADD_TASK,
      props: {
        byCard: true,
        cardId: card?.id,
        cardTitle: validatedCardTitle,
      },
    });
  }

  const phaseName = useMemo(() => {
    if (phases) {
      const selectedPhase = phases.find(
        phase => phase.id === card.currentPhase,
      );
      return selectedPhase?.name;
    }
    return <></>;
  }, [phases]);

  return (
    <div className={classes(styles.cardDetailContainer, 'cardDetailContainer')}>
      {modalFlag && (
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderTitle}>
            <div className={styles.actionsWrapper}>
              {validatedCardTitle} <span> - در فاز </span>
              <div className={styles.currentPhaseHeader}>{phaseName}</div>
            </div>
          </div>
          <div className={styles.actionsWrapper}>
            <div className={styles.actionsButton}>
              <Envelope />
            </div>
            <div className={styles.actionsButton}>
              <Message />
            </div>
            <CPButton className={styles.actionsButton} onClick={showModal}>
              <Task />
            </CPButton>
          </div>
        </div>
      )}
      <div className={classes(styles.cardDetailWrapper, 'cardDetailWrapper')}>
        <div
          className={classes(styles.firstSectionWrapper, 'firstSectionWrapper')}
        >
          {!modalFlag && (
            <div className={classes(styles.cardHeader, 'cardHeader')}>
              <div
                className={classes(styles.cardHeaderTitle, 'cardHeaderTitle')}
              >
                <div className={styles.actionsWrapper}>
                  {validatedCardTitle} <span> - در فاز </span>
                  <div className={styles.currentPhaseHeader}>{phaseName}</div>
                </div>
              </div>
            </div>
          )}
          <CardDetailFirstSection card={card} />
        </div>
        <CardDetailSecondSection card={card} modalFlag={modalFlag} />
        <CardDetailMoveToSection
          card={card}
          close={close}
          modalFlag={modalFlag}
          cardTitle={validatedCardTitle}
          showModalAction={showModalAction}
        />
      </div>
    </div>
  );
}

CardDetail.propTypes = {
  card: PropTypes.object.isRequired,
  phases: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  startFormFields: PropTypes.array.isRequired,
  phaseFields: PropTypes.array.isRequired,
  cardData: PropTypes.object.isRequired,
  getForm: PropTypes.func.isRequired,
  getFormData: PropTypes.func.isRequired,
  cardTitle: PropTypes.string.isRequired,
  getPipe: PropTypes.func.isRequired,
  modalFlag: PropTypes.bool.isRequired,
};

const stateMap = (store, { card }) => {
  const cardData = store.pipelineFormData.data[card?.pipe]
    ? store.pipelineFormData.data[card?.pipe][card.id]
    : null;
  return {
    phases: store.pipelinePhase.data[card?.pipe],
    startFormFields: store.pipelineForm.data[card?.pipe]?.fields,
    phaseFields: store.pipelineForm.data[card?.currentPhase]?.fields,
    cardData,
  };
};

const dispatchMap = {
  getForm: getPipelineForm,
  getFormData: getPipelineFormData,
  getPipe: getPipeAction,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(WithModal(CardDetail)));
