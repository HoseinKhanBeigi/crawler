/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse, Steps } from 'antd';
import Icon from '@mdi/react';
import {
  mdiCheckCircleOutline,
  mdiCheckboxBlankCircle,
  mdiCheckboxBlankCircleOutline,
} from '@mdi/js';
import { getOpportunityAction } from '../../store/opportunity/opportunity.actions';
import { selectProductAction } from '../../store/getProducts/getProducts.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from './LeadOpportunitiesListProfileTab.scss';
import CPTooltip from '../CP/CPTooltip';
import CPEmpty from '../CP/CPEmpty';
import history from '../../history';

const { Panel } = Collapse;
const { Step } = Steps;

const statusType = {
  WON: 'فرصت موفق',
  ABANDONED: 'فرصت رها شده',
  LOST: 'فرصت از دست رفته',
  OPEN: 'در حال انجام',
  SUBMITTED: 'در حال انجام',
};

const LeadOpportunitiesListProfileTab = props => {
  const { data, levantId } = props;
  const renderCollapseHeadr = item => (
    <div className={s.header}>
      <div className={s.header__title}>{item?.productTitle}</div>
      <div className={s.header__status}>
        {statusType[item?.opportunityStatus] || '---'}
      </div>
    </div>
  );

  function generateList(item) {
    const doneList = [];
    const incomeList = [];
    const { pipelines, currentPipelineCode } = item;
    const currentIndex = pipelines?.findIndex((p, index) =>
      p.code === currentPipelineCode ? index : null,
    );
    pipelines?.map((p, index) => {
      if (index < currentIndex) {
        doneList.push(p?.code);
      } else if (index > currentIndex) {
        incomeList.push(p?.code);
      }
    });
    return {
      doneList,
      incomeList,
      currentPipelineCode,
    };
  }

  const selectProduct = async (url, code) => {
    await props.selectProductAction(code);
    history.push(url);
  };

  const renderPipline = item => {
    const status = item?.opportunityStatus;
    const lastItem = item?.pipelines[item?.pipelines?.length - 1];
    const current = item?.pipelines?.lastIndexOf(lastItem);
    let currentElement = null;
    if (status !== 'WON') {
      const currentStatus = item?.currentPipelineCode;
      const codes = item?.pipelines?.map(i => i?.code);
      codes?.forEach(element => {
        if (element === currentStatus) {
          currentElement = codes?.lastIndexOf(element);
          return currentElement;
        }
        return false;
      });
    }

    function renderStatusIcon(code) {
      const piplineList = generateList(item);
      const candidate = piplineList?.doneList?.includes(code) ? (
        <Icon
          size="18px"
          path={mdiCheckCircleOutline}
          className={s.step_icon}
        />
      ) : piplineList?.incomeList?.includes(code) ? (
        <Icon
          size="18px"
          style={{ color: '#d0d6dc' }}
          path={mdiCheckboxBlankCircleOutline}
          className={s.step_icon}
        />
      ) : (
        <Icon
          size="18px"
          path={mdiCheckboxBlankCircle}
          className={s.step_icon}
        />
      );
      return candidate;
    }

    return (
      <Steps
        key={item?.productId}
        size="small"
        direction="vertical"
        labelPlacemen="vertical"
        status={status === 'WON' ? 'finish' : 'process'}
        current={status === 'WON' ? current : currentElement}
      >
        {item?.pipelines.map(pipeline => (
          <Step
            key={pipeline?.code}
            title={
              pipeline?.code === item?.currentPipelineCode ? (
                <CPTooltip title="رفتن به نمای جدولی این ستون">
                  <span
                    className={s.current_pipline}
                    onClick={() =>
                      selectProduct(
                        `/opportunities/${pipeline?.ids[0]}/${pipeline?.title}?levantId=${levantId}`,
                        item.productCode,
                      )
                    }
                  >
                    {pipeline?.title || '---'}
                  </span>
                </CPTooltip>
              ) : (
                pipeline?.title || '---'
              )
            }
            icon={renderStatusIcon(pipeline?.code)}
          />
        ))}
      </Steps>
    );
  };

  return (
    <>
      <div className={s.container}>
        {data?.content?.length ? (
          <Collapse defaultActiveKey={[5]}>
            {data?.content?.map(item => (
              <Panel
                className={s.container__panel}
                header={renderCollapseHeadr(item)}
                key={item?.productId}
              >
                {renderPipline(item)}
              </Panel>
            ))}
          </Collapse>
        ) : (
          <CPEmpty description="لیست فرصت‌ها خالیست" />
        )}
      </div>
    </>
  );
};
LeadOpportunitiesListProfileTab.propTypes = {
  data: PropTypes.object,
  levantId: PropTypes.string,
  selectProductAction: PropTypes.func.isRequired,
};

LeadOpportunitiesListProfileTab.defaultProps = {
  data: {},
  levantId: '',
};

const mapStateToProps = state => ({
  data: state.opportunity.data,
  levantId: state.lead?.data?.levantId,
});

const mapDispatch = {
  getOpportunityAction,
  selectProductAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(LeadOpportunitiesListProfileTab));
