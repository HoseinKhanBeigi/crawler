import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './DashboardEntityList.scss';
import CPAvatar from '../CP/CPAvatar';
import CPCard from '../CP/CPCard';
import Link from '../Link';
import CPLoading from '../CP/CPLoading';
import CPEmpty from '../CP/CPEmpty';

const moment = require('moment-jalaali');

class DashboardEntityList extends React.Component {
  renderList = (data, link, date, type) => (
    <List.Item>
      <List.Item.Meta
        avatar={<CPAvatar />}
        title={
          <Link
            className={cs(s.link, type === 'USERS' ? 'phoneNum' : undefined)}
            to={`/lead/${link}`}
          >
            {data}
          </Link>
        }
      />
      <div>{date}</div>
    </List.Item>
  );

  renderDate = date => {
    moment.loadPersian({ dialect: 'persian-modern' });
    const day = date ? moment(date).format('jYYYY/jM/jD') : 'تاریخ ندارد';
    return <small className="cardDate">{day}</small>;
  };

  render() {
    const { className, showAll, listTitle, loading, data, type } = this.props;
    let style;
    switch (type) {
      case 'LEAD': {
        style = s.lead;
        break;
      }
      case 'PEOPLE': {
        style = s.people;
        break;
      }
      case 'OPPORTUNITIES': {
        style = s.opportunities;
        break;
      }
      case 'USERS': {
        style = s.users;
        break;
      }
      default: {
        style = s.default;
        break;
      }
    }

    if (!data) {
      return (
        <div className={cs(s.dashboardEntityList, className, style)}>
          <CPCard title={listTitle}>
            <div className={s.loading}>
              <CPLoading spinning delay={100} wrapperClassName="Loading" />
            </div>
          </CPCard>
        </div>
      );
    }

    return (
      <div className={cs(s.dashboardEntityList, className, style)}>
        <CPCard title={listTitle}>
          <CPLoading
            spinning={!data && !loading}
            delay={100}
            wrapperClassName="Loading"
          >
            {data?.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => {
                  if (type === 'USERS') {
                    return this.renderList(
                      item.username,
                      item.levantId,
                      this.renderDate(item?.createdDate),
                      'USERS',
                    );
                  } else if (type === 'LEAD') {
                    return this.renderList(
                      `${item?.firstName || '-'} ${item?.lastName || '-'}`,
                      item.levantId,
                      this.renderDate(item?.createdDate),
                    );
                  }
                  return (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CPAvatar />}
                        title={
                          <Link
                            className={s.link}
                            to={`/lead/${item?.levantId}`}
                          >{`${item?.firstName || '-'} ${item?.lastName ||
                            '-'}`}</Link>
                        }
                      />
                      <div>{this.renderDate(item.createdDate)}</div>
                    </List.Item>
                  );
                }}
              />
            ) : (
              <CPEmpty />
            )}
          </CPLoading>

          {data?.length > 0 && (
            <Link className={s.showAll} to={showAll}>
              مشاهده همه ...
            </Link>
          )}
        </CPCard>
      </div>
    );
  }
}

DashboardEntityList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  showAll: PropTypes.string,
  listTitle: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
};

DashboardEntityList.defaultProps = {
  className: null,
  data: null,
  showAll: null,
  listTitle: undefined,
  loading: false,
  type: undefined,
};

export default withStyles(s)(DashboardEntityList);
export const DashboardEntityListTest = DashboardEntityList;
