import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { AutoComplete, Button, Divider, Tooltip } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OpportunitiesToolbar.scss';
import {
  getOpportunitiesAction,
  toggleShowEmptyPipelines,
  setOpportunitiesFiltering,
} from '../../../../store/opportunities/opportunities.actions';
import { selectProductAction } from '../../../../store/getProducts/getProducts.actions';
import history from '../../../../history';
import { DRAWER_FOR_OPPORTUNITIES_SORTING } from '../../../../components/ModalRoot/repository';
import withModal from '../../../../components/HOC/withModal';
import opportunityService from '../../../../service/opportunityService';
import CPToggleButton from '../../../../components/CP/CPToggleButton';
import HandleAclPermission from '../../../../components/HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';

const OpportunitiesToolbar = props => {
  const [activeTab, setActiveTab] = useState(null);
  const [loadingDownloadExcel, setLoadingDownloadExcel] = useState(false);
  const [options, setOptions] = useState([]);
  const [emptyResult, setEmptyResult] = useState('');

  const {
    visibleEmptyPipelines,
    selectedProduct,
    products,
    loading,
    sorting,
    filterBy,
    filterMyissus,
  } = props;

  useEffect(() => {
    setActiveTab(
      history?.location?.pathname === '/opportunities'
        ? 'cardView'
        : 'tableView',
    );
  }, []);

  const availableProducts = () =>
    products?.map(({ title, code }) => ({
      text: title,
      value: code,
    }));

  const selectProduct = async value => {
    await props.setOpportunitiesFiltering('all');
    await props.selectProductAction(value);
    props.setOpportunitiesFiltering('all');
    await props.getOpportunitiesAction();
  };

  const downloadExcel = async () => {
    try {
      setLoadingDownloadExcel(true);
      await opportunityService.downloadOpportunityExcelReport(selectedProduct);
    } finally {
      setLoadingDownloadExcel(false);
    }
  };

  const handleFilter = async value => {
    await props.setOpportunitiesFiltering(value);
    props.getOpportunitiesAction();
  };

  const filterButton = {
    onChange: handleFilter,
    defaultValue: 'all',
    buttons: [
      {
        label: 'همه فرصت‌ها',
        value: 'all',
      },
      {
        label: 'فرصت‌های من',
        value: 'myissuse',
      },
    ],
  };
  useEffect(() => {
    setOptions(availableProducts());
  }, []);

  const getPanelValue = searchText => {
    const searchResault = !searchText
      ? availableProducts()
      : availableProducts()?.filter(item => {
          if (item.text.includes(searchText)) {
            return item;
          }
          return false;
        });
    if (!searchResault.length) {
      setEmptyResult('نتیجه ای یافت نشد');
    }
    return searchResault;
  };

  return (
    <div className={s.toolbar}>
      <div style={{ marginLeft: 16 }}>
        <p className={s.toolbarTitle}>محصول :</p>
        <AutoComplete
          data-cy="select-product"
          className={s.select}
          onSearch={debounce(text => setOptions(getPanelValue(text)), 1000)}
          onSelect={selectProduct}
          placeholder={
            options?.filter(option => option.value === selectedProduct)[0]?.text
          }
          options={options}
          notFoundContent={emptyResult}
          defaultActiveFirstOption
          defaultValue={
            options?.filter(option => option.value === selectedProduct)[0]
              ?.value
          }
        >
          {options.map(item => (
            <AutoComplete.Option
              key={item.id}
              text={item.text}
              value={item.value}
            >
              {item.text}
            </AutoComplete.Option>
          ))}
        </AutoComplete>
      </div>
      <div className={s.tools}>
        {filterMyissus && (
          <>
            <CPToggleButton
              defaultValue={filterBy}
              onChange={filterButton.onChange}
              buttons={filterButton?.buttons}
            />
            <Divider type="vertical" dashed className={s.divider} />
          </>
        )}
        <Tooltip title="دانلود اکسل">
          <Button
            data-cy="download-excel"
            icon="download"
            type="default"
            onClick={downloadExcel}
            loading={loadingDownloadExcel}
            disabled={activeTab === 'tableView'}
          />
        </Tooltip>
        <Tooltip title="بارگزاری مجدد">
          <Button
            data-cy="reload"
            icon="reload"
            type="default"
            loading={loading}
            disabled={activeTab === 'tableView'}
            onClick={props.getOpportunitiesAction}
          />
        </Tooltip>
        <Tooltip
          title={`${
            visibleEmptyPipelines ? 'مخفی کردن' : 'نمایش'
          } پایپلاین‌های خالی`}
        >
          <Button
            data-cy="hide-empty-pipelines"
            className={visibleEmptyPipelines ? null : 'active'}
            icon={visibleEmptyPipelines ? 'eye' : 'eye-invisible'}
            type="default"
            onClick={props.toggleShowEmptyPipelines}
            disabled={activeTab === 'tableView'}
          />
        </Tooltip>
        <Tooltip title="مرتب‌سازی">
          <Button
            className={sorting.sortField ? 'active' : null}
            data-cy="sort"
            disabled={activeTab === 'tableView'}
            icon={
              // eslint-disable-next-line no-nested-ternary
              sorting.sortField
                ? sorting.sortDirection === 'ASC'
                  ? 'sort-ascending'
                  : 'sort-descending'
                : 'ordered-list'
            }
            type="default"
            onClick={() =>
              props.showModalAction({
                type: DRAWER_FOR_OPPORTUNITIES_SORTING,
              })
            }
          />
        </Tooltip>
        <Divider type="vertical" dashed className={s.divider} />
        <Tooltip title="نمای کارتی">
          <Button
            data-cy="show-list"
            icon="project"
            type={activeTab === 'cardView' ? 'primary' : 'default'}
            onClick={() => history.push('/opportunities')}
          />
        </Tooltip>
        <HandleAclPermission wich={Actions.opprotunityAllProducts}>
          <Tooltip title="نمای جدولی">
            <Button
              data-cy="show-table"
              icon="table"
              type={activeTab === 'tableView' ? 'primary' : 'default'}
              onClick={() => history.push('/opportunities/table')}
            />
          </Tooltip>
        </HandleAclPermission>
      </div>
    </div>
  );
};

OpportunitiesToolbar.propTypes = {
  toggleShowEmptyPipelines: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  setOpportunitiesFiltering: PropTypes.func.isRequired,
  visibleEmptyPipelines: PropTypes.bool.isRequired,
  selectProductAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
  sorting: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  selectedProduct: PropTypes.string,
  loading: PropTypes.bool,
  filterMyissus: PropTypes.bool,
};

OpportunitiesToolbar.defaultProps = {
  selectedProduct: null,
  loading: false,
  filterMyissus: true,
};

const mapState = state => ({
  visibleEmptyPipelines: state.opportunities.visibleEmptyPipelines,
  selectedProduct: state.getProducts.selected,
  loading: state.opportunities.loading,
  sorting: state.opportunities.sorting,
  filterBy: state.opportunities.filterBy,
  products: state.getProducts.data,
});

const mapDispatch = {
  toggleShowEmptyPipelines,
  getOpportunitiesAction,
  selectProductAction,
  setOpportunitiesFiltering,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(OpportunitiesToolbar)));
