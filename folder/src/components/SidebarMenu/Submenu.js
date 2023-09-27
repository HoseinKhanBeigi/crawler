import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SidebarMenu.scss';
import Link from '../Link';
import messages from '../../components/AdminLayout/components/Sidebar/messages';

const Submenu = props => {
  const { menu, onSelectSubMenu, selectedRoute } = props;
  const [currentPath, setCurrentPath] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initCurrentSubMenuPath = () => {
      const subRouteExisit = menu?.submenu?.filter(
        item => item.link === selectedRoute,
      );
      setOpen(!!subRouteExisit?.length);
      setCurrentPath(selectedRoute);
    };

    initCurrentSubMenuPath();
  }, [selectedRoute]);

  const setCurrentLoaction = link => {
    setCurrentPath(link);
    onSelectSubMenu(link);
  };

  const toggleDropDown = () => setOpen(!open);

  return (
    <>
      {menu.active && (
        <div className={s.sidebar_menu}>
          <div
            className="sidebar_dropDown"
            onClick={toggleDropDown}
            aria-hidden="true"
          >
            <Icon type={menu?.icon} className={s.menu_item_icon} />
            <span className={s.menu_item_text}>
              <FormattedMessage {...messages[menu?.name]} />
              <Icon
                type="caret-down"
                className={s.sidebar_dropDown_arrow}
                style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </span>
          </div>
          <div
            className={s.sidebar_submenu}
            style={{
              display: open ? 'block' : 'none',
              opacity: open ? '1' : '0',
            }}
          >
            <ul>
              {menu?.submenu.map(
                item =>
                  item.active && (
                    <li key={item?.link}>
                      <Link
                        to={item?.link}
                        onClick={() => setCurrentLoaction(item?.link)}
                      >
                        {item?.icon && (
                          <Icon
                            type={item.icon}
                            className={s.menu_item_icon}
                            style={{
                              color:
                                currentPath === item.link
                                  ? '#1c92ff'
                                  : '#9ca8b4',
                            }}
                          />
                        )}
                        <span
                          className={s.menu_item_text}
                          style={{
                            color:
                              currentPath === item?.link
                                ? '#1c92ff'
                                : '#9ca8b4',
                          }}
                        >
                          <FormattedMessage {...messages[item?.name]} />
                        </span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

Submenu.propTypes = {
  menu: PropTypes.object,
  selectedRoute: PropTypes.string,
  intl: PropTypes.object.isRequired,
  onSelectSubMenu: PropTypes.func,
};
Submenu.defaultProps = {
  menu: {},
  onSelectSubMenu: () => {},
  selectedRoute: '',
};
export default withStyles(s)(injectIntl(Submenu));
