/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropType from 'prop-types';
import StepWizard from '../../../../components/StepWizard';
import { stepsSchema } from './schema';

const StepsNewGroups = ({ onClose }) => (
  <StepWizard steps={stepsSchema} onCloseModal={onClose} />
);

StepsNewGroups.propTypes = {
  onClose: PropType.func.isRequired,
};

export default StepsNewGroups;
