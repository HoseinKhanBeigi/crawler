import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { columns } from './tableData';
import searchData from './searchData';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import withModal from '../../components/HOC/withModal';
import { kianTableApi } from '../../components/KianTable/helpers/globalApi';
import KianTable from '../../components/KianTable';
import leadService from '../../service/leadService';
import { CASE_TABLE } from '../../store/settings/settings.constants';
import {
  DRAWER_FOR_EDIT_CASE_DETAIL,
  DRAWER_FOR_VIEW_CASE_DETAIL,
  MODAL_FOR_ADD_CASE,
} from '../../components/ModalRoot/repository';
import history from '../../history';
import { Actions } from '../../utils/aclActions';

const Case = props => {
  const { applications, templates, levantId } = props;
  const endPoint = {
    all: 'case_management/case/all?sort=createdDate,desc',
    myissuse: `case_management/case/all?sort=createdDate,desc&caseAssignLevantId=${levantId}`,
  };
  const [crmLeadUsers, setCrmLeadUsers] = useState([]);
  const [endpoint, setEndPoint] = useState(endPoint.all);

  useEffect(() => {
    leadService.getCrmUserLead('ALL').then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmLeadUsers(crmUser);
    });
    props.getTemplatesAction('CASE');
  }, []);

  const activityButton = [
    {
      label: 'درخواست جدید',
      icon: 'usergroup-add',
      authority: Actions.createCase,
      action: () =>
        props.showModalAction({
          type: MODAL_FOR_ADD_CASE,
        }),
    },
  ];

  const handleFilter = async value => {
    await setEndPoint(endPoint[value]);
    kianTableApi(CASE_TABLE).refreshTable();
  };

  const filterButton = {
    onChange: handleFilter,
    defaultValue: 'all',
    buttons: [
      {
        label: 'همه درخواست‌ها',
        value: 'all',
      },
      {
        label: 'درخواست‌های من',
        value: 'myissuse',
      },
    ],
  };

  const contextMenu = [
    {
      label: 'نمایش',
      authority: Actions.showCase,
      action: row =>
        props.showModalAction({
          type: DRAWER_FOR_VIEW_CASE_DETAIL,
          props: {
            data: row,
          },
        }),
    },
    {
      label: 'ویرایش',
      icon: 'edit',
      authority: Actions.updateCase,
      action: row =>
        props.showModalAction({
          type: DRAWER_FOR_EDIT_CASE_DETAIL,
          props: {
            data: row,
          },
        }),
    },
    {
      label: 'نمایش اطلاعات تکمیلی',
      icon: 'edit',
      authority: Actions.showCase,
      action: row => history.push(`/show-case/${row?.id}`),
    },
  ];

  return (
    <>
      <KianTable
        endpoint={endpoint}
        searchData={searchData(applications, crmLeadUsers, templates)}
        activityButton={activityButton}
        toggleButton={filterButton}
        withSort={false}
        contextMenu={contextMenu}
        tableId={CASE_TABLE}
        columns={columns}
        headerTitle="درخواست"
        persistInLocalStorage={false}
      />
    </>
  );
};
Case.defaultProps = {
  applications: [],
  templates: [],
};
Case.propTypes = {
  applications: PropTypes.array,
  showModalAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
  levantId: PropTypes.string.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
};
const mapState = state => ({
  applications: state.applications.data,
  templates: state.phoneCalls.case,
  levantId: state.neshanAuth?.jwt?.levantId,
});
const mapDispatch = {
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(withModal(Case));
