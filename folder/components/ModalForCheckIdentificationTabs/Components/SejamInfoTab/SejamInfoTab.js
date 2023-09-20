import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SejamInfoFields from './Components/SejamInfoFields/SejamInfoFields';

const SejamInfoTab = props => {
  const { className, stateData, handleChange } = props;

  return (
    <div className={className}>
      <SejamInfoFields stateData={stateData} handleChange={handleChange} />
    </div>
  );
};

SejamInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

SejamInfoTab.defaultProps = {
  className: null,
};

export default memo(SejamInfoTab);
// export const ModalForCheckIdentificationTabBankProfileTest = SejamInfoTab;
