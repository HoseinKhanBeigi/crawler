import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Descriptions, Icon } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_TOGGLE_UNIT_ACTIVATION } from '../../repository';
import s from './ModalForToggleUnitActivation.scss';
import CPButton from '../../../CP/CPButton';
import { unitServices } from '../../../../service/unitService';
import {
  unitToggleActivationLabel,
  unitTypeNames,
} from '../../../Unit/utils/unitHelpers';

const ModalForToggleUnitActivation = ({ unitType, data, onStatusChange }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const title = `${unitToggleActivationLabel(data?.status)} ${
    unitTypeNames[unitType]
  }`;

  const toogleName = unitTypeNames[unitType];

  const renderDescriptionData = () => {
    const items = [
      { value: data?.name, label: `نام ${toogleName}` },
      { value: data?.code, label: `کد ${toogleName}` },
      {
        value: data?.managerFullName,
        label: `مسئول ${toogleName}`,
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

  const handleUnitActivationStatusToggle = async () => {
    setLoading(true);
    try {
      await unitServices.updateUnitStatusRequest(
        data?.id,
        data.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
        unitType,
      );
      onStatusChange();
      closeModal();
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  return (
    <CPModal
      modalType={MODAL_FOR_TOGGLE_UNIT_ACTIVATION}
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
          {`آیا از ${unitToggleActivationLabel(data?.status)} این ${
            unitTypeNames[unitType]
          } اطمینان دارید؟`}
        </h4>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={handleUnitActivationStatusToggle}
            type={data?.status === 'ACTIVE' ? 'danger' : 'primary'}
            style={{
              ...(data?.status !== 'ACTIVE' && {
                backgroundColor: '#13c29a',
                borderColor: '#13c29a',
              }),
            }}
          >
            {unitToggleActivationLabel(data?.status)}
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForToggleUnitActivation.propTypes = {
  data: PropTypes.object.isRequired,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE']).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default withStyles(s)(ModalForToggleUnitActivation);
