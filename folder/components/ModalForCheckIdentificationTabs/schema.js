import React from 'react';
import BankAccountInfoTab from './Components/BankAccountInfoTab/BankAccountInfoTab';
import BussinessContactInfoTab from './Components/BussinessContactInfoTab/BussinessContactInfoTab';
import CollateralInfoTab from './Components/CollateralInfoTab/CollateralInfoTab';
import CompanyInfoTab from './Components/CompanyInfoTab/CompanyInfoTab';
import ContactInfoTab from './Components/ContactInfoTab/ContactInfoTab';
import JobInfoTab from './Components/JobInfoTab/JobInfoTab';
import KYCVideoTab from './Components/KYCVideoTab/KYCVideoTab';
import PersonalInfoTab from './Components/PersonalInfoTab/PersonalInfoTab';
import StackHoldersTab from './Components/StackHoldersTab/StackHoldersTab';
import FinicialInformationTab from './Components/FinicialInformationTab';
import LegalCreditScoreTab from './Components/LegalCreditScoreTab';
import PersonCreditScoreTab from './Components/PersonCreditScoreTab';
import DocumentsTab from './Components/DocumentsTab';
import LeasingFacilityTab from './Components/LeasingFacilityTab';
import GuarantorsTab from './Components/GuarantorsTab';
import KYBLeasingBussinessInfoTab from './Components/KYBLeasingBussinessInfoTab';
import SejamInfoTab from './Components/SejamInfoTab/SejamInfoTab';

const schema = (name, stateData, handleChange, productCode) => {
  const props = { stateData, handleChange };
  const tabs = {
    personalProfileTab: {
      tab: 'مشخصات فردی',
      children: <PersonalInfoTab {...props} />,
    },
    collateralInfoTab: {
      tab: 'مشخصات تضامین',
      children: <CollateralInfoTab {...props} />,
    },
    businessInfoProfileTab: {
      tab: 'مشخصات شغلی',
      children: <JobInfoTab {...props} />,
    },
    bankProfileTab: {
      tab: 'مشخصات بانکی',
      children: <BankAccountInfoTab {...props} />,
    },
    contactTab: {
      tab: 'مشخصات تماس',
      children: <ContactInfoTab {...props} />,
    },
    guarantorsTab: {
      tab: 'ضامنین',
      children: <GuarantorsTab {...props} />,
    },
    leasingFacilityTab: {
      tab: 'تسهیلات',
      children: <LeasingFacilityTab {...props} />,
    },
    companyTab: {
      tab: productCode === 'KYM' ? 'مشخصات کسب و کار' : 'مشخصات شرکت',
      children: <CompanyInfoTab {...props} />,
    },
    stackHolders: {
      tab: 'اعضا',
      children: <StackHoldersTab {...props} />,
    },
    bussinessContactInfoTab: {
      tab: 'اطلاعات تماس',
      children: <BussinessContactInfoTab {...props} />,
    },
    kycVideoTab: {
      tab: 'احراز  هویت',
      children: <KYCVideoTab {...props} />,
    },
    financialInformationTab: {
      tab: 'اطلاعات مالی',
      children: <FinicialInformationTab {...props} />,
    },
    legalCreditScoreTab: {
      tab: 'اعتبار سنجی حقوقی',
      children: <LegalCreditScoreTab {...props} />,
    },
    personCreditScoreTab: {
      tab: productCode === 'LEASING_KYB' ? 'اعتبار سنجی حقیقی' : 'اعتبارسنجی',
      children: <PersonCreditScoreTab {...props} />,
    },
    KYBLeasingBussinessInfoTab: {
      tab: 'اطلاعات شرکت',
      children: <KYBLeasingBussinessInfoTab {...props} />,
    },
    DocumentsTab: {
      tab: 'اسناد',
      children: <DocumentsTab {...props} />,
    },
    SejamProfileTab: {
      tab: 'سجام',
      children: <SejamInfoTab {...props} />,
    },
  };
  return tabs[name];
};

export const TabsNameStages = {
  personalInfo: 'personalProfileTab',
  stakeholders: 'stackHolders',
  businessContact: 'bussinessContactInfoTab',
  kycSelfieImage: 'kycVideoTab',
  kycVideoCaptcha: 'kycVideoTab',
  kycSignatureImage: 'kycVideoTab',
  bankAccounts: 'bankProfileTab',
  shebaNo: 'bankProfileTab',
  workInfo: 'businessInfoProfileTab',
  facilityDetails: 'leasingFacilityTab',
  guarantors: 'guarantorsTab',
  fetchSejamData: 'SejamProfileTab',
};
export default schema;
