/* eslint-disable css-modules/no-unused-class */
/* eslint-disable css-modules/no-undef-class */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Typography, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Detail.scss';
import FooterSummary from './FooterSummary';
import Statistics from './Statistics';
import BannerWithIcon from './BannerWithIcon';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import MoreStatisticsList from './MoreStatisticsList';
import { getFundByDsCodeAction } from '../../../../store/portfolio/portfolio.actions';

const { Title } = Typography;

const Detail = props => {
  const { current, fundData, levantId } = props;
  useEffect(() => {
    if (current?.dsCode) props.getFundByDsCodeAction(current?.dsCode, levantId);
  }, [current?.dsCode]);
  return (
    <>
      <Row type="flex" justify="space-between" className={s.container}>
        <div className={s.content}>
          <Col span={24}>
            <Title className={s.title} level={4}>
              {current?.fundName}
            </Title>
          </Col>
          <Statistics
            data={[
              {
                value: fundData?.providerName ? fundData?.providerName : '---',
                title: 'تامین کننده',
              },
              {
                value: fundData?.applicationName
                  ? fundData?.applicationName
                  : '---',
                title: 'مبدا سرمایه‌گزاری',
              },
              {
                value: fundData?.pipelineName ? fundData?.pipelineName : '---',
                title: 'پایپ‌لاین',
              },
            ]}
          />
          {fundData?.type === 'ETF' && (
            <div className={s.banner_content}>
              <BannerWithIcon
                type="unlocked"
                price={toCommaSeparatedNumber(fundData?.buyPower)}
              />
              {/* thi is for blocked amount box  */}
              {/* <BannerWithIcon type="locked" price={fundData?.buyPower} /> */}
            </div>
          )}
          <MoreStatisticsList
            list={[
              {
                value: fundData?.totalShareValue
                  ? fundData?.totalShareValue
                  : '---',
                label: 'دارایی فعلی (ریال)',
                icon: 'mdiAccountCash',
              },
              {
                value: fundData?.totalShares ? fundData?.totalShares : '---',
                label: 'تعداد واحد',
                icon: 'mdiLayersTriple',
              },
              {
                value: fundData?.cost ? fundData?.cost : '---',
                label: 'بهای تمام شده (ریال)',
                icon: 'mdiCashCheck',
              },
              {
                value: fundData?.profitAndLoss
                  ? fundData?.profitAndLoss
                  : '---',
                label: 'کل سود و زیان تحقق یافته (ریال)',
                icon: 'mdiFinance',
              },
            ]}
          />
        </div>
        <FooterSummary data={fundData} />
      </Row>
    </>
  );
};
Detail.defaultProps = {
  current: null,
  levantId: '',
};
Detail.propTypes = {
  current: PropTypes.object,
  levantId: PropTypes.string,
  fundData: PropTypes.object.isRequired,
  getFundByDsCodeAction: PropTypes.func.isRequired,
};
const mapDispatch = {
  getFundByDsCodeAction,
};
const mapStateToProps = state => ({
  leadInfo: state?.lead?.data,
  fundData: state.portfolio?.selectedFund,
  loading: state.portfolio?.selectedFundLoading,
});

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(Detail));
