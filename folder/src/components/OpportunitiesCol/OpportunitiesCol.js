import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Badge, Tooltip, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import cs from 'classnames';
import s from './OpportunitiesCol.scss';
import OpportunitiesCard from '../../../src/components/OpportunitiesCard';
import Link from '../Link';
import { extraActions } from './extraActions';
import { getOpportunitiesAction } from '../../store/opportunities/opportunities.actions';

const OpportunitiesCol = props => {
  const {
    data,
    code,
    count,
    index,
    helpers,
    pipeLineIds,
    pipeLineTitle,
    handleVisible,
    showArrowImage,
    pipelinesLength,
    visibleEmptyPipelines,
    getOpportunitiesAction: refresh,
  } = props;
  const readMore = pipeLineIds.join('-');

  const renderExtraActions = actions => {
    if (actions) {
      return (
        <ul className={s.extraActions}>
          {actions.map(action => (
            <li key={action.icon}>
              <Tooltip title={action.tooltip}>
                <Button
                  loading={action.loading}
                  type={action.type || 'link'}
                  shape="circle"
                  icon={action.icon}
                  onClick={() => action.action(refresh)}
                  disabled={action.disabled}
                />
              </Tooltip>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    // eslint-disable-next-line no-nested-ternary
    <div>
      <div
        className={cs(
          s.colContainer,
          // eslint-disable-next-line no-nested-ternary
          visibleEmptyPipelines ? null : count ? null : s.hiddenPipeline,
        )}
      >
        <div className={s.pipeLine}>
          <div className={s.pipeLineContent}>
            <Tooltip title={`مرحله ${index} از ${pipelinesLength}`}>
              <span className={s.pipelineLevel}>{index}</span>
            </Tooltip>
            {count ? (
              <>
                <Tooltip title={`نمای جدولی ${pipeLineTitle}`}>
                  <Link to={`/opportunities/${readMore}/${pipeLineTitle}`}>
                    <Icon type="link" />
                    {pipeLineTitle}
                  </Link>
                </Tooltip>
                <div
                  style={{
                    marginRight: '10px',
                    display: 'inline-block',
                    lineHeight: '1',
                  }}
                >
                  <Badge count={count} overflowCount={20000} />
                </div>
                {renderExtraActions(extraActions[code])}
              </>
            ) : (
              <span className={s.disabledContent}>{pipeLineTitle}</span>
            )}
          </div>
          {showArrowImage && (
            <img
              src="/images/pipeline_header_carrot.png"
              className={s.pipeLineDivider}
              alt=""
            />
          )}
        </div>
        {data && data.length > 0
          ? data.map(opportunity => (
              <OpportunitiesCard
                key={opportunity.id}
                data={opportunity}
                handleVisible={handleVisible}
                helpers={helpers}
              />
            ))
          : undefined}
        {count > 10 && (
          <Link
            className={s.showMoreBtn}
            to={`/opportunities/${readMore}/${pipeLineTitle}`}
          >
            مشاهده بیشتر
          </Link>
        )}
      </div>
    </div>
  );
};

OpportunitiesCol.propTypes = {
  getOpportunitiesAction: PropTypes.func.isRequired,
  visibleEmptyPipelines: PropTypes.bool.isRequired,
  pipeLineTitle: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  showArrowImage: PropTypes.bool.isRequired,
  handleVisible: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired,
  pipeLineIds: PropTypes.array,
  count: PropTypes.number,
  index: PropTypes.number.isRequired,
  pipelinesLength: PropTypes.number.isRequired,
};

OpportunitiesCol.defaultProps = {
  pipeLineIds: null,
  data: null,
  count: null,
  handleVisible: () => {},
};

const mapState = state => ({
  visibleEmptyPipelines: state.opportunities.visibleEmptyPipelines,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(OpportunitiesCol));
