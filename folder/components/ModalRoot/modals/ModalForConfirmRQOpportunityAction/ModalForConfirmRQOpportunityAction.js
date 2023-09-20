import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CPModal from '../../../CP/CPModal';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import { MODAL_FOR_CONFIRM_RQ_OPPORTUNITY_ACTION } from '../../repository';
import actionService from '../../../../service/actionService';

const ModalForConfirmRQOpportunityAction = props => {
  const { action, levantId, product } = props;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const handleRQAction = async () => {
    setLoading(true);
    await actionService.doAction(action, levantId, product, 'ایجاد');
    setLoading(false);
    await props.getOpportunitiesAction({ product });
    closeModal();
  };

  return (
    <CPModal
      modalType={MODAL_FOR_CONFIRM_RQ_OPPORTUNITY_ACTION}
      visible={visible}
      title="انجام اکشن ساخت RQ"
      okText="تایید"
      cancelText="انصراف"
      onOk={handleRQAction}
      onCancel={closeModal}
      confirmLoading={loading}
    >
      <h4>ایا از انجام این اکشن مطمعن هستید؟</h4>
    </CPModal>
  );
};

const mapStateToProps = state => ({
  postTagsLoading: state.tag.postTagsLoading,
});

ModalForConfirmRQOpportunityAction.propTypes = {
  getOpportunitiesAction: PropTypes.func.isRequired,
  action: PropTypes.string,
  levantId: PropTypes.string,
  product: PropTypes.string,
};

ModalForConfirmRQOpportunityAction.defaultProps = {
  action: '',
  levantId: '',
  product: '',
};

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(ModalForConfirmRQOpportunityAction);
