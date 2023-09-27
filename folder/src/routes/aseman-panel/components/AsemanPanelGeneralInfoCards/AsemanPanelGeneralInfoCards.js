import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import GeneralInfoCards from '../../../../components/GeneralInfoCards/GeneralInfoCards';
import s from './AsemanPanelGeneralInfoCards.scss';

const AsemanPanelGeneralInfoCards = ({ cards }) => (
  <GeneralInfoCards cards={cards} skeletonNumbers={4} className={s.wrapper} />
);

AsemanPanelGeneralInfoCards.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default withStyles(s)(AsemanPanelGeneralInfoCards);
