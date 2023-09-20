import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './BussinessInfoFields.scss';
import CPInput from '../../../../../CP/CPInput/CPInput';
import ApproveButton from '../../../../../ApproveButton/ApproveButton';
import { employeeSizeData } from '../../../../../ModalForVerifyDataRenderUserInfo/schema';
import partyService from '../../../../../../service/partyService';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */
const renderField = (text, name, val = '') => (
  <div className={cs('col-md-4', s.input)}>
    <CPInput label={text} value={val} disabled />
  </div>
);

const BussinessInfoFields = props => {
  const [classificationCategory, setClassificationCategory] = useState(null);

  const getClassificationData = async () => {
    const { identificationWithDocs: { category } = null } = props;

    if (category) {
      try {
        const result = await partyService.getClassification(category);
        setClassificationCategory(result?.classifier);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getClassificationData();
  });

  const { identification, identificationWithDocs, stateData } = props;
  const { businessInfoStatus } = stateData;
  const {
    businessName,
    registerNumber,
    employeeSize,
    qrSeries,
    rejectedByQC,
  } = identificationWithDocs;
  const primary = identification?.businessInfoStatus;

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>مشخصات کسب و کار</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={props.handleChange}
            primaryValue={primary}
            value={businessInfoStatus}
            item="businessInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className={cs('row', s.additionalInfo)}>
        {renderField('نام کسب و کار', 'businessName', businessName)}
        {renderField('شماره جواز', 'registerNumber', registerNumber)}
        {renderField('دسته فعالیت', 'category', classificationCategory)}
        {renderField(
          'تعداد کارمندان',
          'employeeSize',
          employeeSizeData.find(si => si.value === employeeSize).text,
        )}
        {renderField('تعداد QR درخواستی', 'qrSeries', qrSeries)}
      </div>
    </div>
  );
};

BussinessInfoFields.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

BussinessInfoFields.defaultProps = {
  identificationWithDocs: {},
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
)(withStyles(s)(memo(BussinessInfoFields)));
export const ModalForCheckIdentificationTabBusinessProfileFieldsTest = BussinessInfoFields;
