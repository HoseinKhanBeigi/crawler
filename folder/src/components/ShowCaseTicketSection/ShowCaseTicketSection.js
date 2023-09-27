import React, { useState, useEffect } from 'react';
import { Row, Divider, Col } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ShowCaseTicketSection.scss';
import CPRadio from '../CP/CPRadio';
import CPTextArea from '../CP/CPTextArea';
import CPButton from '../CP/CPButton';
import CPLoading from '../CP/CPLoading';
import ChatHistory from './ChatHistory';
import { channelList, messageOwner } from './radioButtonsList';
import caseManagementServices from '../../service/caseManagementsService';

const ShowCaseTicketSection = props => {
  const { id, levantId: operatorLevantId } = props;
  const [activeChannel, setActiveChannel] = useState(true);
  const [caseAnswerType, setCaseAnswerType] = useState('CALL');
  const [answerTextMessage, setAnswerTextMessage] = useState(null);
  const [answersList, setAnswersList] = useState(null);
  const [isLastAnswers, setIsLastAnswers] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    caseManagementServices.getCaseAnswerListByCaseId(id).then(
      response => {
        if (response?.additionalInfo) {
          delete response?.additionalInfo;
        }
        setAnswersList(response);
        setLoading(false);
      },
      () => setLoading(false),
    );
  }, [isLastAnswers]);

  const submitAnswer = () => {
    setLoading(true);
    const body = {
      answer: answerTextMessage,
      caseAnswerType,
      caseId: id,
      operator: activeChannel,
      operatorLevantId,
    };
    caseManagementServices.postCaseAnswer(body).then(
      () => {
        setLoading(false);
        setAnswerTextMessage('');
        setCaseAnswerType('CALL');
        setIsLastAnswers(!isLastAnswers);
        setActiveChannel(true);
      },
      () => setLoading(false),
    );
  };

  return (
    <>
      <div className={s.container}>
        <Row
          gutter={24}
          type="flex"
          style={{ justifyContent: 'space-between', padding: '0 15px' }}
        >
          <b>پیام ها ({answersList?.totalElements})</b>
        </Row>
        <Divider />
        <div>
          <p>کانال ارتباطی</p>
          <CPRadio
            className="margin-t-10 margin-b-10"
            model={channelList}
            size="small"
            value={caseAnswerType}
            onChange={e => setCaseAnswerType(e.target.value)}
          />
          <Row gutter={24}>
            <Col span={24}>
              <CPTextArea
                value={answerTextMessage}
                onChange={e => setAnswerTextMessage(e.target.value)}
                rows={5}
                placeholder="متن پیام خود را اینجا بنویسد..."
              />
            </Col>
          </Row>
          <Row
            gutter={24}
            style={{
              textAlign: 'left',
              marginTop: '28px',
              marginBottom: '44px',
            }}
          >
            <Col span={24}>
              <CPRadio
                className="margin-t-10 margin-b-10"
                model={messageOwner}
                size="small"
                value={activeChannel}
                onChange={e => setActiveChannel(e.target.value)}
              />
              <CPButton type="primary" onClick={submitAnswer} loading={loading}>
                ثبت پیام
              </CPButton>
            </Col>
          </Row>
          <CPLoading spining={loading} tip="در حال دریافت لیست گفتگو...">
            <ChatHistory data={answersList?.content} id={id} />
          </CPLoading>
        </div>
      </div>
    </>
  );
};
ShowCaseTicketSection.propTypes = {
  id: PropTypes.string,
  levantId: PropTypes.string,
};
ShowCaseTicketSection.defaultProps = {
  id: '',
  levantId: '',
};
const mapState = state => ({
  levantId: state.neshanAuth?.jwt?.levantId,
});
export default connect(mapState, null)(withStyles(s)(ShowCaseTicketSection));
