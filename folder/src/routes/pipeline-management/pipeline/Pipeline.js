import React from 'react';
import PropTypes from 'prop-types';
import DetailedPipe from '../../../components/PipelineManagement/DetailedPipe/DetailedPipe';
import { ModalWrapperContextProvider } from '../../../components/PipelineManagement/modalWrappers/store';

function Pipeline({ pipelineId }) {
  return (
    <ModalWrapperContextProvider>
      <DetailedPipe id={pipelineId} />
    </ModalWrapperContextProvider>
  );
}

Pipeline.propTypes = {
  pipelineId: PropTypes.string.isRequired,
};

export default Pipeline;
