import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './CollateralInfoTab.scss';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import CPInput from '../../../CP/CPInput/CPInput';
import CollateralInfoDocs from './Components/CollateralInfoDocs/CollateralInfoDocs';
import { collateralTypes } from './schema';

const CollateralInfoTab = props => {
  const { className, stateData, handleChange, identificationWithDocs } = props;
  const {
    collateralInfo: { amount, collateralType, organizationCode },
  } = identificationWithDocs;

  const renderField = (text, name, val) => (
    <CPLabel label={text} className={cs('col-md-4', s.input)}>
      <CPInput value={val || ''} disabled />
    </CPLabel>
  );

  return (
    <div className={className}>
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>مشخصات اعتبار</span>
        </div>
        <div className={cs('row', s.additionalInfo)}>
          {renderField('اعتبار درخواستی', 'amount', amount?.toLocaleString())}
          {renderField(
            'نوع وثیقه',
            'collateralType',
            collateralTypes[collateralType] || '???',
          )}
          {renderField('کد سازمان', 'organizationCode', organizationCode)}
        </div>
      </div>
      <CollateralInfoDocs stateData={stateData} handleChange={handleChange} />
    </div>
  );
};

CollateralInfoTab.propTypes = {
  className: PropTypes.string,
  stateData: PropTypes.object.isRequired,
  identificationWithDocs: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

CollateralInfoTab.defaultProps = {
  className: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
});

export default connect(mapState)(withStyles(s)(memo(CollateralInfoTab)));
