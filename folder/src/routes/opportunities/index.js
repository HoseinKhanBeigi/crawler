import React from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import Layout from '../../components/AdminLayout';
import Opportunities from './Opportunities';
import {
  actionHandler,
  actionCancelHandler,
} from '../../helpers/opportunitiesActionHandler';
import {
  getOpportunitiesAction,
  setOpportunitiesFiltering,
} from '../../store/opportunities/opportunities.actions';
import ModalForVerifyData from '../../components/ModalForVerifyData';
import ModalForBankVerification from '../../components/ModalForBankVerification';
import ModalForCheckAppointments from '../../components/ModalForCheckAppointments';
import ModalForVisitingUser from '../../components/ModalForVisitingUser';
import ModalForSetMeeting from '../../components/ModalForSetMeeting';
import ModalForUploadDocuments from '../../components/ModalForUploadDocuments';
import ModalForCheckIdentification from '../../components/ModalForCheckIdentification';
import ModalForPrintForms from '../../components/ModalForPrintForms';
import ModalForVerifySejam from '../../components/ModalForVerifySejam';
import ModalForKianBusinessIdentification from '../../components/ModalForKianBusinessIdentification';
import ModalForIdentificationBusinessInfo from '../../components/ModalForIdentificationBusinessInfo';
import ModalForGetTradingInfo from '../../components/ModalForGetTradingInfo';

const title = 'نمای کارتی فرصت‌ها';

async function OpportunitiesPage({ store }) {
  store.dispatch(showLoading());
  await store.dispatch(setOpportunitiesFiltering(false));
  await Promise.all([store.dispatch(getOpportunitiesAction())]);
  store.dispatch(hideLoading());
  const helpers = {
    actionHandler: actionHandler(store),
    actionCancelHandler: actionCancelHandler(store),
  };

  return {
    chunks: ['opportunities'],
    title,
    component: (
      <Layout>
        <Opportunities title={title} helpers={helpers} />
        <ModalForVerifyData />
        <ModalForBankVerification />
        <ModalForCheckAppointments />
        <ModalForVisitingUser />
        <ModalForSetMeeting />
        <ModalForUploadDocuments />
        <ModalForCheckIdentification />
        <ModalForPrintForms />
        <ModalForVerifySejam />
        <ModalForKianBusinessIdentification />
        <ModalForIdentificationBusinessInfo />
        <ModalForGetTradingInfo />
      </Layout>
    ),
  };
}

export default OpportunitiesPage;
