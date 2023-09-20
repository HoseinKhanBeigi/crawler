import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelfiImageSection from '../../../KYCVideo/components/SelfiImageSection';
import SelfiVideoSection from '../../../KYCVideo/components/SelfiVideoSection';
// import SignatureImageSection from '../../../KYCVideo/components/SignatureImageSection';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';

const KYCVideoTab = props => {
  const {
    stateData,
    handleChange,
    opprotunityData,
    identification,
    identificationWithDocs,
    returnIdentification,
  } = props;
  const { videoKycId } = opprotunityData;
  let id = videoKycId;
  if (returnIdentification?.videoKYCID) {
    id = returnIdentification.videoKYCID;
  }
  const { rejectedByQC } = identificationWithDocs;
  const primary = identification?.kycSelfieImage;
  const [kycVideoResultData, setKycVideoResultData] = useState(null);

  const gestureExceptedResult = kycVideoResultData?.kycVideoResult?.filter(
    item => item.resultType === 'HAND_GESTURE_DETECTION',
  );
  const selfiImageKYCResult = kycVideoResultData?.kycVideoResult?.filter(
    item => item.resultType === 'FACE_RECOGNITION_IMAGE',
  );
  const videoSelfiKycResult = kycVideoResultData?.kycVideoResult?.filter(
    item => item.resultType === 'FACE_RECOGNITION_VIDEO',
  );

  useEffect(() => {
    if (id) {
      videoAuthenticationService.getVideoKycById(id).then(response => {
        setKycVideoResultData(response);
      });
    }
  }, []);

  return (
    <div style={{ padding: '20px 160px' }}>
      {id ? (
        <>
          <SelfiImageSection
            id={kycVideoResultData?.id}
            selfiImageKYCResult={selfiImageKYCResult?.[0]}
            status={kycVideoResultData?.status}
            primary={primary}
            rejectedByQc={rejectedByQC}
            withApproveButton
            stateData={stateData}
            handleChange={handleChange}
          />
          <SelfiVideoSection
            id={kycVideoResultData?.id}
            status={kycVideoResultData?.status}
            videoSelfiKycResult={videoSelfiKycResult?.[0]}
            gestureExceptedResult={gestureExceptedResult?.[0]}
            primary={primary}
            rejectedByQc={rejectedByQC}
            withApproveButton
            stateData={stateData}
            handleChange={handleChange}
          />
          {/* <SignatureImageSection
        status={kycVideoResultData?.status}
        id={kycVideoResultData?.id}
        primary={primary}
        rejectedByQc={rejectedByQC}
        withApproveButton
        stateData={stateData}
        handleChange={handleChange}
      /> */}
        </>
      ) : (
        <h3 style={{ textAlign: 'center' }}>
          اطلاعات احراز هویت کاربر تکمیل نشده است
        </h3>
      )}
    </div>
  );
};

KYCVideoTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  videoKycId: PropTypes.string,
  opprotunityData: PropTypes.object.isRequired,
  identificationWithDocs: PropTypes.object.isRequired,
  identification: PropTypes.object.isRequired,
  returnIdentification: PropTypes.object,
};

KYCVideoTab.defaultProps = {
  videoKycId: '',
  returnIdentification: {},
};

const mapState = state => ({
  opprotunityData: state.opportunities?.currentUser,
  identification: state.opportunities.identificationData,
  returnIdentification: state.opportunities.returnIdentification,
  identificationWithDocs: state.opportunities.identificationWithDocsData,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(memo(KYCVideoTab));
