/* eslint-disable consistent-return */
import React from 'react';
import { Button, Descriptions, Menu, Dropdown, Typography } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@mdi/react';
import {
  mdiAt,
  mdiMessageProcessing,
  mdiPhone,
  mdiDotsVertical,
  mdiAccountEdit,
  mdiTag,
  mdiPrinter,
  mdiCurrencyUsd,
} from '@mdi/js';
import { postClickToCallAction } from '../../../../../store/phoneCalls/phoneCalls.actions';
import { getDocumentTokenByLevantIdAction } from '../../../../../store/documentToken/documentToken.actions';
import {
  getIdentificationByLevantIdAction,
  anyModalOpen,
} from '../../../../../store/opportunities/opportunities.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../LeadProfileGeneralInfoSection.scss';
import CPTooltip from '../../../../../components/CP/CPTooltip';
import {
  MODAL_FOR_LEAD_FORM,
  DRAWER_FOR_PRINT_FORM,
  DRAWER_FOR_SEND_EMAIL,
  DRAWER_FOR_SEND_MESSAGE,
  DRAWER_FOR_TAGGING,
  DRAWER_FOR_PORTFOLIO_REASONS,
} from '../../../../../components/ModalRoot/repository';
import HandleAclPermission from '../../../../../components/HandleAclPermission';
import withModal from '../../../../../components/HOC/withModal';
import { Actions, isAclSkipped } from '../../../../../utils/aclActions';

const { Item } = Descriptions;
const { Text } = Typography;

