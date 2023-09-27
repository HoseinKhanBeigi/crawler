import React, { useMemo } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Button, Descriptions, Tag } from 'antd';
import PropTypes from 'prop-types';
import s from './InquiryStakeholdersInfo.scss';
import opportunityService from '../../../../../../service/opportunityService';
import useAsync from '../../../../../../hooks/useAsync';
import CPTab from '../../../../../CP/CPTab/CPTab';
import { Actions } from '../../../../../../utils/aclActions';
import HandleAclPermission from '../../../../../HandleAclPermission/HandleAclPermission';

const InquiryStakeholdersInfo = ({ nationalCode }) => {
  const { data, loading, run } = useAsync();

  const handleInquiry = () => {
    run(opportunityService.inquiryBusinessInfo(+nationalCode));
  };

  const stakeholderData = useMemo(() => {
    const persons = new Map();
    data?.companyPerson?.forEach(({ person, personId }) => {
      if (!persons.has(personId)) {
        persons.set(personId, {
          name: person.title,
          roles: [
            ...new Set(
              person.companyPerson.map(p => p.position?.title).filter(Boolean),
            ),
          ],
        });
      }
    });
    return [...persons.values()];
  }, [data]);

  const tabs = stakeholderData.map(({ name, roles }, index) => ({
    key: index + 1,
    tab: (
      <div className={s.tab_container}>
        <div>{name}</div>
      </div>
    ),
    children: (
      <Descriptions layout="vertical" column={2}>
        <Descriptions.Item label="سمت">
          {roles.length ? roles.map(role => <Tag>{role}</Tag>) : '---'}
        </Descriptions.Item>
      </Descriptions>
    ),
  }));

  return (
    <HandleAclPermission wich={Actions.rasmioCompanyInfoInquiry}>
      <div className={s.docsHeader}>
        <span>استعلام اطلاعات اعضا</span>
      </div>
      <Button loading={loading} onClick={handleInquiry}>
        استعلام اطلاعات اعضا
      </Button>
      {!!stakeholderData.length && (
        <div className={s.tabs}>
          <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
        </div>
      )}
    </HandleAclPermission>
  );
};

InquiryStakeholdersInfo.propTypes = {
  nationalCode: PropTypes.string.isRequired,
};

const mapState = state => ({
  nationalCode: state.opportunities.currentUser?.nationalCode,
});

export default connect(mapState)(withStyles(s)(InquiryStakeholdersInfo));
