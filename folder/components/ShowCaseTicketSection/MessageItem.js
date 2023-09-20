import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ShowCaseTicketSection.scss';
import { caseAnswerTypes } from '../../utils/caseTypes';
import convertToJalaliDate from '../../utils/date';

const MessageItem = props => {
  const { data } = props;
  const {
    answeredByOperator,
    answeredByFullName,
    ownerFullName,
    answer,
    code,
    createdDateTime,
  } = data;
  return (
    <div
      className={s.chat_answered_message}
      style={{
        backgroundColor: answeredByOperator ? '#ffffff' : '#daf3ff',
        float: answeredByOperator ? 'left' : 'right',
      }}
    >
      <div
        className={answeredByOperator ? s.triangle_left : s.triangle_right}
      />
      <Row
        gutter={24}
        type="flex"
        align="middle"
        style={{ alignItems: 'baseline', paddingRight: '5px' }}
      >
        <span className={s.text}>
          {answeredByOperator
            ? answeredByFullName
            : !answeredByOperator
            ? ownerFullName
            : '---'}
        </span>
        {/* {answeredByOperator && <div className={s.circle}>.</div>}
        {answeredByOperator && (
          <span className={s.text}>ثبت شده توسط اپراتور</span>
        )} */}
      </Row>
      <Row gutter={24} type="flex">
        <p className={s.paragraph}>{answer}</p>
      </Row>
      <Row
        gutter={24}
        type="flex"
        align="middle"
        style={{
          justifyContent: 'flex-end',
          padding: '0 10px',
          alignItems: 'baseline',
        }}
      >
        <span className={s.text}>{caseAnswerTypes[code]}</span>
        <div className={s.circle}>.</div>
        <span className={s.text}>{convertToJalaliDate(createdDateTime)}</span>
        <div className={s.circle}>.</div>
        <span className={s.text}>
          {convertToJalaliDate(createdDateTime, 'HH:mm')}
        </span>
      </Row>
    </div>
  );
};

MessageItem.propTypes = {
  data: PropTypes.object,
};
MessageItem.defaultProps = {
  data: {},
};

export default MessageItem;
