import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CPDropdown.scss';
import Link from '../../Link';

const { Item } = Menu;

class CPDropdown extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    menuList: PropTypes.arrayOf(PropTypes.object), // don't use menuList ant overlay together
    overlay: PropTypes.node, // don't use menuList ant overlay together
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'default']),
    trigger: PropTypes.arrayOf(
      PropTypes.oneOf(['click', 'hover', 'contextMenu']),
    ),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    iconType: PropTypes.string,
    placement: PropTypes.oneOf([
      'bottomLeft',
      'bottomCenter',
      'bottomRight',
      'topLeft',
      'topCenter',
      'topRight',
    ]),
  };

  static defaultProps = {
    title: undefined,
    overlay: undefined,
    menuList: [],
    onClick: undefined,
    trigger: ['hover'],
    type: 'default',
    disabled: false,
    placement: 'bottomRight',
    className: null,
    iconType: 'down',
  };

  onClick = e => {
    if (e && e.key) this.props.onClick(e.key);
  };

  renderDropDownContent = menuItem => (
    <div>
      {menuItem.image ? (
        <img alt={menuItem.name} src={menuItem.image} />
      ) : (
        undefined
      )}
      {menuItem.icon ? (
        <Icon className={s.menItemIcon} type={menuItem.icon} />
      ) : (
        undefined
      )}
      {menuItem.name}
    </div>
  );

  render() {
    const {
      disabled,
      placement,
      overlay,
      trigger,
      menuList,
      title,
      type,
      className,
      iconType,
    } = this.props;

    const menuItems = (
      <Menu onClick={this.onClick}>
        {menuList.map(menuItem => {
          if (menuItem.href) {
            return (
              <Item key={menuItem.value}>
                <Link to={menuItem.href}>
                  {this.renderDropDownContent(menuItem)}
                </Link>
              </Item>
            );
          }
          return (
            <Item key={menuItem.value}>
              {this.renderDropDownContent(menuItem)}
            </Item>
          );
        })}
      </Menu>
    );
    return (
      <Dropdown
        overlay={overlay || menuItems}
        disabled={disabled}
        placement={placement}
        trigger={trigger}
        className={className}
      >
        {type === 'button' ? (
          <Button>
            {title} <Icon type={iconType} />
          </Button>
        ) : (
          <span>
            {title} <Icon type={iconType} />
          </span>
        )}
      </Dropdown>
    );
  }
}

export default withStyles(s)(CPDropdown);
