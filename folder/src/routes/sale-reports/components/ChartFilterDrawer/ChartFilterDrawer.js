import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './ChartFilterDrawer.scss';
import ReportChartsFilterForm from '../ReportChartsFilterForm/ReportChartsFilterForm';
import CPButton from '../../../../components/CP/CPButton';
import CPDrawer from '../../../../components/CP/CPDrawer';

const ChartFilterDrawer = ({
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  formValues,
  onSubmitFilters,
  filterFormRef,
  crmUsers,
  productsList,
  loading,
  filterOptions,
}) => (
  <CPDrawer
    width="420"
    className={s.drawerWrapper}
    title="فیلترها"
    placement="left"
    closable
    destroyOnClose
    mask
    maskClosable
    visible={isFilterDrawerOpen}
    onClose={() => {
      setIsFilterDrawerOpen(false);
    }}
  >
    <div className={s.container}>
      <ReportChartsFilterForm
        filterOptions={filterOptions}
        value={formValues}
        onSubmit={onSubmitFilters}
        ref={filterFormRef}
        crmUsers={crmUsers}
        saleProducts={productsList}
        loading={loading}
      />
    </div>
    <div className={s.footer}>
      <CPButton type="default" onClick={() => setIsFilterDrawerOpen(false)}>
        انصراف
      </CPButton>
      <CPButton
        type="primary"
        onClick={() => {
          filterFormRef.current.submit();
        }}
      >
        اعمال فیلتر
      </CPButton>
    </div>
  </CPDrawer>
);

ChartFilterDrawer.defaultProps = {
  formValues: null,
};

ChartFilterDrawer.propTypes = {
  isFilterDrawerOpen: PropTypes.bool.isRequired,
  setIsFilterDrawerOpen: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  onSubmitFilters: PropTypes.func.isRequired,
  filterFormRef: PropTypes.object.isRequired,
  crmUsers: PropTypes.array.isRequired,
  productsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  filterOptions: PropTypes.object.isRequired,
};

export default withStyles(s)(ChartFilterDrawer);
