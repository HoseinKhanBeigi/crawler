import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Timeline } from 'antd';
import momentJalaali from 'moment-jalaali';
import Icon from '@mdi/react';
import {
  mdiAccount,
  mdiAccountCheck,
  mdiAccountGroup,
  mdiCommentMultiple,
  mdiPhone,
  mdiPlus,
  mdiViewDashboard,
} from '@mdi/js';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './TimelineActivity.scss';
import CPLoading from '../../components/CP/CPLoading';
import activityService from '../../service/activityService';
import CPEmpty from '../CP/CPEmpty';

const { Item } = Timeline;

const lastNode = {
  lastNode: true,
  actionFa: 'ادامه فعالیت ها',
  category: 'LAST',
};

const TimelineActivity = props => {
  const { levantId, isBusinessLead } = props;
  const [list, setList] = useState([]);
  const pageNumber = useRef(0);
  const [loading, setLoading] = useState(false);
  const pageSize = isBusinessLead ? 10 : 5;

  const generateList = (response, pageNum) => {
    const { content, last } = response;
    const arr = content;
    if (pageNum === 0 && content.length > 0) {
      if (!last) arr.push(lastNode);
      setList(arr);
    } else {
      let newList = [...list];
      newList.pop();
      newList = [...newList, ...arr];
      if (!last) newList.push(lastNode);
      setList(newList);
    }
  };

  const getTimeline = pageNum => {
    setLoading(true);
    activityService
      .getTimelineActivity(levantId, pageNum, pageSize)
      .then(response => {
        setLoading(false);
        if (response?.content?.length) {
          generateList(response, pageNum);
        }
      });
  };

  const loadMore = () => {
    pageNumber.current += 1;
    getTimeline(pageNumber.current);
  };

  useEffect(() => {
    getTimeline(0);
    return () => {
      setList([]);
      pageNumber.current = 0;
    };
  }, [levantId]);

  const category = {
    PROFILE: (
      <div className={s.icon} style={{ backgroundColor: '#5b8c00' }}>
        <Icon size="16px" path={mdiAccount} />
      </div>
    ),
    CASE: (
      <div className={s.icon} style={{ backgroundColor: '#ef8720' }}>
        <Icon size="16px" path={mdiCommentMultiple} />
      </div>
    ),
    CALL: (
      <div className={s.icon} style={{ backgroundColor: '#00b8c6' }}>
        <Icon size="16px" path={mdiPhone} />
      </div>
    ),
    ONBOARDING: (
      <div className={s.icon} style={{ backgroundColor: '#e33cd6' }}>
        <Icon size="16px" path={mdiAccountCheck} />
      </div>
    ),
    CRM: (
      <div className={s.icon} style={{ backgroundColor: '#5b8c00' }}>
        <Icon size="16px" path={mdiViewDashboard} />
      </div>
    ),
    SESSION: (
      <div className={s.icon} style={{ backgroundColor: '#375ae8' }}>
        <Icon size="16px" path={mdiAccountGroup} />
      </div>
    ),
    LAST: (
      <div className={s.btn}>
        <Icon size="16px" path={mdiPlus} onClick={loadMore} />
      </div>
    ),
  };

  const renderTimelineItem = () =>
    list?.map(i => (
      <Item dot={category[i?.category]} key={i?.id}>
        {i.lastNode ? (
          <span className={s.lastNode}>{i?.actionFa || '---'}</span>
        ) : (
          <div className={s.item_container}>
            <div className={s.item_container__right}>
              <div className={s.item_container__right__actionFa}>
                {i?.actionFa || '---'}
              </div>
              <div className={s.item_container__right__operator}>
                ایجاد کننده: {i?.actorFullName || '---'}
              </div>
              <div className={s.item_container__right__product}>
                {i?.briefDataFa}
              </div>
            </div>
            <div className={s.item_container__left}>
              <div className={s.item_container__left__time}>
                ساعت {momentJalaali(i?.dateTime).format('HH:mm')}
              </div>
              <div className={s.item_container__left__date}>
                {momentJalaali(i?.dateTime).format('jYYYY/jM/jD')}
              </div>
            </div>
          </div>
        )}
      </Item>
    ));

  return (
    <>
      <div className={cs(s.container, isBusinessLead && s.business)}>
        <CPLoading tip="درحال دریافت لیست تایم‌لاین‌ها..." spinning={loading}>
          <div className={s.Timeline_container}>
            {list?.length > 0 ? (
              <Timeline mode="right">{renderTimelineItem()}</Timeline>
            ) : (
              <CPEmpty description="لیست تایم‌لاین خالی است" />
            )}
          </div>
        </CPLoading>
      </div>
    </>
  );
};

TimelineActivity.propTypes = {
  levantId: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  isBusinessLead: PropTypes.bool,
};
TimelineActivity.defaultProps = {
  levantId: '',
  isBusinessLead: false,
};
export default withStyles(s)(TimelineActivity);
