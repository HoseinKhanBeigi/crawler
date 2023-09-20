import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Drawer } from 'antd';
import s from './CPDrawer.scss';

class CPDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    closable: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    headerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    visible: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    zIndex: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onClose: PropTypes.func,
    getContainer: PropTypes.string,
    afterVisibleChange: PropTypes.func,
  };

  static defaultProps = {
    children: '',
    closable: '',
    destroyOnClose: false,
    mask: false,
    maskClosable: false,
    style: {},
    title: '',
    visible: false,
    width: '350',
    height: '100vh',
    zIndex: 999,
    className: '',
    headerStyle: {},
    bodyStyle: {},
    placement: '',
    onClose: '',
    getContainer: '',
    afterVisibleChange: undefined,
  };

  componentDidMount = () => {
    const addClass = document.getElementsByClassName('ant-drawer');
    if (addClass.length > 0) {
      for (let i = 0; i < addClass.length; i += 1) {
        addClass[i].parentNode.classList.add('drawer-parent');
      }
    }
  };

  render() {
    const {
      children,
      closable,
      destroyOnClose,
      mask,
      maskClosable,
      style,
      title,
      visible,
      width,
      height,
      className,
      zIndex,
      placement,
      onClose,
      getContainer,
      headerStyle,
      bodyStyle,
      afterVisibleChange,
    } = this.props;
    if (process.env.BROWSER) {
      return (
        <Drawer
          closable={closable}
          destroyOnClose={destroyOnClose}
          mask={mask}
          maskClosable={maskClosable}
          style={style}
          title={title}
          bodyStyle={bodyStyle}
          visible={visible}
          width={width}
          height={height}
          headerStyle={headerStyle}
          className={className}
          zIndex={zIndex}
          placement={placement}
          onClose={onClose}
          getContainer={getContainer}
          afterVisibleChange={afterVisibleChange}
        >
          {children}
        </Drawer>
      );
    }
    return <div />;
  }
}

export default withStyles(s)(CPDrawer);
