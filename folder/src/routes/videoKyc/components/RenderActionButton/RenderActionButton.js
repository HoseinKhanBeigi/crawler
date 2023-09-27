import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import withModal from '../../../../components/HOC/withModal';
import { MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST } from '../../../../components/ModalRoot/repository';

const actionViewStatus = [
  'PERSONAL_INFO',
  'IMAGE',
  'VIDEO',
  'SIGNATURE',
  'REJECTED',
  'APPROVED',
];

const RenderActionButton = props => {
  const { status, data } = props;

  const openReviewVideoKYCModal = () => {
    props.showModalAction({
      type: MODAL_FOR_REVIEW_VIDEO_KYC_REQUEST,
      props: {
        data,
      },
    });
  };

  return (
    <Button type="link" onClick={openReviewVideoKYCModal}>
      {actionViewStatus.includes(status) ? 'مشاهده' : 'بررسی درخواست'}
    </Button>
  );
};
RenderActionButton.propTypes = {
  status: PropTypes.string,
  data: PropTypes.object,
  showModalAction: PropTypes.func.isRequired,
};
RenderActionButton.defaultProps = {
  status: '',
  data: {},
};
export default withModal(RenderActionButton);
