import { useEffect, useState } from 'react';
import { saleProductServices } from '../service/saleProductServices';

const getSaleProductsList = async () => {
  const data = await saleProductServices.getAllSaleProduct();
  let saleProducts;
  if (data) {
    const { content } = data;
    saleProducts = [...content];
  }
  return saleProducts;
};

const useSaleProducts = (options = { getList: true }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const addSaleProduct = product =>
    saleProductServices.addNewSaleProduct(product);
  const editSaleProduct = product =>
    saleProductServices.editSaleProduct(product);

  useEffect(() => {
    if (options.getList) {
      setLoading(true);
      getSaleProductsList().then(response => {
        setLoading(false);
        setProducts(response);
      });
    }
  }, []);

  return {
    products,
    addSaleProduct,
    editSaleProduct,
    loading,
  };
};
export default useSaleProducts;
