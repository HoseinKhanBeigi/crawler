import React from 'react';
import Layout from '../../../components/AdminLayout';
import OpportunitiesTable from './OpportunitiesTable';
import { actionHandler } from '../../../helpers/opportunitiesActionHandler';
import ModalForVerifyData from '../../../components/ModalForVerifyData';
import ModalForBankVerification from '../../../components/ModalForBankVerification';
import ModalForCheckAppointments from '../../../components/ModalForCheckAppointments';
import ModalForVisitingUser from '../../../components/ModalForVisitingUser';
import ModalForSetMeeting from '../../../components/ModalForSetMeeting';
import ModalForUploadDocuments from '../../../components/ModalForUploadDocuments';
import ModalForCheckIdentification from '../../../components/ModalForCheckIdentification';
import ModalForPrintForms from '../../../components/ModalForPrintForms';
import ModalForVerifySejam from '../../../components/ModalForVerifySejam';
import ModalForKianBusinessIdentification from '../../../components/ModalForKianBusinessIdentification';
import ModalForIdentificationBusinessInfo from '../../../components/ModalForIdentificationBusinessInfo';
import ModalForGetTradingInfo from '../../../components/ModalForGetTradingInfo';

const title = 'نمای جدولی فرصت‌ها';

function OpportunitiesTablePage({ store }) {
  const fullActionHandler = actionHandler(store);

  return {
    chunks: ['opportunities-table'],
    title,
    component: (
      <Layout>
        <OpportunitiesTable actionHandler={fullActionHandler} />
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

export default OpportunitiesTablePage;
