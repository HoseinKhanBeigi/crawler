/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CreditScoreTab.scss';
import CPLoading from '../../../CP/CPLoading/CPLoading';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import {
  putSamatCreditScore,
  getSamatIdentificationInfo,
} from '../../../../service/samatIdentificationServices';
import CPInput from '../../../CP/CPInput/CPInput';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import LegalValidationLeasingForm from './components/LegalValidationLeasingForm/LegalValidationLeasingForm';
import SamatValidationForm from './components/SamatValidationForm';
// import GuageChart from './GuageChart';

const { Panel } = Collapse;

const CreditScoreTab = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
    opportunityId,
    samatId,
  } = props;
  const { creditScoreStatus } = stateData;
  const primary = identification?.personalInfoStatus;
  const { rejectedByQC } = identificationWithDocs || {};
  const [validationResult, setValidationResult] = useState();
  const [leasingDataLoading, setLeasingDataLoading] = useState(false);
  const [samatDetail, setSamatDetail] = useState();
  const [samatDetailLoading, setSamatDetailLoading] = useState();

  const renderField = (text, name, val) => (
    <CPLabel
      label={text}
      className={cs('col-md-6', s.input)}
      labelClasses={s.finicialInfoLabel}
    >
      <CPInput value={val || ''} disabled name={name} />
    </CPLabel>
  );

  const getSamatDetail = async () => {
    setSamatDetailLoading(true);
    try {
      setSamatDetailLoading(true);
      const result = await getSamatIdentificationInfo({ id: samatId });
      setSamatDetailLoading(false);
      if (!result.err) {
        setSamatDetail(result);
      }
    } catch (e) {
      setSamatDetailLoading(false);
    }
  };

  useEffect(() => {
    setLeasingDataLoading(true);
    if (opportunityId) {
      putSamatCreditScore({ id: opportunityId }).then(
        response => {
          setLeasingDataLoading(false);
          setValidationResult(response);
        },
        () => {
          setLeasingDataLoading(false);
          setValidationResult(null);
        },
      );
    }
    if (samatId) {
      getSamatDetail();
    }
  }, [opportunityId, samatId]);

  return (
    <>
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>اعتبارسنجی حقوقی</span>
          <div className={s.radioBox}>
            <ApproveButton
              handleChange={handleChange}
              primaryValue={primary}
              value={creditScoreStatus}
              item="creditScoreStatus"
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
        <CPLoading spinning={leasingDataLoading && samatDetailLoading}>
          <Collapse accordion expandIconPosition="right">
            <Panel
              header="اطلاعات اعتبارسنجی کیان لیزینگ"
              key="1"
              extra={
                <span>{`امتیاز نهایی: ${validationResult?.finalGrade}`}</span>
              }
            >
              <LegalValidationLeasingForm
                validationResult={validationResult}
                loading={leasingDataLoading}
              />
            </Panel>
            <Panel
              header="اطلاعات اعتبارسنجی سمات"
              key="2"
              extra={
                <span>
                  امتیاز نهایی {samatDetail?.score} -
                  {samatDetail?.decisionStatus ? ' قبول' : ' رد'}
                </span>
              }
            >
              <SamatValidationForm id={samatId} detail={samatDetail} />
            </Panel>
          </Collapse>
        </CPLoading>
      </div>
      {/* <GuageChart score={scoreNumber} /> */}
    </>
  );
};

CreditScoreTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  opportunityId: PropTypes.string.isRequired,
  samatId: PropTypes.string.isRequired,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
};

CreditScoreTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationData?.opportunityId,
  samatId: state.opportunities.identificationWithDocsData?.samatId,
  identification: state.opportunities.identificationData,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(withStyles(s)(CreditScoreTab));
export const ModalForCheckIdentificationTabPersonalProfileTest = CreditScoreTab;
