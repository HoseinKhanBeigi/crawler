import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddSaleOpportunityForm.scss';
import FormBuilder from '../FormBuilder';
import { schema } from './schema';
import { saleOpportunityServices } from '../../service/saleOpportunityService';
import useSaleOpportunityStates from '../../hooks/useSaleOpportunityStates';
import toCommaSeparatedNumber from '../../utils/toCommaSeparatedNumber';
import CPLoading from '../CP/CPLoading';
import useSaleProducts from '../../hooks/useSaleProducts';
import useLeadSearch from '../../hooks/useLeadSearch';

const AddSaleOpportunityForm = props => {
  const [postDataLoading, setPostDataLoading] = useState(false);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const { products: productsList } = useSaleProducts({
    getList: !props.editMode,
  });
  const [selectedSaleState, setSelectedSaleState] = useState(null);
  const saleStates = useSaleOpportunityStates();
  const [result, onSearch] = useLeadSearch();

  const handleSubmit = async form => {
    setPostDataLoading(true);
    const body = {
      ...form,
      expectedBudget: +toCommaSeparatedNumber(form.expectedBudget, true),
      saleProduct: {
        id: form.saleProduct,
      },
      ...(!props.withLeadSearch && {
        leadId: props.leadInfo.id,
      }),
    };
    let data;
    if (props.editMode) {
      data = await saleOpportunityServices.editSaleOpportunity(body);
    } else {
      data = await saleOpportunityServices.postNewSaleOpportunity(body);
    }
    setPostDataLoading(false);
    if (data) {
      const formatData = {
        ...data,
        accountFullName: props.initialValues?.accountFullName,
      };
      props.onSubmit(formatData);
    }
  };

  useEffect(() => {
    if (props.editMode) {
      setGetDataLoading(true);
    }
    if (saleStates.length && props.initialValues) {
      setSelectedSaleState(props.initialValues.saleState);
      setGetDataLoading(false);
    }
  }, [saleStates]);

  return (
    <div className={s.wrapper}>
      <CPLoading spinning={getDataLoading}>
        <FormBuilder
          schema={schema({
            searchLeadHandler: onSearch,
            searchLeadResult: result,
            selectedLead,
            setSelectedLead,
            productsList,
            saleStates,
            selectedSaleState,
            setSelectedSaleState,
            editMode: props.editMode,
            withLeadSearch: props.withLeadSearch,
          })}
          initialValues={props.initialValues}
          onSubmit={handleSubmit}
          layout="vertical"
          submitLabel={props.editMode ? 'ثبت تغییرات' : 'ثبت فرصت فروش'}
          cancelLabel="انصراف"
          onCancel={props.onCancel}
          loading={postDataLoading}
        />
      </CPLoading>
    </div>
  );
};

AddSaleOpportunityForm.defaultProps = {
  onSubmit: () => {},
  initialValues: undefined,
  editMode: false,
  onCancel: () => {},
  withLeadSearch: true,
};
AddSaleOpportunityForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  editMode: PropTypes.bool,
  onCancel: PropTypes.func,
  withLeadSearch: PropTypes.bool,
  leadInfo: PropTypes.object.isRequired,
};

const mapState = state => ({
  leadInfo: state.lead?.data,
});

export default connect(mapState)(withStyles(s)(AddSaleOpportunityForm));
