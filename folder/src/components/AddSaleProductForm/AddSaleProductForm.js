import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormBuilder from '../FormBuilder';
import { schema } from './schema';
import toCommaSeparatedNumber from '../../utils/toCommaSeparatedNumber';
import useSaleProducts from '../../hooks/useSaleProducts';

const AddSaleProductForm = props => {
  const [postDataLoading, setPostDataLoading] = useState(false);
  const { editSaleProduct, addSaleProduct } = useSaleProducts({
    getList: false,
  });

  const handleSubmit = async form => {
    setPostDataLoading(true);
    const body = {
      ...form,
      productPrice: +toCommaSeparatedNumber(form.productPrice, true),
    };
    if (!props.editMode) {
      await addSaleProduct(body);
    } else {
      await editSaleProduct(body);
    }
    setPostDataLoading(false);
    props.onSubmit(body);
  };

  return (
    <FormBuilder
      schema={schema}
      initialValues={props.initialValues}
      onSubmit={handleSubmit}
      layout="vertical"
      submitLabel={props.editMode ? 'ثبت تغییرات' : 'ایجاد محصول'}
      cancelLabel="انصراف"
      onCancel={props.onCancel}
      loading={postDataLoading}
    />
  );
};

AddSaleProductForm.defaultProps = {
  onSubmit: () => {},
  initialValues: undefined,
  editMode: false,
  onCancel: () => {},
};
AddSaleProductForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  editMode: PropTypes.bool,
  onCancel: PropTypes.func,
};

const mapState = state => ({
  leadInfo: state.lead?.data,
});

export default connect(mapState)(AddSaleProductForm);
