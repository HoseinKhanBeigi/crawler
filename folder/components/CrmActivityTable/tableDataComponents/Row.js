import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../../CrmActivityTable/tableDataComponents/tableDataComponents.scss';
import CPTooltip from '../../CP/CPTooltip';
import convertToJalaliDate from '../../../utils/date';

const Row = props => {
  const { label, item, data } = props;
  const ValueGenerator = () => {
    let generatedValue;
    let payload = {};
    try {
      payload = JSON.parse(data?.activityDto?.payload);
    } catch (e) {
      // todo broken data found.
    }
    // regenerate data by json parse.
    const obj = {
      ...data?.activityDto,
      payload,
    };
    const valueInPath = item.path
      ?.split('.')
      .reduce((p, c) => (p && p[c]) || null, obj);

    if (!valueInPath) {
      return '';
    }
    switch (item.type) {
      case 'text':
        generatedValue = valueInPath;
        break;
      case 'dateTime':
        generatedValue = (
          <>
            <span>
              {convertToJalaliDate(valueInPath, 'dddd jD jMMMM jYYYY')}
            </span>
            <span className={s.time}>
              {convertToJalaliDate(valueInPath, 'HH:mm')}
            </span>
          </>
        );
        break;
      case 'status':
        if (valueInPath === 'SUCCESSFUL') {
          generatedValue = 'موفق';
        } else {
          generatedValue = valueInPath === 'FAILED' ? 'ناموفق' : valueInPath;
        }
        break;
      case 'money':
        generatedValue = (
          <span className={s.money}>{valueInPath?.toLocaleString()}</span>
        );
        break;
      case 'phone':
        generatedValue = <span className={s.phone}>{valueInPath}</span>;
        break;
      case 'ip':
        generatedValue = <span className={s.ip}>{valueInPath}</span>;
        break;
      case 'date':
        generatedValue = (
          <span>{convertToJalaliDate(valueInPath, 'dddd jD jMMMM jYYYY')}</span>
        );
        break;
      case 'time':
        generatedValue = (
          <span>{convertToJalaliDate(valueInPath, 'HH:mm')}</span>
        );
        break;
      case 'bool':
        generatedValue = <span>{valueInPath ? 'true' : 'false'}</span>;
        break;
      default:
        generatedValue = 'اطلاعاتی وجود ندارد';
        break;
    }
    return generatedValue;
  };
  return (
    <>
      <div className={s.row} key={item.code}>
        <span className={s.label}>{label} :</span>
        <CPTooltip title={ValueGenerator()} placement="top">
          <span className={s.value}>{ValueGenerator()}</span>
        </CPTooltip>
      </div>
    </>
  );
};

Row.propTypes = {
  label: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(Row);
