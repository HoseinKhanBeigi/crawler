import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton/CPButton';
import s from './ModalForDeleteTask.scss';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { TASK_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import { MODAL_FOR_DELETE_TASK } from '../../repository';
import taskManagementService from '../../../../service/taskManagementService';

const ModalForDeleteTask = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const handleDeleteTask = () => {
    const { id } = data;
    setLoading(true);
    taskManagementService.deleteTask(id).then(
      () => {
        setLoading(false);
        kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
        closeModal();
      },
      () => setLoading(false),
    );
  };

  return (
    <CPModal
      modalType={MODAL_FOR_DELETE_TASK}
      visible={visible}
      title="حذف کار"
      footer={false}
      onCancel={closeModal}
    >
      <div className={s.wrapper}>
        <h4>
          آیا از حذف تسک <b>{data?.title}</b> مطمئن هستید؟
        </h4>
      </div>
      <div className={s.footer}>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton loading={loading} onClick={handleDeleteTask} type="danger">
            تایید
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForDeleteTask.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(ModalForDeleteTask);
