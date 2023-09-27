import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChooseDefaultUnit.scss';
import UnitsList from '../UnitsList/UnitsList';
import CautionMessage from '../CautionMessage/CautionMessage';

const ChooseDefaultUnit = ({ onFinish, units }) => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const onSelectUnit = unit => {
    setSelectedUnit(unit);
  };

  const submitFormHandler = () => {
    onFinish(selectedUnit);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.title}>
          <h3>انتخاب شعبه پیشفرض</h3>
          <p>
            شما در چند نمایندگی یا شعبه فعالیت دارید. لطفا یکی از گزینه های زیر
            را به عنوان پیشفرض انتخاب کنید تا در هر مرتبه ورود به سیستم به صورت
            خودکار به آن وارد شوید
          </p>
        </div>
        <div className={s.caution}>
          <CautionMessage
            message="            شما میتوانید در هر زمان از طریق تنظیمات کاربری داشبود، نسبت به ورود
            به نمایندگی و شعبات دیگر یا تغییر مسیر پیشفرض اقدام کنید"
          />
        </div>
        <div className={s.unitList}>
          <UnitsList
            onChange={onSelectUnit}
            units={units}
            selectedUnitId={selectedUnit?.id || null}
          />
        </div>
        <Button
          className={s.button}
          onClick={submitFormHandler}
          size="large"
          block
          type="primary"
          disabled={!selectedUnit}
        >
          ثبت و ادامه
        </Button>
      </div>
    </div>
  );
};

ChooseDefaultUnit.propTypes = {
  onFinish: PropTypes.func.isRequired,
  units: PropTypes.array.isRequired,
};

export default withStyles(s)(ChooseDefaultUnit);
