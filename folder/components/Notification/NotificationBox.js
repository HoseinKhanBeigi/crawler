import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../AdminLayout/components/Navigation/Navigation.scss';
import CPDivider from '../CP/CPDivider';
import convertToJalaliDate from '../../utils/date';
import { useSocket } from '../socket/useSocket';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';

export const notificationTopicList = [
  {
    text: 'ایجاد تسک',
    value: 'CREATE_TASK',
  },
  {
    text: 'ویرایش تسک',
    value: 'EDIT_TASK',
  },
  {
    text: 'تاریخ سررسید تسک',
    value: 'TASK_DUE_DATE',
  },
  {
    text: 'ایجاد درخواست',
    value: 'ADD_CASE_ISSUE',
  },
  {
    text: 'ویرایس درخواست',
    value: 'EDIT_CASE_ISSUE',
  },
  {
    text: 'افزودن جواب درخواست',
    value: 'ADD_CASE_ANSWER',
  },
  {
    text: 'تخصیص سرنخ',
    value: 'LEAD_ASSIGN',
  },
];

function NotificationBox({ token, messageNumber }) {
  const notificationRef = useRef(null);
  const [enableScrollFetch, setEnableScrollFetch] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState(messages);

  const authorization = `Bearer ${token}`;
  const { subscribe, unsubscribe, send, connected } = useSocket(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.HOST,
    )}/notification/secured/room?${authorization}`,
  );

  function onNewMessages() {
    setAllMessages(
      [...allMessages, messages].reduce((a, b) => a.concat(b), []),
    );
  }

  useEffect(() => {
    if (messages) {
      onNewMessages();
    }
  }, [messages]);

  function getNextPage(date, pageSize) {
    send('/app/secured/room/unseen-messages', {
      createdDate: date,
      pageSize: pageSize || 10,
    });
  }

  const newFetch = () => {
    if (connected) {
      if (
        messages &&
        messages.length > 0 &&
        messages[messages?.length - 1].createdDate
      ) {
        getNextPage(
          new Date(messages[messages?.length - 1].createdDate).getTime(),
        );
      } else {
        getNextPage(Date.now());
      }
    }
  };

  useEffect(() => {
    if (connected) {
      newFetch();
    }
  }, [connected]);

  useEffect(() => {
    if (connected) {
      const subscribeId = subscribe(
        '/user/queue/messages',
        res => setMessages(JSON.parse(res.body)),
        { Authorization: authorization },
      );
      getNextPage(Date.now());
      return () => {
        unsubscribe(subscribeId, { Authorization: authorization });
      };
    }
    return () => {};
  }, [connected]);

  useEffect(() => {
    setEnableScrollFetch(true);
  }, [messages]);

  const handleScroll = () => {
    if (enableScrollFetch) {
      if (
        notificationRef.current.scrollTop +
          notificationRef.current.clientHeight >=
        notificationRef.current.scrollHeight
      ) {
        newFetch();
        setEnableScrollFetch(false);
      }
    }
  };

  const notificationDescription = notifType => {
    if (notifType?.pushNotificationTopic === 'CREATE_TASK') {
      return `کار با کد ${notifType?.taskCode} برای شما ایجاد شد.`;
    }
    if (notifType?.pushNotificationTopic === 'EDIT_TASK') {
      return `کار با کد ${notifType?.taskCode} ویرایش شد.`;
    }
    if (notifType?.pushNotificationTopic === 'TASK_DUE_DATE') {
      return `مهلت کار با کد ${
        notifType?.taskCode
      }در تاریخ ${convertToJalaliDate(
        notifType?.taskDueDate,
      )} به اتمام خواهد رسید.`;
    }
    if (notifType?.pushNotificationTopic === 'LEAD_ASSIGN') {
      return `سرنخ با شناسه${notifType?.id} به شما تخصیص داده شد.`;
    }
    if (notifType?.pushNotificationTopic === 'ADD_CASE_ISSUE') {
      return `یک درخواست با کد${notifType?.caseCode} برای شما ایجاد شد.`;
    }
    return '';
  };

  const convertNotificationTopic = top => {
    const index = notificationTopicList.findIndex(topic => topic.value === top);
    return notificationTopicList[index]?.text;
  };

  const renderedMessages = useMemo(
    () =>
      allMessages?.map(msg => (
        <>
          <div
            className={
              msg?.pushNotificationStatus === 'UNSEEN'
                ? s.unseen_details
                : s.details
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <span>
                  {msg?.pushNotificationStatus === 'UNSEEN' ? (
                    <div className={s.bolet} />
                  ) : null}
                </span>
                <span>
                  {convertNotificationTopic(msg?.pushNotificationTopic)}
                </span>
              </div>
              <div style={{ color: '#595959' }}>
                {convertToJalaliDate(msg?.createdDate)}
              </div>
            </div>
            <div style={{ marginTop: '20px', padding: '2px 10px' }}>
              {notificationDescription(msg)}
            </div>
          </div>
        </>
      )),
    [allMessages],
  );

  return (
    <div
      className={s.notification_container}
      onScroll={handleScroll}
      ref={notificationRef}
    >
      <Menu>
        <div className={s.header}>
          <p>اعلان ها</p>
          <div className={s.unread}>{messageNumber} خوانده نشده</div>
        </div>
        <CPDivider solid />
        <div>{renderedMessages}</div>
      </Menu>
    </div>
  );
}

NotificationBox.propTypes = {
  token: PropTypes.string.isRequired,
  messageNumber: PropTypes.number.isRequired,
};

export default NotificationBox;
