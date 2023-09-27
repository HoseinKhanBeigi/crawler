import React, { memo } from 'react';
import { Col, Row, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import opportunityService from '../../../../../../service/opportunityService';
import s from './StackHoldersForm.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
import { getOpportunitiesAction } from '../../../../../../store/opportunities/opportunities.actions';

/**
 * This method renders the inputs
 * @param text: the Persian label shown in input field
 * @param name: the name of field used to change it
 * @param val: the value of input used to show
 */

const StackHoldersForm = props => {
  const { stackHolder, opportunityId } = props;
  const { firstName, lastName, nationalCode, levantId, rolelist } = stackHolder;

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const onEditAction = async (value, name) => {
    const newName = name.toString();
    const body = {
      businessStakeholdersDto: {
        stakeholders: [
          {
            [newName]: value,
            nationalCode,
          },
        ],
      },
    };
    await opportunityService.editIdentificationInfo(
      levantId,
      opportunityId,
      body,
    );
    reload();
  };

  const renderField = (
    text,
    name,
    val,
    withEdit = true,
    hasValidation = false,
  ) => (
    <Col lg={12}>
      <CPLabel label={text} className={cs(s.input)}>
        <CPInput
          value={val || ''}
          disabled
          hasValidation={hasValidation}
          name={name}
          onEditAction={onEditAction}
          withEdit={withEdit}
        />
      </CPLabel>
    </Col>
  );

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>اطلاعات فردی</span>
      </div>
      <Row type="flex" gutter={[12, 12]} className={cs(s.additionalInfo)}>
        {renderField('نام', 'firstName', firstName, true, true)}
        {renderField('نام خانوادگی', 'lastName', lastName, true, false)}
        {renderField('کد ملی', 'nationalCode', nationalCode, false, true)}
        <Col lg={24}>
          <CPLabel label="سمت" className={cs(s.input)}>
            {rolelist?.map(({ roleDesc }) => (
              <Tag className={cs(s.roleTag)}>{roleDesc}</Tag>
            ))}
          </CPLabel>
        </Col>
      </Row>
    </div>
  );
};

StackHoldersForm.propTypes = {
  stackHolder: PropTypes.object,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

StackHoldersForm.defaultProps = {
  stackHolder: null,
  opportunityId: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(memo(StackHoldersForm)));
export const StackHoldersFormTest = StackHoldersForm;
