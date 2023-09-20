import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import CPButton from '../../../CP/CPButton';
import s from './ModalForChangeTaskStatus.scss';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { TASK_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import { MODAL_FOR_CHNAGE_TASK_STATUS } from '../../repository';
import taskManagementService from '../../../../service/taskManagementService';

const ModalForChangeTaskStatus = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('OPEN');

  const closeModal = () => {
    setVisible(false);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };

  const handleSubmitStatus = () => {
    const { id } = data;
    setLoading(true);
    taskManagementService.postChangeTaskStatus({ id, status }).then(
      () => {
        setLoading(false);
        kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
      },
      () => setLoading(false),
    );
  };

  return (
    <CPModal
      modalType={MODAL_FOR_CHNAGE_TASK_STATUS}
      visible={visible}
      title="تغییر وضعیت کار"
      footer={false}
      onCancel={closeModal}
    >
      <div className={s.wrapper}>
        <h4>
          لطفا وضعیت جدید را برای تسک <b>{data?.title}</b> انتخاب کنید.
        </h4>
        <Radio.Group onChange={handleChangeStatus} defaultValue={status}>
          <Radio.Button value="OPEN">باز</Radio.Button>
          <Radio.Button value="IN_PROGRESS">در حال انجام</Radio.Button>
          <Radio.Button value="DONE">بسته</Radio.Button>
        </Radio.Group>
      </div>
      <div className={s.footer}>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={handleSubmitStatus}
            type="primary"
          >
            تایید
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForChangeTaskStatus.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(ModalForChangeTaskStatus);
