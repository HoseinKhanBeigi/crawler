import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment-jalaali';
import s from './index.scss';

const FilterColumn = ({ item }) => {
  const branches = Object.values(item.branches);
  const applications = item.applications?.map(({ name }) => name);

  return (
    <>
      {branches?.length > 0 && (
        <>
          {branches.map(name => (
            <Tag>{name || '---'}</Tag>
          ))}
          <span className={s.line} />
        </>
      )}
      {applications?.map(name => (
        <Tag>{name || '---'}</Tag>
      ))}
      {item.fromDate && (
        <>
          <span className={s.line} />
          <Tag>
            ایجاد‌شده از تاریخ {moment(item.fromDate).format('jDD jMMMM jYYYY')}
          </Tag>
        </>
      )}
      {item.fromDays && (
        <>
          <span className={s.line} />
          <Tag>ایجاد‌شده از {item.fromDays} روز قبل</Tag>
        </>
      )}
    </>
  );
};

FilterColumn.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withStyles(s)(FilterColumn);
