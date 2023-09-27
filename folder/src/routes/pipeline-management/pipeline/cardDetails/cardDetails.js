import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardDetail from '../../../../components/PipelineManagement/modalWrappers/cardDetail/CardDetail';
import { getPipelineCardData } from '../../../../store/PipelineCardData/pipelineCardData.actions';
import './CardDetailPage.scss';

function CardDetails({ cardId, getCard, card }) {
  useEffect(() => {
    getCard(cardId);
  }, []);

  const cardDetailRendered = useMemo(() => {
    if (card?.id) {
      return (
        <div className="card-detail-page">
          <CardDetail card={card} close={() => {}} />
        </div>
      );
    }
    return <></>;
  }, [card]);

  return <>{cardDetailRendered}</>;
}
CardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
  getCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
const stateMap = store => ({
  card: store.pipelineCardData.data,
});
const dispatchMap = {
  getCard: getPipelineCardData,
};

export default connect(stateMap, dispatchMap)(CardDetails);
