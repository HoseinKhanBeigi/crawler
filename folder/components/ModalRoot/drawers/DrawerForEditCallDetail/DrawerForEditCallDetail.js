import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DRAWER_FOR_EDIT_CALL_DETAILS } from '../../repository';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import EditCallDetailForm from '../../../EditCallDetailForm/EditCallDetailForm';

const DrawerForEditCallDetail = props => {
  const { data } = props;
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <KianDrawer
      title="ویرایش تماس"
      visible={visible}
      onCancel={closeModal}
      onClose={closeModal}
      drawerId={DRAWER_FOR_EDIT_CALL_DETAILS}
    >
      <EditCallDetailForm data={data} onCancel={closeModal} />
    </KianDrawer>
  );
};

DrawerForEditCallDetail.defaultProps = {
  data: {},
};
DrawerForEditCallDetail.propTypes = {
  data: PropTypes.object,
};

export default DrawerForEditCallDetail;
