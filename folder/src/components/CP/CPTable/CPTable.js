import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'antd';
import s from './CPTable.scss';
import CPButton from '../CPButton';

class CPTable extends React.Component {
  static propTypes = {
    title: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.shape),
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node,
        key: PropTypes.string.isRequired,
        dataIndex: PropTypes.string,
        render: PropTypes.func, // (text: any, record: T, index: number) => React.ReactNode;
        align: PropTypes.oneOf(['left', 'right', 'center']),
        searchable: PropTypes.bool,
        onSearch: PropTypes.func,
        onFilter: PropTypes.func, // (value: any, record: T) => boolean,
        filterMultiple: PropTypes.bool,
        filterDropdown: PropTypes.node,
        filterDropdownVisible: PropTypes.bool,
        onFilterDropdownVisibleChange: PropTypes.func, // (visible: boolean) => void,
        defaultSortOrder: PropTypes.oneOf(['ascend', 'descend']),
        colSpan: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        className: PropTypes.string,
        fixed: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.oneOf(['left', 'right']),
        ]),
        filterIcon: PropTypes.node,
        filteredValue: PropTypes.arrayOf(PropTypes.any),
        sortOrder: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.oneOf(['ascend', 'descend']),
        ]),
        onCellClick: PropTypes.func, // (record: T, event: any) => void,
        onCell: PropTypes.func, // (record: T) => any,
        onHeaderCell: PropTypes.func, // (props: ColumnProps<T>) => any,
        filters: PropTypes.arrayOf(PropTypes.any), // ColumnFilterItem[]
        sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]), // boolean | CompareFn<T>,
        children: PropTypes.arrayOf(PropTypes.any), // ColumnProps<T>[]
      }),
    ).isRequired,
    showHeader: PropTypes.bool,
    onChange: PropTypes.func,
    onExpand: PropTypes.func,
    onExpandedRowsChange: PropTypes.func,
    onHeaderRow: PropTypes.func,
    onRow: PropTypes.func,
    pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]), // PaginationConfig
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]), // SpinProps
    bordered: PropTypes.bool,
    scroll: PropTypes.shape({
      x: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
      ]),
      y: PropTypes.number,
    }),
    size: PropTypes.oneOf(['default', 'middle', 'small']),
    rowSelection: PropTypes.shape({
      fixed: PropTypes.bool,
      getCheckboxProps: PropTypes.func,
      hideDefaultSelections: PropTypes.bool,
      selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
      columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selections: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.object),
      ]),
      type: PropTypes.oneOf(['checkbox', 'radio']),
      onChange: PropTypes.func,
      onSelect: PropTypes.func,
      onSelectAll: PropTypes.func,
      onSelectInvert: PropTypes.func,
    }),
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // (record) => string
    components: PropTypes.any, // TableComponents,
    rowClassName: PropTypes.func, // (record: T, index: number) => string,
    useFixedHeader: PropTypes.bool,
    onRowClick: PropTypes.func, // (record: T, index: number, event: Event) => void,
    childrenColumnName: PropTypes.string,
    bodyStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    locale: PropTypes.object,
    indentSize: PropTypes.number,
    footer: PropTypes.func, // (currentPageData: Object[]) => React.ReactNode,
    expandedRowRender: PropTypes.any,
    defaultExpandAllRows: PropTypes.bool,
    defaultExpandedRowKeys: PropTypes.arrayOf(
      PropTypes.string,
      PropTypes.number,
    ),
    expandedRowKeys: PropTypes.arrayOf(PropTypes.string, PropTypes.number),
    expandIconAsCell: PropTypes.bool,
    expandIconColumnIndex: PropTypes.number,
    expandRowByClick: PropTypes.bool,
    hideIndex: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    data: [],
    showHeader: true,
    onChange: () => {},
    onExpand: () => {},
    onExpandedRowsChange: () => {},
    onHeaderRow: () => {},
    onRow: () => {},
    pagination: false,
    loading: false,
    bordered: false,
    useFixedHeader: false,
    scroll: undefined,
    size: 'default',
    rowSelection: null,
    rowKey: undefined,
    components: undefined,
    rowClassName: undefined,
    onRowClick: undefined,
    childrenColumnName: undefined,
    bodyStyle: undefined,
    className: undefined,
    style: undefined,
    children: undefined,
    locale: undefined,
    indentSize: undefined,
    footer: null,
    expandedRowRender: null,
    defaultExpandAllRows: false,
    defaultExpandedRowKeys: undefined,
    expandedRowKeys: undefined,
    expandIconAsCell: true,
    expandIconColumnIndex: undefined,
    expandRowByClick: true,
    hideIndex: false,
  };

  constructor(props) {
    super(props);
    this.searchInput = [];
    this.state = {
      filterDropdownVisible: Array.apply(false, {
        length: props.columns.length,
      }),
      data: props.data,
      searchText: {},
      pagination: null,
      filter: null,
      sort: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  onInputChange = (event, index, key) => {
    const { searchText } = this.state;
    Object.assign(searchText, { [key]: event.target.value });
    this.setState({ searchText });
  };

  handleChange = (pagination, filter, sort) => {
    if (this.props.onChange)
      this.props.onChange(pagination, filter, sort, this.state.searchText);
    this.setState({ pagination, filter, sort });
  };

  handleSearch = (index, column) => {
    const { onChange } = this.props;
    const {
      searchText,
      filterDropdownVisible,
      pagination,
      filter,
      sort,
    } = this.state;
    if (column.onSearch && column.key)
      column.onSearch({ [column.key]: searchText[column.key] });

    if (onChange) onChange.apply(null, [pagination, filter, sort, searchText]);

    filterDropdownVisible[index] = false;
    this.setState({
      filterDropdownVisible,
      // for client-side search
      // data: data.filter(record => {
      //   let value = record[column.dataIndex];
      //   if (typeof value === 'string') {
      //     value = record[column.dataIndex].toLowerCase();
      //     if (value.includes(searchText[index])) {
      //       return record;
      //     }
      //   } else if (typeof value === 'number') {
      //     value = record[column.dataIndex].toString();
      //     if (value.includes(searchText[index])) {
      //       return record;
      //     }
      //   } else {
      //     return null;
      //   }
      //   return null;
      // }),
    });
  };
  render() {
    const {
      title,
      showHeader,
      columns,
      loading = false,
      pagination,
      bordered,
      onExpand,
      onExpandedRowsChange,
      onHeaderRow,
      onRow,
      scroll,
      size,
      rowSelection,
      rowKey,
      components,
      rowClassName,
      onRowClick,
      childrenColumnName,
      bodyStyle,
      className,
      style,
      children,
      locale,
      indentSize,
      footer,
      expandedRowRender,
      defaultExpandAllRows,
      defaultExpandedRowKeys,
      expandIconAsCell,
      expandIconColumnIndex,
      expandedRowKeys,
      expandRowByClick,
      useFixedHeader,
      hideIndex,
    } = this.props;
    columns.map((column, index) => {
      if (!('searchable' in column)) {
        return column;
      }
      return Object.assign(column, {
        filterDropdown: (
          <div className={s.searchContainer} key={column.key}>
            <Input
              ref={ele => {
                this.searchInput[index] = ele;
              }}
              // placeholder=""
              value={this.state.searchText && this.state.searchText[column.key]}
              onChange={event => this.onInputChange(event, index, column.key)}
              onPressEnter={() => this.handleSearch(index, column)}
            />
            <CPButton
              type="primary"
              shape="circle"
              icon="search"
              onClick={() => this.handleSearch(index, column)}
            />
          </div>
        ),
        filterIcon: <Icon type="search" />,
        filterDropdownVisible: this.state.filterDropdownVisible[index],
        onFilterDropdownVisibleChange: visible => {
          const { filterDropdownVisible } = this.state;
          filterDropdownVisible[index] = visible;
          this.setState(
            {
              filterDropdownVisible,
            },
            () => {
              if (this.searchInput && this.searchInput[index])
                this.searchInput[index].focus();
            },
          );
        },
      });
    });

    let dataSource = [];
    dataSource = this.state.data?.map(item => {
      const index = this.state.data.indexOf(item) + 1;
      return {
        ...item,
        tableRecordIndex: index,
      };
    });
    const recordIndex = {
      title: 'ردیف',
      dataIndex: 'recordIndex',
      key: 'recordIndex',
      width: 50,
      render: (text, record) => (
        <span className={s.tableRecordIndex}>{record.tableRecordIndex}</span>
      ),
    };

    // add index column to columns
    if (!hideIndex && columns[0].dataIndex !== 'recordIndex') {
      columns.unshift(recordIndex);
    }

    return (
      <Table
        title={title}
        columns={columns}
        dataSource={dataSource}
        showHeader={showHeader}
        onChange={this.handleChange}
        onExpand={onExpand}
        onExpandedRowsChange={onExpandedRowsChange}
        onHeaderRow={onHeaderRow}
        onRow={onRow}
        pagination={pagination}
        loading={loading}
        bordered={bordered}
        size={size}
        rowKey={rowKey}
        rowSelection={rowSelection}
        components={components}
        rowClassName={rowClassName}
        onRowClick={onRowClick}
        childrenColumnName={childrenColumnName}
        bodyStyle={bodyStyle}
        className={className}
        style={style}
        locale={locale}
        indentSize={indentSize}
        footer={footer}
        // scroll
        {...(scroll ? { scroll } : {})}
        // expanded props
        expandRowByClick={expandRowByClick}
        {...(expandedRowRender
          ? {
              expandedRowRender,
              defaultExpandAllRows,
              defaultExpandedRowKeys,
              expandIconAsCell,
              expandIconColumnIndex,
              useFixedHeader,
            }
          : {})}
        {...(expandedRowKeys
          ? {
              expandedRowKeys,
            }
          : {})}
      >
        {children}
      </Table>
    );
  }
}

export default withStyles(s)(CPTable);
