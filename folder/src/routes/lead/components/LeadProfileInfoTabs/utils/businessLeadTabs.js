import React from 'react';
import DocumentsListTabProfile from '../../../../../components/DocumentsListTabProfile/DocumentsListTabProfile';
import BusinessLeadGeneralInfoTab from '../components/BusinessLeadGeneralInfoTab/BusinessLeadGeneralInfoTab';
import BusinessLeadContactsInfoTab from '../components/BusinessLeadContactsInfoTab/BusinessLeadContactsInfoTab';
import BusinessLeadStakeholders from '../components/BusinessLeadStakeholders/BusinessLeadStakeholders';
import { Actions } from '../../../../../utils/aclActions';
import LeadRelationProfileTab from '../../../../../components/LeadRelationProfileTab/leadRelationProfileTab';

const businessLeadTabs = ({ documentTypes, relations, persons }) => [
  {
    key: 1,
    tab: 'اطلاعات حقوقی',
    authority: Actions.leadSearch,
    children: <BusinessLeadGeneralInfoTab />,
  },
  {
    key: 2,
    authority: Actions.businessStackHoldersAndRolesTab,
    tab: (
      <span
        style={{
          color: !(relations && Object.values(relations).length)
            ? 'rgb(0 0 0 / 25%)'
            : '#202020',
        }}
      >
        {`اعضا و نقش‌ها (${Object.values(relations).length || 0})`}
      </span>
    ),
    children: <BusinessLeadStakeholders />,
  },
  {
    key: 3,
    tab: 'اطلاعات تماس',
    authority: Actions.leadSearch,
    children: <BusinessLeadContactsInfoTab />,
  },
  {
    key: 4,
    authority: Actions.documentAll,
    tab: (
      <span
        style={{
          color: !documentTypes?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        {`اسناد (${documentTypes?.length})`}
      </span>
    ),
    children: <DocumentsListTabProfile />,
  },
  {
    key: 5,
    authority: Actions.documentAll,
    tab: (
      <span
        style={{
          color: !persons?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        ارتباطات
      </span>
    ),
    children: <LeadRelationProfileTab businessMode />,
  },
];

export default businessLeadTabs;
