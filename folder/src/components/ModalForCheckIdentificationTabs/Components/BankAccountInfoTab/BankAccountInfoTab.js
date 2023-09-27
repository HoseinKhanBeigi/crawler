import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BankInfoFields from './Components/BankInfoFields/BankInfoFields';

const BankAccountInfoTab = props => {
  const { className, stateData, handleChange } = props;

  return (
    <div className={className}>
      <BankInfoFields stateData={stateData} handleChange={handleChange} />
    </div>
  );
};

BankAccountInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

BankAccountInfoTab.defaultProps = {
  className: null,
};

export default memo(BankAccountInfoTab);
export const ModalForCheckIdentificationTabBankProfileTest = BankAccountInfoTab;
