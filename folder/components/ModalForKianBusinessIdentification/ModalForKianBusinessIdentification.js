import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForKianBusinessIdentification.scss';
import CPModal from '../CP/CPModal';
import ModalForCheckIdentificationBusinessTabs from '../ModalForCheckIdentificationBusinessTabs';
import { anyModalClose } from '../../store/opportunities/opportunities.actions';

const ModalForKianBusinessIdentification = props => {
  const { className, visible } = props;

  return (
    <div className={cs('modalForKianBusinessIdentification', className)}>
      <CPModal
        title="بررسی اطلاعات کسب و کار"
        footer={false}
        visible={visible}
        onCancel={() => props.anyModalClose()}
        width={992}
      >
        <ModalForCheckIdentificationBusinessTabs />
      </CPModal>
    </div>
  );
};

ModalForKianBusinessIdentification.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
};

ModalForKianBusinessIdentification.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  visible:
    state.opportunities.anyModalVisible ===
    'modalForKianBusinessIdentification',
});

const mapDispatch = {
  anyModalClose,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(memo(ModalForKianBusinessIdentification)));
export const ModalForKianBusinessIdentificationTest = ModalForKianBusinessIdentification;
