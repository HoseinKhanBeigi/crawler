import React from 'react';
import PropTypes from 'prop-types';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Comment.scss';
import convertToJalaliDate from '../../../../../../utils/date';

const Comment = ({
  data: { creatorFirstName, creatorLastName, creatorDate, description },
}) => (
  <div className={s.comment}>
    <div className={s.comment__header}>
      <p>
        {creatorFirstName && creatorLastName
          ? `${creatorFirstName} ${creatorLastName}`
          : 'ناشناس'}
      </p>
      <span>{convertToJalaliDate(creatorDate, 'jYYYY/jMM/jDD - HH:mm')}</span>
    </div>
    <p className={s.comment__paragraph}>{description}</p>
  </div>
);
Comment.propTypes = {
  data: PropTypes.object.isRequired,
};
export default withStyle(s)(Comment);
