/* eslint-disable import/prefer-default-export */
import { setCookie } from '../../utils';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  SELECT_PRODUCT_SUCCESS,
  GET_PRODUCTS_GROUPS_FAILURE,
  GET_PRODUCTS_GROUPS_REQUEST,
  GET_PRODUCTS_GROUPS_SUCCESS,
  SELECT_PRODUCT_GROUPS_SUCCESS,
} from './getProducts.constants';

export function getProductsRequest() {
  return {
    type: GET_PRODUCTS_REQUEST,
  };
}

export function getProductsSuccess(data) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: data,
  };
}

export function getProductsFailure(error) {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: error,
  };
}

export function selectProductSuccess(data) {
  return {
    type: SELECT_PRODUCT_SUCCESS,
    payload: data,
  };
}

export function setProductGroupsRequest() {
  return {
    type: GET_PRODUCTS_GROUPS_REQUEST,
  };
}

export function setProductGroupsSuccess(data) {
  return {
    type: GET_PRODUCTS_GROUPS_SUCCESS,
    payload: data,
  };
}

export function setProductGroupsFailure(error) {
  return {
    type: GET_PRODUCTS_GROUPS_FAILURE,
    payload: error,
  };
}

export function selectProductGroupsSuccess(data) {
  return {
    type: SELECT_PRODUCT_GROUPS_SUCCESS,
    payload: data,
  };
}

export function getGetProductsAction() {
  return (dispatch, getState, { getGetProductsRequest }) => {
    dispatch(getProductsRequest());
    return getGetProductsRequest().then(data => {
      if (data.err) {
        dispatch(getProductsFailure(data));
        return false;
      }
      dispatch(getProductsSuccess(data.resp));
      return data.resp;
    });
  };
}

// get Product Groups list by CONTEXT
export function getProductGroupsAction() {
  return (dispatch, getState, { getProductGroupsRequest }) => {
    dispatch(setProductGroupsRequest());
    return getProductGroupsRequest().then(data => {
      if (data.err) {
        dispatch(setProductGroupsFailure(data));
        return false;
      }
      dispatch(setProductGroupsSuccess(data.resp));
      return data.resp;
    });
  };
}

/*
 * find current application's products, then select first one.
 */
export function selectFirstProduct() {
  return (dispatch, getState) => {
    const products = getState().getProducts.data;
    if (products?.length > -1) {
      setCookie('product_name', products[0]?.code, 86400);
      dispatch(selectProductSuccess(products[0]?.code));

      return products[0]?.code;
    }
    return null;
  };
}

/*
 * select product by code (CREDIT_SCORE/...)
 */
export function selectProductAction(selectedProductCode) {
  return (dispatch, getState) => {
    setCookie('product_name', selectedProductCode, 86400);
    const products = getState().getProducts.data;
    const selectedProductData = products?.find(
      values => values.code === selectedProductCode,
    );
    if (selectedProductData) {
      dispatch(selectProductSuccess(selectedProductCode));
    }
  };
}

/*
 * select product groups by context
 */
export function selectProducGroupstAction(selectedProductGroupsCode) {
  return (dispatch, getState) => {
    setCookie('product_group_name', selectedProductGroupsCode, 86400);
    const { productGroups } = getState().getProducts;
    const selectedProductGroupsData = productGroups?.find(
      values => values.code === selectedProductGroupsCode,
    );
    if (selectedProductGroupsData) {
      dispatch(selectProductGroupsSuccess(selectedProductGroupsCode));
    }
  };
}
