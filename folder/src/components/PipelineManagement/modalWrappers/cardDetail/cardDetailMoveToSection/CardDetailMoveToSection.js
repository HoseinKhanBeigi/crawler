import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import classes from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import styles from './CardDetailMoveToSection.scss';
import { ButtonWrapper } from '../../../widgets';
import ArrowRight from '../../../icons/arrowRight';
import ArrowLeft from '../../../icons/arrowLeft';
import { movePipelineCard } from '../../../../../store/pipelineCard/pipelineCard.actions';
import { getPipe as getPipeAction } from '../../../../../store/pipelineManagement/pipelineManagement.actions';
import { getCardHistory } from '../../../../../store/pipelineCardHistory/pipelineCardHistory.actions';
import { getPipelineCardData } from '../../../../../store/PipelineCardData/pipelineCardData.actions';
import Envelope from '../../../icons/Envelope';
import Message from '../../../icons/Message';
import CPButton from '../../../../CP/CPButton';
import Task from '../../../icons/Task';
import { MODAL_FOR_ADD_TASK } from '../../../../ModalRoot/repository';

function CardDetailMoveToSection({
  phases,
  card,
  moveCard,
  getPipe,
  close,
  getHistory,
  getCard,
  cardTitle,
  modalFlag,
  showModalAction,
}) {
  async function moveToPhase(id, source, destination) {
    try {
      await moveCard(id, source, destination);
      await getPipe(card.pipe);
      await getCard(card.id);
      await getHistory(card.id);
      close();
    } catch (e) {
      // TODO: handle error
    }
  }

  function showModal() {
    showModalAction({
      type: MODAL_FOR_ADD_TASK,
      props: {
        byCard: true,
        cardTitle,
      },
    });
  }

  const currentPhaseOrder = useMemo(
    () => phases?.find(item => item.id === card.currentPhase)?.order || 0,
    [phases],
  );

  const moveTo = useMemo(
    () =>
      phases
        ?.filter(phase => phase.id !== card.currentPhase)
        .map(phase => (
          <ButtonWrapper
            appearance="primary"
            key={phase.id}
            className={styles.phase}
            onClick={() => moveToPhase(card.id, card.currentPhase, phase.id)}
          >
            <span className={styles.otherPhaseName}>{phase.name}</span>
            {currentPhaseOrder > phase.order ? <ArrowRight /> : <ArrowLeft />}
          </ButtonWrapper>
        )),
    [phases],
  );

  return (
    <div className={classes(styles.cardDetail, 'card-Detail')}>
      {!modalFlag && (
        <div className="third-section">
          <div
            className={classes(
              styles.detailTitle,
              'move-to-section-detailTitle',
            )}
          >
            عملیات سریع
          </div>
          <div className="actionsWrapper">
            <div className="actionsButton">
              <Envelope />
            </div>
            <div className="actionsButton">
              <Message />
            </div>
            <CPButton className="actionsButton" onClick={showModal}>
              <Task />
            </CPButton>
          </div>
        </div>
      )}
      <div className="move-to-section-container third-section">
        <div
          className={classes(styles.detailTitle, 'move-to-section-detailTitle')}
        >
          انتقال به این فاز
        </div>
        <div className={styles.formWrapper}>{moveTo}</div>
      </div>
    </div>
  );
}

CardDetailMoveToSection.propTypes = {
  card: PropTypes.object.isRequired,
  phases: PropTypes.object.isRequired,
  getPipe: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  cardTitle: PropTypes.string.isRequired,
  modalFlag: PropTypes.bool.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

const stateMap = (store, { card }) => ({
  phases: store.pipelinePhase.data[card?.pipe],
});

const dispatchMap = {
  moveCard: movePipelineCard,
  getPipe: getPipeAction,
  getHistory: getCardHistory,
  getCard: getPipelineCardData,
};

export default connect(
  stateMap,
  dispatchMap,
)(withStyles(styles)(CardDetailMoveToSection));
