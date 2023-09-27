import { useCallback, useEffect, useRef, useState } from 'react';
import useSaleProducts from '../../../hooks/useSaleProducts';
import useCrmUsers from '../../../hooks/useCrmUsers';
import { filterFormFieldsName } from '../../../helpers/chartReportServiceHelpers';

/* eslint-disable no-case-declarations */

const useSaleReportsFilter = charts => {
  const [selectedChart, setSelectedChart] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterFormValues, setFilterFormValues] = useState(null);
  const {
    products: productsList,
    loading: saleProductsLoading,
  } = useSaleProducts();
  const { crmUsers, loading: crmUsersLoading } = useCrmUsers();
  const filterFormRef = useRef();

  useEffect(() => {
    setFilterFormValues({
      ...(charts[selectedChart]?.defaultDateFilter && {
        [filterFormFieldsName.date]: charts[selectedChart]?.defaultDateFilter,
      }),
    });
    return () => {
      setFilterFormValues(null);
    };
  }, [selectedChart, charts]);

  const toggleFilterDrawer = useCallback(() => {
    setIsFilterDrawerOpen(prevState => !prevState);
  }, []);

  const onSubmitFilters = form => {
    setFilterFormValues(form);
    toggleFilterDrawer();
  };

  const clearFiltersHandler = () => {
    // setFilterFormValues(null);
    setIsFilterDrawerOpen(false);
    // setFlattenFilterValues([]);
  };

  return {
    crmUsers,
    productsList,
    filterFormRef,
    selectedChart,
    crmUsersLoading,
    onSubmitFilters,
    setSelectedChart,
    filterFormValues,
    toggleFilterDrawer,
    isFilterDrawerOpen,
    setFilterFormValues,
    clearFiltersHandler,
    saleProductsLoading,
    setIsFilterDrawerOpen,
  };
};
export default useSaleReportsFilter;
