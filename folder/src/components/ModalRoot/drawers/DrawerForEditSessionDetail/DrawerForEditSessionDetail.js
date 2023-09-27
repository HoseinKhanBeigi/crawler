import React from 'react';
import PropTypes from 'prop-types';
import SessionDrawer from '../../../../routes/sessions/components/SessionDrawer/SessionDrawer';
import { DRAWER_FOR_EDIT_SESSION_DETAIL } from '../../repository';

const DrawerForEditSessionDetail = ({ data }) => (
  <SessionDrawer
    editMode
    sessionData={data}
    drawerId={DRAWER_FOR_EDIT_SESSION_DETAIL}
  />
);

DrawerForEditSessionDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DrawerForEditSessionDetail;
