import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForSendGroupSms.scss';
import CPModal from '../../../CP/CPModal';
import SendSmsForm from '../../../Forms/SendSmsForm/SendSmsForm';
import { MODAL_FOR_SEND_GROUP_SMS } from '../../repository';

const ModalForSendGroupSms = props => {
  const [visible, setVisible] = useState(true);
  const { data, deSelectRows, pipeline } = props;

  const deselectAndCloseModal = () => {
    deSelectRows();
    setVisible(false);
  };

  const getTitle = () =>
    data.length
      ? `ارسال گروهی پیامک (${data.length} مخاطب)`
      : ` ارسال پیامک گروهی به فرصت‌های پایپلاین (${pipeline?.title})`;

  return (
    <CPModal
      title={getTitle()}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      modalType={MODAL_FOR_SEND_GROUP_SMS}
    >
      <SendSmsForm
        levantId={data}
        pipeline={pipeline}
        deSelectRows={deselectAndCloseModal}
      />
    </CPModal>
  );
};

ModalForSendGroupSms.propTypes = {
  data: PropTypes.array,
  deSelectRows: PropTypes.func,
  pipeline: PropTypes.object,
};

ModalForSendGroupSms.defaultProps = {
  data: [],
  pipeline: null,
  deSelectRows: () => {},
};

export default withStyles(s)(ModalForSendGroupSms);
export const ModalForSendGroupSmsTest = ModalForSendGroupSms;
