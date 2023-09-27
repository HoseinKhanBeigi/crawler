import React, { useEffect } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Descriptions } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './UserInfoProfileTab.scss';
import Link from '../Link';
import {
  applicationType,
  genderType,
  partyStatusType,
  banksType,
  leadStatusType,
} from './schema';
import { getLeadRelationsAction } from '../../store/lead/lead.actions';
import { getCityName, getProvinceName } from '../../utils/index';
import CPLoading from '../CP/CPLoading';

const { Item } = Descriptions;
const addressType = {
  LIVING: 'آدرس منزل',
  OTHER: 'آدرس دیگر',
  BUSINESS: 'آدرس کسب و کار',
  WORK: 'آدرس محل کار',
};

const idetifierTypes = {
  ONBOARDER_MOBILE_PHONE: 'شماره ولی',
  SEJAMI_MOBILE: 'شماره سجامی',
};

const UserInfoProfileTab = props => {
  const { lead, leadRelationsData, leadRelationsLoading } = props;

  useEffect(() => {
    props.getLeadRelationsAction(lead?.levantId);
  }, [lead?.levantId]);
  const gloalInfo = () => (
    <Descriptions column={1}>
      <Item label="برنامه">
        {applicationType[lead?.partyPerson?.creatorApp || '---']}
      </Item>
      <Item label="وضعیت">
        {lead?.profileType === 'LEAD'
          ? leadStatusType?.[lead?.leadStatus] || '---'
          : partyStatusType?.[lead?.partyPerson?.stats] || '---'}
      </Item>
      <Item label="شماره شناسنامه">
        {lead?.partyPerson?.certificateNumber || '---'}
      </Item>
      <Item label="سریال شناسنامه">
        {`${lead?.partyPerson?.certificateSerialNumber || '---'}-${lead
          ?.partyPerson?.certificateSeriesNumber || '---'}`}
      </Item>
      <Item label="نام پدر">{lead?.partyPerson?.fathername || '---'}</Item>
      <Item label="جنسیت">
        {genderType[lead?.partyPerson?.gender] || '---'}
      </Item>
      <Item label="ایمیل">{lead?.partyPerson?.email || '---'}</Item>
      {lead?.partyPerson?.partyIdentifierDTOs?.length > 0 &&
        lead?.partyPerson?.partyIdentifierDTOs?.map(item => (
          <Item label={idetifierTypes[item?.identifierType]}>
            {item.idValue || '---'}
          </Item>
        ))}
    </Descriptions>
  );
  const bankAccountInfo = item => (
    <Descriptions column={1}>
      <Item label="بانک">{banksType[item?.bankName] || '---'}</Item>
      <Item label="شماره حساب">{item?.accountNumber || '---'}</Item>
      <Item label="شماره شبا">{item?.iban || '---'}</Item>
    </Descriptions>
  );
  const addressInfo = item => (
    <Descriptions column={1}>
      <Item label="تلفن">{`${item?.telPrefix || '---'}-${item?.tel ||
        '---'}`}</Item>
      <Item label="کد پستی">{item?.postalCode || '---'}</Item>
      <Item label={addressType[item.type] || '---'}>
        {`${item?.state !== null ? getProvinceName(item?.state) : '---'}
        ,${item?.city !== null ? getCityName(item?.city) : '---'}
        ,${item?.street || '---'}`}
      </Item>
    </Descriptions>
  );

  const otherInfo = () => (
    <Descriptions column={1}>
      <Item span={1} label="دیگران">
        {leadRelationsData?.map(item => (
          <span className={s.chipe_tag}>
            <Link
              to={`/lead/${item?.relationLevantId}`}
              onClick={e => {
                e.stopPropagation();
              }}
              target
            >
              {`${item?.relationFullName}(${item?.relationTitle})`}
            </Link>
          </span>
        ))}
      </Item>
    </Descriptions>
  );
  return (
    <>
      <div className={s.container}>
        <CPLoading spinning={leadRelationsLoading} tip="دریافت اطلاعات...">
          <div className={s.globla_info}>{gloalInfo()}</div>
          {lead?.bankAccounts?.length > 0 && (
            <div className={s.globla_info}>
              {lead?.bankAccounts?.map(item => bankAccountInfo(item))}
            </div>
          )}
          {lead?.contacts?.length > 0 && (
            <div className={s.globla_info}>
              {lead?.contacts?.map(item => addressInfo(item))}
            </div>
          )}
          {leadRelationsData?.length > 0 && (
            <div className={s.other_info_sec}>{otherInfo()}</div>
          )}
        </CPLoading>
      </div>
    </>
  );
};
UserInfoProfileTab.propTypes = {
  lead: PropTypes.object,
  leadRelationsData: PropTypes.array,
  getLeadRelationsAction: PropTypes.func.isRequired,
  leadRelationsLoading: PropTypes.bool.isRequired,
};
UserInfoProfileTab.defaultProps = {
  lead: {},
  leadRelationsData: [],
};

const mapStateToProps = state => ({
  lead: state.lead.data,
  leadRelationsData: state.lead.leadRelationsData,
  leadRelationsLoading: state.lead.leadRelationsLoading,
});

const mapDispatch = {
  getLeadRelationsAction,
};
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(UserInfoProfileTab));
