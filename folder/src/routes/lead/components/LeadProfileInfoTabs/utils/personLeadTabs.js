import React from 'react';
import UserInfoProfileTab from '../../../../../components/UserInfoProfileTab';
import LeadProductsProfileTab from '../../../../../components/LeadProductsProfileTab';
import LeadTagsListTab from '../../../../../components/LeadTagsListTab';
import LeadOpportunitiesListProfileTab from '../../../../../components/LeadOpportunitiesListProfileTab/LeadOpportunitiesListProfileTab';
import DocumentsListTabProfile from '../../../../../components/DocumentsListTabProfile/DocumentsListTabProfile';
import LeadRelationProfileTab from '../../../../../components/LeadRelationProfileTab/leadRelationProfileTab';
import { Actions } from '../../../../../utils/aclActions';
import PersonLeadKycLevelInfo from '../components/PersonLeadKycLevelInfo/PersonLeadKycLevelInfo';

const personLeadTabs = ({
  productList,
  leadOpportunitiesList,
  documentTypes,
  userTagsList,
  kycLevels,
  company,
}) => [
  {
    key: 1,
    tab: 'اطلاعات کاربر',
    authority: Actions.leadSearch,
    children: <UserInfoProfileTab />,
  },
  {
    key: 2,
    authority: Actions.leadSearch,
    tab: (
      <span
        style={{
          color: !productList?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        محصولات
      </span>
    ),
    children: <LeadProductsProfileTab />,
  },
  {
    key: 3,
    authority: Actions.persoanlOpprotunitesListTab,
    tab: (
      <span
        style={{
          color: leadOpportunitiesList?.content?.length
            ? '#202020'
            : 'rgb(0 0 0 / 25%)',
        }}
      >
        فرصت ها
      </span>
    ),
    children: <LeadOpportunitiesListProfileTab />,
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
    authority: Actions.personalLeadTagsTab,
    tab: (
      <span
        style={{
          color: !userTagsList?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        برچسب‌ها
      </span>
    ),
    children: <LeadTagsListTab />,
  },
  {
    key: 6,
    authority: Actions.personalLeadTagsTab,
    tab: (
      <span
        style={{
          color: !kycLevels?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        سطوح احراز هویت
      </span>
    ),
    children: <PersonLeadKycLevelInfo kycLevels={kycLevels} />,
  },
  {
    key: 7,
    authority: Actions.personalLeadTagsTab,
    tab: (
      <span
        style={{
          color: !company?.length ? 'rgb(0 0 0 / 25%)' : '#202020',
        }}
      >
        ارتباطات
      </span>
    ),
    children: <LeadRelationProfileTab businessMode={false} />,
  },
];

export default personLeadTabs;
