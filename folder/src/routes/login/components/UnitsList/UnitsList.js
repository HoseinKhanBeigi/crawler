import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Radio } from 'antd';
import cs from 'classnames';
import s from './UnitsList.scss';
import { unitTypeNames } from '../../../../components/Unit/utils/unitHelpers';

const UnitsList = ({ units, onChange, selectedUnitId }) => {
  const renderUnit = unitData => {
    const clickHandler = e => {
      e.currentTarget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      onChange(unitData);
    };
    const isActive = unitData.id === selectedUnitId;
    return (
      <button
        className={cs(s.unit, isActive && s.active)}
        key={unitData.id}
        onClick={clickHandler}
      >
        <Radio checked={isActive} />
        <div className={s.info}>
          <h4>{`${unitTypeNames[unitData.unitType] || ''} ${
            unitData.name
          }`}</h4>
          <p>{`کد: ${unitData.code}`}</p>
        </div>
      </button>
    );
  };
  return (
    <div className={s.list}>
      <div>{units.map(unit => renderUnit(unit))}</div>
    </div>
  );
};

UnitsList.propTypes = {
  onChange: PropTypes.func.isRequired,
  units: PropTypes.array.isRequired,
  selectedUnitId: PropTypes.string,
};

UnitsList.defaultProps = {
  selectedUnitId: null,
};

export default withStyles(s)(UnitsList);
