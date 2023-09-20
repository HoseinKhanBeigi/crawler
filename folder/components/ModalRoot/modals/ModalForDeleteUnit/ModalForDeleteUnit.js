import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Descriptions, Icon } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_DELETE_UNIT } from '../../repository';
import s from './ModalForDeleteUnit.scss';
import { unitTypeNames } from '../../../Unit/utils/unitHelpers';
import CPButton from '../../../CP/CPButton';
import { unitServices } from '../../../../service/unitService';

const ModalForDeleteUnit = ({ data, unitType, onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const title = `حذف ${unitTypeNames[unitType]}`;

  const renderDescriptionData = () => {
    const items = [
      { value: data?.name, label: `نام ${unitTypeNames[unitType]}` },
      { value: data?.code, label: `کد ${unitTypeNames[unitType]}` },
      {
        value: data?.managerFullName,
        label: `مسئول ${unitTypeNames[unitType]}`,
      },
      { value: data?.contactDTO?.cityName, label: 'شهر' },
    ];
    return (
      <Descriptions layout="vertical" column={2}>
        {items?.map(item => (
          <Descriptions.Item label={item?.label} className={s.label}>
            {item?.value || '- - -'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  };

  const handleUnitDelete = async () => {
    setLoading(true);
    try {
      await unitServices.deleteUnitRequest(data.code, unitType);
      closeModal();
      if (typeof onFinish === 'function') {
        onFinish();
      }
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  return (
    <CPModal
      modalType={MODAL_FOR_DELETE_UNIT}
      visible={visible}
      title={title}
      footer={false}
      onCancel={closeModal}
    >
      <div className={s.wrapper}>
        <h4>{`شما در حال ${title} با مشخصات زیر هستید`}</h4>
        <div className={s.desc_container}>{renderDescriptionData()}</div>
      </div>
      <div className={s.footer}>
        <h4>
          <span>
            <Icon type="exclamation-circle" theme="filled" />
          </span>
          {`آیا از حذف این ${unitTypeNames[unitType]} اطمینان دارید؟`}
        </h4>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton loading={loading} onClick={handleUnitDelete} type="danger">
            {`حذف ${unitTypeNames[unitType]}`}
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForDeleteUnit.propTypes = {
  data: PropTypes.object.isRequired,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE']).isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default withStyles(s)(ModalForDeleteUnit);
