import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_EDIT_UNIT } from '../../repository';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import CPTab from '../../../CP/CPTab';
import {
  BRANCHES_LIST_TABLE,
  REPRESENTATIVE_TABLE,
  AGENT_TABLE,
} from '../../../../store/settings/settings.constants';
import AddUnitDetailForm from '../../../Unit/components/AddUnitDetailForm/AddUnitDetailForm';
import AddUnitResponsiblePersonForm from '../../../Unit/components/AddUnitResponsiblePersonForm/AddUnitResponsiblePersonForm';
import AddUnitProductsForm from '../../../Unit/components/AddUnitProductsForm/AddUnitProductsForm';
import { unitTypeNames } from '../../../Unit/utils/unitHelpers';
import s from './ModalForEditUnit.scss';
import convertToJalaliDate from '../../../../utils/date';

const submitAndNextLabel = 'ثبت تغییرات';

const ModalForEditUnit = props => {
  const { data, unitType } = props;
  const [visible, setVisible] = useState(true);
  const tableId = {
    BRANCH: BRANCHES_LIST_TABLE,
    REPRESENTATIVE: REPRESENTATIVE_TABLE,
    AGENT: AGENT_TABLE,
  };
  const closeModal = () => {
    setVisible(false);
  };

  const refreshTable = () => {
    kianTableApi(tableId[unitType]).refreshTable();
  };

  const prepareInitialValue = () => {
    const { name, contactDTO, id, operationType } = data;
    return {
      id,
      name,
      address: contactDTO.address,
      tel: contactDTO.tel?.replace(/\d/g, (num, index) =>
        index === 3 ? `-${num}` : num,
      ),
      operationType,
      postalCode: contactDTO.postalCode,
      cityClassificationId: contactDTO.cityClassificationId,
      provinceClassificationId: contactDTO.provinceClassificationId,
    };
  };

  const renderDescriptionData = () => {
    const items = [
      { value: data?.code, label: `کد ${unitTypeNames[unitType]}` },
      {
        value: convertToJalaliDate(data?.createDateTime),
        label: 'تاریخ ایجاد',
      },
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

  const tabs = [
    {
      key: 3,
      tab: 'محصولات',
      children: (
        <AddUnitProductsForm
          unitType={unitType}
          unitId={data?.id}
          operationType={data?.operationType}
          initialProducts={data?.productsDTO}
          onSubmit={refreshTable}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
        />
      ),
    },
    {
      key: 2,
      tab: `مسئول ${unitTypeNames[unitType]}`,
      children: (
        <AddUnitResponsiblePersonForm
          unitType={unitType}
          unitId={data?.id}
          operationType={data?.operationType}
          defaultValue={{
            phoneNumber: data?.managerMobilePhone,
            roleId: data?.managerAclRole?.id,
          }}
          submitLabel={submitAndNextLabel}
          onCancel={closeModal}
          onSubmit={refreshTable}
        />
      ),
    },
    {
      key: 1,
      tab: `مشخصات ${unitTypeNames[unitType]}`,
      children: (
        <>
          <div className={s.desc_container}>{renderDescriptionData()}</div>
          <AddUnitDetailForm
            editMode
            initialValue={prepareInitialValue()}
            unitType={unitType}
            submitLabel={submitAndNextLabel}
            onCancel={closeModal}
            onSubmit={refreshTable}
          />
        </>
      ),
    },
  ];

  return (
    <CPModal
      title={`ویرایش ${unitTypeNames[unitType]}`}
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_EDIT_UNIT}
    >
      <div className="card-container">
        <CPTab defaultKey="1" position="top" tabPane={tabs} />
      </div>
    </CPModal>
  );
};

ModalForEditUnit.defaultProps = {
  data: {},
  unitType: '',
};
ModalForEditUnit.propTypes = {
  data: PropTypes.object,
  unitType: PropTypes.string,
};

export default withStyles(s)(ModalForEditUnit);
