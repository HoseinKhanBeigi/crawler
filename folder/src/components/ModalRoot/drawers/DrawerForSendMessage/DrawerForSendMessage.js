import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DRAWER_FOR_SEND_MESSAGE } from '../../repository';
import SendSmsForm from '../../../Forms/SendSmsForm';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForSendMessage = props => {
  const { levantId } = props;
  const [visible, setVisible] = useState(true);

  function closeDrawer() {
    setVisible(false);
  }

  return (
    <KianDrawer
      title="ارسال پیام"
      drawerId={DRAWER_FOR_SEND_MESSAGE}
      visible={visible}
      onClose={closeDrawer}
    >
      <SendSmsForm
        isGroupSms={false}
        levantId={levantId}
        onCancel={closeDrawer}
        onSubmit={closeDrawer}
      />
    </KianDrawer>
  );
};

DrawerForSendMessage.defaultProps = {
  levantId: '',
};
DrawerForSendMessage.propTypes = {
  levantId: PropTypes.string,
};

const mapState = state => ({
  levantId: state.lead.data.levantId,
});

export default connect(mapState, null)(DrawerForSendMessage);
