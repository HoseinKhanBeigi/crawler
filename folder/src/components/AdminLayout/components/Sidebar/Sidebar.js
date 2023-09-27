import React, { useMemo, useState } from 'react';
import cs from 'classnames';
import { Layout } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.scss';
import SidebarMenu from '../../../SidebarMenu';

const sidebarCollapsedWidth = 60;
const sidebarExpandedWidth = 180;

// eslint-disable-next-line react/prop-types
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const width = collapsed ? sidebarCollapsedWidth : sidebarExpandedWidth;
  const Logo = useMemo(
    () => (
      <div className={s.logoContainer}>
        <span className={s.logo} />
      </div>
    ),
    [],
  );
  return (
    <Layout.Sider
      collapsedWidth={sidebarCollapsedWidth}
      width={sidebarExpandedWidth}
      collapsible
      onCollapse={setCollapsed}
      collapsed={collapsed}
      className={cs(s.sidebar, collapsed && s.collapsed)}
    >
      <div style={{ width: `${width}px` }} className={s.sidebarWrapper}>
        {Logo}
        <SidebarMenu />
      </div>
      ;
    </Layout.Sider>
  );
};

export default withStyles(s)(Sidebar);
