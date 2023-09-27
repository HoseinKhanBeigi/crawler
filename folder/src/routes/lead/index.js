import React from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import Layout from '../../components/AdminLayout';
// import { getTaskListAction } from '../../actions/task';
import { getOpportunityAction } from '../../store/opportunity/opportunity.actions';
import { getLeadAction } from '../../store/lead/lead.actions';
import { getDocumentTypesAction } from '../../store/documentToken/documentToken.actions';
import {
  getCrmActivitiesAction,
  getUserActivitiesAction,
} from '../../store/newActivities/newActivities.actions';
import { pageSizeInTableList } from '../../webConfig';
import PersonLead from './containers/PersonLead';
import leadTypes from './constants/leadTypes';
import BusinessLead from './containers/BusinessLead';

async function action({ store, params }) {
  const pagination = `page=0&size=${pageSizeInTableList}`;
  store.dispatch(showLoading());
  await Promise.all([
    store.dispatch(getLeadAction(params.levantId)),
    store.dispatch(
      getUserActivitiesAction({ levantId: params.levantId, pagination }),
    ),
    store.dispatch(
      getCrmActivitiesAction({ levantId: params.levantId, pagination }),
    ),
    // store.dispatch(getTaskListAction(params.id)),
    store.dispatch(getOpportunityAction(params.levantId)),
    store.dispatch(getDocumentTypesAction(params.levantId)),
  ]);
  store.dispatch(hideLoading());

  const isBusinessLead =
    store.getState().lead.data?.leadType === leadTypes.Business;

  return {
    title: 'سرنخ',
    chunks: ['lead'],
    component: (
      <Layout>
        {isBusinessLead ? (
          <BusinessLead levantId={params.levantId} />
        ) : (
          <PersonLead levantId={params.levantId} />
        )}
      </Layout>
    ),
  };
}

export default action;
