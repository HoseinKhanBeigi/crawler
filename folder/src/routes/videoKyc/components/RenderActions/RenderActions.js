import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { MOADL_FOR_REJECT_VIDEO_KYC } from '../../../../components/ModalRoot/repository';
import { VIDEO_AUTHENTICATION_LIST_TABLE } from '../../../../store/settings/settings.constants';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import withModal from '../../../../components/HOC/withModal';
import CPButton from '../../../../components/CP/CPButton/CPButton';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';
import CPPopConfirm from '../../../../components/CP/CPPopConfirm/CPPopConfirm';
import s from './RenderActions.scss';

// eslint-disable-next-line no-unused-vars
const allStatus = ['STARTED', 'UPLOADED', 'APPROVED', 'REJECTED'];

const RednerActions = props => {
  const { status, row, showModalAction } = props;
  const translateStatus = {
    APPROVED: 'تایید شده',
    REJECTED: 'رد شده',
  };

  const showModal = type => modalProps => () => {
    showModalAction({
      type,
      props: modalProps,
    });
  };

  const handleApprove = () => {
    const { id } = row;
    videoAuthenticationService.postApproveVideoKyc(id).then(() => {
      setTimeout(
        kianTableApi(VIDEO_AUTHENTICATION_LIST_TABLE).refreshTable,
        200,
      );
    });
  };

  const openRejectMoadl = () => {
    showModal(MOADL_FOR_REJECT_VIDEO_KYC)({
      data: row,
    })();
  };

  return (
    <>
      {!translateStatus[status] ? (
        <>
          <CPPopConfirm
            okText="بلی"
            cancelText="خیر"
            title="آیا از تایید این مورد اطمینان دارید؟"
            onConfirm={handleApprove}
            placement="topRight"
          >
            <CPButton className={s.approve_btn} type="default">
              <Icon type="check" className={s.icon} /> تایید
            </CPButton>
          </CPPopConfirm>
          <CPButton
            onClick={openRejectMoadl}
            type="default"
            className={s.reject_btn}
          >
            <Icon type="close" className={s.icon} /> رد
          </CPButton>
        </>
      ) : (
        <span className={s.otherStatus}>{translateStatus[status]}</span>
      )}
    </>
  );
};

RednerActions.propTypes = {
  status: PropTypes.string,
  showModalAction: PropTypes.func.isRequired,
  row: PropTypes.object,
};
RednerActions.defaultProps = {
  status: '',
  row: {},
};
export default withModal(withStyles(s)(RednerActions));
