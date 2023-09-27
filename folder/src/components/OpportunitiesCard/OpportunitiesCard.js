/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Typography } from 'antd';
import cs from 'classnames';
import Button from '../CP/CPButton';
import CPTooltip from '../CP/CPTooltip';
import s from './OpportunitiesCard.scss';
import { getTaskListAction } from '../../store/task/task.actions';
import Link from '../Link';
import CPPopConfirm from '../CP/CPPopConfirm';
import { anyModalOpen } from '../../store/opportunities/opportunities.actions';
import convertToJalaliDate from '../../utils/date';
import CPCollapse from '../CP/CPCollapse/CPCollapse';
import {
  MODAL_FOR_REJECTION_REASON,
  MODAL_FOR_SHOW_MEETING_DETAILS,
} from '../ModalRoot/repository';
import withModal from '../HOC/withModal';
import MobileNumberWithUnmask from '../KianTable/renderer/MobileNumberWithUnmask';
import HandleAclPermission from '../HandleAclPermission';
import { Actions } from '../../utils/aclActions';

const { Text } = Typography;

class OpportunitiesCard extends Component {
  showRejectionReasonModal = data => e => {
    e.stopPropagation();
    this.props.showModalAction({
      type: MODAL_FOR_REJECTION_REASON,
      props: {
        data,
      },
    });
  };

  infoIcons = () => {
    const { data } = this.props;
    const icons = [];

    if (data.rejected) {
      icons.push({
        icon: 'stop',
        action: this.showRejectionReasonModal(data),
        color: 'red',
        tooltip: 'ریجکت شده',
      });
    }

    if (data.hasLegalAge === false) {
      icons.push({
        icon: right => (
          <span style={{ right }} className={cs(s.infoIcons, s.illegalAgeIcon)}>
            18
          </span>
        ),
        tooltip: 'زیر ۱۸ سال',
      });
    }

    return icons;
  };

  renderInfoIcons = () =>
    this.infoIcons().map(({ icon, action, tooltip, color }, index) => (
      <Tooltip title={tooltip} key={tooltip}>
        {typeof icon === 'string' ? (
          <Icon
            onClick={action}
            type="stop"
            style={{ color, right: index * 18 }}
            className={s.infoIcons}
          />
        ) : (
          icon(index * 18)
        )}
      </Tooltip>
    ));

  // render card actions
  renderActions = (item, data) => {
    const {
      cardLoading,
      helpers: { actionHandler, actionCancelHandler },
      product,
    } = this.props;
    const { id, levantId } = data;

    // define actions that need pop-confirm
    const theseActionsNeedPopConfirm = [
      'GENERATE_PRINT_PASSWORD',
      'CONFIRM_BROKERAGE',
      'NEED_SEJAM_CODE',
      'CREATE_DONYA_FUND_USER',
      'GENERATE_TRADING_CODE',
      'OPEN_ONLINE_ACCOUNT_RAYAN',
    ];

    // check action to define pop-confirm button text
    const popConfirmText = [
      'NEED_SEJAM_CODE',
      'OPEN_ONLINE_ACCOUNT_RAYAN',
      'GENERAL_CREATE_RAYAN_USER',
      'CREATE_RAYAN_USER',
      'CREATE_MABNA_USER',
    ];

    const needPopConfirm = theseActionsNeedPopConfirm.includes(item.code);
    const noOrCancel = popConfirmText.includes(item.code);

    if (needPopConfirm) {
      return (
        <CPPopConfirm
          okText="بله"
          title={`آیا از ${item.name} اطمینان دارید؟`}
          cancelText={noOrCancel ? 'خیر' : 'انصراف'}
          onConfirm={() => {
            actionHandler(data, item);
          }}
          placement="topRight"
          key={item.code}
          onCancel={() =>
            actionCancelHandler(
              item.code,
              levantId,
              id,
              data,
              product,
              cardLoading,
            )
          }
        >
          <Button
            className={s.action}
            loading={cardLoading === data.id}
            data-cy={item.code}
          >
            {item.name}
          </Button>
        </CPPopConfirm>
      );
    }

    return (
      <Button
        className={cs(s.action, !item.code && s.readOnly)}
        {...(!item.code ? { disabled: true } : {})}
        onClick={() => {
          actionHandler(data, item);
        }}
        key={item.code}
        loading={cardLoading === data.id}
        data-cy={item.code}
      >
        {item.name}
      </Button>
    );
  };

