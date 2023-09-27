import React from 'react';
import { Button, Icon, Result } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from './Opportunities.scss';
import OpportunitiesCol from '../../../src/components/OpportunitiesCol';
import CPLoading from '../../components/CP/CPLoading';
import { getOpportunitiesAction } from '../../store/opportunities/opportunities.actions';
import withModal from '../../components/HOC/withModal';
import opportunityService from '../../service/opportunityService';
import OpportunitiesToolbar from './components/OpportunitiesToolbar';

class Opportunities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  scroll = side => () => {
    const container = document.getElementById('container');

    container.scrollTo({
      left:
        side === 'left'
          ? container.scrollLeft - 1000
          : container.scrollLeft + 1000,
      behavior: 'smooth',
    });
  };

  downloadExcel = async () => {
    const { selectedProduct } = this.props;
    await opportunityService.downloadOpportunityExcelReport(selectedProduct);
  };

  tools = [
    {
      tooltip: 'بارگزاری مجدد',
      icon: 'reload',
      action: this.props.getOpportunitiesAction,
      disabled: false,
      loading: this.props.loading,
    },
    {
      tooltip: 'خروجی اکسل',
      icon: 'file-excel',
      action: this.downloadExcel,
    },
  ];

  render() {
    const { data, helpers, loading } = this.props;
    if (!data) {
      return (
        <>
          <OpportunitiesToolbar />
          <Result
            status="500"
            title="خطا!"
            subTitle="خطایی هنگام دریافت اطلاعات فرصت‌ها رخ داده است!"
            extra={
              <Button
                type="primary"
                onClick={this.props.getOpportunitiesAction}
                loading={loading}
              >
                بارگزاری مجدد
              </Button>
            }
          />
        </>
      );
    }

    const { pipelines = [], opportunities: rawOpportunities = [] } = data;

    // add opportunities to pipelines
    const pipeLines = pipelines?.map(elm => ({
      ...elm,
      opportunities: [],
    }));

    // clone opportunities
    const opportunities = [...rawOpportunities];

    // fill opportunities in every pipelines
    opportunities.forEach(item => {
      const { pipelineId } = item;
      const res = pipeLines.find(el => el.ids.includes(pipelineId));
      res.opportunities.push(item);
    });

    return (
      <div className={s.wrapper}>
        <CPLoading
          spinning={loading}
          delay={100}
          wrapperClassName={s.LoadingWrapper}
        >
          <OpportunitiesToolbar />
          {opportunities.length ? (
            <div className={s.opportunitiesContainer} id="container">
              <Icon
                className={s.scroller}
                style={{ left: 30 }}
                type="double-left"
                onClick={this.scroll('left')}
              />
              <Icon
                className={s.scroller}
                style={{ right: 90 }}
                type="double-right"
                onClick={this.scroll('right')}
              />
              {/* For upload sep excel data */}
              <input
                type="file"
                id="sep-upload"
                accept=".xlsx, .xls"
                style={{ display: 'none' }}
              />
              {pipeLines.map((item, index) => (
                <OpportunitiesCol
                  index={index + 1}
                  key={item?.ids.toString()}
                  pipeLineIds={item?.ids}
                  pipeLineTitle={item?.title}
                  data={item?.opportunities}
                  count={item?.count}
                  pipelinesLength={pipeLines.length}
                  showArrowImage={!!pipeLines.length}
                  helpers={helpers}
                  code={item.code}
                />
              ))}
            </div>
          ) : (
            <Result
              status="404"
              title="عجیبه!"
              subTitle="اطلاعاتی جهت نمایش وجود ندارد..."
              extra={
                <Button
                  type="primary"
                  onClick={this.props.getOpportunitiesAction}
                  loading={loading}
                >
                  بارگزاری مجدد
                </Button>
              }
            />
          )}
        </CPLoading>
      </div>
    );
  }
}

Opportunities.propTypes = {
  getOpportunitiesAction: PropTypes.func.isRequired,
  helpers: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  selectedProduct: PropTypes.string,
  loading: PropTypes.bool,
};

Opportunities.defaultProps = {
  selectedProduct: null,
  loading: false,
};

const mapState = state => ({
  data: state.opportunities.data,
  products: state.getProducts.data,
  loading: state.opportunities.loading,
  selectedProduct: state.getProducts.selected,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(Opportunities)));
