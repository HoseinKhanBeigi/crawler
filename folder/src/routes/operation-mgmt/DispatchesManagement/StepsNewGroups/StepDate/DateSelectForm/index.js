import React from 'react';
import PropType from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Radio, Row } from 'antd';
import s from './index.scss';
import CPSingleDatePicker from '../../../../../../components/CP/CPSingleDatePicker/CPSingleDatePicker';
import CPInputNumber from '../../../../../../components/CP/CPInputNumber/CPInputNumber';

const DateSelectForm = ({ mode, setMode }) => (
  <>
    <div className={s.buttonGroup}>
      <Radio.Group
        onChange={e => setMode(prev => ({ ...prev, type: e.target.value }))}
        value={mode.type}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="fromDate">استاتیک</Radio.Button>
        <Radio.Button value="fromDays">داینامیک</Radio.Button>
      </Radio.Group>
    </div>
    <div className={s.container}>
      {mode.type === 'fromDate' ? (
        <>
          <CPSingleDatePicker
            placeholder="تاریخ را انتخاب کنید"
            label="ایجاد از تاریخ"
            date={mode.fromDate}
            onChange={e =>
              setMode(prev => ({ ...prev, fromDate: Date.parse(e.date) }))
            }
          />
        </>
      ) : (
        <>
          <div className={s.label}>ایجاد از</div>
          <Row type="flex" justify="space-between" align="middle">
            <Col className={s.day}>
              <CPInputNumber
                placeholder=" مثلا ۲۰"
                value={mode.fromDays}
                onChange={value =>
                  setMode(prev => ({ ...prev, fromDays: value }))
                }
              />
            </Col>
            <Col className={s.label}>روز قبل</Col>
          </Row>
        </>
      )}
    </div>
    <div className={s.hr} />
  </>
);
DateSelectForm.propTypes = {
  setMode: PropType.func.isRequired,
  mode: PropType.object.isRequired,
};
export default withStyles(s)(DateSelectForm);
