import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HandleAclPermission from '../../../../../HandleAclPermission';
import { isAclSkipped } from '../../../../../../utils/aclActions';
import s from './ActivityButton.scss';

const ActivityButton = props => {
  const { items, authorities } = props;
  const [finalItems, setFinalItems] = useState([]);

  const checkAuthorization = () => {
    const final = items.filter(
      item =>
        authorities?.find(au => au.code === item.authority) || !item.authority,
    );
    if (!isAclSkipped(authorities)) setFinalItems(final);
  };

  useEffect(checkAuthorization, []);

  const renderActivityButtonOverlay = () => (
    <Menu>
      {finalItems.slice(1).map(item => (
        <Menu.Item
          key={item.label}
          onClick={item.action}
          disabled={item.disabled}
        >
          <Icon type={item.icon} />
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  const renderActivityButton = () => {
    const fa = finalItems[0]; // fa? firstActivity :D
    return (
      fa &&
      (finalItems?.length > 1 ? (
        <Dropdown.Button
          placement="bottomCenter"
          type="primary"
          overlay={renderActivityButtonOverlay}
          onClick={fa.action}
          style={{ marginLeft: '8px' }}
          disabled={fa.disabled}
        >
          <Icon type={fa.icon} />
          {fa.label}
        </Dropdown.Button>
      ) : (
        <HandleAclPermission wich={fa?.authority}>
          <Button
            style={{ marginLeft: '8px' }}
            type="primary"
            icon={fa.icon}
            onClick={fa.action}
            disabled={fa.disabled}
            loading={fa.loading}
          >
            {fa.label}
          </Button>
        </HandleAclPermission>
      ))
    );
  };
  return <div className={s.activity_btn}>{renderActivityButton()}</div>;
};
ActivityButton.propTypes = {
  items: PropTypes.array,
  authorities: PropTypes.array.isRequired,
};
ActivityButton.defaultProps = {
  items: [],
};

const mapStateToProps = state => ({
  authorities: state?.acl?.authorities,
});

export default connect(mapStateToProps)(withStyles(s)(ActivityButton));
