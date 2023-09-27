import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './forms.scss';
import CPTab from '../../components/CP/CPTab';
import LeadForms from './LeadForms';

const Forms = () => {
  const tabs = [
    {
      key: 1,
      tab: 'سرنخ',
      children: <LeadForms />,
    },
  ];

  return (
    <div className={s.root}>
      <h3>تنظیمات فرم</h3>
      <p>جهت جابجا کردن فیلد ها، آنها را از سمت راست گرفته و جابجا کنید.</p>
      <CPTab defaultKey="1" position="top" tabPane={tabs} />
    </div>
  );
};

export default withStyles(s)(Forms);
