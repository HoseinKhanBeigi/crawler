import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import withModal from '../../components/HOC/withModal';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
// eslint-disable-next-line css-modules/no-unused-class
import s from './PipelineOpportunities.scss';
import opportunityService from '../../service/opportunityService';

import history from '../../history';
import KianTable from '../../components/KianTable';
import { OPPORTUNITIES_PIPELINE_TABLE } from '../../store/settings/settings.constants';
import { columns, searchData } from './tableData';
import {
  MODAL_FOR_DELETE_OPPORTUNITY,
  MODAL_FOR_SEND_GROUP_SMS,
} from '../../components/ModalRoot/repository';
import {
  getOpportunitiesAction,
  setOpportunitiesFiltering,
} from '../../store/opportunities/opportunities.actions';
import { selectProductAction } from '../../store/getProducts/getProducts.actions';
import { Actions } from '../../utils/aclActions';

const { Option } = Select;

const PipelineOpportunities = props => {
  const {
    title,
    ids,
    selectedProduct,
    products,
    filterBy,
    showModalAction,
    helpers: { actionHandler },
    userId,
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filterButton, setFilterButton] = useState({});

  const downloadExcel = () => () => {
    opportunityService.downloadOpportunityExcelReport(
      selectedProduct,
      ids[0],
      title,
    );
  };

  const handleFilter = async value => {
    await setFilter(value);
    props.setOpportunitiesFiltering(value);
    kianTableApi(OPPORTUNITIES_PIPELINE_TABLE).refreshTable();
  };

  useEffect(() => {
    const obj = {
      onChange: handleFilter,
      defaultValue: filterBy,
      buttons: [
        {
          label: 'همه موارد',
          value: 'all',
        },
        {
          label: 'موارد مربوط به من',
          value: 'myissuse',
        },
      ],
    };
    setFilterButton(obj);
  }, [filterBy]);

  useEffect(() => {
    props.setOpportunitiesFiltering('all');
  }, [selectedProduct]);

  useEffect(() => {
    if (filterBy === 'all') {
      handleFilter(filter).then(props.setOpportunitiesFiltering('all'));
    }
  }, []);

  const showModal = type => modalProps => () => {
    showModalAction({
      type,
      props: modalProps,
    });
  };

  const deSelectRows = () => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  };

  const contextMenu = [
    {
      label: `ارسال پیام`,
      icon: 'message',
      authority: Actions.sendSms,
      action: row =>
        showModal(MODAL_FOR_SEND_GROUP_SMS)({
          data: [row.levantId],
          deSelectRows,
        })(),
    },
    {
      icon: 'delete',
      label: 'حذف',
      authority: Actions.opprotunityDelete,
      action: row =>
        showModal(MODAL_FOR_DELETE_OPPORTUNITY)({
          data: row,
        })(),
    },
  ];

  const activityButton = [
    {
      label: 'ارسال پیامک گروهی',
      icon: 'sms',
      authority: Actions.sendSms,
      action: showModal(MODAL_FOR_SEND_GROUP_SMS)({
        pipeline: {
          title,
          selectedProduct,
          pipelineId: ids[0],
        },
      }),
    },
  ];

  const actionButtons = [
    {
      tooltip: `ارسال پیام به ${selectedRows.length} فرصت انتخابی`,
      authority: Actions.sendSms,
      icon: 'message',
      action: showModal(MODAL_FOR_SEND_GROUP_SMS)({
        data: selectedRows.map(r => r.levantId),
        deSelectRows,
      }),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (rows, selected) => {
      setSelectedRows(selected);
      setSelectedRowKeys(rows);
    },
  };

  const selectProduct = async value => {
    await setFilter('all');
    await props.selectProductAction(value);
    await props.getOpportunitiesAction();
  };

  const availableProducts = () =>
    products?.map(({ title: text, code }) => ({
      text,
      value: code,
    }));
  const getHederTitle = () => {
    const p = availableProducts()?.filter(a => a.value === selectedProduct);
    return p[0]?.text;
  };

  return (
    <div>
      <div className={s.toolbar}>
        <div>
          <p className={s.toolbarTitle}>محصول :</p>
          <Select
            data-cy="select-product"
            className={s.select_product}
            onChange={selectProduct}
            value={selectedProduct}
          >
            {availableProducts()?.map(a => (
              <Option key={a.value} value={a.value}>
                {a.text}
              </Option>
            ))}
          </Select>
        </div>
        <p className={s.toolbarTitle}>{title}</p>
        <Button
          icon="arrow-right"
          className="margin-r-5"
          onClick={history.goBack}
        >
          بازگشت
        </Button>
      </div>
      <KianTable
        endpoint={
          filter === 'myissuse'
            ? `pipelines/${selectedProduct}/persons?pipelineId=${ids[0]}&ownerUserId=${userId}`
            : `pipelines/${selectedProduct}/persons?pipelineId=${ids[0]}`
        }
        toggleButton={filterButton}
        showActionButtons={!!selectedRowKeys.length}
        tableId={OPPORTUNITIES_PIPELINE_TABLE}
        downloadExcelAction={downloadExcel()}
        columns={columns(actionHandler, showModalAction, selectedProduct)}
        activityButton={activityButton}
        persistInLocalStorage={false}
        actionButtons={actionButtons}
        headerTitle={`فرصت ها(${getHederTitle()})`}
        rowSelection={rowSelection}
        contextMenu={contextMenu}
        searchData={searchData}
      />
    </div>
  );
};

PipelineOpportunities.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  ids: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  selectedProduct: PropTypes.string.isRequired,
  selectProductAction: PropTypes.func.isRequired,
  helpers: PropTypes.object.isRequired,
  filterBy: PropTypes.string.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  setOpportunitiesFiltering: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  selectedProduct: state.getProducts.selected,
  products: state.getProducts.data,
  filterBy: state.opportunities.filterBy,
  userId: state.neshanAuth?.jwt?.uuid,
});

const mapDispatch = {
  getOpportunitiesAction,
  selectProductAction,
  setOpportunitiesFiltering,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(PipelineOpportunities)));
