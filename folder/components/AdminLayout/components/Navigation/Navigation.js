import React, { useEffect, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dropdown, Icon, Menu, Row, Skeleton, Button, Badge } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from './Navigation.scss';
import { getUserEmployeeProfileAction } from '../../../../store/user/user.actions';
import { postNeshanLogoutAction } from '../../../../store/neshanAuth/neshan.actions';
import Link from '../../../Link';
import withModal from '../../../HOC/withModal';
import { MODAL_FOR_CHANGE_UNIT_ACCESS } from '../../../ModalRoot/repository';
import HandleAclPermission from '../../../HandleAclPermission';
import { Actions, isAclSkipped } from '../../../../utils/aclActions';
import { resolveVariable, BASE_VARIABLE_KEYS } from '../../../../serviceConfig';
import { useSocket } from '../../../socket/useSocket';
import NotificationBox from '../../../Notification/NotificationBox';

const { Item } = Menu;

const Navigation = props => {
  const {
    showModalAction,
    shortcuts,
    onShowDrawer,
    currentUserInfoEmployee,
    authorities,
    token,
  } = props;
  const menuItems = Object.entries(shortcuts).map(
    ([type, { icon, label, shortcut, authority }]) => ({
      type,
      icon,
      label,
      shortcut,
      authority,
    }),
  );
  const [loading, setLoading] = useState(false);
  const [finalShortcuts, setFinalShortcuts] = useState(menuItems);
  const [messageNumber, setMessageNumber] = useState(null);
  const [notificationBoxVisible, setNotificationBoxVisible] = useState(false);

  const authorization = `Bearer ${token}`;
  const {
    connect: socketConnect,
    connected,
    disconnect,
    subscribe,
    unsubscribe,
    send,
  } = useSocket(
    `${resolveVariable(
      BASE_VARIABLE_KEYS.HOST,
    )}/notification/secured/room?${authorization}`,
  );

  const handleQuickAccess = ({ key: type }) => {
    showModalAction({ type });
  };

  const openChangeUnitAccessModal = () => {
    showModalAction({
      type: MODAL_FOR_CHANGE_UNIT_ACCESS,
    });
  };

  const handleLogOut = () => {
    props.postNeshanLogoutAction();
  };

  const menu = (
    <Menu onClick={handleQuickAccess} className={s.quickAccess}>
      {finalShortcuts.map(item => (
        <Item key={item.type}>
          <Icon type={item.icon} />
          <span>{item.label}</span>
          <small>[{item?.shortcut?.toUpperCase()}]</small>
        </Item>
      ))}
    </Menu>
  );

  const userInfoMenu = (
    <Menu onClick={() => {}} className={s.menu_container}>
      <div className={s.menu_container_item_1}>
        <span className={s.menu_container__item_oprator}>
          {currentUserInfoEmployee?.role?.name || '---'}
        </span>
        <span className={s.menu_container__item_fullName}>
          {currentUserInfoEmployee?.fullName || '---'}
        </span>
        <span className={s.menu_container__item_branchName}>
          سازمان {currentUserInfoEmployee?.unit?.name || '---'}
        </span>
      </div>
      <div className={s.menu_container_item_2}>
        <Button
          type="link"
          onClick={onShowDrawer}
          className={s.menu_container__item_profileLink}
        >
          مشاهده پروفایل
        </Button>
        <Button
          type="link"
          className={s.menu_container__item_mangeBranchLink}
          onClick={openChangeUnitAccessModal}
        >
          مدیریت سازمانی من
        </Button>
        <Button
          type="link"
          className={s.menu_container__item_logout}
          onClick={handleLogOut}
        >
          خروج
        </Button>
      </div>
    </Menu>
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await props.getUserEmployeeProfileAction();
      setLoading(false);
    })();

    const initialShortcutMenu = () => {
      const list = [];

      function handleAuth(code) {
        const couldShow = authorities?.filter(item => item?.code === code);
        return !!couldShow?.length;
      }

      finalShortcuts?.map(item =>
        handleAuth(item?.authority) ? list.push(item) : item,
      );
      if (!isAclSkipped(authorities)) setFinalShortcuts(list);
    };
    initialShortcutMenu();
  }, []);

  useEffect(() => {
    const subscribeId = subscribe(
      '/user/queue/count',
      res => setMessageNumber(JSON.parse(res.body)),
      { Authorization: authorization },
    );
    return () => {
      unsubscribe(subscribeId, { Authorization: authorization });
    };
  }, []);

  useEffect(() => {
    if (connected) {
      send('/app/secured/room/count', {});
      send('/app/secured/room/unseen-messages', {
        createdDate: Date.now(),
        pageSize: 10,
      });
    }
  }, [connected]);

  useEffect(() => {
    if (!connected) {
      socketConnect({ Authorization: authorization });
    }
  }, []);

  useLayoutEffect(() => {
    socketConnect({ Authorization: authorization });
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className={s.root}>
      <div className={s.tools}>
        <Row gutter={24} className={s.tools_container}>
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            className={s.tools__item}
          >
            <Link to="/">
              <Icon type="plus" className={s.icon} />
            </Link>
          </Dropdown>
          <Link to="/help" className={s.tools__item}>
            <Icon type="question" className={s.icon} />
          </Link>
          <HandleAclPermission wich={Actions.activityAllRead}>
            <Link to="/activities" className={s.tools__item}>
              <Icon type="schedule" className={s.icon} />
            </Link>
          </HandleAclPermission>
          <HandleAclPermission wich={Actions.voipCallCreate}>
            <Link to="/phone-calls" className={s.tools__item}>
              <Icon type="phone" className={s.icon} />
            </Link>
          </HandleAclPermission>
          <Dropdown
            onVisibleChange={status => setNotificationBoxVisible(status)}
            overlay={
              <>
                {notificationBoxVisible && (
                  <NotificationBox
                    token={token}
                    messageNumber={messageNumber}
                  />
                )}
              </>
            }
            placement="bottomRight"
          >
            <span style={{ marginRight: '0' }}>
              <Link to="/">
                <Badge
                  count={messageNumber}
                  overflowCount={10}
                  style={{
                    padding: '0',
                    marginRight: '5px',
                    textAlighn: 'center',
                    height: '17px',
                  }}
                >
                  <Icon type="notification" className={s.notif} />
                </Badge>
              </Link>
            </span>
          </Dropdown>
        </Row>
        <Row gutter={24}>
          <div className={s.userInfo}>
            <Skeleton
              className="userInfo_skeleton"
              loading={loading}
              active
              avatar
              paragraph={{ rows: 2 }}
              title={false}
            >
              <Dropdown overlay={userInfoMenu}>
                <div className={s.userInfoMenu__container}>
                  {currentUserInfoEmployee?.profileImageBase64 && (
                    <img
                      className={s.userAvatar}
                      src={currentUserInfoEmployee?.profileImageBase64}
                      alt={currentUserInfoEmployee?.userId}
                    />
                  )}
                  {!currentUserInfoEmployee?.profileImageBase64 && (
                    <Icon type="user" className={s.userInfo__avatarIcon} />
                  )}
                  <div className={s.userInfo_name}>
                    <span className={s.userInfo_name_text}>
                      {currentUserInfoEmployee?.fullName || '---'}
                    </span>
                  </div>
                  <Icon type="down" className={s.userInfo__iconDown} />
                </div>
              </Dropdown>
            </Skeleton>
          </div>
        </Row>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  shortcuts: PropTypes.object.isRequired,
  onShowDrawer: PropTypes.func,
  currentUserInfoEmployee: PropTypes.object,
  postNeshanLogoutAction: PropTypes.func.isRequired,
  getUserEmployeeProfileAction: PropTypes.func.isRequired,
  authorities: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};
Navigation.defaultProps = {
  onShowDrawer: () => {},
  currentUserInfoEmployee: null,
};

const mapState = ({ settings, user, acl, neshanAuth }) => ({
  shortcuts: settings.settings.globalSettings.shortcuts,
  currentUserInfoEmployee: user?.currentUserInfoEmployee,
  authorities: acl?.authorities,
  // eslint-disable-next-line camelcase
  token: neshanAuth?.data?.access_token,
});
const mapDispatch = {
  postNeshanLogoutAction,
  getUserEmployeeProfileAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(Navigation)));
