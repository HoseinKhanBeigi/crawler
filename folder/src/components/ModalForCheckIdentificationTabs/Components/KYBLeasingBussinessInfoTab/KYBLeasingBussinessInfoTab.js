import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './KYBLeasingBussinessInfoTab.scss';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import CPInput from '../../../CP/CPInput/CPInput';
import ApproveButton from '../../../ApproveButton/ApproveButton';

const reportCurrencyEnum = {
  RIAL: 'ریال',
  MILLION_RIALS: 'میلیون ریال',
  EURO: 'یورو',
  DOLLAR: 'دلار',
};
const registrationTypeEnum = {
  LIMITED_LIABILITY: 'مسئولیت محدود',
  PUBLIC_JOINT_STOCK: 'سهامی عام',
  PRIVATE_JOINT_STOCK: 'سهامی خاص',
  GENERAL_PARTNERSHIP: 'تضامنی',
};
const activityTypeEnum = {
  MANUFACTURING_COMPANY: 'تولیدی',
  MERCHANDISING_COMPANY: 'بازرگانی',
  SERVICE_COMPANY: 'خدماتی',
};
const KYBLeasingBussinessInfoTab = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
  } = props;
  const { businessInfoStatus } = stateData;
  const primary = identification?.personalInfoStatus;
  const { rejectedByQC } = identificationWithDocs || {};
  // get fields
  const {
    economicCode,
    fiscalYear,
    fiscalYearDescription,
    reportCurrencyType,
    registrationType,
    activityType,
    businessName,
  } = identificationWithDocs || {};

  const renderField = (text, name, val) => (
    <CPLabel
      label={text}
      className={cs('col-md-6', s.input)}
      labelClasses={s.finicialInfoLabel}
    >
      <CPInput value={val || ''} disabled name={name} />
    </CPLabel>
  );

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>اطلاعات شرکت</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={businessInfoStatus}
            item="businessInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className={cs('row', s.additionalInfo)}>
        {renderField('نام تجاری', 'businessName', businessName, true, true)}
        {renderField('کد اقتصادی', 'economicCode', economicCode, true, true)}
        {renderField('سال مالی', 'fiscalYear', fiscalYear, true, true)}
        {renderField(
          'توضیحات سال مالی',
          'fiscalYearDescription',
          fiscalYearDescription,
          false,
          false,
        )}
        {renderField(
          'نوع ارز گزارش',
          'reportCurrencyType',
          reportCurrencyEnum[reportCurrencyType],
          false,
          false,
        )}
        {renderField(
          'نوع ثبت',
          'registrationType',
          registrationTypeEnum[registrationType],
          false,
          false,
        )}
        {renderField(
          'نوع فعالیت',
          'activityType',
          activityTypeEnum[activityType],
          false,
          false,
        )}
      </div>
    </div>
  );
};

KYBLeasingBussinessInfoTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
};

KYBLeasingBussinessInfoTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(memo(withStyles(s)(KYBLeasingBussinessInfoTab)));
export const ModalForCheckIdentificationTabPersonalProfileTest = KYBLeasingBussinessInfoTab;
