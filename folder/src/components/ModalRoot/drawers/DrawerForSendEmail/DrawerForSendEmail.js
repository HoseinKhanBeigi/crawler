import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DRAWER_FOR_SEND_EMAIL } from '../../repository';
import SendEmailForm from '../../../Forms/SendEmailForm';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForSendEmail = props => {
  const { levantId } = props;
  const [visible, setVisible] = useState(true);

  function closeDrawer() {
    setVisible(false);
  }

  return (
    <KianDrawer
      title="ارسال ایمیل"
      drawerId={DRAWER_FOR_SEND_EMAIL}
      visible={visible}
      onClose={closeDrawer}
    >
      <SendEmailForm
        levantId={levantId}
        onCancel={closeDrawer}
        onSubmit={closeDrawer}
      />
    </KianDrawer>
  );
};

DrawerForSendEmail.defaultProps = {
  levantId: null,
};
DrawerForSendEmail.propTypes = {
  levantId: PropTypes.string,
};

const mapState = state => ({
  levantId: state.lead.data.levantId,
});

export default connect(mapState, null)(DrawerForSendEmail);
