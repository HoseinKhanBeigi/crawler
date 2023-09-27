import React, { useState, useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CPRadio from '../CP/CPRadio';
import FormGenerator from '../FormGenerator';
import {
  getLeadFormFieldsAction,
  postAddLeadAction,
  putLeadAction,
} from '../../store/lead/lead.actions';
import CPMessage from '../CP/CPMessage';

const typeList = [
  {
    value: 'person',
    name: 'حقیقی',
  },
  {
    value: 'business',
    name: 'حقوقی',
  },
];

const leadTypeList = {
  person: 'PERSON',
  business: 'BUSINESS',
};

const AddLeadForm = props => {
  const {
    initialValue,
    isEditMode,
    isSubmitting,
    onFormSubmit,
    leadInfo,
    inputPerRow,
    submitLabel,
    levantId,
    leadGenerationChannel,
    lead,
    // leadType used for legalLead and individualLead in that state we do not want to select type of lead
    leadType,
  } = props;
  const initialActiveForm = leadInfo?.leadType
    ? leadInfo?.leadType?.toLowerCase()
    : 'person';
  const [activeForm, setActiveForm] = useState(
    leadType && leadType === 'business'
      ? 'business'
      : leadType && leadType === 'person'
      ? 'person'
      : initialActiveForm,
  );
  const [initialValues, setInitialValues] = useState(null);
  const [leadFieldColumns, setLeadFieldColumns] = useState(null);

  useEffect(() => {
    if (leadType) {
      props.getLeadFormFieldsAction(leadTypeList[leadType], true, true);
    } else {
      props.getLeadFormFieldsAction('PERSON', true, true);
      props.getLeadFormFieldsAction('BUSINESS', true, true);
    }
  }, []);

  useEffect(() => {
    if (leadType) {
      if (leadType === 'person') {
        setLeadFieldColumns(lead?.person);
      } else if (leadType === 'business') {
        setLeadFieldColumns(lead?.business);
      } else {
        setLeadFieldColumns(lead?.getLeadFormFieldsData);
      }
    } else if (!isEditMode) {
      if (activeForm === 'person') {
        setLeadFieldColumns(lead?.person);
      } else if (activeForm === 'business') {
        setLeadFieldColumns(lead?.business);
      } else {
        setLeadFieldColumns(lead?.getLeadFormFieldsData);
      }
    }
  }, [activeForm, leadType, lead]);

  useEffect(() => {
    setInitialValues(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setInitialValues(leadFieldColumns);
  }, [leadFieldColumns]);

  const onSubmit = formData => async () => {
    const newData = formData?.filter(items => items.value);
    const body = {
      fieldValueDtos: newData,
    };
    let result;
    if (isEditMode) {
      body.levantId = levantId;
      result = await props.putLeadAction(
        body,
        leadTypeList[leadType]?.toLowerCase(),
      );
    } else {
      if (leadGenerationChannel)
        body.leadGenerationChannel = leadGenerationChannel;
      body.leadType = activeForm.toUpperCase();
      result = await props.postAddLeadAction(body, activeForm);
    }

    if (result.status === 406) {
      CPMessage('سرنخ تکراری می باشد.', 'error');
    } else if (result.status === 500) {
      CPMessage('ارتباط با سرور قطع می باشد', 'error');
    } else {
      CPMessage('با موفقیت ثبت شد.', 'success');
      onFormSubmit(result);
    }
  };

  const handleChangeActiveForm = e => {
    setActiveForm(e.target.value);
  };

  return (
    <>
      <>
        {!isEditMode && !leadType && (
          <>
            <Row type="flex" gutter={32}>
              <Col span={24}>
                <h4>نوع لید:</h4>
                <CPRadio
                  className="margin-b-10"
                  model={typeList}
                  size="small"
                  value={activeForm}
                  onChange={handleChangeActiveForm}
                />
              </Col>
            </Row>
            <Divider dashed />
          </>
        )}
      </>
      <Row type="flex" gutter={24}>
        <FormGenerator
          initialValues={initialValues}
          fields={leadFieldColumns}
          inputPerRow={inputPerRow}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitText={isEditMode ? 'ویرایش' : submitLabel}
        />
      </Row>
    </>
  );
};

AddLeadForm.propTypes = {
  getLeadFormFieldsAction: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
  postAddLeadAction: PropTypes.func.isRequired,
  putLeadAction: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  leadGenerationChannel: PropTypes.string,
  leadInfo: PropTypes.object,
  onFormSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  levantId: PropTypes.string,
  leadType: PropTypes.string,
  inputPerRow: PropTypes.number,
  lead: PropTypes.array,
  initialValue: PropTypes.array,
};

AddLeadForm.defaultProps = {
  isEditMode: false,
  isSubmitting: false,
  leadInfo: null,
  leadGenerationChannel: null,
  levantId: null,
  inputPerRow: 3,
  submitLabel: 'ثبت',
  onFormSubmit: () => {},
  leadType: null,
  lead: [],
  initialValue: [],
};

const mapState = state => ({
  leadInfo: state.lead.data,
  isSubmitting: state.lead.postAddLeadLoading,
  lead: state.lead,
});

const mapDispatch = {
  postAddLeadAction,
  putLeadAction,
  getLeadFormFieldsAction,
};
export default connect(mapState, mapDispatch)(AddLeadForm);
