import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'antd';
import jalaliMoment from 'moment-jalaali';
import { DRAWER_FOR_NET_ASSET_INVESTOR_FILTER } from '../../repository';
import { getNetAssetChartDataAction } from '../../../../store/portfolio/portfolio.actions';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import CPSelect from '../../../CP/CPSelect';
import CPSingleDatePicker from '../../../CP/CPSingleDatePicker';
// eslint-disable-next-line css-modules/no-unused-class
import s from './DrawerForNetAssetInvestorFilter.scss';

const actionsList = [
  {
    text: 'سال جاری',
    value: 'CURRENT_YEAR',
  },
  {
    text: 'سال گذشته',
    value: 'LAST_YEAR',
  },
  {
    text: 'شش ماه گذشته',
    value: 'PAST_SIX_MONTHS',
  },
  {
    text: 'سه ماهه جاری',
    value: 'CURRENT_THREE_MONTHS',
  },
  {
    text: 'انتخاب بازه زمانی',
    value: 'SELECT_RANGE',
  },
];

const dateRange = {
  PAST_SIX_MONTHS: {
    from: jalaliMoment()
      .subtract(6, 'jMonth')
      .format('x'),
    to: jalaliMoment().format('x'),
  },
  LAST_YEAR: {
    from: jalaliMoment()
      .subtract(1, 'jYear')
      .format('x'),
    to: jalaliMoment().format('x'),
  },
  CURRENT_YEAR: {
    from: jalaliMoment()
      .startOf('jYear')
      .format('x'),
    to: jalaliMoment()
      .endOf('jYear')
      .format('x'),
  },
  CURRENT_THREE_MONTHS: {
    from: jalaliMoment()
      .subtract(3, 'jMonth')
      .format('x'),
    to: jalaliMoment().format('x'),
  },
};

const DrawerForNetAssetInvestorFilter = props => {
  const { onFilter, dsCode, defaultValue } = props;
  const [visible, setVisible] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [dateFromRange, setDateFromRange] = useState(null);
  const [dateToRange, setDateToRange] = useState(null);

  function findNameByValue(value) {
    let curr = null;
    // eslint-disable-next-line array-callback-return
    actionsList.map(item => {
      if (item.value === value) curr = item;
    });
    return curr;
  }
  const closeDrawer = () => {
    setVisible(false);
  };

  const handleSelectTime = value => {
    setCurrentFilter(value);
  };

  function dateFactory() {
    if (dateFromRange && dateToRange) {
      return { from: dateFromRange, to: dateToRange };
    }
    return {
      from: dateRange[currentFilter]?.from,
      to: dateRange[currentFilter]?.to,
    };
  }

  const handleSubmitFilter = async () => {
    onFilter(findNameByValue(currentFilter));
    await props.getNetAssetChartDataAction({
      dscode: dsCode,
      fromDate: dateFactory()?.from,
      toDate: dateFactory()?.to,
    });
    closeDrawer();
  };

  const handleSelectFromDate = value => {
    const date = value.date?.unix();
    setDateFromRange(date);
  };

  const handleSelectToDate = value => {
    const date = value.date?.unix();
    setDateToRange(date);
  };

  return (
    <KianDrawer
      className={s.container}
      visible={visible}
      onClose={closeDrawer}
      title="فیلترها"
      drawerId={DRAWER_FOR_NET_ASSET_INVESTOR_FILTER}
      okText="اعمال فیلترها"
      cancelText="انصراف"
      onOk={handleSubmitFilter}
      onCancel={closeDrawer}
      width="660px"
    >
      <CPSelect
        placeholder="یک بازه زمانی انتخاب کنید"
        label="بازه  زمانی"
        defaultValue={defaultValue}
        dataSource={actionsList}
        onChange={handleSelectTime}
      />
      {currentFilter === 'SELECT_RANGE' && (
        <Row gutter={24} type="flex" style={{ marginTop: '16px' }}>
          <Col span={12}>
            <div
              style={{
                fontSize: '12px',
                color: '#7a7a7a',
                marginBottom: '4px',
              }}
            >
              از تاریخ
            </div>
            <CPSingleDatePicker
              displayFormat="jYYYY/jM/jD"
              onChange={value => handleSelectFromDate(value)}
            />
          </Col>
          <Col span={12}>
            <div
              style={{
                fontSize: '12px',
                color: '#7a7a7a',
                marginBottom: '4px',
              }}
            >
              تا تاریخ
            </div>
            <CPSingleDatePicker
              displayFormat="jYYYY/jM/jD"
              onChange={value => handleSelectToDate(value)}
            />
          </Col>
        </Row>
      )}
    </KianDrawer>
  );
};

DrawerForNetAssetInvestorFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  dsCode: PropTypes.string,
  defaultValue: PropTypes.string,
  getNetAssetChartDataAction: PropTypes.func.isRequired,
};
DrawerForNetAssetInvestorFilter.defaultProps = {
  dsCode: '',
  defaultValue: '',
};
const mapDispatch = {
  getNetAssetChartDataAction,
};
export default connect(
  null,
  mapDispatch,
)(withStyles(s)(DrawerForNetAssetInvestorFilter));
