import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Button, Descriptions } from 'antd';
import s from './InquiryBusinessInfo.scss';
import useAsync from '../../../../../../hooks/useAsync';
import opportunityService from '../../../../../../service/opportunityService';
import { Actions } from '../../../../../../utils/aclActions';
import HandleAclPermission from '../../../../../HandleAclPermission/HandleAclPermission';

/* eslint-disable no-unused-vars */

const localizedInquiryInfo = new Map([
  ['title', 'نام تجاری'],
  ['id', 'شناسه ملی'],
  ['registrationNo', 'شماره ثبت'],
  ['taxNumber', 'شماره مالیاتی'],
]);

const InquiryBusinessInfo = ({ currentUserData }) => {
  const { nationalCode } = currentUserData;
  const { data, run, loading } = useAsync();

  const renderDescriptionData = () => (
    <div className={s.desc_container}>
      <Descriptions layout="vertical" column={2}>
        {[...localizedInquiryInfo].map(([key, title]) => (
          <Descriptions.Item label={title} className={s.label}>
            {data[key] || '---'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );

  const handleInquiry = () => {
    run(opportunityService.inquiryBusinessInfo(+nationalCode));
  };

  return (
    <HandleAclPermission wich={Actions.rasmioCompanyInfoInquiry}>
      <div className={s.wrapper}>
        <div className={s.docsHeader}>
          <span>استعلام اطلاعات</span>
        </div>
        <Button loading={loading} onClick={handleInquiry}>
          استعلام اطلاعات حقوقی
        </Button>
        {data && renderDescriptionData()}
      </div>
    </HandleAclPermission>
  );
};

InquiryBusinessInfo.propTypes = {
  currentUserData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.opportunities.currentUser,
});

export default connect(mapStateToProps)(withStyles(s)(InquiryBusinessInfo));