const PersonLeadGeneralInfoSection = props => {
  const {
    partyPerson,
    partyBusiness,
    profileType,
    showModalAction,
    otherInfoList,
    levantId,
    leadType,
    selectedProduct,
    authorities,
  } = props;
  const handleOutgoingCallAction = async () => {
    const { mobilePhone } = partyPerson;
    await props.postClickToCallAction({ mobilePhone, levantId });
  };

  const showSendEmailDrawer = () => {
    props.showModalAction({
      type: DRAWER_FOR_SEND_EMAIL,
    });
  };

  const showSendMessageDrawer = () => {
    props.showModalAction({
      type: DRAWER_FOR_SEND_MESSAGE,
    });
  };

  const showTaggingDrawer = () => {
    props.showModalAction({
      type: DRAWER_FOR_TAGGING,
    });
  };

  const showPrintFormDrawer = () => {
    props.showModalAction({
      type: DRAWER_FOR_PRINT_FORM,
    });
  };

  const showPortfolioReasons = () => {
    props.showModalAction({
      type: DRAWER_FOR_PORTFOLIO_REASONS,
    });
  };

  const getFullName = () =>
    `${partyPerson?.firstName || ''} ${partyPerson?.lastName ||
      ''} ${partyBusiness?.name || ''}`;

  const handleEditAction = async () => {
    if (profileType === 'LEAD') {
      showModalAction({
        type: MODAL_FOR_LEAD_FORM,
        props: {
          initialValues: otherInfoList,
          title: `ویرایش ${getFullName()}`,
          isEditMode: true,
          levantId,
          activeForm: leadType?.toLowerCase(),
        },
      });
    } else {
      await Promise.all([
        props.getIdentificationByLevantIdAction(levantId),
        props.getDocumentTokenByLevantIdAction({
          levantId,
          product: selectedProduct,
        }),
      ]);
      await props.anyModalOpen('modalForUserProfileEditButton');
    }
  };

  const finalMenus = [
    {
      label: 'ویرایش',
      icon: mdiAccountEdit,
      action: handleEditAction,
      authority: Actions.editInLeadProfile,
    },
    {
      label: 'برچسب زدن',
      icon: mdiTag,
      action: showTaggingDrawer,
      authority: Actions.tagging,
    },
    {
      label: 'چاپ فرم',
      icon: mdiPrinter,
      action: showPrintFormDrawer,
      authority: Actions.printForm,
    },
  ];

  const menu = () => (
    <Menu className={s.menu}>
      {finalMenus?.map(m => {
        const couldShow = authorities?.filter(au => au?.code === m?.authority);
        if (couldShow?.length || !isAclSkipped(authorities)) {
          return (
            <Menu.Item className={s.menu_item} onClick={m?.action}>
              <Icon size="22px" path={m?.icon} className={s.menu_icon} />
              <span>{m?.label}</span>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );

  const renderActivityBtn = () => (
    <div className={s.personalInfoSection__sec1__activityBtn}>
      <HandleAclPermission wich={Actions.portfolioProfileRead}>
        <CPTooltip title="نمایش پورتفوی مالی">
          {/* <Link to={`/portfolio/${levantId}`}>
            
          </Link> */}
          <Button
            type="primary"
            ghost
            className={s.round_btn}
            onClick={showPortfolioReasons}
          >
            <Icon size="16px" path={mdiCurrencyUsd} />
            پورتفوی مالی
          </Button>
        </CPTooltip>
      </HandleAclPermission>
      <HandleAclPermission wich={Actions.sendSms}>
        <CPTooltip title="ارسال پیام">
          <Button
            type="primary"
            shape="circle"
            className={s.circle_btn}
            onClick={showSendMessageDrawer}
          >
            <Icon size="16px" path={mdiMessageProcessing} />
          </Button>
        </CPTooltip>
      </HandleAclPermission>
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
          title={`تماس با شماره همراه ${partyPerson?.mobilePhone || '---'}`}
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
      <Dropdown overlay={menu} trigger={['click']} placement="topLeft">
        <Icon
          size="32px"
          path={mdiDotsVertical}
          className={s.dotMenuVertical}
        />
      </Dropdown>
    </div>
  );

  return (
    <>
      <div className={s.personalInfoSection}>
        <div className={s.personalInfoSection__sec1}>
          <div
            className={s.personalInfoSection__sec1__name}
          >{`${partyPerson?.firstName || '---'} ${partyPerson?.lastName ||
            '---'}`}</div>
          {renderActivityBtn()}
        </div>
        <div className={s.personalInfoSection__sec2}>
          <Descriptions column={2} layout="vertical">
            <Item
              label={<span className={s.desc_info_label}>شماره همراه</span>}
            >
              <Text
                copyable={!!partyPerson?.mobilePhone}
                className={s.desc_info_content}
              >
                {partyPerson?.mobilePhone || '---'}
              </Text>
            </Item>
            <Item label={<span className={s.desc_info_label}>کد ملی</span>}>
              <Text
                copyable={!!partyPerson?.nationalCode}
                className={s.desc_info_content}
              >
                {partyPerson?.nationalCode || '---'}
              </Text>
            </Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};
PersonLeadGeneralInfoSection.propTypes = {
  partyPerson: PropTypes.array.isRequired,
  partyBusiness: PropTypes.array.isRequired,
  levantId: PropTypes.string.isRequired,
  anyModalOpen: PropTypes.func.isRequired,
  otherInfoList: PropTypes.object,
  leadType: PropTypes.string,
  profileType: PropTypes.string.isRequired,
  postClickToCallAction: PropTypes.func.isRequired,
  getDocumentTokenByLevantIdAction: PropTypes.func.isRequired,
  getIdentificationByLevantIdAction: PropTypes.func.isRequired,
  showModalAction: PropTypes.func.isRequired,
  selectedProduct: PropTypes.string.isRequired,
  authorities: PropTypes.array.isRequired,
};

PersonLeadGeneralInfoSection.defaultProps = {
  otherInfoList: {},
  leadType: '',
};

const mapStateToProps = state => ({
  partyPerson: state?.lead?.data?.partyPerson,
  levantId: state?.lead?.data?.levantId,
  partyBusiness: state.lead.data?.partyBusiness,
  otherInfoList: state.lead.data?.otherInfoList,
  selectedProduct: state.getProducts.selected,
  leadType: state.lead.data?.leadType,
  profileType: state.lead.data?.profileType,
  authorities: state?.acl?.authorities,
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
)(withStyles(s)(withModal(PersonLeadGeneralInfoSection)));
