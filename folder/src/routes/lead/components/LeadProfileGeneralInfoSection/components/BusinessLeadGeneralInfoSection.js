import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@mdi/react';
import { mdiAt, mdiPhone } from '@mdi/js';
import { postClickToCallAction } from '../../../../../store/phoneCalls/phoneCalls.actions';
import { getDocumentTokenByLevantIdAction } from '../../../../../store/documentToken/documentToken.actions';
import {
  anyModalOpen,
  getIdentificationByLevantIdAction,
} from '../../../../../store/opportunities/opportunities.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../LeadProfileGeneralInfoSection.scss';
import CPTooltip from '../../../../../components/CP/CPTooltip';
import { DRAWER_FOR_SEND_EMAIL } from '../../../../../components/ModalRoot/repository';
import withModal from '../../../../../components/HOC/withModal';
import businessLeadAvatar from '../../../../../../public/images/business_lead_avatar.png';
import HandleAclPermission from '../../../../../components/HandleAclPermission';
import { Actions } from '../../../../../utils/aclActions';
// import Link from '../../../../../components/Link';

const BusinessLeadGeneralInfoSection = props => {
  const { partyBusiness, levantId, contactInfo } = props;
  const handleOutgoingCallAction = async () => {
    const { tel, telPrefix } = contactInfo[0] || {};
    const phone = telPrefix + tel;
    await props.postClickToCallAction({ mobilePhone: phone, levantId });
  };

  const showSendEmailDrawer = () => {
    props.showModalAction({
      type: DRAWER_FOR_SEND_EMAIL,
    });
  };

  const renderActivityBtn = () => (
    <div className={s.personalInfoSection__sec1__activityBtn}>
      {/* <HandleAclPermission wich={Actions.sendSms}>
        <CPTooltip title="نمایش پورتفوی مالی">
          <Link to={`/portfolio/${levantId}`}>
            <Button type="primary" ghost className={s.round_btn}>
              <Icon size="16px" path={mdiCurrencyUsd} />
              پورتفوی مالی
            </Button>
          </Link>
        </CPTooltip>
      </HandleAclPermission> */}
      <HandleAclPermission wich={Actions.sendEmail}>
        <CPTooltip title="ارسال ایمیل">
          <Button
            type="primary"
            shape="circle"
            className={s.circle_btn}
            onClick={showSendEmailDrawer}
          >
            <Icon size="16px" path={mdiAt} />
          </Button>
        </CPTooltip>
      </HandleAclPermission>
      <HandleAclPermission wich={Actions.voipCallClickToCall}>
        <CPTooltip
          title={`تماس با شماره همراه ${contactInfo[0]?.telPrefix +
            contactInfo[0]?.tel || '---'}`}
        >
          <Button
            type="primary"
            shape="circle"
            className={s.circle_btn}
            onClick={handleOutgoingCallAction}
          >
            <Icon size="16px" path={mdiPhone} />
          </Button>
        </CPTooltip>
      </HandleAclPermission>
    </div>
  );

  return (
    <div className={s.personalInfoSection}>
      <div className={s.personalInfoSection__sec1}>
        <img
          src={businessLeadAvatar}
          className={s.business__avatar}
          alt="avatar"
        />
        <div
          className={s.personalInfoSection__sec1__name}
        >{`${partyBusiness?.name || '---'}`}</div>
        {renderActivityBtn()}
      </div>
    </div>
  );
};
BusinessLeadGeneralInfoSection.propTypes = {
  contactInfo: PropTypes.array.isRequired,
  partyBusiness: PropTypes.array.isRequired,
  levantId: PropTypes.string.isRequired,
  postClickToCallAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contactInfo: state.lead.data?.contacts,
  partyBusiness: state.lead.data?.partyBusiness,
  levantId: state?.lead?.data?.levantId,
});

const mapDispatch = {
  anyModalOpen,
  postClickToCallAction,
  getDocumentTokenByLevantIdAction,
  getIdentificationByLevantIdAction,
};
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(withModal(BusinessLeadGeneralInfoSection)));
