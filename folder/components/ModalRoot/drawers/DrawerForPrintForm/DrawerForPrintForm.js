import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Row } from 'antd';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import { getProductFormsAction } from '../../../../store/product/product.actions';
import { selectProductAction } from '../../../../store/getProducts/getProducts.actions';
import formsService from '../../../../service/formsService';
import documentService from '../../../../service/documentService';
import { DRAWER_FOR_PRINT_FORM } from '../../repository';
import CPSelect from '../../../CP/CPSelect';
import CPEmpty from '../../../CP/CPEmpty';
import CPButton from '../../../CP/CPButton';
import CPLoading from '../../../CP/CPLoading';
// eslint-disable-next-line css-modules/no-unused-class
import s from './DrawerForPrintForm.scss';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForPrintForm = props => {
  const { data, userInfo, levantId } = props;
  const [selectedProduct, setSelectedProduct] = useState(props.selectedProduct);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  function closeDrawer() {
    setVisible(false);
  }

  const getProductForm = async product => {
    setLoading(true);
    await props.getProductFormsAction({ product, levantId });
    setLoading(false);
  };

  useEffect(() => {
    getProductForm(props.selectedProduct);
  }, []);

  const printForm = async (e, formId, formName) => {
    if (e) {
      e.stopPropagation();
    }

    const fileName = `${formName}-${userInfo.firstName}-${userInfo.lastName}-${userInfo.levantId}.pdf`;

    await formsService.downloadForm(formId, levantId, fileName);
    props.getProductFormsAction({
      product: selectedProduct,
      levantId,
    });
    await documentService.insertPrintActivity(formName, 'pdf', levantId);
  };

  const renderForm = () => {
    if (data?.length > 0) {
      return data?.map((item, index) => (
        <Row gutter={24} type="flex" key={item.id}>
          <Col span={12} style={{ marginBottom: '12px' }}>
            <b>{index + 1} . </b>
            {item.title}
            {item.required ? <b className="required">*</b> : undefined}
          </Col>
          <Col span={12} style={{ marginBottom: '12px', textAlign: 'left' }}>
            <div className={s.sign}>
              {item.signed ? 'امضاء شده' : 'امضاء نشده'}
            </div>
            <CPButton
              icon="printer"
              type="primary"
              onClick={e => {
                printForm(e, item.id, item.title);
              }}
            />
          </Col>
        </Row>
      ));
    }
    return <CPEmpty description="سندی موجود نیست!" />;
  };

  const changeProduct = p => {
    setSelectedProduct(p);
    getProductForm(p);
  };

  const availableProducts = () =>
    props.products.map(item => ({
      text: item.title,
      value: item.code,
    }));
  return (
    <KianDrawer
      title="چاپ فرم"
      drawerId={DRAWER_FOR_PRINT_FORM}
      visible={visible}
      onClose={closeDrawer}
    >
      <Row gutter={24}>
        <Col span={24} style={{ marginBottom: '24px' }}>
          <p className={s.toolbarTitle}>انتخاب محصول :</p>
          <CPSelect
            className={s.select}
            value={selectedProduct}
            dataSource={availableProducts()}
            onChange={e => {
              changeProduct(e);
            }}
          />
        </Col>
      </Row>
      <CPLoading tip="به روزرسانی لیست فرم‌ها..." spinning={loading}>
        {data?.length ? (
          renderForm()
        ) : (
          <CPEmpty description="سندی موجود نیست!" />
        )}
      </CPLoading>
    </KianDrawer>
  );
};

DrawerForPrintForm.defaultProps = {
  data: null,
  products: null,
  userInfo: {},
  levantId: null,
};
DrawerForPrintForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  getProductFormsAction: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  levantId: PropTypes.string,
  products: PropTypes.array,
  selectedProduct: PropTypes.string.isRequired,
};

const mapState = state => ({
  userInfo: state.lead.data.partyPerson,
  levantId: state.lead.data.levantId,
  data: state.product.data,
  products: state.getProducts.data,
  currentUser: state.opportunities.currentUser,
  selectedProduct: state.getProducts.selected,
});
const mapDispatch = {
  getProductFormsAction,
  getOpportunitiesAction,
  selectProductAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(DrawerForPrintForm));
