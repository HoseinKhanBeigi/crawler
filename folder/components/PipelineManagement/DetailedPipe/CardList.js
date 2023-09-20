import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

function CardsList({ phase, fields, cardsTitle }) {
  const sortedCardsList = phase.cards
    ?.map(obj => ({ ...obj, date: new Date(obj.createdAt) }))
    .sort((a, b) => b.date - a.date);

  return sortedCardsList.map(card => (
    <Card
      key={card.id}
      card={card}
      fields={fields}
      cardTitleField={cardsTitle}
    />
  ));
}

CardsList.propTypes = {
  phase: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

export default CardsList;
