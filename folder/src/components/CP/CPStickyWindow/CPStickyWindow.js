import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Collapse, Icon } from 'antd';
import s from './CPStickyWindow.scss';
import { hideStickyWindowAction } from '../../../store/stickyWindow/stickyWindow.actions';
import CPTooltip from '../../CP/CPTooltip';

const CPStickyWindow = props => {
  const {
    children,
    onClose,
    header,
    className,
    showArrow,
    windowType: type,
    hideStickyWindowAction: hide,
  } = props;
  const { Panel } = Collapse;

  const handleClose = () => {
    hide({ type });
    onClose();
  };

  const genExtra = () => (
    <div className={s.extraIcons}>
      <CPTooltip title="بستن">
        <Icon
          className={s.extraIconsItem}
          type="close"
          onClick={event => {
            handleClose(event);
          }}
        />
      </CPTooltip>
    </div>
  );

  return (
    <>
      <div className={className}>
        <Collapse defaultActiveKey={['1']}>
          <Panel
            header={header}
            showArrow={showArrow}
            key="1"
            extra={genExtra()}
          >
            {children}
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

CPStickyWindow.defaultProps = {
  children: '',
  header: '',
  onClose: () => {},
  className: '',
  showArrow: false,
  windowType: '',
};
CPStickyWindow.propTypes = {
  children: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  onClose: PropTypes.func,
  showArrow: PropTypes.bool,
  windowType: PropTypes.string,
  hideStickyWindowAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  hideStickyWindowAction,
};

export default connect(null, mapDispatch)(withStyles(s)(CPStickyWindow));
