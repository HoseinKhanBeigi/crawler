import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import branchManagementService from '../../service/branchManagementService';
import CPMultiSelect from '../CP/CPMultiSelect';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ProductEmployeeObserver.scss';

const ProductEmployeeObserver = props => {
  const { products, onSuccess, okTitle, employeeInfoDetail, editMode } = props;
  const [employeeProducts, setEmployeeProducts] = useState([]);
  const [productsValue, setProductsValue] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangePipeline = value => {
    setProductsValue(value);
  };

  const availableProducts = () => {
    const filteredProducts = products?.map(({ title, code }) => ({
      text: title,
      value: code,
    }));
    setEmployeeProducts(filteredProducts);
  };

  const makeBody = items => {
    const productsReady = [];
    items.map(item => productsReady.push({ productCode: item }));
    return { accesses: productsReady };
  };

  const submitProducts = () => {
    if (productsValue.length || editMode) {
      setLoading(true);
      branchManagementService
        .putChangeProductPipelineUserAccess(
          makeBody(productsValue),
          employeeInfoDetail?.userId,
        )
        .then(
          () => {
            onSuccess();
            setLoading(false);
          },
          () => {
            setLoading(false);
          },
        );
    } else
      CPMessage('لطفا ابتدا لیست پایپ لاین های خود را ایجاد کنید!', 'warning');
  };

  useEffect(() => {
    availableProducts();

    function initProucts() {
      const { userId } = employeeInfoDetail;
      const productsCodeList = [];
      const makePipelineProductListInit = items => {
        const list = [...items];
        list.map(value => {
          productsCodeList.push(value.productCode);
          return value;
        });
        setProductsValue(productsCodeList);
      };
      branchManagementService.getUserPipelineProductList(userId).then(
        response => {
          const { accesses } = response;
          if (accesses?.length) {
            makePipelineProductListInit(accesses);
          }
        },
        () => {
          CPMessage('خطا در دریافت لیست محصولات!', 'error');
        },
      );
    }

    if (editMode) initProucts();
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <div
            className={s.employeeInfoDescription_container}
            style={{ minHeight: '308px' }}
          >
            <small>محصول</small>
            <CPMultiSelect
              value={productsValue}
              onChange={(value, opt) => {
                onChangePipeline(value, opt);
              }}
              dataSource={employeeProducts}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Divider />
      </Row>
      <Row
        gutter={24}
        style={{ justifyContent: 'space-between', direction: 'ltr' }}
      >
        <Col span={24} style={{ textAlign: 'left' }}>
          <CPButton type="primary" onClick={submitProducts} loading={loading}>
            {okTitle}
          </CPButton>
        </Col>
      </Row>
    </>
  );
};
ProductEmployeeObserver.propTypes = {
  products: PropTypes.array,
  okTitle: PropTypes.string,
  onSuccess: PropTypes.func,
  employeeInfoDetail: PropTypes.object,
  editMode: PropTypes.bool,
};
ProductEmployeeObserver.defaultProps = {
  products: [],
  employeeInfoDetail: {},
  editMode: false,
  okTitle: 'ثبت و گام بعدی',
  onSuccess: () => {},
};
const mapStateToProps = state => ({
  products: state.getProducts.data,
});
export default connect(
  mapStateToProps,
  null,
)(withStyles(s)(ProductEmployeeObserver));
