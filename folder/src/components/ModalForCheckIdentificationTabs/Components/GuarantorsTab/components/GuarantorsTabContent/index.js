/* eslint-disable react/jsx-no-bind */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GuarantorsForm from '../GuarantorsForm';
import { getDocumentTokenByLevantIdAction } from '../../../../../../store/documentToken/documentToken.actions';
import {
  anyModalOpen,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  anyModalClose,
  opportunityCardLoadingStart,
  opportunityCardLoadingStop,
  saveReturnIdentificationData,
} from '../../../../../../store/opportunities/opportunities.actions';

import CheckIdentificationTabsDocuments from '../../../../../CheckIdentificationTabsDocuments/CheckIdentificationTabsDocuments';
import StackHolderStatusKYC from '../GuarantorsStatusKYC';

const GuarantorsTabContent = props => {
  const { stateData, handleChange, data, identification } = props;

  const getStatusForReturnKYB = () => {
    const stateCheck = {};
    Object.entries(stateData).forEach(([key, value]) => {
      if (
        value === 'APPROVED' ||
        value === 'REJECTED' ||
        key === 'rejectTypes' ||
        key === 'rejectDesc'
      ) {
        stateCheck[key] = value;
      }
    });
    return stateCheck;
  };

  const returnToIdentificationKYB = async (id, status) => {
    await props.getIdentificationAction(id);
    await props.getIdentificationWithDocsAction(id);
    props.anyModalOpen('modalForCheckIdentification');
    Object.entries(status).forEach(([key, value]) => {
      handleChange(key, value);
    });
    props.saveReturnIdentificationData(null, null, null);
  };

  const handleOpenKYCModal = async (videoKycId, opportunityId) => {
    const returnStatus = getStatusForReturnKYB();
    const opportunityKYBId = identification.opportunityId;
    props.anyModalClose();
    props.opportunityCardLoadingStart(opportunityKYBId);
    props.saveReturnIdentificationData(
      opportunityKYBId,
      returnStatus,
      videoKycId,
    );
    const getIdentification = await props.getIdentificationWithDocsAction(
      opportunityId,
    );
    if (getIdentification === false) {
      await returnToIdentificationKYB(opportunityKYBId, returnStatus);
    } else {
      props.anyModalOpen('modalForCheckIdentification');
      await props.getIdentificationAction(opportunityId);
    }

    props.opportunityCardLoadingStop(opportunityKYBId);
  };

  function documentTokenFactory(documents) {
    const finaDoc = documents?.map(d => ({
      type: d?.documentType,
      files: [{ path: d?.documentId, token: d?.documentToken }],
    }));
    return finaDoc;
  }

  return (
    <>
      <GuarantorsForm
        guarantors={data}
        stateData={stateData}
        handleChange={handleChange}
      />
      <StackHolderStatusKYC
        partyStatus={data.partyStatus}
        currentAction={data.currentAction}
        onClickKYC={handleOpenKYCModal.bind(
          null,
          data.videoKycId,
          data.opportunityId,
        )}
      />
      <CheckIdentificationTabsDocuments
        documentToken={documentTokenFactory(data?.documents)}
        stateData={stateData}
        handleChange={handleChange}
        title="مدارک"
        withAction={false}
      />
    </>
  );
};

GuarantorsTabContent.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  identification: PropTypes.object.isRequired,
  getIdentificationAction: PropTypes.func.isRequired,
  getIdentificationWithDocsAction: PropTypes.func.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  anyModalOpen: PropTypes.func.isRequired,
  opportunityCardLoadingStart: PropTypes.func.isRequired,
  opportunityCardLoadingStop: PropTypes.func.isRequired,
  saveReturnIdentificationData: PropTypes.func.isRequired,
};
const mapState = state => ({
  identification: state.opportunities.identificationData,
});

const mapDispatch = {
  getDocumentTokenByLevantIdAction,
  getIdentificationAction,
  getIdentificationWithDocsAction,
  anyModalOpen,
  anyModalClose,
  opportunityCardLoadingStart,
  opportunityCardLoadingStop,
  saveReturnIdentificationData,
};

export default connect(mapState, mapDispatch)(memo(GuarantorsTabContent));
