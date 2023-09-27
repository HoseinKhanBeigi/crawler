import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MOADL_FOR_REJECT_VIDEO_KYC } from '../../repository';
import CPModal from '../../../CP/CPModal';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import { VIDEO_AUTHENTICATION_LIST_TABLE } from '../../../../store/settings/settings.constants';
import CPLoading from '../../../CP/CPLoading';
import { schema } from './schema';
import FormBuilder from '../../../FormBuilder';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';

const ModalForRejectVideoKyc = props => {
  const [visible, setVisible] = useState(true);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isOtherReason, setIsOtherReason] = useState(false);

  function closeModal() {
    setVisible(false);
  }

  function makeList(items) {
    const list = Object.entries(items).map(item => ({
      value: item[0],
      text: item[1],
    }));
    return list;
  }
  useEffect(() => {
    videoAuthenticationService.getRejectionCausesList().then(
      response => {
        if (response.additionalInfo) {
          delete response.additionalInfo;
        }
        const list = makeList({ ...response });
        setReasons(list);
      },
      () => setLoading(false),
    );
  }, []);

  const handleRejection = form => {
    setSubmitLoading(true);
    const { id } = props;
    videoAuthenticationService.postRejectVideoKyc(id, form).then(
      () => {
        setTimeout(
          kianTableApi(VIDEO_AUTHENTICATION_LIST_TABLE).refreshTable,
          200,
        );
        setSubmitLoading(false);
        closeModal();
        props.onSubmit();
      },
      () => setSubmitLoading(false),
    );
  };

  return (
    <CPModal
      title="رد درخواست احراز هویت"
      visible={visible}
      modalType={MOADL_FOR_REJECT_VIDEO_KYC}
      width={592}
      onCancel={closeModal}
      footer={false}
    >
      <CPLoading tip="دریافت لیست دلایل..." spinning={loading}>
        <FormBuilder
          schema={schema(reasons, setIsOtherReason, isOtherReason)}
          onSubmit={handleRejection}
          layout="vertical"
          submitLabel="رد کردن"
          cancelLabel="انصراف"
          onCancel={closeModal}
          loading={submitLoading}
          okType="danger"
        />
      </CPLoading>
    </CPModal>
  );
};

ModalForRejectVideoKyc.propTypes = {
  id: PropTypes.string,
  onSubmit: PropTypes.func,
};
ModalForRejectVideoKyc.defaultProps = {
  id: '',
  onSubmit: () => {},
};

export default ModalForRejectVideoKyc;
