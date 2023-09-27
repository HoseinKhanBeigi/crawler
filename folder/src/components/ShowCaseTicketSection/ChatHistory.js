import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Result, Icon } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ShowCaseTicketSection.scss';
import MessageItem from './MessageItem';
import CPButton from '../CP/CPButton';
import caseManagementServices from '../../service/caseManagementsService';

const ChatHistory = props => {
  const { data, id } = props;
  const [answers, setAnswers] = useState(data);
  const [laoding, setLoading] = useState(false);

  useEffect(() => {
    setAnswers(data);
  }, [data]);

  const getAnswerList = () => {
    setLoading(true);
    caseManagementServices.getCaseAnswerListByCaseId(id).then(
      response => {
        if (response?.additionalInfo) {
          delete response?.additionalInfo;
        }
        setAnswers(response.content);
        setLoading(false);
      },
      () => setLoading(false),
    );
  };
  return (
    <>
      {answers?.length ? (
        <div className={s.chat_container}>
          {answers?.map(answer => (
            <MessageItem data={answer} />
          ))}
        </div>
      ) : (
        <div className={s.chat_container}>
          <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="عالی شد! لیست گفتگوی این درخواست خالیست"
            extra={
              <CPButton
                type="primary"
                loading={laoding}
                onClick={getAnswerList}
              >
                دریافت لیست گفتگو ها
              </CPButton>
            }
          />
        </div>
      )}
    </>
  );
};
ChatHistory.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
};
ChatHistory.defaultProps = {
  data: [],
  id: null,
};
export default ChatHistory;
