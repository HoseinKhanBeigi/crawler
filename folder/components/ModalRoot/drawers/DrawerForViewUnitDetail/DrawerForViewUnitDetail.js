import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KianDrawer from '../../../KianDrawer/KianDrawer';
import { DRAWER_FOR_VIEW_UNIT_DETAIL } from '../../repository';
import ShowUnitInformation from '../../../ShowUnitInformation/ShowUnitInformation';
import { unitTypeNames } from '../../../Unit/utils/unitHelpers';

const DrawerForViewUnitDetail = ({ data, unitType }) => {
  const [visible, setVisible] = useState(true);
  const closeDrawer = () => {
    setVisible(false);
  };
  return (
    <KianDrawer
      drawerId={DRAWER_FOR_VIEW_UNIT_DETAIL}
      title={`مشاهده اطلاعات ${unitTypeNames[unitType]}`}
      visible={visible}
      onClose={closeDrawer}
      onCancel={closeDrawer}
    >
      <ShowUnitInformation data={data} unitType={unitType} />
    </KianDrawer>
  );
};

DrawerForViewUnitDetail.propTypes = {
  data: PropTypes.object.isRequired,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE']).isRequired,
};

export default DrawerForViewUnitDetail;