  renderKycIdentificationSection = currentStageTitle => {
    if (currentStageTitle) {
      return (
        <div className={s.section}>
          <div className={s.section_item}>
            <span className={s.section_item__text}>در مرحله</span>
            <CPTooltip title={`در مرحله ${currentStageTitle}` || '---'}>
              <div className={s.section_value}>
                {currentStageTitle || '---'}
              </div>
            </CPTooltip>
          </div>
        </div>
      );
    }
    return '';
  };

  render() {
    const { data, cardLoading } = this.props;
    const {
      actions,
      hasProduct,
      company,
      startOnboardingFor,
      authorizedLevantId,
    } = data;
    const hasActionBar =
      data.opportunityStatus === 'FOLLOW_UP' || data.meetingSet || hasProduct;

    const phoneNumber = data?.phoneNO || data?.authorizedMobile;

    return (
      <div
        className={cs(s.cardContainer, {
          [s.followUp]: data.opportunityStatus === 'FOLLOW_UP',
          [s.hasAction]: actions?.length > 0,
        })}
        key={data.id}
        id={data.id}
      >
        {startOnboardingFor === 'PARENTS' ? (
          <Link to={`/lead/${authorizedLevantId}`} target>
            <div className={s.navTo}>
              مشاهده حساب کاربری ولی
              <Icon type="arrow-left" />
            </div>
          </Link>
        ) : null}
        <div className={s.relative}>
          {cardLoading === data?.id && <div className={s.loader} />}
          {hasActionBar && (
            <div className={s.topActions}>
              {hasProduct && (
                <CPTooltip
                  title="این کاربر نیاز به امضای فرم ندارد"
                  className={s.actionIcon}
                >
                  <Icon type="warning" style={{ color: '#fff' }} />
                </CPTooltip>
              )}
              {data.meetingSet && (
                <Tooltip title="نمایش جزئیات قرار ملاقات">
                  <Icon
                    type="schedule"
                    style={{ color: '#fff' }}
                    onClick={e => {
                      e.stopPropagation();
                      this.props.showModalAction({
                        type: MODAL_FOR_SHOW_MEETING_DETAILS,
                        props: {
                          currentUser: data,
                        },
                      });
                    }}
                  />
                </Tooltip>
              )}
              {data.opportunityStatus === 'FOLLOW_UP' && (
                <CPTooltip
                  title="فرآیند ثبت نام برای این کاربر نیمه کاره رها شده است، و نیاز به پیگری دارد."
                  className={s.actionIcon}
                >
                  <Icon
                    type="phone"
                    style={{ color: '#fff' }}
                    className={s.icon}
                  />
                </CPTooltip>
              )}
            </div>
          )}
          <div className={cs(s.card)}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              onClick={e => e.stopPropagation()}
              className={s.card__cardTitle}
            >
              <Link
                to={`/lead/${data?.levantId}`}
                className={s.cardTitle}
                target
              >
                {data?.cardName}
              </Link>
            </div>
            <div className={s.productNameSection}>
              <span className={s.text}>نام محصول :‌</span>
              <span className={s.text}>
                {data?.requestedProductGroupTitle || '---'}
              </span>
            </div>
            <div className={s.oppOwnerSection}>
              <div className={s.oppOwnerSection__info}>
                <Icon type="user" />
                <span className={s.oppOwnerSection__title}>اپراتور: </span>
                <CPTooltip title={data?.ownerFullName || '---'}>
                  <span className={s.oppOwnerSection__name}>
                    {data?.ownerFullName || '---'}
                  </span>
                </CPTooltip>
              </div>
              <span className={s.infoIcons_container}>
                {this.renderInfoIcons()}
              </span>
            </div>
            {this.renderKycIdentificationSection(data?.currentStageTitle)}
            <div className={s.cardDescWithBackground}>
              <div className={s.sec1}>
                <div className={s.cardDescription}>
                  <span className={s.cardDescription__title}>شماره تلفن: </span>
                  {phoneNumber
                    ? MobileNumberWithUnmask(phoneNumber, data, false)
                    : '---'}
                </div>
                <div className={s.cardDescription}>
                  <span className={s.cardDescription__title}>
                    {data.partyType === 'BUSINESS' ? 'شناسه ملی' : 'کد ملی'} :
                  </span>
                  {data?.nationalCode ? (
                    <Text style={{ direction: 'ltr' }}>
                      {data?.nationalCode}
                    </Text>
                  ) : (
                    '---'
                  )}
                </div>
              </div>
              {company?.name ? (
                <div className={s.cardDescription}>
                  <span className={s.cardDescription__title}>نهاد</span>
                  {company?.name ? (
                    <Text style={{ direction: 'ltr' }}>{company?.name}</Text>
                  ) : (
                    '---'
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <CPCollapse>
          <div className={cs(s.makeRowDescription, s.smallDescription)}>
            <span>تاریخ ساخت: </span>
            {convertToJalaliDate(data?.createdDate) || 'تاریخ ندارد'}
          </div>
          <div className={cs(s.makeRowDescription, s.smallDescription)}>
            <span>تاریخ ویرایش: </span>
            {convertToJalaliDate(data?.lastModifiedDate) || 'تاریخ ندارد'}
          </div>
          <div className={cs(s.makeRowDescription, s.smallDescription)}>
            <span> مدت زمان : </span>
            {data?.elapsedDate?.day > 0 && `${data?.elapsedDate?.day} روز`}
            {data?.elapsedDate?.hour > 0 && data?.elapsedDate?.day > 0 && ' و '}
            {data?.elapsedDate?.hour > 0 && `${data?.elapsedDate?.hour} ساعت `}
          </div>
          {data?.meetingSet && (
            <div className={cs(s.makeRowDescription, s.smallDescription)}>
              <span>تاریخ ملاقات : </span>
              {convertToJalaliDate(data?.meeting?.fromDate)} ساعت{' '}
              {convertToJalaliDate(data?.meeting?.fromDate, 'HH')} تا{' '}
              {convertToJalaliDate(data?.meeting?.toDate, 'HH')}
            </div>
          )}
        </CPCollapse>
        {actions?.length > 0 && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <HandleAclPermission wich={Actions.opportunityAction}>
            <div
              className={s.actionBar}
              role="button"
              onClick={e => e.stopPropagation()}
            >
              {actions.map(item => this.renderActions(item, data))}
              <div className={s.leftCard} />
              <div className={s.rightCard} />
            </div>
          </HandleAclPermission>
        )}
      </div>
    );
  }
}

OpportunitiesCard.propTypes = {
  data: PropTypes.object,
  handleVisible: PropTypes.func,
  cardLoading: PropTypes.string,
  product: PropTypes.string,
  helpers: PropTypes.object.isRequired,
  anyModalOpen: PropTypes.func.isRequired,
  anyModalVisible: PropTypes.string,
  showModalAction: PropTypes.func.isRequired,
};

OpportunitiesCard.defaultProps = {
  data: null,
  cardLoading: null,
  product: null,
  anyModalVisible: null,
  handleVisible: () => {},
};

const mapState = state => ({
  cardLoading: state.opportunities.loadingOnCard,
  product: state.getProducts.selected,
  anyModalVisible: state.opportunities.anyModalVisible,
});

const mapDispatch = {
  anyModalOpen,
  getTaskListAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(OpportunitiesCard)));
