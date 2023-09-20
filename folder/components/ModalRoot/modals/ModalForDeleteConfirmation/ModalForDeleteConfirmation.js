import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Descriptions, Icon } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_DELETE_CONFIRMATION } from '../../repository';
import s from './ModalForDeleteConfirmation.scss';
import CPButton from '../../../CP/CPButton';

const ModalForDeleteUnit = ({
  detail = [],
  onCancel,
  onConfirmError,
  title,
  onConfirm,
}) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const cancelHandler = () => {
    if (typeof onCancel === 'function') onCancel();
    closeModal();
  };

  const renderDescriptionData = () => (
    <Descriptions layout="vertical" column={2}>
      {detail.map(item => (
        <Descriptions.Item label={item?.label} className={s.label}>
          {item?.value || '- - -'}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  const handleUnitDelete = async () => {
    setLoading(true);
    try {
      await onConfirm();
      closeModal();
    } catch (e) {
      if (typeof onConfirmError === 'function') {
        onConfirmError(e);
      }
    }
    setLoading(false);
  };

  return (
    <CPModal
      modalType={MODAL_FOR_DELETE_CONFIRMATION}
      visible={visible}
      title={title}
      footer={false}
      onCancel={cancelHandler}
    >
      {!!detail.length && (
        <div className={s.wrapper}>
          <h4>{`شما در حال ${title} با مشخصات زیر هستید`}</h4>
          <div className={s.desc_container}>{renderDescriptionData()}</div>
        </div>
      )}
      <div className={s.footer}>
        <h4>
          <span>
            <Icon type="exclamation-circle" theme="filled" />
          </span>
          {`آیا از ${title} اطمینان دارید؟`}
        </h4>
        <div className={s.footer__buttons}>
          <CPButton onClick={cancelHandler}>انصراف</CPButton>
          <CPButton loading={loading} onClick={handleUnitDelete} type="danger">
            حذف
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForDeleteUnit.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.arrayOf([
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  ]).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onConfirmError: PropTypes.func,
  onCancel: PropTypes.func,
};

ModalForDeleteUnit.defaultProps = {
  onConfirmError: undefined,
  onCancel: undefined,
};

export default withStyles(s)(ModalForDeleteUnit);
