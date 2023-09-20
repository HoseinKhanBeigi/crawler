import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CPButton from '../../../CP/CPButton';
import CPMultiSelect from '../../../CP/CPMultiSelect';
import { unitServices } from '../../../../service/unitService';

const AddUnitProductsForm = props => {
  const {
    onSubmit,
    unitType,
    onCancel,
    unitId,
    initialProducts,
    products: allProducts,
    submitLabel,
    cancelLabel,
    operationType,
  } = props;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onSelectProduct = value => setSelectedProducts(value);

  const availableProducts = lists => {
    const filteredProducts = lists?.map(({ title, id }) => ({
      text: title,
      value: id,
    }));
    return filteredProducts;
  };

  function setInitialProduct() {
    const init = initialProducts.map(({ id }) => id);
    setSelectedProducts(init);
  }

  useEffect(() => {
    const finalProduct = availableProducts(allProducts);
    setProducts(finalProduct);
    setInitialProduct();
  }, []);

  function makeProductsForBody() {
    const finalProdcut = selectedProducts?.map(item => ({
      id: item,
    }));
    return finalProdcut;
  }

  const handleSubmit = () => {
    setLoading(true);
    const body = {
      productsDTO: makeProductsForBody(),
      id: unitId,
      operationType,
    };
    unitServices.updateUnitRequest(body, unitType).then(
      response => {
        setLoading(false);
        onSubmit(response);
      },
      () => setLoading(false),
    );
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          <div>
            <small>محصول</small>
            <CPMultiSelect
              value={selectedProducts}
              onChange={(value, opt) => {
                onSelectProduct(value, opt);
              }}
              dataSource={products}
            />
          </div>
        </Col>
      </Row>
      <Divider />
      <Row type="flex" justify="end">
        <CPButton
          type="default"
          style={{ margin: '0 8px' }}
          onClick={handleCancel}
        >
          {cancelLabel}
        </CPButton>
        <CPButton
          loading={loading}
          type="primary"
          disabled={!selectedProducts?.length}
          onClick={handleSubmit}
        >
          {submitLabel}
        </CPButton>
      </Row>
    </div>
  );
};
AddUnitProductsForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  unitId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  products: PropTypes.array,
  submitLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  unitType: PropTypes.string,
  initialProducts: PropTypes.array,
  operationType: PropTypes.string.isRequired,
};
AddUnitProductsForm.defaultProps = {
  products: [],
  cancelLabel: 'انصراف',
  initialProducts: [],
  unitType: '',
};
const mapStateToProps = state => ({
  products: state.getProducts.data,
});
export default connect(mapStateToProps)(AddUnitProductsForm);
