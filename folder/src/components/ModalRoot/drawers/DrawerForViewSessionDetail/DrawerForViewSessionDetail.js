import React from 'react';
import PropTypes from 'prop-types';
import SessionDrawer from '../../../../routes/sessions/components/SessionDrawer/SessionDrawer';
import { DRAWER_FOR_VIEW_SESSION_DETAIL } from '../../repository';

const DrawerForViewSessionDetail = ({ data }) => (
  <SessionDrawer sessionData={data} drawerId={DRAWER_FOR_VIEW_SESSION_DETAIL} />
);

DrawerForViewSessionDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DrawerForViewSessionDetail;
