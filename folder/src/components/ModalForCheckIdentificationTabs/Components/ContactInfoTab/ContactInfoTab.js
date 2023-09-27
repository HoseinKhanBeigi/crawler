import React from 'react';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ContactInfoTab.scss';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import CPAlert from '../../../CP/CPAlert/CPAlert';
import CPButton from '../../../CP/CPButton/CPButton';
import {
  getAddressStringByPostCodeAction,
  getOpportunitiesAction,
} from '../../../../store/opportunities/opportunities.actions';
import CPInput from '../../../CP/CPInput/CPInput';
import opportunityService from '../../../../service/opportunityService';
import { getProvinceWithCities } from '../../../../utils/getProvinceWithCities';
import CPSelect from '../../../CP/CPSelect/CPSelect';
import CPTextArea from '../../../CP/CPTextArea/CPTextArea';

class ContactInfoTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressByPostCode: null,
      loadingWorkPostalCodeAddress: false,
      loadingLivingPostalCodeAddress: false,
      cities: null,
      provinces: null,
      addressType: null,
      currentCitites: null,
      cityEditMode: null,
    };
  }

  componentDidMount() {
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities?.map(c => ({
        value: c.id,
        text: c.name,
        province_id: c.province_id,
      }));
      const convertedProvinces = data?.provinces?.map(p => ({
        value: p.id,
        text: p.name,
      }));
      const currentContact = this.props.identificationWithDocs?.personContacts.filter(
        p => p.type === 'LIVING',
      );
      const candidateCitites = convertedCities.filter(
        c => c.province_id === Number(currentContact[0].state, 10),
      );
      this.setState({ currentCitites: candidateCitites });
      this.setState({ cities: convertedCities });
      this.setState({ provinces: convertedProvinces });
    });
  }

  onEditAction = async (value, name) => {
    let body = {};
    if (typeof name === 'object') {
      body = {
        personContacts: [
          {
            [name.name]: value,
            type: name.type,
          },
        ],
      };
    } else {
      body = {
        personContacts: [
          {
            [name]: value,
          },
        ],
      };
    }
    await opportunityService.editIdentificationInfo(
      this.props.identificationWithDocs.levantId,
      this.props.opportunityId,
      body,
    );
    this.reload();
    this.setState({ cityEditMode: true });
  };

  handleOnProvinceSelected = v => {
    const candidate = this.state.cities.filter(c => c.province_id === v);
    this.setState({ currentCitites: candidate });
  };

  reload = () => {
    this.props.getOpportunitiesAction();
  };

  checkPostCode = async (type, postCode, loadingType) => {
    this.setState({
      [loadingType]: true,
    });
    const response = await this.props.getAddressStringByPostCodeAction(
      postCode,
    );
    this.setState({ addressType: type });
    this.setState({
      addressByPostCode: {
        postCode,
        message: response?.ErrorMessage || response?.Value,
      },
      [loadingType]: false,
    });
  };

  renderTextArea = (text, name, val, col = 8, hasValidation = false) => (
    <Col span={col}>
      <CPLabel label={text}>
        <CPTextArea
          value={val || ''}
          disabled
          hasValidation={hasValidation}
          rows={3}
          name={name}
          onEditAction={this.onEditAction}
          withEdit
        />
      </CPLabel>
    </Col>
  );

  renderField = (text, name, val, col = 8, hasValidation = false) => (
    <Col span={col}>
      <CPLabel label={text}>
        <CPInput
          value={val || ''}
          disabled
          name={name}
          onEditAction={this.onEditAction}
          withEdit
          hasValidation={hasValidation}
        />
      </CPLabel>
    </Col>
  );

  renderCitiesAndProvinces = (type, state, city) => (
    <>
      <Col span={8} className={s.address_item_mBottom}>
        <CPLabel label="استان">
          <CPSelect
            placeholder="استان را انتخاب کنید"
            onChange={this.handleOnProvinceSelected}
            dataSource={this.state.provinces}
            showSearch
            name={{ type, name: 'state' }}
            onEdit={this.onEditAction}
            defaultValue={state === null || state === 0 ? '---' : Number(state)}
            disabled
            withEdit
          />
        </CPLabel>
      </Col>
      <Col span={8} className={s.address_item_mBottom}>
        <CPLabel label="شهر">
          <CPSelect
            placeholder="شهر را انتخاب کنید"
            dataSource={this.state.currentCitites}
            showSearch
            name={{ type, name: 'city' }}
            onEdit={this.onEditAction}
            defaultValue={state === null || city === 0 ? '---' : Number(city)}
            disabled
            editMode={this.state.cityEditMode}
            withEdit
          />
        </CPLabel>
      </Col>
    </>
  );

  renderContacts = (array, justHome = false) => {
    const {
      addressByPostCode,
      loadingWorkPostalCodeAddress,
      loadingLivingPostalCodeAddress,
    } = this.state;
    return array?.map(item => {
      const { postalCode, street, tel, type, city, state, telPrefix } = item;
      const model = {
        LIVING: 'آدرس منزل:',
        OTHER: 'آدرس دیگر:',
        BUSINESS: 'آدرس کسب و کار:',
        WORK: 'آدرس محل کار:',
      };
      if (justHome && type === 'LIVING') {
        return (
          <CPLabel
            className={s.address}
            label={model[type]}
            position="right"
            key={street}
          >
            <div>
              {/* creat city and province section */}

              {this.state.cities &&
                this.state.provinces &&
                this.renderCitiesAndProvinces(type, state, city)}
              <Row>
                {this.renderTextArea(
                  'آدرس محل سکونت',
                  'street',
                  street,
                  24,
                  true,
                )}
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {this.renderField(
                  'کد پستی : ',
                  'postalCode',
                  postalCode,
                  8,
                  true,
                )}
                <CPButton
                  type="ghost"
                  size="small"
                  onClick={() => {
                    this.checkPostCode(
                      type,
                      postalCode,
                      type === 'WORK'
                        ? 'loadingWorkPostalCodeAddress'
                        : 'loadingLivingPostalCodeAddress',
                    );
                  }}
                  loading={
                    type === 'LIVING'
                      ? loadingLivingPostalCodeAddress
                      : loadingWorkPostalCodeAddress
                  }
                  className={s.postCodeCheck}
                >
                  بررسی کد پستی
                </CPButton>
              </Row>
              <br />
              {addressByPostCode?.postCode === postalCode &&
                this.state.addressType === type && (
                  <CPAlert
                    type="warning"
                    message={addressByPostCode?.message}
                  />
                )}
            </div>
          </CPLabel>
        );
      } else if (!justHome && type !== 'WORK') {
        return (
          <CPLabel
            className={s.address}
            label={model[type]}
            position="right"
            key={street}
          >
            <div className={s.address_container}>
              <Row className={s.address_item_mBottom}>
                {this.state.cities &&
                  this.state.provinces &&
                  this.renderCitiesAndProvinces(type, state, city)}
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {this.renderTextArea(
                  model[type],
                  { type, name: 'street' },
                  street,
                  16,
                  true,
                )}
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {this.renderField(
                  'کد پستی : ',
                  { type, name: 'postalCode' },
                  postalCode,
                  8,
                  true,
                )}
                <CPButton
                  type="ghost"
                  size="small"
                  onClick={() => {
                    this.checkPostCode(
                      type,
                      postalCode,
                      type === 'WORK'
                        ? 'loadingWorkPostalCodeAddress'
                        : 'loadingLivingPostalCodeAddress',
                    );
                  }}
                  loading={
                    type === 'LIVING'
                      ? loadingLivingPostalCodeAddress
                      : loadingWorkPostalCodeAddress
                  }
                  className={s.postCodeCheck}
                >
                  بررسی کد پستی
                </CPButton>
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {this.renderField(
                  'شماره تماس : ',
                  { type, name: 'tel' },
                  tel,
                  8,
                  true,
                )}
                {this.renderField(
                  'کد شهر  : ',
                  { type, name: 'telPrefix' },
                  telPrefix,
                  8,
                  true,
                )}
              </Row>
              <br />
              {addressByPostCode?.postCode === postalCode &&
                this.state.addressType === type && (
                  <CPAlert
                    type="warning"
                    message={addressByPostCode?.message}
                  />
                )}
            </div>
          </CPLabel>
        );
      }
      return null;
    });
  };

  render() {
    const {
      identificationWithDocs,
      stateData,
      identification,
      justBusiness,
    } = this.props;
    const { contactStatus, businessContactStatus } = stateData;
    const primaryContactStatus = identification?.contactStatus;
    const primaryBusinessContactStatus = identification?.businessContactStatus;
    return (
      <div className={s.root}>
        {!justBusiness && (
          <div>
            <div className={s.docsHeader}>
              <span>مشخصات محل سکونت</span>
              <div className={s.radioBox}>
                <ApproveButton
                  handleChange={this.props.handleChange}
                  primaryValue={primaryContactStatus}
                  value={contactStatus}
                  item="contactStatus"
                  rejectedByQC={identificationWithDocs?.rejectedByQC}
                />
              </div>
            </div>
            <Row className={s.address_item_mBottom}>
              {identificationWithDocs?.email &&
                this.renderField(
                  'آدرس ایمیل : ',
                  { type: 'EMAIL', name: 'emailAddress' },
                  identificationWithDocs.email,
                  8,
                  true,
                )}
            </Row>
            {identificationWithDocs?.email && <Divider />}
            {this.renderContacts(identificationWithDocs?.personContacts, false)}
            {identificationWithDocs?.businessContacts?.length ? (
              <div className={s.docsHeader}>
                <span>مشخصات محل کسب و کار</span>
                <div className={s.radioBox}>
                  <ApproveButton
                    handleChange={this.props.handleChange}
                    primaryValue={primaryBusinessContactStatus}
                    value={businessContactStatus}
                    item="businessContactStatus"
                    rejectedByQC={identificationWithDocs?.rejectedByQC}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {this.renderContacts(identificationWithDocs?.businessContacts)}
          </div>
        )}
        {justBusiness && (
          <div>
            {identificationWithDocs?.businessContacts?.length ? (
              <div className={s.docsHeader}>
                <span>مشخصات محل کسب و کار</span>
                <div className={s.radioBox}>
                  <ApproveButton
                    handleChange={this.props.handleChange}
                    primaryValue={primaryBusinessContactStatus}
                    value={businessContactStatus}
                    item="businessContactStatus"
                    rejectedByQC={identificationWithDocs?.rejectedByQC}
                  />
                </div>
              </div>
            ) : (
              <div />
            )}
            {this.renderContacts(identificationWithDocs?.businessContacts)}
          </div>
        )}
      </div>
    );
  }
}

ContactInfoTab.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  getAddressStringByPostCodeAction: PropTypes.func.isRequired,
  justBusiness: PropTypes.bool,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

ContactInfoTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
  justBusiness: false,
  opportunityId: '',
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  getOpportunitiesAction: PropTypes.func.isRequired,
});

const mapDispatch = {
  getAddressStringByPostCodeAction,
  getOpportunitiesAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(ContactInfoTab));
export const ModalForCheckIdentificationTabContactInformationTest = ContactInfoTab;
