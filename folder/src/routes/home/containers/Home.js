import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getCookie, setCookie } from '../../../utils';
import s from './Home.scss';
import withModal from '../../../components/HOC/withModal';
import Charts from './Charts/Charts';
import {
  getGetProductsAction,
  selectProductAction,
} from '../../../store/getProducts/getProducts.actions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../serviceConfig';
import { MODAL_FOR_NESHAN_ACTIVITY_POPUP } from '../../../components/ModalRoot/repository';
import GeneralInfoCardsContainer from './GeneralInfoCardsContainer/GeneralInfoCardsContainer';
import HandleAclPermission from '../../../components/HandleAclPermission';
import { Actions } from '../../../utils/aclActions';

function Home(props) {
  useEffect(() => {
    const getProducts = async () => {
      const products = await props.getGetProductsAction();
      const currentProductName = getCookie('product_name');
      if (products?.length && !currentProductName) {
        // set first product as selected, then keep it in cookie.
        await props.selectProductAction(products[0]?.code);
        // res.cookie('product_name', products[0]?.code);
      } else if (products?.length && !currentProductName) {
        // keep (or set) selected product on page refresh
        const found = products.find(
          values => values.code === currentProductName,
        );
        if (found) {
          await props.selectProductAction(found.code);
        } else {
          await props.selectProductAction(products[0]?.code);
          // res.cookie('product_name', products[0]?.code);
        }
      }
    };
    getProducts();
    if (
      resolveVariable(BASE_VARIABLE_KEYS.CONTEXT) === 'LEVANT' &&
      !getCookie('displayedNeshanLogPop')
    ) {
      props.showModalAction({
        type: MODAL_FOR_NESHAN_ACTIVITY_POPUP,
      });
      setCookie('displayedNeshanLogPop', 'true');
    }
  }, []);
  return (
    <div className={s.root}>
      <HandleAclPermission wich={Actions.dashboardCardsRead}>
        <GeneralInfoCardsContainer />
      </HandleAclPermission>
      <Charts />
    </div>
  );
}

Home.propTypes = {
  getGetProductsAction: PropTypes.func.isRequired,
  selectProductAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  getGetProductsAction,
  selectProductAction,
};

export default connect(null, mapDispatch)(withStyles(s)(withModal(Home)));
