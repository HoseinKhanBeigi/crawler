import React, { memo } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GuarantorsForm.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
// import { getOpportunitiesAction } from '../../../../../../store/opportunities/opportunities.actions';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */

const GuarantorsForm = props => {
  const { guarantors } = props;
  const { firstName, lastName, nationalCode, mobilePhone } = guarantors;

  const renderField = (text, name, val) => (
    <Col lg={12}>
      <CPLabel label={text} className={cs(s.input)}>
        <CPInput value={val || ''} disabled name={name} />
      </CPLabel>
    </Col>
  );

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>مشخصات ضامنین</span>
      </div>
      <Row type="flex" gutter={[12, 12]} className={cs(s.additionalInfo)}>
        {renderField('نام', 'firstName', firstName)}
        {renderField('نام خانوادگی', 'lastName', lastName)}
        {renderField('شماره تلفن', 'mobilePhone', mobilePhone)}
        {renderField('کد ملی', 'nationalCode', nationalCode)}
      </Row>
    </div>
  );
};

GuarantorsForm.propTypes = {
  guarantors: PropTypes.object,
};

GuarantorsForm.defaultProps = {
  guarantors: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  // opportunityId: state.opportunities.identificationWithDocsOpportunityId,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(memo(GuarantorsForm)));
export const GuarantorsFormTest = GuarantorsForm;
