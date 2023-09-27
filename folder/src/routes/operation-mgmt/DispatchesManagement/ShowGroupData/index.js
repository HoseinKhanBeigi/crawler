import React from 'react';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Row, Tag } from 'antd';
import moment from 'moment-jalaali';
import s from './index.scss';

const ShowGroupData = props => {
  const { name, applications, branches, fromDate, fromDays } = props;
  return (
    <div className={s.container}>
      <Row gutter={[16, 22]}>
        <Col span={6}>
          <div className={s.key}>نام گروه</div>
        </Col>
        <Col span={18}>
          <div className={s.title}>{name}</div>
        </Col>
        <Col span={6}>
          <div className={s.key}>اپلیکیشن‌های ایجاد‌کننده</div>
        </Col>
        <Col span={18}>
          {applications.map(item => (
            <span className={s.app} key={item.id}>
              {item.name}
            </span>
          ))}
        </Col>
        <Col span={6}>
          <div className={s.key}>فیلترهای مکانی</div>
        </Col>
        <Col span={18}>
          {branches.map(item => (
            <Tag key={item.value} className={s.tag}>
              {item.text}
            </Tag>
          ))}
        </Col>
        {(fromDate || fromDays) && (
          <>
            <Col span={6}>
              <div className={s.key}>فیلتر زمانی</div>
            </Col>

            <Col span={18}>
              <div className={s.title}>
                {fromDate
                  ? `استاتیک - از تاریخ ${moment(fromDate).format(
                      'jDD jMMMM jYYYY',
                    )} به بعد`
                  : `داینامیک - از ${fromDays} روز قبل به بعد`}
              </div>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};
ShowGroupData.propTypes = {
  name: PropType.string,
  applications: PropType.string,
  branches: PropType.string,
  fromDate: PropType.string,
  fromDays: PropType.string,
};
ShowGroupData.defaultProps = {
  fromDate: null,
  fromDays: null,
  name: '',
  applications: [],
  branches: [],
};
export default withStyles(s)(ShowGroupData);
