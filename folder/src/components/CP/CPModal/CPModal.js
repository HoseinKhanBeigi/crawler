import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal } from 'antd';
import cs from 'classnames';
import s from './CPModal.scss';
import { hideModalAction } from '../../../store/modals/modals.actions';
import sleep from '../../../utils/sleep';

class CPModal extends React.PureComponent {
  componentDidUpdate() {
    const { modalType: type, visible, hideModalAction: hide } = this.props;
    if (!visible && type) {
      sleep().then(() => {
        hide({ type });
      });
    }
  }

  render() {
    const {
      title,
      className,
      closable,
      confirmLoading,
      mask,
      maskClosable,
      afterClose,
      width,
      footer,
      children,
      onOk,
      fullWidthHeight,
      okText,
      cancelText,
      visible,
      onCancel,
      okButtonProps,
      cancelButtonProps,
      okType,
    } = this.props;

    return (
      <Modal
        title={title}
        closable={closable}
        maskClosable={maskClosable}
        mask={mask}
        confirmLoading={confirmLoading}
        className={cs(
          s.root,
          fullWidthHeight ? 'fullWidthModal' : null,
          !closable ? 'notClosable' : undefined,
          className,
        )}
        width={width}
        visible={visible}
        footer={footer}
        onCancel={onCancel}
        onOk={onOk}
        afterClose={afterClose}
        okText={okText}
        cancelText={cancelText}
        okButtonProps={okButtonProps}
        okType={okType}
        cancelButtonProps={cancelButtonProps}
      >
        {children}
      </Modal>
    );
  }
}

CPModal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  visible: PropTypes.bool,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  closable: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  width: PropTypes.number,
  afterClose: PropTypes.func,
  hideModalAction: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  fullWidthHeight: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  okType: PropTypes.string,
  modalType: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
};

CPModal.defaultProps = {
  title: '',
  visible: false,
  children: '',
  footer: undefined,
  className: 'min_modal',
  confirmLoading: false,
  closable: true,
  mask: true,
  maskClosable: true,
  afterClose: undefined,
  width: 520,
  onCancel: () => {},
  onOk: () => {},
  fullWidthHeight: false,
  okText: 'تایید',
  okType: 'primary',
  cancelText: 'لغو',
  modalType: null,
  okButtonProps: null,
  cancelButtonProps: null,
};

const mapDispatch = {
  hideModalAction,
};

export default connect(null, mapDispatch)(withStyles(s)(CPModal));
