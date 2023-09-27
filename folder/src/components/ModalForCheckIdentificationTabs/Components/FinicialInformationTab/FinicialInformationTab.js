import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FinicialInformationTab.scss';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import CPInput from '../../../CP/CPInput/CPInput';
import ApproveButton from '../../../ApproveButton/ApproveButton';

const FinicialInformationTab = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
  } = props;
  const { financialInfoStatus } = stateData;
  const primary = identification?.personalInfoStatus;
  const { rejectedByQC } = identificationWithDocs || {};
  // get fields
  const {
    sales,
    ebit,
    financialExpense,
    sumOfFacilitiesTaken,
    equityToAsset,
    sumOfCurrentDebt,
    sumOfCurrentAsset,
    sumOfAllAssets,
    version,
  } = identificationWithDocs || {};

  const renderField = (text, name, val) => (
    <CPLabel
      label={text}
      className={cs('col-md-6', s.input)}
      labelClasses={s.finicialInfoLabel}
    >
      <CPInput value={val} disabled name={name} />
    </CPLabel>
  );

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>اطلاعات مالی شرکت</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={handleChange}
            primaryValue={primary}
            value={financialInfoStatus}
            item="financialInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className={cs('row', s.additionalInfo)}>
        {renderField('فروش', 'sales', sales, false, false)}
        {renderField('سود عملیاتی', 'ebit', ebit, false, false)}
        {renderField(
          'هزینه مالی',
          'financialExpense',
          financialExpense,
          false,
          false,
        )}
        {renderField(
          'جمع حقوق صاحبان سهام',
          'equityToAsset',
          equityToAsset,
          false,
          false,
        )}
        {renderField(
          'جمع تسهیلات اخذ شده',
          'sumOfFacilitiesTaken',
          sumOfFacilitiesTaken,
          false,
          false,
        )}
        {renderField(
          'جمع بدهی های جاری',
          'sumOfCurrentDebt',
          sumOfCurrentDebt,
          false,
          false,
        )}
        {renderField(
          'جمع دارایی جاری',
          'sumOfCurrentAsset',
          sumOfCurrentAsset,
          false,
          false,
        )}
        {renderField(
          'جمع کل دارایی ها',
          'sumOfAllAssets',
          sumOfAllAssets,
          false,
          false,
        )}
        {renderField('ورژن محاسبه', 'version', version, false, false)}
      </div>
    </div>
  );
};

FinicialInformationTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
};

FinicialInformationTab.defaultProps = {
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
)(memo(withStyles(s)(FinicialInformationTab)));
export const ModalForCheckIdentificationTabPersonalProfileTest = FinicialInformationTab;
