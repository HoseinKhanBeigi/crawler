import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './UserInfoDrawer.scss';
import CPTab from '../../../CP/CPTab';
import CPDrawer from '../../../CP/CPDrawer';
import UserInfoTab from './UserInfoTab';

const UserInfoDrawer = props => {
  const { visibility, onHandleCanelVisibility } = props;
  const [visibile, setVisible] = useState(false);
  const tabIconStyle = {
    verticalAlign: 'middle',
    paddingLeft: '8px',
    fontSize: '16px',
  };
  const handleCanelVisible = () => onHandleCanelVisibility();
  const drawerTab = [
    {
      key: '1',
      tab: (
        <span>
          اطلاعات کاربری
          <Icon type="info-circle" style={tabIconStyle} />
        </span>
      ),
      children: <UserInfoTab />,
    },
  ];

  const handleClose = () => {
    handleCanelVisible();
    setVisible(false);
  };

  useEffect(() => {
    setVisible(visibility);
  }, [visibility]);
  return (
    <>
      <CPDrawer
        style={{ marginTop: '62px' }}
        placement="left"
        visible={visibile}
        onClose={handleClose}
        closable
        mask
        inDrawer
        maskClosable
      >
        <CPTab tabPane={drawerTab} position="top" defaultKey="1" />
      </CPDrawer>
    </>
  );
};

UserInfoDrawer.propTypes = {
  visibility: PropTypes.bool,
  onHandleCanelVisibility: PropTypes.func,
};
UserInfoDrawer.defaultProps = {
  visibility: false,
  onHandleCanelVisibility: () => {},
};
export default withStyles(s)(UserInfoDrawer);
