import { Icon as AntIcon } from 'antd';
import React from 'react';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './KianDrawer.scss';
import withModal from '../HOC/withModal';
import CPDrawer from '../CP/CPDrawer';
import CPButton from '../CP/CPButton';

const KianDrawer = ({
  visible,
  onClose,
  title,
  renderHeader,
  width,
  drawerId,
  onOk,
  onCancel,
  okText,
  cancelText,
  footer,
  className,
  okButtonProps,
  cancelButtonProps,
  ...props
}) => {
  const afterVisibleChangeHandler = status => {
    if (!status && drawerId) props.hideModalAction({ type: drawerId });
  };
  return (
    <CPDrawer
      width={width}
      headerStyle={{ display: 'none' }}
      className={s.wrapper}
      title={title}
      afterVisibleChange={afterVisibleChangeHandler}
      placement="left"
      closable
      destroyOnClose
      mask
      maskClosable
      visible={visible}
      onClose={onClose}
    >
      <>
        <div className={s.header}>
          <>
            {renderHeader || <p>{title}</p>}
            <AntIcon onClick={onClose} type="close" className={s.closeIcon} />
          </>
        </div>
        <div className={cs(s.container, className)}>
          {props.children}
          {onOk && footer && (
            <div className={s.footer}>
              {onCancel && (
                <CPButton onClick={onCancel} {...cancelButtonProps}>
                  {cancelText}
                </CPButton>
              )}
              <CPButton type="primary" onClick={onOk} {...okButtonProps}>
                {okText}
              </CPButton>
            </div>
          )}
        </div>
      </>
    </CPDrawer>
  );
};

KianDrawer.defaultProps = {
  renderHeader: null,
  width: 480,
  drawerId: null,
  onOk: undefined,
  onCancel: undefined,
  okText: 'انجام',
  cancelText: 'انصراف',
  footer: true,
  className: '',
  okButtonProps: {},
  cancelButtonProps: {},
};

KianDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  renderHeader: PropTypes.element,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  drawerId: PropTypes.string,
  hideModalAction: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  footer: PropTypes.bool,
  className: PropTypes.string,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
};

export default withStyles(s)(withModal(KianDrawer));
