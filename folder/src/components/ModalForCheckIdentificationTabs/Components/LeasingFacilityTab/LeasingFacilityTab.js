import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import CPInput from '../../../CP/CPInput/CPInput';
import s from './LeasingFacilityTab.scss';

const LeasingFacilityTab = props => {
  const { identificationWithDocs, stateData, identification } = props;
  const { facilityDetailDTO } = identificationWithDocs;
  const primaryFacilityDetailStatus = identification?.facilityDetailStatus;
  const {
    facilityBrand,
    facilityModel,
    facilityType,
    requestedAmount,
    numberOfPayments,
    paymentGapInMonths,
    loanFinancialDetails,
  } = facilityDetailDTO;
  const {
    payment,
    currencyTypeTitle,
    yearlyInterest,
    numberOfGuarantors,
  } = loanFinancialDetails;

  const { facilityDetailStatus } = stateData;
  const renderField = (text, name, val, col = 8) => (
    <Col span={col}>
      <CPLabel label={text}>
        <CPInput value={val} disabled name={name} />
      </CPLabel>
    </Col>
  );

  const addRialString = value =>
    value ? `${value} ${currencyTypeTitle || 'ریال'}` : value;

  return (
    <>
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>اطلاعات تسهیلات</span>
          <div className={s.radioBox}>
            <ApproveButton
              handleChange={props.handleChange}
              primaryValue={primaryFacilityDetailStatus}
              value={facilityDetailStatus}
              item="facilityDetailStatus"
            />
          </div>
        </div>
        <Row gutter={[24, 16]}>
          {renderField('برند خودرو', 'postalCode', facilityBrand, 8)}
          {renderField('مدل', 'facilityModel', facilityModel, 8)}
          {renderField('تیپ', 'facilityType', facilityType, 8)}
          {renderField(
            'مبلغ وام',
            'requestedAmount',
            addRialString(toCommaSeparatedNumber(requestedAmount, false)),
            8,
          )}
          {renderField('تعداد اقساط', 'numberOfPayments', numberOfPayments, 8)}
          {renderField(
            'مبغ اقساط',
            'payment',
            addRialString(toCommaSeparatedNumber(payment, false)),
            8,
          )}
          {renderField(
            'فاصله اقساط',
            'paymentGapInMonths',
            `${paymentGapInMonths} ماه`,
            8,
          )}
          {renderField(
            'سود سالانه',
            'yearlyInterest',
            `${yearlyInterest ? `%${yearlyInterest}` : yearlyInterest}`,
            8,
          )}
          {renderField(
            'تعداد ضامنین',
            'numberOfGuarantors',
            numberOfGuarantors,
            8,
          )}
        </Row>
      </div>
    </>
  );
};

LeasingFacilityTab.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

LeasingFacilityTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  getOpportunitiesAction: PropTypes.func.isRequired,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(LeasingFacilityTab));
