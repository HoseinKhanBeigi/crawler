import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Descriptions, Row, Tag } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput/CPInput';
import ToolContainer from '../ToolContainer/ToolContainer';
import useAsync from '../../../../hooks/useAsync';
import opportunityService from '../../../../service/opportunityService';
import CPTab from '../../../../components/CP/CPTab';
import CPButton from '../../../../components/CP/CPButton';

const InquiryStakeholderInfoTool = ({ title }) => {
  const [nationalId, setNationalId] = useState('');
  const { data, loading, run } = useAsync();
  const handleInquiry = () => {
    run(opportunityService.inquiryBusinessInfo(+nationalId));
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
    <ToolContainer
      title={title}
      showResult={!!stakeholderData.length}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>شناسه ملی شرکت</div>
              <CPInput
                value={nationalId}
                onChange={e => setNationalId(e.target.value)}
                placeholder="شناسه ملی شرکت"
              />
            </Col>
          </Row>
          <CPButton
            loading={loading}
            onClick={handleInquiry}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        <div className={s.tabs}>
          <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
        </div>
      }
    />
  );
};

InquiryStakeholderInfoTool.propTypes = {
  title: PropTypes.string.isRequired,
};
export default withStyles(s)(InquiryStakeholderInfoTool);
