import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContextMenu.scss';
import { currentContextMenuRow } from '../../helpers/contextMenu';
import { postUISettingsAction } from '../../../../store/settings/settings.actions';
import {
  createSettingsWithTablesSize,
  createSettingsWithTablesTheme,
} from '../../../../utils/uiSettings';
import { isAclSkipped } from '../../../../utils/aclActions';

const { Item, Divider, SubMenu } = Menu;

const ContextMenu = props => {
  const {
    actions: { setSize, refreshTable, setThemeColor },
    contextMenuItems,
    // currentSize,
    themeColor,
    uiSettings,
    authorities,
  } = props;

  const currentItem = currentContextMenuRow();
  const [menuTheme, setMenuTheme] = useState(themeColor);
  const [finalItems, setFinalItems] = useState(contextMenuItems);

  const changeSize = size => () => {
    setSize(size);
    props.postUISettingsAction(createSettingsWithTablesSize(uiSettings, size));
  };

  const changeTheme = theme => () => {
    setMenuTheme(theme);
    setThemeColor(theme);
    props.postUISettingsAction(
      createSettingsWithTablesTheme(uiSettings, theme),
    );
  };

  useEffect(() => {
    const AuthorizationItem = () => {
      const final = [];
      contextMenuItems?.forEach(item => {
        const couldShow = authorities?.filter(
          au =>
            au?.code === item?.authority ||
            typeof item.authority === 'undefined',
        );
        if (couldShow?.length && !item.isNotAccess?.(currentItem, couldShow))
          final.push(item);
      });
      if (!isAclSkipped(authorities)) setFinalItems(final);
    };
    AuthorizationItem();
  }, [currentItem?.aclLevantId]);
  return (
    <Menu theme={menuTheme} mode="vertical-right" className={s.contextMenu}>
      {finalItems.length &&
        finalItems.map(item => (
          <Item
            disabled={item.disabled}
            key={item.label}
            onClick={() => item.action(currentItem)}
          >
            {typeof item.label === 'function'
              ? item.label(currentItem)
              : item.label}
          </Item>
        ))}

      {finalItems.length && <Divider />}

      <SubMenu
        title={
          <span>
            {/* <Icon type="bg-colors" /> */}
            قالب
          </span>
        }
      >
        <Item
          className="context-sub-menu"
          onClick={changeTheme('dark')}
          key="setDarkTheme"
        >
          {/* {themeColor === 'dark' && <Icon type="check" />} */}
          تیره <small>(آزمایشی)</small>
        </Item>
        <Item
          className="context-sub-menu"
          onClick={changeTheme('light')}
          key="setLightTheme"
        >
          {/* {themeColor === 'light' && <Icon type="check" />} */}
          روشن
        </Item>
      </SubMenu>
      <SubMenu
        title={
          <span>
            {/* <Icon type="font-size" /> */}
            اندازه
          </span>
        }
      >
        <Item
          className="context-sub-menu"
          onClick={changeSize('default')}
          key="setDefaultSize"
        >
          {/* {currentSize === 'default' && <Icon type="check" />} */}
          بزرگ
        </Item>
        <Item
          className="context-sub-menu"
          onClick={changeSize('middle')}
          key="setMiddleSize"
        >
          {/* {currentSize === 'middle' && <Icon type="check" />} */}
          متوسط
        </Item>
        <Item
          className="context-sub-menu"
          onClick={changeSize('small')}
          key="setSmallSize"
        >
          {/* {currentSize === 'small' && <Icon type="check" />} */}
          کوچک
        </Item>
      </SubMenu>
      <Divider />
      <Item onClick={refreshTable} key="reloadTable">
        {/* <Icon type="reload" /> */}
        <span>بارگزاری مجدد</span>
      </Item>
    </Menu>
  );
};

ContextMenu.propTypes = {
  contextMenuItems: PropTypes.array.isRequired,
  postUISettingsAction: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  uiSettings: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  currentSize: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  authorities: PropTypes.array.isRequired,
};

const mapState = ({ settings, acl }) => ({
  uiSettings: settings.settings,
  authorities: acl?.authorities,
});

const mapDispatch = {
  postUISettingsAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(ContextMenu));
