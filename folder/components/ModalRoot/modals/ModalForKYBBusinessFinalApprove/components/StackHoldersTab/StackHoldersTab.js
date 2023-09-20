import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider, Row, Col, Tag } from 'antd';
import cs from 'classnames';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StakeHoldersTab.scss';
import CPTab from '../../../../../CP/CPTab';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../CP/CPInput/CPInput';
import LazyImage from '../../../../../LazyImage/LazyImage';
import convertToJalaliDate from '../../../../../../utils/date';

const docType = {
  FOREMAN_CARD: 'کارت مباشر',
  NATIONAL_CARD_FRONT: 'عکس روی کارت ملی',
};
const StackHoldersTab = props => {
  const { stakeHolders } = props;
  // eslint-disable-next-line no-unused-vars
  const [url, setUrl] = useState(null);

  function documentTokenFactory(i) {
    return {
      path: i?.documentId,
      token: i?.documentToken,
      type: i?.documentType,
    };
  }

  const renderField = (text, val) => (
    <CPLabel
      label={text}
      className={cs('col-md-12', s.input)}
      labelClasses={s.label}
    >
      <CPInput value={val || '---'} disabled className={s.i} />
    </CPLabel>
  );

  const renderDocument = item => (
    <div className={s.card_container}>
      <h4>{docType[item?.type]}</h4>
      <Divider />
      <div className={s.card_img}>
        <LazyImage
          key={item?.path}
          path={item?.path}
          objectToken={item}
          className={s.download}
          onClick={objectUrl => setUrl(objectUrl)}
        />
      </div>
    </div>
  );

  const tabs = stakeHolders?.map((item, index) => ({
    key: index + 1,
    tab: (
      <div>
        <Icon
          type="left"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: '#d5d5d5',
            fontSize: '12px',
          }}
        />
        {`${item.firstName} ${item.lastName}`}
      </div>
    ),
    children: (
      <>
        {renderField('نام', item?.firstName)}
        {renderField('نام انگلیسی', item?.firstNameEn)}
        {renderField('نام خانوادگی', item?.lastName)}
        {renderField('نام خانوادگی انگلیسی', item?.lastNameEn)}
        {renderField(
          'تاریخ تولد',
          item?.birthDate ? convertToJalaliDate(item?.birthDate) : null,
        )}
        {renderField('نام پدر انگلیسی', item?.fatherNameEn)}
        {renderField('کد ملی', item?.nationalCode)}
        {renderField('شماره موبایل', item?.mobilePhone)}
        <Col lg={24}>
          <CPLabel label="سمت" className={cs(s.input)} labelClasses={s.label}>
            {item.rolelist?.map(({ roleDesc }) => (
              <Tag className={cs(s.roleTag)}>{roleDesc}</Tag>
            ))}
          </CPLabel>
        </Col>
        <Row gutter={24} type="flex">
          {item?.documents?.map(doc =>
            renderDocument(documentTokenFactory(doc)),
          )}
        </Row>
      </>
    ),
  }));

  return (
    <div className={s.card_contaienr}>
      <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
    </div>
  );
};

StackHoldersTab.propTypes = {
  stakeHolders: PropTypes.array.isRequired,
};

const mapState = state => ({
  stakeHolders:
    state.opportunities?.identificationWithDocsData?.businessStakeholdersDto
      ?.stakeholders,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(memo(withStyles(s)(StackHoldersTab)));
export const StackHoldersTabTest = StackHoldersTab;
