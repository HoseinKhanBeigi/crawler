import React from 'react';
import { Col, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './GeneralInfoCards.scss';
import DashboardCardNumber from '../DashboardCardNumber';

const dashboardCardsDetails = {
  leads: {
    icon: 'dollar-circle',
    color: '#2dcb47',
  },
  openOpportunity: {
    icon: 'folder-open',
    color: '#695dd8',
  },
  kycUser: {
    icon: 'check-circle',
    color: '#00b4ad',
  },
  pendingOpportunity: {
    icon: 'hourglass',
    color: '#7e93bb',
  },
  activeUser: {
    icon: 'idcard',
    color: '#1c92ff',
  },
  total_amount: {
    icon: 'dollar-circle',
    color: '#2dcb47',
  },
  total_sale_channels: {
    icon: 'bank',
    color: '#ff5252',
  },
  total_products: {
    icon: 'appstore',
    color: '#9452ff',
  },
};

function GeneralInfoCards({ cards, skeletonNumbers, className }) {
  return (
    <Row gutter={16} type="flex">
      {cards
        ? cards.map(item =>
            item.name in dashboardCardsDetails ? (
              <Col key={item.name} xs={24} sm={12} lg={8} xl={6}>
                <DashboardCardNumber
                  title={item.faName}
                  className={className}
                  count={item.count}
                  icon={
                    <Icon
                      theme="filled"
                      style={{
                        color: dashboardCardsDetails[item.name].color,
                      }}
                      type={dashboardCardsDetails[item.name].icon}
                    />
                  }
                />
              </Col>
            ) : null,
          )
        : [...new Array(skeletonNumbers)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} xs={24} sm={12} lg={8} xl={6}>
              <DashboardCardNumber className={className} skeleton />
            </Col>
          ))}
    </Row>
  );
}

GeneralInfoCards.propTypes = {
  cards: PropTypes.array.isRequired,
  skeletonNumbers: PropTypes.number.isRequired,
  className: PropTypes.string,
};

GeneralInfoCards.defaultProps = {
  className: null,
};

export default withStyles(s)(GeneralInfoCards);
