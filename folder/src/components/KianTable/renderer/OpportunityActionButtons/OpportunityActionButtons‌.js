import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Popconfirm, Tooltip } from 'antd';
import { icons } from './icons';

const ButtonGroup = Button.Group;

const OpportunityActionButtons = props => {
  const { actions, opportunity, actionHandler, loadingOnCard } = props;

  const handleAction = action => async () => {
    actionHandler(opportunity, action);
  };

  const shouldConfirm = code =>
    [
      'GENERATE_PRINT_PASSWORD',
      'CONFIRM_BROKERAGE',
      'NEED_SEJAM_CODE',
      'CREATE_DONYA_FUND_USER',
      'GENERATE_TRADING_CODE',
      'OPEN_ONLINE_ACCOUNT_RAYAN',
    ].includes(code);

  const Wrapper = ({ children, action: act }) =>
    shouldConfirm(act.code) ? (
      <Popconfirm
        title={`آیا از ${act.name} اطمینان دارید؟`}
        onConfirm={handleAction(act)}
        okText="بله"
        cancelText="خیر"
      >
        {children}
      </Popconfirm>
    ) : (
      <span>{children}</span>
    );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.object.isRequired,
  };

  return (
    <div className="text-center">
      {actions?.filter(a => a.actionType !== 'SYSTEM').length ? (
        actions.map(a => (
          <Wrapper key={a.id + opportunity.id} action={a}>
            <Tooltip
              placement="right"
              title={`${a.name} برای ${opportunity.firstName} ${opportunity.lastName}`}
            >
              <ButtonGroup>
                <Button
                  size="small"
                  loading={loadingOnCard === opportunity.id}
                  data-cy={a.code}
                  onClick={shouldConfirm(a.code) ? () => {} : handleAction(a)}
                  style={{ width: '100%' }}
                  icon={icons[a.code] || 'check'}
                >
                  {a.name}
                </Button>
              </ButtonGroup>
            </Tooltip>
          </Wrapper>
        ))
      ) : (
        <ButtonGroup>
          <Button
            disabled
            style={{ width: '100%' }}
            icon="stop"
            type="link"
            size="small"
          >
            فاقد عملیات دستی
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

OpportunityActionButtons.propTypes = {
  loadingOnCard: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired,
  opportunity: PropTypes.object.isRequired,
  actions: PropTypes.array.isRequired,
};

const mapState = state => ({
  loadingOnCard: state.opportunities.loadingOnCard,
});

export default connect(mapState)(OpportunityActionButtons);
