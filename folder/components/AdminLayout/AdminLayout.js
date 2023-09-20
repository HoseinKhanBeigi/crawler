import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import Farsi from 'antd/lib/locale-provider/fa_IR';
import { ConfigProvider, Layout, Row } from 'antd';
import LoadingBar from 'react-redux-loading-bar';
import normalizeCss from 'normalize.css';
import s from './AdminLayout.scss';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import config from '../../webConfig';
import HeaderSearchBar from '../HeaderSearchBar';
import ModalRoot from '../ModalRoot/ModalRoot';
import Hotkeys from '../Hotkeys';
import IncomingCallSocketManager from '../IncmingCallSocketManager';
import UserInfoDrawer from './components/UserInfoDrawer';
import StickyWindowRoot from '../StickyWindowRoot/StickyWindowRoot';
import Sidebar from './components/Sidebar';

const { Header, Content } = Layout;

const AdminLayout = props => {
  const { children, stickyWindow } = props;
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const handleDrawerVisibility = () => setDrawerVisibility(true);
  const handleCancelVisibility = () => setDrawerVisibility(false);

  return (
    <ConfigProvider locale={Farsi}>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <LoadingBar
          style={{
            backgroundColor: 'rgb(84,192,86)',
            height: '4px',
            zIndex: 1001,
            position: 'fixed',
          }}
        />
        <Sidebar />
        <Layout>
          <Header className={cs(s.header)}>
            <Row type="flex" justify="end">
              {config.showHeaderFullSearch && (
                <div className={s.headerSearchbar}>
                  <HeaderSearchBar />
                </div>
              )}
              <div className={s.navigation}>
                <Navigation onShowDrawer={handleDrawerVisibility} />
              </div>
            </Row>
          </Header>
          <Content className={s.content}>
            {children}
            <UserInfoDrawer
              visibility={drawerVisibility}
              onHandleCanelVisibility={handleCancelVisibility}
            />
          </Content>
          <Footer />
        </Layout>
      </Layout>
      <div
        className={stickyWindow.length > 0 ? s.animate_show : s.animate_hidden}
      >
        <StickyWindowRoot />
      </div>
      <IncomingCallSocketManager />
      <ModalRoot />
      <Hotkeys />
    </ConfigProvider>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
  stickyWindow: PropTypes.array,
};

AdminLayout.defaultProps = {
  children: '',
  stickyWindow: [],
};
const mapState = state => ({
  stickyWindow: state.stickyWindow,
});
export default connect(
  mapState,
  null,
)(withStyles(normalizeCss, s)(AdminLayout));
