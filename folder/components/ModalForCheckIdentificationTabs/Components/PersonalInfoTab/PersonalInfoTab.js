import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonalInfoForm from './Components/PersonalInfoForm/PersonalInfoForm';
import CheckIdentificationTabsDocuments from '../../../CheckIdentificationTabsDocuments/CheckIdentificationTabsDocuments';

const PersonalInfoTab = props => {
  const { className, stateData, handleChange, documents } = props;

  return (
    <div className={className}>
      <PersonalInfoForm stateData={stateData} handleChange={handleChange} />
      <CheckIdentificationTabsDocuments
        documentToken={documents}
        stateData={stateData}
        handleChange={handleChange}
      />
    </div>
  );
};

PersonalInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  documents: PropTypes.array,
};

PersonalInfoTab.defaultProps = {
  className: null,
  documents: [],
};

const mapState = state => ({
  documents: state.opportunities?.identificationWithDocsData?.documentDTOS,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(memo(PersonalInfoTab));
export const ModalForCheckIdentificationTabPersonalProfileTest = PersonalInfoTab;
