import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './SalesOpportunities.scss';
import KianTable from '../../components/KianTable/KianTable';
import { columns } from './utils/columns';
import { searchData } from './utils/searchSchema';
import withModal from '../../components/HOC/withModal';
import { SALE_OPPORTUNITY_LIST_TABLE } from '../../store/settings/settings.constants';
import {
  DRAWER_FOR_EDIT_SALE_OPPORTUNITY,
  DRAWER_FOR_VIEW_SALE_OPPORTUNITY,
  MODAL_FOR_ADD_SALE_OPPORTUNITY,
} from '../../components/ModalRoot/repository';
import { getFullSearchAction } from '../../store/fullSearch/fullSearch.actions';
import useSaleOpportunityStates from '../../hooks/useSaleOpportunityStates';
import { saleProductServices } from '../../service/saleProductServices';
import useLeadSearch from '../../hooks/useLeadSearch';
import { Actions } from '../../utils/aclActions';
import branchManagementService from '../../service/branchManagementService';

const SalesOpportunities = props => {
  const activityButton = [
    {
      label: 'فرصت جدید',
      icon: 'plus',
      authority: Actions.saleOpprotunitesCreate,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_SALE_OPPORTUNITY,
        }),
    },
  ];
  const saleStates = useSaleOpportunityStates();
  const [searchLeadResult, onSearchLead] = useLeadSearch();
  const [crmUsers, setCrmUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const getSaleProductsList = async () => {
    const data = await saleProductServices.getAllSaleProduct();
    let saleProducts = [];
    if (data) {
      const { content } = data;
      saleProducts = content;
    }
    return saleProducts;
  };

  useEffect(() => {
    getSaleProductsList().then(res => setProducts(res));
    branchManagementService.getAllCurrentUnitEmployee().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmUsers(crmUser);
    });
  }, []);

  // const openDrawerHandler = record => {
  //   setDrawerData(record);
  //   setVisible(true);
  // };
  //
  // const closeDrawerHandler = () => {
  //   setDrawerData(null);
  //   setVisible(false);
  // };

  const showModal = type => modalProps => () => {
    props.showModalAction({
      type,
      props: modalProps,
    });
  };

  const contextMenu = [
    {
      label: `مشاهده`,
      action: data =>
        showModal(DRAWER_FOR_VIEW_SALE_OPPORTUNITY)({
          data,
          saleStates,
        })(),
    },
    {
      label: `ویرایش`,
      authority: Actions.saleOpprotunitesCreate,
      action: data =>
        showModal(DRAWER_FOR_EDIT_SALE_OPPORTUNITY)({
          data,
          saleStates,
        })(),
    },
  ];

  const onSearchMultipleSelect = (value, dataSource) => {
    if (!value) {
      return dataSource;
    }
    const newList = dataSource.filter(item => item.fullName.includes(value));
    return newList;
  };

  return (
    <div className={s.wrapper}>
      <KianTable
        searchData={searchData({
          onSearchLead,
          searchLeadResult,
          products,
          saleStates,
          crmUsers,
          onSearchMultipleSelect,
        })}
        bordered={false}
        endpoint="saleOpportunity"
        headerTitle="فرصت فروش"
        activityButton={activityButton}
        withSort={false}
        tableId={SALE_OPPORTUNITY_LIST_TABLE}
        columns={columns({ saleStates })}
        persistInLocalStorage={false}
        contextMenu={contextMenu}
      />
    </div>
  );
};

SalesOpportunities.propTypes = {
  showModalAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getFullSearchAction,
};
export default connect(
  null,
  mapDispatchToProps,
)(withStyle(s)(withModal(SalesOpportunities)));
