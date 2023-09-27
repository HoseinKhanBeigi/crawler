import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon } from 'antd';
import CPModal from '../../../CP/CPModal/CPModal';
import { MODAL_FOR_TOGGLE_EMPLOYEE_ACTIVATION } from '../../repository';
import { kianTableApi } from '../../../../components/KianTable/helpers/globalApi';
import { EMPLOYEE_MANAGEMENT_TABLE } from '../../../../store/settings/settings.constants';
import s from './ModalForToggleEmployeeActivation.scss';
import CPButton from '../../../CP/CPButton/CPButton';
import branchManagementService from '../../../../service/branchManagementService';
import { unitToggleActivationLabel } from '../../../Unit/utils/unitHelpers';

const ModalForToggleEmployeeActivation = ({ data }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  const title = `${unitToggleActivationLabel(data?.unitEmployeeStatus)} کارمند`;

  // const renderDescriptionData = () => {
  //   const items = [
  //     { value: data?.name, label: `نام کارمند` },
  //     { value: data?.code, label: `کد کارمند` },
  //     { value: data?.contactDTO?.cityName, label: 'شهر' },
  //   ];
  //   return (
  //     <Descriptions layout="vertical" column={2}>
  //       {items?.map(item => (
  //         <Descriptions.Item label={item?.label} className={s.label}>
  //           {item?.value || '- - -'}
  //         </Descriptions.Item>
  //       ))}
  //     </Descriptions>
  //   );
  // };

  const handleActivationStatusToggle = async () => {
    setLoading(true);
    try {
      await branchManagementService.postToggleEmployeeActivation({
        id: data?.unitEmployeeId,
        status:
          data.unitEmployeeStatus === 'ACTIVE' ? 'inactivate' : 'activate',
      });
      kianTableApi(EMPLOYEE_MANAGEMENT_TABLE).refreshTable();
      closeModal();
      setVisible(false);
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  return (
    <CPModal
      modalType={MODAL_FOR_TOGGLE_EMPLOYEE_ACTIVATION}
      visible={visible}
      title={title}
      footer={false}
      onCancel={closeModal}
    >
      {/* <div className={s.wrapper}>
        <h4>{`شما در حال ${title} با مشخصات زیر هستید`}</h4>
        <div className={s.desc_container}>{renderDescriptionData()}</div>
      </div> */}
      <div className={s.footer}>
        <h4>
          <span>
            <Icon type="exclamation-circle" theme="filled" />
          </span>
          {`آیا از ${unitToggleActivationLabel(
            data?.unitEmployeeStatus,
          )} این کارمند اطمینان دارید؟`}
        </h4>
        <div className={s.footer__buttons}>
          <CPButton onClick={closeModal}>انصراف</CPButton>
          <CPButton
            loading={loading}
            onClick={handleActivationStatusToggle}
            type={data?.unitEmployeeStatus === 'ACTIVE' ? 'danger' : 'primary'}
            style={{
              ...(data?.unitEmployeeStatus !== 'ACTIVE' && {
                backgroundColor: '#13c29a',
                borderColor: '#13c29a',
              }),
            }}
          >
            {unitToggleActivationLabel(data?.unitEmployeeStatus)}
          </CPButton>
        </div>
      </div>
    </CPModal>
  );
};

ModalForToggleEmployeeActivation.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withStyles(s)(ModalForToggleEmployeeActivation);
