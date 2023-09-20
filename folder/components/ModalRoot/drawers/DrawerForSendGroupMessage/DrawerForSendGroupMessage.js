import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DrawerForSendGroupMessage.scss';
import SendSmsForm from '../../../Forms/SendSmsForm/SendSmsForm';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_SEND_GROUP_MESSAGE } from '../../repository';

const DrawerForSendGroupMessage = props => {
  const [visible, setVisible] = useState(true);
  const { data, type, ids, pipeline } = props;

  const deselectAndCloseModal = () => {
    setVisible(false);
  };

  const getTitle = () =>
    data.length
      ? `ارسال گروهی پیامک (${data.length} مخاطب)`
      : ` ارسال پیامک گروهی به فرصت‌های پایپلاین (${pipeline?.title})`;
  return (
    <KianDrawer
      title={getTitle()}
      visible={visible}
      onClose={deselectAndCloseModal}
      drawerId={DRAWER_FOR_SEND_GROUP_MESSAGE}
    >
      <SendSmsForm
        levantId={data}
        leadType={type}
        leadIds={ids}
        pipeline={pipeline}
        deSelectRows={deselectAndCloseModal}
        onCancel={deselectAndCloseModal}
      />
    </KianDrawer>
  );
};

DrawerForSendGroupMessage.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  ids: PropTypes.string,
  pipeline: PropTypes.object,
};

DrawerForSendGroupMessage.defaultProps = {
  data: [],
  type: null,
  ids: null,
  pipeline: null,
};

export default withStyles(s)(DrawerForSendGroupMessage);
export const ModalForSendGroupSmsTest = DrawerForSendGroupMessage;
