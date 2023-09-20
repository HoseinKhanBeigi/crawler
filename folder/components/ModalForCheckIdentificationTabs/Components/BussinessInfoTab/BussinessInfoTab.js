import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BussinessInfoFields from './Components/BussinessInfoFields/BussinessInfoFields';
import BussinessInfoDocs from './Components/BussinessInfoDocs/BussinessInfoDocs';

const BussinessInfoTab = props => {
  const { stateData, handleChange } = props;

  return (
    <div>
      <BussinessInfoFields stateData={stateData} handleChange={handleChange} />
      <BussinessInfoDocs stateData={stateData} handleChange={handleChange} />
    </div>
  );
};

BussinessInfoTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(BussinessInfoTab);
export const BussinessInfoTabTest = BussinessInfoTab;
