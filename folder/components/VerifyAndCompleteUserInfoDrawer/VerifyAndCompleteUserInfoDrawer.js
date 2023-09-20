import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getOpportunitiesAction } from '../../store/opportunities/opportunities.actions';
import { getProductFormsAction } from '../../store/product/product.actions';
import { selectProductAction } from '../../store/getProducts/getProducts.actions';
import CPDrawer from '../CP/CPDrawer';
import FormBuilder from '../FormBuilder';
// eslint-disable-next-line css-modules/no-unused-class
import s from './VerifyAndCompleteUserInfoDrawer.scss';

const VerifyAndCompleteUserInfoDrawer = props => {
  const { visible, onCancel, levantId } = props;
  const [visiblity, setVisiblity] = useState(false);

  useEffect(() => {
    setVisiblity(visible);
  }, [visible]);

  const closeDrawer = () => {
    onCancel();
    setVisiblity(false);
  };

  return (
    <CPDrawer
      style={{ marginTop: '62px' }}
      placement="left"
      visible={visiblity && visible}
      title="چاپ فرم"
      bodyStyle={{ padding: '0 24px' }}
      headerStyle={{ borderBottom: '1px solid #e8e8e8', marginBottom: '24px' }}
      onClose={closeDrawer}
      closable
      width="20%"
      mask
      inDrawer
      maskClosable
    >
      <FormBuilder
        schema={{}}
        onSubmit={() => {}}
        onCancel={() => {}}
        layout="vertical"
        submitLabel="ذخیره"
        cancelLabel="انصراف"
        loading={false}
      />
    </CPDrawer>
  );
};
VerifyAndCompleteUserInfoDrawer.defaultProps = {
  visible: false,
  onCancel: () => {},
  levantId: null,
};
VerifyAndCompleteUserInfoDrawer.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  levantId: PropTypes.string,
};

const mapState = state => ({
  levantId: state.lead.data.levantId,
});
const mapDispatch = {
  getProductFormsAction,
  getOpportunitiesAction,
  selectProductAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(VerifyAndCompleteUserInfoDrawer));
