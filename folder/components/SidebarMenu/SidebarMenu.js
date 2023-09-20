import React, { useEffect, useState } from 'react';
import { Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SidebarMenu.scss';
import { getAclMenuListAction } from '../../store/acl/acl.actions';
import history from '../../history';
import Link from '../Link';

const SidebarMenu = props => {
  const { menus } = props;
  const [currentPath, setCurrentPath] = useState(null);

  useEffect(() => {
    if (!menus?.length) props.getAclMenuListAction();
    setCurrentPath(history.location.pathname);
  }, []);

  const setCurrentLocation = link => {
    setCurrentPath(link);
  };

  return (
    <Menu
      className={s.sidebarMenu}
      theme="dark"
      selectedKeys={[currentPath]}
      mode="inline"
    >
      {menus
        ?.filter(menu => menu.iconClassName)
        .map(menu => (
          <Menu.Item
            key={menu.route}
            onClick={() => setCurrentLocation(menu.route)}
          >
            <Link to={menu?.route}>
              <Icon type={menu.iconClassName} />
              <span>{menu.title}</span>
            </Link>
          </Menu.Item>
        ))}
    </Menu>
  );
};

SidebarMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  getAclMenuListAction: PropTypes.func.isRequired,
};

const mapState = state => ({
  menus: state?.acl?.menus,
});

const mapDispatch = {
  getAclMenuListAction,
};
export default connect(mapState, mapDispatch)(withStyles(s)(SidebarMenu));
