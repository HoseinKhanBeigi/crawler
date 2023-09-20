import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForSepAdditionalInfo.scss';
import CPModal from '../../../CP/CPModal';
import FormBuilder from '../../../FormBuilder';
import opportunityService from '../../../../service/opportunityService';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import { MODAL_FOR_SEP_ADDITIONAL_INFO } from '../../repository';
import CPMessage from '../../../../components/CP/CPMessage';

const ModalForSepAdditionalInfo = ({ levantId, ...props }) => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [additionalInfoErrors, setAdditionalInfoErrors] = useState(null);

  function renderErrorMessage() {
    return (
      <>
        <List
          size="small"
          header={<div>لطفا خطاهای زیر را بررسی کنید</div>}
          dataSource={additionalInfoErrors}
          bordered
          renderItem={item => <List.Item>{item.subject}</List.Item>}
        />
      </>
    );
  }
  const formSchema = [
    {
      name: 'terminalId',
      type: 'input',
      config: {
        isRequired: true,
        placeholder: 'شماره پایانه',
      },
    },
    {
      name: 'acceptorId',
      type: 'input',
      config: {
        isRequired: true,
        placeholder: 'شماره پذیرنده',
      },
    },
    {
      name: 'password',
      type: 'input',
      config: {
        isRequired: true,
        placeholder: 'رمز پایانه',
      },
    },
  ];

  const closeModal = () => {
    setVisible(false);
  };

  const handleSubmit = async data => {
    setLoading(true);
    try {
      const response = await opportunityService.setTerminalAdditionalInfo({
        levantId,
        ...data,
      });
      if (!response.success) {
        CPMessage(
          'خطای تکمیل اطلاعات SEP، لطفا خطاهای ایجاد شده را برطرف کنید و دوباره تلاش کنید',
          'error',
        );
        setAdditionalInfoErrors(response.error);
      } else {
        CPMessage('اطلاعات SEP با موفقیت ثبت گردید', 'success');
        props.getOpportunitiesAction();
        closeModal();
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CPModal
      title="تکمیل اطلاعات SEP"
      visible={visible}
      onCancel={closeModal}
      footer={false}
      width={380}
      modalType={MODAL_FOR_SEP_ADDITIONAL_INFO}
    >
      <FormBuilder
        schema={formSchema}
        onCancel={closeModal}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {additionalInfoErrors && renderErrorMessage()}
    </CPModal>
  );
};

ModalForSepAdditionalInfo.propTypes = {
  getOpportunitiesAction: PropTypes.func.isRequired,
  levantId: PropTypes.string.isRequired,
};

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  null,
  mapDispatch,
)(withStyles(s)(ModalForSepAdditionalInfo));
