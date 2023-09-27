import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MODAL_FOR_COMPLETE_BUSINESS_INFO } from '../../repository';
import FormBuilder from '../../../FormBuilder';
import CPModal from '../../../CP/CPModal';
import CPMessage from '../../../CP/CPMessage';
import opportunityService from '../../../../service/opportunityService';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';

const ModalForCompleteBusinessInfo = ({ opportunity, ...props }) => {
  const [visible, setVisible] = useState(true);
  const [typeOfOwnerShip, setTypeOfOwnerShip] = useState(null);
  const [date, setDate] = useState({});

  const closeModal = () => {
    setVisible(false);
  };

  const isValidDate = () =>
    typeOfOwnerShip === 'TENANT'
      ? Object.keys(date).length === 4
      : Object.keys(date).length >= 3;

  const handleSubmit = async data => {
    if (isValidDate() && typeOfOwnerShip) {
      const body = {
        additionalGuildCode: data.additionalGuildCode,
        additionalGuildName: data.additionalGuildName,
        licenseDate: date.licenseDate,
        companyRegistrationDate: date.companyRegistrationDate,
        companyRegistrationNumber: data.companyRegistrationNumber,
        licenceExpirationDate: date.licenceExpirationDate,
        typeOfOwnerShip: data.typeOfOwnerShip,
      };

      if (typeOfOwnerShip === 'TENANT') {
        body.leaseCompletionDate = date.leaseCompletionDate;
        body.leaseContractNumber = data.leaseContractNumber;
      }

      await opportunityService.addBusinessAdditionalInfo(opportunity.id, body);
      props.getOpportunitiesAction();
      closeModal();
    } else {
      CPMessage('لطفا فرم را تکمیل نمایید');
    }
  };

  const handleSetDate = (value, name) => {
    const current = { ...date };
    current[name] = value;
    setDate(current);
  };

  const handleChangeTypeOfOwnerShip = value => {
    setTypeOfOwnerShip(value);
  };

  const formSchema = () => {
    const form = [
      // {
      //   name: 'storeName',
      //   label: 'نام فروشگاه',
      //   type: 'input',
      //   config: {
      //     disabled: true,
      //     grid: 12,
      //     required: true,
      //   },
      // },
      {
        name: 'typeOfOwner',
        label: 'نوع پذیرنده',
        type: 'input',
        config: {
          disabled: true,
        },
      },
      {
        name: 'companyRegistrationNumber',
        label: 'شماره ثبت شرکت',
        type: 'input',
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'enStoreName',
        label: 'نام فروشگاه (انگلیسی)',
        type: 'input',
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'additionalGuildName',
        label: 'نام تکمیلی صنف',
        type: 'input',
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'additionalGuildCode',
        label: 'کد تکمیلی صنف',
        type: 'input',
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'companyRegistrationDate',
        label: 'تاریخ ثبت شرکت',
        type: 'date',
        onChange: handleSetDate,
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'licenseDate',
        label: 'تاریخ صدور جواز',
        type: 'date',
        onChange: handleSetDate,
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'licenceExpirationDate',
        label: 'تاریخ اعتبار جواز',
        type: 'date',
        onChange: handleSetDate,
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'typeOfOwnerShip',
        label: 'نوع مالکیت فروشگاه',
        type: 'select',
        onChange: handleChangeTypeOfOwnerShip,
        data: [
          {
            label: 'مالک',
            value: 'OWNER',
          },
          {
            label: 'مستاجر',
            value: 'TENANT',
          },
        ],
        config: {
          grid: 12,
          required: true,
        },
      },
    ];

    const tenantRequiredFields = [
      {
        name: 'leaseContractNumber',
        label: 'شماره قرارداد اجاره',
        type: 'input',
        config: {
          grid: 12,
          required: true,
        },
      },
      {
        name: 'leaseCompletionDate',
        label: 'تاریخ اتمام قرارداد اجاره',
        type: 'date',
        onChange: handleSetDate,
        config: {
          grid: 12,
          required: true,
        },
      },
    ];

    if (typeOfOwnerShip === 'TENANT') {
      form.push(...tenantRequiredFields);
    }

    return form;
  };

  return (
    <CPModal
      title="تکمیل اطلاعات کسب و کار"
      modalType={MODAL_FOR_COMPLETE_BUSINESS_INFO}
      visible={visible}
      onCancel={closeModal}
      footer={false}
    >
      <FormBuilder
        schema={formSchema()}
        onCancel={closeModal}
        initialValues={{ typeOfOwner: 'حقیقی' }}
        layout="horizontal"
        onSubmit={handleSubmit}
      />
    </CPModal>
  );
};

ModalForCompleteBusinessInfo.propTypes = {
  opportunity: PropTypes.object.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(null, mapDispatch)(ModalForCompleteBusinessInfo);
