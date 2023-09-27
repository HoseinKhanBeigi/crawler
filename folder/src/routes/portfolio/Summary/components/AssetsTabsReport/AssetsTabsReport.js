import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import withModal from '../../../../../components/HOC/withModal';
import { getNetAssetChartDataAction } from '../../../../../store/portfolio/portfolio.actions';
import { DRAWER_FOR_NET_ASSET_INVESTOR_FILTER } from '../../../../../components/ModalRoot/repository';
import s from './AssetsTabsReport.scss';
import CPButton from '../../../../../components/CP/CPButton';
import AssetsInvestorChart from '../../../../../components/AssetsInvestorChart';
import CPEmpty from '../../../../../components/CP/CPEmpty';
import CPLoading from '../../../../../components/CP/CPLoading';

const AssetsTabsReport = props => {
  const { selectedFund, netAssetChartData, loading, levantId } = props;
  const [currentFilter, setCurrentFilter] = useState(null);

  const setOnFliter = value => {
    setCurrentFilter(value);
  };

  const showModal = () => {
    props.showModalAction({
      type: DRAWER_FOR_NET_ASSET_INVESTOR_FILTER,
      props: {
        onFilter: setOnFliter,
        dsCode: selectedFund?.dsCode,
        defaultValue: currentFilter?.value,
      },
    });
  };

  useEffect(() => {
    const getData = () => {
      const fromDate = 0;
      const toDate = Date.now();
      if (selectedFund?.dsCode)
        props.getNetAssetChartDataAction({
          dscode: selectedFund?.dsCode,
          fromDate,
          toDate,
          levantId,
        });
    };
    getData();
  }, [selectedFund]);

  return (
    <>
      <div className={s.container}>
        <Row type="flex" gutter={24} justify="space-between">
          <Col>
            <h3 className={s.name}>نمودار دارایی - سرمایه گذاری</h3>
          </Col>
          <Col>
            <div className={s.filter}>
              <CPButton icon="filter" type="primary" onClick={showModal}>
                فیلترها
              </CPButton>
              {currentFilter && (
                <span className={s.chip}>{currentFilter?.text}</span>
              )}
            </div>
          </Col>
        </Row>
        {netAssetChartData?.length ? (
          <CPLoading spinning={loading} tip="در حال دریافت اطلاعات...">
            <Row gutter={24}>
              <Col className={s.chart_container}>
                <AssetsInvestorChart data={netAssetChartData} />
              </Col>
            </Row>
            <Row gutter={24} type="flex" align="middle" justify="center">
              <div className={s.segment_item}>
                <span
                  className={s.circle}
                  style={{ backgroundColor: '#cfdeed' }}
                />
                <span className={s.label}>خالص دارایی</span>
              </div>
              <div className={s.segment_item}>
                <span
                  className={s.circle}
                  style={{ backgroundColor: '#00b4ad' }}
                />
                <span className={s.label}>واریز</span>
              </div>
              <div className={s.segment_item}>
                <span
                  className={s.circle}
                  style={{ backgroundColor: '#ff5252' }}
                />
                <span className={s.label}>برداشت</span>
              </div>
            </Row>
          </CPLoading>
        ) : (
          <CPEmpty description="هیچ دیتایی برای نمایش وجود ندارد!" />
        )}
      </div>
    </>
  );
};
AssetsTabsReport.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  selectedFund: PropTypes.object.isRequired,
  netAssetChartData: PropTypes.array.isRequired,
  getNetAssetChartDataAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  levantId: PropTypes.string,
};
AssetsTabsReport.defaultProps = {
  levantId: '',
};
const mapDispatch = {
  getNetAssetChartDataAction,
};
const mapStateToProps = state => ({
  selectedFund: state.portfolio?.selectedFund,
  netAssetChartData: state?.portfolio?.netAssetChartData,
  loading: state?.portfolio?.netAssetChartLoading,
});
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(AssetsTabsReport)));
