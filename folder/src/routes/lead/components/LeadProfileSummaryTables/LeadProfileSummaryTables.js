import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './LeadProfileSummaryTables.scss';
import CPTab from '../../../../components/CP/CPTab';
import useSaleOpportunityStates from '../../../../hooks/useSaleOpportunityStates';
import tablesList from './utils/tablesList';
import withModal from '../../../../components/HOC/withModal';
import SummaryTable from '../../../../components/SummaryTable/SummaryTable';

const generateTabs = tables =>
  tables.map((table, i) => ({
    key: i,
    tab: table.tabName,
    authority: table?.authority,
    children: (
      <SummaryTable
        title={table.title}
        tableId={table.tableId}
        addAction={table.action}
        endPoint={`${table.endPoint}?${new URLSearchParams({
          ...table.query,
          size: 5,
        }).toString()}`}
        fullTableLink={`/${table.link}?${new URLSearchParams({
          ...table.query,
        }).toString()}`}
        tableColumns={table.columns}
      />
    ),
  }));

const SummaryTables = props => {
  const { leadInfo, showModalAction } = props;

  const saleStates = useSaleOpportunityStates();

  const tables = tablesList({
    leadId: leadInfo?.id,
    levantId: leadInfo?.levantId,
    showModalAction,
    saleStates,
  });
  return (
    <div className={s.centerCol}>
      <CPTab
        className={s.tabs}
        defaultKey={`${tables.length - 1}`}
        tabPane={generateTabs(tables)}
      />
    </div>
  );
};

SummaryTables.propTypes = {
  showModalAction: PropTypes.func.isRequired,
  leadInfo: PropTypes.object.isRequired,
};

export default withModal(withStyles(s)(SummaryTables));
