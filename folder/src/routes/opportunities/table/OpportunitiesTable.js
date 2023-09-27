import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../Opportunities.scss';
import {
  DRAWER_FOR_SEND_GROUP_MESSAGE,
  DRAWER_FOR_DELETE_OPPORTUNITY,
} from '../../../components/ModalRoot/repository';
import { OPPORTUNITIES_TABLE } from '../../../store/settings/settings.constants';
import { setOpportunitiesFiltering } from '../../../store/opportunities/opportunities.actions';
import { kianTableApi } from '../../../components/KianTable/helpers/globalApi';
import OpportunitiesToolbar from '../components/OpportunitiesToolbar';
import opportunityService from '../../../service/opportunityService';
import withModal from '../../../components/HOC/withModal';
import KianTable from '../../../components/KianTable';
import { columns, searchData } from './tableData';
import { Actions } from '../../../utils/aclActions';

const OpportunitiesTable = props => {
  const {
    selectedProduct,
    showModalAction,
    actionHandler,
    userId,
    filterBy,
  } = props;
  const [pipelines, setPipelines] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterButton, setFilterButton] = useState({});
  useEffect(() => {
    (async () => {
      await props.setOpportunitiesFiltering('all');
      if (mounted) kianTableApi(OPPORTUNITIES_TABLE).resetTable();
    })();
  }, [selectedProduct]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilter = async value => {
    await props.setOpportunitiesFiltering(value);
    kianTableApi(OPPORTUNITIES_TABLE).refreshTable();
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

  const convertPipelines = data => {
    setPipelines(
      data?.pipelines?.map(p => ({
        text: p.title,
        value: p.ids[0],
      })),
    );
  };

  const downloadExcel = () => () => {
    opportunityService.downloadOpportunityExcelReport(selectedProduct);
  };

  const showModal = type => modalProps => () => {
    showModalAction({
      type,
      props: modalProps,
    });
  };

  const deSelectRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const contextMenu = [
    {
      label: `ارسال پیام`,
      authority: Actions.sendSms,
      icon: 'message',
      action: row =>
        showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
          data: [row.levantId],
          deSelectRows,
        })(),
    },
    {
      icon: 'delete',
      label: 'حذف',
      authority: Actions.opprotunityDelete,
      action: row =>
        showModal(DRAWER_FOR_DELETE_OPPORTUNITY)({
          data: row,
        })(),
    },
  ];

  const actionButtons = [
    {
      tooltip: `ارسال پیام به ${selectedRows.length} فرصت انتخابی`,
      authority: Actions.sendSms,
      icon: 'message',
      action: showModal(DRAWER_FOR_SEND_GROUP_MESSAGE)({
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

  return (
    <>
      <OpportunitiesToolbar filterMyissus={false} />
      <KianTable
        endpoint={
          filterBy === 'myissuse'
            ? `opportunity/allList/products/${selectedProduct}?ownerUserId=${userId}`
            : `opportunity/allList/products/${selectedProduct}`
        }
        toggleButton={filterButton}
        columns={columns(
          showModalAction,
          pipelines,
          actionHandler,
          selectedProduct,
        )}
        showActionButtons={!!selectedRows.length}
        downloadExcelAction={downloadExcel()}
        searchData={searchData(pipelines)}
        getResponse={convertPipelines}
        persistInLocalStorage={false}
        actionButtons={actionButtons}
        tableId={OPPORTUNITIES_TABLE}
        rowSelection={rowSelection}
        headerTitle="فرصت ها"
        sourceKey="opportunities"
        contextMenu={contextMenu}
      />
    </>
  );
};

OpportunitiesTable.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  selectedProduct: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
  setOpportunitiesFiltering: PropTypes.func.isRequired,
};

const mapState = state => ({
  selectedProduct: state.getProducts.selected,
  filterBy: state.opportunities.filterBy,
  userId: state.neshanAuth?.jwt?.uuid,
});
const mapDispatch = {
  setOpportunitiesFiltering,
};
export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(OpportunitiesTable)));
