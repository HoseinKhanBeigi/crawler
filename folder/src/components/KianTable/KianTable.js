import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Row, Table } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cs from 'classnames';

// Configs
import initialPaginationConfig from './config/initialPaginationConfig';
import { pageSizeInTableList } from '../../webConfig';
import onRowConfig from './config/onRowConfig';

// helpers
import { addRowIndex, addRowIndexColumn } from './helpers/addRowIndex';
import addDynamicSearchFields from './helpers/addDynamicSearchFields';
import {
  getTableDataFromLocalStorage,
  removeTableDataFromLocalStorage,
  saveTableDataInLocalStorage,
} from './helpers/persist';
import createDynamicColumns from './helpers/createDynamicColumns';
import createQueryParams from './helpers/createQueryParams';
import { configPagination } from './helpers/pagination';
import request from '../../utils/request';
import { generateURL } from '../../utils/request/url';
// Components
import ContextMenu from './components/ContextMenu';
import ActionColumn from './components/ActionColumn';
import SearchBox from './components/SearchBox';
import Toolbar from './components/Toolbar';

// Styles
// eslint-disable-next-line css-modules/no-unused-class
import s from './KianTable.scss';
import {
  setKianTableGlobalApi,
  unsetKianTableGlobalApi,
} from './helpers/globalApi';

/**
 * @constructor
 * @author Moein Alizadeh <TrueMoein@Gmail.com>
 * @maintainers Behrood Roozdar, Moein Alizadeh and other friends... ✔
 * @description I hope this module help us to make better data tables with built-in functionality likes:
 *  Sorting, filtering, pagination and more...🔱
 *  I wrote this module in React hooks, and I'm a beginner in this topic 👁️.
 *  So we can refactor all bad codes in the future together, like useReducer and etc... 💯
 * @copyright © Kian Table developed with ❤ in Kian Digital Co. All rights reserved.  <https://Kian.digital/>
 */

