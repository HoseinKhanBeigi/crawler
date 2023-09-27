import React from 'react';
import Layout from '../../components/AdminLayout';
import PipelineOpportunities from './PipelineOpportunities';
import { actionHandler } from '../../helpers/opportunitiesActionHandler';
import ModalForVerifyData from '../../components/ModalForVerifyData';
import ModalForCheckAppointments from '../../components/ModalForCheckAppointments';
import ModalForGetTradingInfo from '../../components/ModalForGetTradingInfo';
import ModalForVisitingUser from '../../components/ModalForVisitingUser';
import ModalForSetMeeting from '../../components/ModalForSetMeeting';
import ModalForCheckIdentification from '../../components/ModalForCheckIdentification';
import ModalForPrintForms from '../../components/ModalForPrintForms';
import ModalForBankVerification from '../../components/ModalForBankVerification';
import ModalForUploadDocuments from '../../components/ModalForUploadDocuments';
import ModalForVerifySejam from '../../components/ModalForVerifySejam';
import ModalForKianBusinessIdentification from '../../components/ModalForKianBusinessIdentification';
import ModalForIdentificationBusinessInfo from '../../components/ModalForIdentificationBusinessInfo';

async function action({ store, params }) {
  const { ids, title } = params;
  const IDs = ids.split('-');

  const helpers = {
    actionHandler: actionHandler(store),
  };

  return {
    chunks: ['pipeline-opportunities'],
    title: `پایپ‌لاین ${title}`,
    component: (
      <Layout>
        <PipelineOpportunities title={title} ids={IDs} helpers={helpers} />
        <ModalForVerifyData />
        <ModalForCheckAppointments />
        <ModalForGetTradingInfo />
        <ModalForVisitingUser />
        <ModalForSetMeeting />
        <ModalForCheckIdentification />
        <ModalForPrintForms />
        <ModalForBankVerification />
        <ModalForUploadDocuments />
        <ModalForVerifySejam />
        <ModalForKianBusinessIdentification />
        <ModalForIdentificationBusinessInfo />
      </Layout>
    ),
  };
}

export default action;
