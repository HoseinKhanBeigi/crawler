import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EntityRightColumn.scss';
import EntityDetailsInfo from '../EntityDetailsInfo/EntityDetailsInfo';
import EntityProfileMiniInfo from '../EntityProfileMiniInfo/EntityProfileMiniInfo';
import {
  getLeadAction,
  getLeadRelationsAction,
} from '../../store/lead/lead.actions';
import { postClickToCallAction } from '../../store/phoneCalls/phoneCalls.actions';
import {
  applicationType,
  gender,
  leadStatus,
  partyStatus,
  banks,
} from './schema';

class EntityRightColumn extends React.Component {
  async componentDidMount() {
    const { leadInfo } = this.props;
    await this.props.getLeadRelationsAction(leadInfo?.partyPerson?.levantId);
  }
  /**
   * This method return user profile info object />
   */
  getPartyPerson = () => {
    const { leadInfo } = this.props;
    return leadInfo?.partyPerson || null;
  };

  /**
   * This method return user contact info array />
   */
  getPersonContacts = () => {
    const { leadInfo } = this.props;
    return leadInfo?.contacts || null;
  };

  /**
   * This method return user bank account list array />
   */
  getBankAccounts = () => {
    const { leadInfo } = this.props;
    return leadInfo?.bankAccounts || null;
  };

  /**
   * This method return user product list array />
   */
  getProductList = () => {
    const { leadInfo } = this.props;
    return leadInfo?.productList || null;
  };

  /**
   * This method return Email Address DTO />
   */
  getEmailAddressDTO = () => {
    const { leadInfo } = this.props;
    return leadInfo?.emailAddressDTO || null;
  };

  /**
   * This method return user details info array />
   */
  getOtherInfoList = () => {
    const { leadInfo } = this.props;
    return leadInfo?.otherInfoList || null;
  };

  /**
   * This method return certificate number />
   */
  getCertificateNumber = (serialNumber, seriesNumber) => {
    if (!serialNumber && !seriesNumber) {
      return null;
    }

    return `${serialNumber} - ${seriesNumber}`;
  };

  /**
   * this method create user info object
   * @returns {*} return leadInfo.json object
   * author f.ghasemkhani@kian.digital
   */
  handleOutgoingCallAction = async () => {
    const { leadInfo, levantId } = this.props;
    const customerNumber = leadInfo?.partyPerson?.mobilePhone;
    await this.props.postClickToCallAction({ customerNumber, levantId });
  };
  createRightColData = () => {
    const { leadInfo, leadRelationsData } = this.props;
    const partyPerson = this.getPartyPerson();
    const personContacts = this.getPersonContacts();
    const productList = this.getProductList();
    const bankAccounts = this.getBankAccounts();
    const otherInfoList = this.getOtherInfoList();
    const getEmailAddressDTO = this.getEmailAddressDTO();
    const data = [];
    if (partyPerson != null) {
      data.push({
        id: leadInfo?.partyPerson?.id,
        profileType: leadInfo?.profileType,
        leadGenerationChannel: leadInfo?.leadGenerationChannel,
        personalInfo: [
          {
            label: 'موبایل:',
            content: leadInfo?.partyPerson?.mobilePhone || null,
            action: {
              method: this.handleOutgoingCallAction,
              toolTip: `تماس با شماره ${leadInfo?.partyPerson?.mobilePhone}`,
            },
          },
          {
            label: 'کد ملی:',
            content: leadInfo?.partyPerson?.nationalCode || null,
          },
          {
            label: 'برنامه:',
            content:
              applicationType[leadInfo?.partyPerson?.creatorApp]?.title || null,
          },
          {
            label: 'وضعیت:',
            content:
              leadInfo?.profileType === 'LEAD'
                ? leadStatus?.[leadInfo?.leadStatus]?.title || null
                : partyStatus?.[leadInfo?.partyPerson?.stats]?.title || null,
          },
          {
            label: 'شماره شناسنامه:',
            content: leadInfo?.partyPerson?.certificateNumber || null,
          },
          {
            label: 'سریال شناسنامه:',
            content: this.getCertificateNumber(
              leadInfo?.partyPerson?.certificateSerialNumber,
              leadInfo?.partyPerson?.certificateSeriesNumber,
            ),
          },
          {
            label: 'نام پدر:',
            content: leadInfo?.partyPerson?.fathername || null,
          },
          {
            label: 'جنسیت:',
            content: gender[leadInfo?.partyPerson?.gender]?.title || null,
          },
          {
            label: 'ایمیل:',
            content: getEmailAddressDTO?.email || null,
          },
        ],
        personContacts: personContacts?.map(items => ({
          address: items.street ? items.street : null,
          postalCode: items.postalCode || null,
          tel: items.tel || null,
          type: items.type || null,
          emailAddress: items.emailAddress || null,
          state: items.state,
          city: items.city,
          street: items.street,
        })),
        productList: productList?.map(items => ({
          title: items.title || null,
          applicationName:
            applicationType[items.applicationName]?.title || null,
        })),
        bankAccounts: bankAccounts?.map(items => ({
          accountNumber: items.accountNumber || null,
          iban: items.iban || null,
          bankName: banks[items.bankName]?.bankName || null,
        })),
        otherInfoList: otherInfoList?.map(items => ({
          title: items.name,
          value: items.value,
        })),
        relationsList: leadRelationsData?.map(items => ({
          name: items.name,
          relationTitle: items.relationTitle,
          relationType: items.relationType,
          type: items.type,
          relationLevantId: items.relationLevantId,
        })),
      });
      return data;
    }

    return null;
  };

  render() {
    const { leadInfo, hasHeader, fullWidth } = this.props;
    return (
      <div
        className={cs(s.entityRightColumn, fullWidth ? 'isFull' : 'notFull')}
      >
        {hasHeader && (
          <EntityProfileMiniInfo levantId={leadInfo?.levantId} hasEdit />
        )}
        <EntityDetailsInfo
          data={this.createRightColData()}
          levantId={leadInfo?.partyPerson?.levantId}
          profileType={leadInfo?.profileType}
        />
      </div>
    );
  }
}

EntityRightColumn.propTypes = {
  leadInfo: PropTypes.object,
  hasHeader: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leadRelationsData: PropTypes.array,
  getLeadRelationsAction: PropTypes.func.isRequired,
  postClickToCallAction: PropTypes.func.isRequired,
  levantId: PropTypes.number.isRequired,
};

EntityRightColumn.defaultProps = {
  leadInfo: null,
  hasHeader: false,
  fullWidth: false,
  leadRelationsData: null,
};

const mapState = state => ({
  leadInfo: state.lead.data,
  levantId: state.neshanAuth?.jwt?.levantId,
  leadRelationsData: state.lead.leadRelationsData,
});

const mapDispatch = {
  getLeadAction,
  getLeadRelationsAction,
  postClickToCallAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(EntityRightColumn));