const KianTable = props => {
  /* ========================== props destructuring (Start) ========================== */
  const {
    searchData: presetSearchData,
    themeColor: presetColor,
    externalDataConverter,
    persistInLocalStorage,
    downloadExcelAction,
    excludeSearchFields,
    showActionButtons,
    withContextMenu,
    activityButton,
    toggleButton,
    actionButtons,
    columns: cols,
    rowSelection,
    withRowIndex,
    tableLayout,
    getResponse,
    withToolbar,
    contextMenu,
    onRowClick,
    filterType,
    sourceKey,
    endpoint,
    withSort,
    tableId,
    rowKey,
    withSearch,
    headerTitle,
    title,
    rowClassName,
    withPagination,
    setTotalElement,
  } = props;
  /* ========================== props destructuring (End) ========================== */

  /* ========================== States (Start) ========================== */
  const [searchData, setSearchData] = useState(presetSearchData); // Set searchData to create advanced search bar fields
  const [pagination, setPagination] = useState(initialPaginationConfig); // to set pagination of the table
  const [dynamicColumns, setDynamicColumns] = useState([]); // dynamic columns received from api
  const [filterQuery, setFilterQuery] = useState(null); // to set filterQuery and search params
  const [themeColor, setThemeColor] = useState(presetColor); // to set table theme color
  const [dataSource, setDataSource] = useState([]); // to set data source of the table
  const [showSearchBox, setShowSearchBox] = useState(''); // to set columns
  const [size, setSize] = useState(props.size); // to set size of the table
  const [loading, setLoading] = useState(true); // to show loading overlay
  const [columns, setColumns] = useState(cols); // to set columns
  const [totalRecord, setTotalRecord] = useState(0);
  /* ========================== States (End) ========================== */

  /* ========================== Component functions (Start) ========================== */
  // This function set data source
  const setValidDataSource = data => {
    const {
      [sourceKey]: content,
      pageable: { pageNumber, pageSize },
    } = data;
    if (content) {
      setDataSource(addRowIndex(content, pageNumber, pageSize));
      configPagination(data, setPagination, pagination);
    }
  };

  // This function set dataSource and add unique rowIndexes to the data
  const setData = data => {
    const validData = externalDataConverter
      ? externalDataConverter(data)
      : data;
    const { columns: dynamicCols, totalElements } = validData;
    setTotalRecord(totalElements);
    // if dynamic columns received from api request
    if (dynamicCols && !columns.length) {
      setColumns(createDynamicColumns(dynamicCols));
      setSearchData(addDynamicSearchFields(presetSearchData, dynamicCols));
    }
    // If there is any external converter we pass data to it, and received clean converted data, or we use default structure for it
    setValidDataSource(validData);
    if (dynamicCols) setDynamicColumns(dynamicCols);
  };

  // This function check received data for errors, If it's clear he call setData and configPagination
  const processData = (data, shouldPersist) => {
    setLoading(false);
    getResponse(data); // send data to parent component
    setData(data);
    if (shouldPersist) saveTableDataInLocalStorage(data, tableId);
  };

  // Main function to get data from endpoint props
  const getData = async (
    params = withPagination
      ? `page=0&size=${pagination?.pageSize || pageSizeInTableList}`
      : '',
    persist = false,
  ) => {
    const savedData = getTableDataFromLocalStorage(tableId);
    let newEndpoint = null;
    if (persist && savedData) {
      processData(savedData);
    } else {
      setLoading(true);
    }
    try {
      if (typeof endpoint === 'object') {
        newEndpoint = { ...endpoint };
        newEndpoint.url = `${newEndpoint.url}&${params}`;
        newEndpoint = generateURL(newEndpoint);
      } else {
        newEndpoint = `${endpoint}${
          endpoint.includes('?') && params?.length > 0
            ? '&'
            : params?.length > 0
            ? '?'
            : ''
        }${params}`;
      }
      const data = await request(newEndpoint).get({
        message: {
          error: `خطایی در دریافت ${title} بوجود آمده!`,
        },
      });
      setTotalElement(data.totalElements);
      processData(data, persist);
    } catch (e) {
      console.error(e);
      setDataSource([]);
      setPagination(initialPaginationConfig);
      setLoading(false);
    }
  };

  // this function will call when (Page, Sort, filter) is change.
  const onChange = (pageInfo, filter, sorter) => {
    getData(createQueryParams(pageInfo, filterQuery, sorter));
  };

  // This function is a refresher, just for expose to outside of this module
  const refreshTable = () => {
    getData(createQueryParams(pagination, filterQuery));
  };

  const initialGetData = () => {
    getData(undefined, persistInLocalStorage);
  };

  // This function reset all the data to initial values
  const resetTable = () => {
    removeTableDataFromLocalStorage(tableId);
    setSearchData(presetSearchData);
    setDynamicColumns([]);
    setFilterQuery(null);
    setColumns(cols);
    initialGetData();
  };

  // reFetch table data when filterQuery params changed
  useEffect(() => {
    if (filterQuery !== null) {
      getData(createQueryParams(null, filterQuery));
    }
  }, [filterQuery]);

  const getColumns = () => {
    const preCols = [...columns];
    const actionCol = {
      title: 'عملیات',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: row => <ActionColumn rowData={row} items={contextMenu} />,
    };
    if (contextMenu.length && dataSource.length) preCols?.push(actionCol);
    if (withRowIndex && dataSource.length)
      return addRowIndexColumn(preCols, withSort);
    return preCols;
  };

  // Reset columns received from props
  useEffect(() => {
    // This function return columns, (Dynamic columns or received columns from props)
    setColumns(cols);
  }, [cols]);

  // if presetSearch data changed, we have to setSearch data again.
  useEffect(() => {
    setSearchData(addDynamicSearchFields(presetSearchData, dynamicColumns));
  }, [presetSearchData, dynamicColumns]);

  // componentDidMount 🔥
  useEffect(() => {
    initialGetData();

    // to unset global api
    return () => {
      unsetKianTableGlobalApi(tableId);
    };
  }, []);
  /* ========================== Component functions (End) ========================== */

  /* ========================== Render components (Start) ========================== */
  const renderSearchBox = () => {
    if (searchData.length) {
      return (
        <SearchBox
          excludeSearchFields={excludeSearchFields}
          setShowSearchBox={setShowSearchBox}
          showSearchBox={showSearchBox}
          onFilter={setFilterQuery}
          filterType={filterType}
          fields={searchData}
          loading={loading}
        />
      );
    }

    return null;
  };

  const renderToolbar = () => {
    if (withToolbar) {
      return (
        <Toolbar
          downloadExcelAction={downloadExcelAction}
          showActionButtons={showActionButtons}
          setShowSearchBox={setShowSearchBox}
          activityButton={activityButton}
          toggleButton={toggleButton}
          actionButtons={actionButtons}
          showSearchBox={showSearchBox}
          setThemeColor={setThemeColor}
          resetTable={resetTable}
          setColumns={setColumns}
          themeColor={themeColor}
          setSize={setSize}
          loading={loading}
          columns={columns}
          tableId={tableId}
          size={size}
          headerTitle={headerTitle}
          totalRecord={totalRecord}
          withSearch={withSearch}
        />
      );
    }

    return null;
  };

  const wrapper = body => (
    <Dropdown
      placement="bottomRight"
      overlay={
        <ContextMenu
          actions={{ refreshTable, setSize, setThemeColor }}
          contextMenuItems={contextMenu}
          themeColor={themeColor}
          currentSize={size}
        />
      }
      trigger={['contextMenu']}
    >
      <tbody className={body.className}>{body.children}</tbody>
    </Dropdown>
  );

  const renderTableComponents = () => {
    const cp = {};
    if (withContextMenu) cp.body = { wrapper };
    return cp;
  };
  /* ========================== Render components (End) ========================== */

  /* ========================== Set global KianTableApi (Start)========================== */
  useEffect(() => {
    const tableApi = {
      setLoading, // to set loading from outside
      refreshTable, // to refresh table from outside with current pagination and filter status
      resetTable, // to reset table with default pagination and without any filtration
    };
    setKianTableGlobalApi(tableApi, tableId);
  }, [pagination, filterQuery, endpoint, cols]);
  /* ========================== expose table api (End) ========================== */

  return (
    <div className={cs(s.kianTable, themeColor, onRowClick && s.clickableRow)}>
      {renderToolbar()}
      {withSearch === true ? renderSearchBox() : null}
      <Row type="flex">
        <Col span={24}>
          <Table
            onRow={(onRowClick || withContextMenu) && onRowConfig(onRowClick)}
            rowSelection={dataSource.length ? rowSelection : null}
            components={renderTableComponents()}
            tableLayout={tableLayout}
            dataSource={dataSource}
            pagination={withPagination && pagination}
            columns={getColumns()}
            onChange={onChange}
            bordered
            loading={loading}
            rowKey={rowKey}
            size={size}
            rowClassName={rowClassName}
          />
        </Col>
      </Row>
    </div>
  );
};

