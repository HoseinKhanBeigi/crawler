import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col, Descriptions, Row } from 'antd';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import ToolContainer from '../ToolContainer/ToolContainer';
import useAsync from '../../../../hooks/useAsync';
import opportunityService from '../../../../service/opportunityService';
import CPButton from '../../../../components/CP/CPButton';
import CPInput from '../../../../components/CP/CPInput';

const localizedInquiryInfo = new Map([
  ['title', 'نام تجاری'],
  ['id', 'شناسه ملی'],
  ['registrationNo', 'شماره ثبت'],
  ['taxNumber', 'شماره مالیاتی'],
]);

const InquiryBusinessInfoTool = ({ title }) => {
  const [nationalId, setNationalId] = useState('');
  const { data, loading, run } = useAsync();
  const handleInquiry = () => {
    run(opportunityService.inquiryBusinessInfo(+nationalId));
  };

  const renderDescriptionData = () => (
    <div className={s.desc_container}>
      <Descriptions layout="vertical" column={2}>
        {[...localizedInquiryInfo].map(([key, label]) => (
          <Descriptions.Item label={label} className={s.label}>
            {data?.[key] || '---'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );

  return (
    <ToolContainer
      title={title}
      showResult={data}
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
      ResultRender={renderDescriptionData()}
    />
  );
};

InquiryBusinessInfoTool.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(InquiryBusinessInfoTool);
