import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import Link from '../../components/Link';
import HandleAclPermission from '../../components/HandleAclPermission';
import { Actions } from '../../utils/aclActions';

const Settings = () => {
  const cards = [
    {
      title: 'مدیریت فرم‌',
      icon: 'form',
      link: '/settings/forms',
      authority: Actions.formManagement,
      active: true,
    },
    {
      title: 'مدیریت قالب دستی',
      icon: 'mail',
      authority: Actions.templateManualLoad,
      link: '/settings/manual-message-templates',
      active: true,
    },
    {
      title: 'مدیریت قالب سیستمی',
      authority: Actions.templateSystemicLoad,
      icon: 'mail',
      link: '/settings/systemic-message-templates',
      active: true,
    },
    {
      title: 'زمانبندی احراز هویت',
      icon: 'clock-circle',
      authority: Actions.kycTimeManagement,
      link: '/kyc-time-management',
      active: true,
    },
    {
      title: 'مدیریت برچسب ها',
      icon: 'tag',
      authority: Actions.tagManagement,
      link: '/settings/tags',
      active: true,
    },
    {
      title: 'اطلاع رسانی',
      icon: 'notification',
      authority: Actions.organizationSectionAllRead,
      link: '/settings/notification-center',
      active: true,
    },
    {
      title: 'محصولات فروش',
      icon: 'appstore',
      link: '/settings/sale-products',
      authority: Actions.saleProudctReadAll,
      active: true,
    },
    {
      title: 'مدیریت پیامک های سیستمی',
      icon: 'mail',
      authority: Actions.productSettingsLoad,
      link: '/settings/product-setting',
      active: true,
    },
    {
      title: 'سطوح احراز هویت',
      icon: 'safety-certificate',
      authority: Actions.kycLevelReadAll,
      link: '/settings/kyc-level',
      active: true,
    },
  ];

  return (
    <div>
      <Row gutter={[8, 16]} type="flex">
        {cards.map(
          card =>
            card?.active && (
              <HandleAclPermission key={card.icon} wich={card?.authority}>
                <Col key={card.title}>
                  <Link to={card.link}>
                    <Card>
                      <span>{card.title}</span>
                      <Icon
                        style={{
                          float: 'left',
                          fontSize: 20,
                          color: 'rgb(33, 150, 243)',
                          paddingRight: 20,
                        }}
                        type={card.icon}
                      />
                    </Card>
                  </Link>
                </Col>
              </HandleAclPermission>
            ),
        )}
      </Row>
    </div>
  );
};

export default Settings;