KianTable.propTypes = {
  title: PropTypes.string,
  rowClassName: PropTypes.string,
  tableId: PropTypes.string.isRequired,
  externalDataConverter: PropTypes.func,
  searchData: PropTypes.array,
  getResponse: PropTypes.func,
  rowSelection: PropTypes.object,
  onRowClick: PropTypes.func,
  withRowIndex: PropTypes.bool,
  rowKey: PropTypes.string,
  endpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  downloadExcelAction: PropTypes.func,
  persistInLocalStorage: PropTypes.bool,
  filterType: PropTypes.string,
  sourceKey: PropTypes.string,
  tableLayout: PropTypes.oneOf(['auto', 'fixed']),
  size: PropTypes.oneOf(['default', 'middle', 'small']).isRequired,
  withToolbar: PropTypes.bool,
  withContextMenu: PropTypes.bool,
  themeColor: PropTypes.oneOf(['light', 'dark']).isRequired,
  columns: PropTypes.array,
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      tooltip: PropTypes.string,
      loading: PropTypes.bool,
      disabled: PropTypes.bool,
      invisible: PropTypes.bool,
    }),
  ),
  activityButton: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      loading: PropTypes.bool,
    }),
  ),
  toggleButton: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
    buttons: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }),
  showActionButtons: PropTypes.bool,
  contextMenu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ),
  excludeSearchFields: PropTypes.array,
  withSort: PropTypes.bool,
  withSearch: PropTypes.bool,
  withPagination: PropTypes.bool,
  setTotalElement: PropTypes.func,
  headerTitle: PropTypes.string,
};

KianTable.defaultProps = {
  getResponse: () => {},
  rowKey: 'rowIndex',
  rowSelection: null,
  externalDataConverter: null,
  onRowClick: undefined,
  filterType: '',
  rowClassName: '',
  sourceKey: 'content',
  persistInLocalStorage: true,
  tableLayout: 'auto',
  downloadExcelAction: null,
  withRowIndex: true,
  title: 'اطلاعات', // set title something like 'سرنخ‌ها' or 'افراد'...
  columns: [],
  searchData: [],
  withToolbar: true,
  showActionButtons: false,
  withContextMenu: true,
  actionButtons: [],
  activityButton: [],
  toggleButton: null,
  contextMenu: [],
  excludeSearchFields: [],
  withSort: true,
  withSearch: true,
  withPagination: true,
  headerTitle: '',
  setTotalElement: () => {},
};

const mapState = ({ settings }) => ({
  // eslint-disable-next-line camelcase
  size: settings.settings.globalSettings.table.size,
  themeColor: settings.settings.globalSettings.table.theme,
});

export default connect(mapState)(withStyles(s)(KianTable));
