import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './components/ContactForm';

const BussinessContactInfoTab = props => {
  const { className, stateData, handleChange } = props;

  return (
    <div className={className}>
      <ContactForm stateData={stateData} handleChange={handleChange} />
    </div>
  );
};

BussinessContactInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

BussinessContactInfoTab.defaultProps = {
  className: null,
};

export default memo(BussinessContactInfoTab);
export const BussinessContactInfoTabTest = BussinessContactInfoTab;
