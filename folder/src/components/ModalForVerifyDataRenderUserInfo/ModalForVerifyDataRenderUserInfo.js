import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForVerifyDataRenderUserInfo.scss';
import CPLabel from '../CP/CPLabel';
import CPInput from '../CP/CPInput';
import CPSelect from '../CP/CPSelect';
import CPSimpleDatePicker from '../CP/CPSimpleDatePicker';
import CPButton from '../CP/CPButton';
import { getCrmActivitiesAction } from '../../store/newActivities/newActivities.actions';
import CertificateSerialNumber from '../CertificateSerialNumber';
import { pageSizeInTableList } from '../../webConfig';
import { envContext } from '../../serviceConfig';

import {
  nationalityData,
  genderData,
  employeeSizeData,
  businessTypeData,
} from './schema';
import CPMessage from '../CP/CPMessage';
import {
  anyModalClose,
  getOpportunitiesAction,
  postConfirmBusinessByQcAction,
  postConfirmByQcAction,
  postRejectByQcAction,
  putAdditionalBusinessPersonalInfoAction,
  putAdditionalInfoAction,
} from '../../store/opportunities/opportunities.actions';
import { isPersianAlphabet } from '../../utils/string';
import { getProvinceWithCities } from '../../utils/getProvinceWithCities';
import opportunityService from '../../service/opportunityService';

const pagination = `page=0&size=${pageSizeInTableList}`;

class ModalForVerifyDataRenderUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getPropsToState(props);
  }

  componentDidMount() {
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities.map(c => ({
        value: c.id,
        text: `${data.provinces.find(p => p.id === c.province_id)?.name} - ${
          c.text
        }`,
      }));
      this.setState({ cities: convertedCities });
    });
  }

  componentDidUpdate() {
    if (this.props.shouldSaveBusinessAdditionalInfo) {
      if (this.validForPutPersonalBusinessAdditionalInfo()) {
        const {
          enName,
          enLastName,
          enFatherName,
          emailAddress,
          websiteAddress,
        } = this.state;
        const body = {
          enName,
          enLastName,
          enFatherName,
          emailAddress,
          websiteAddress,
          levantId: this.props.identificationWithDocs.levantId,
        };
        this.props
          .putAdditionalBusinessPersonalInfoAction(
            body,
            this.props.opportunityId,
          )
          .then(data => {
            if (data.err) {
              CPMessage('خطایی در ذخیره اطلاعات شخصی رخ داده است!', 'error');
            } else {
              CPMessage('اطلاعات شخصی ذخیره شد', 'success');
            }
          });
      } else {
        CPMessage('لطفا اطلاعات شخصی را تکمیل نمایید!', 'warning');
      }
    }
  }

  getPropsToState = props => {
    const {
      birthLocation = null,
      issueLocation = null,
      birthdate = null,
      certificateNumber = null,
      registerNumber = null,
      certificateSerialNumber = null,
      certificateSeriesNumber = null,
      fathername = null,
      email = null,
      shebaNo = null,
      gender = null,
      levantId = null,
      nationality = null,
      businessName = null,
      businessType = null,
      employeeSize = null,
      enName = null,
      enLastName = null,
      enFatherName = null,
      emailAddress = null,
      websiteAddress = null,
      businessGroup = null,
    } = props.identificationWithDocs || {};

    return {
      birthLocation: birthLocation || 304,
      issueLocation: issueLocation || 304,
      birthdate,
      certificateNumber,
      registerNumber,
      certificateSerialNumber,
      certificateSeriesNumber,
      fathername,
      email,
      shebaNo,
      gender,
      levantId,
      nationality: nationality || 'ایرانی',

      // business data
      businessName,
      businessType,
      employeeSize,
      enName,
      enLastName,
      enFatherName,
      businessGroup,
      emailAddress,
      websiteAddress,
      cities: [],
      rejectByQcLoading: false,
      rejectByQcAllLoading: false,
    };
  };

  validForPutPersonalBusinessAdditionalInfo = () =>
    this.state.enName && this.state.enLastName && this.state.enFatherName;

  closeModal = () => {
    this.props.anyModalClose();
  };

  confirmByQc = async () => {
    const { currentUser } = this.props;
    let response;
    if (currentUser?.actions[0]?.code === 'BUSINESS_CONFIRM_BY_QC') {
      response = await this.props.postConfirmBusinessByQcAction(
        currentUser?.id,
        {},
      );
    } else {
      response = await this.props.postConfirmByQcAction(currentUser?.id, {});
    }
    if (response) {
      CPMessage('تایید شد.', 'success');
      this.props.anyModalClose();
      this.reload();
    } else {
      CPMessage('خطا', 'error');
    }
  };

  rejectByQc = async ({ rejectAll = false }) => {
    const { currentUser } = this.props;
    if (rejectAll === true) {
      this.setState({ rejectByQcAllLoading: true });
    } else if (rejectAll === false) {
      this.setState({ rejectByQcLoading: true });
    }
    const response = await this.props.postRejectByQcAction(
      currentUser?.id,
      rejectAll,
    );
    if (response && !response?.err) {
      CPMessage('رد شد.', 'success');
      if (rejectAll === true) {
        this.setState({ rejectByQcAllLoading: false });
      }
      this.setState({ rejectByQcLoading: false });
      this.props.anyModalClose();
      this.reload();
    } else {
      CPMessage('خطا', 'error');
    }
  };

  // action call on submit for additional-info
  updateAdditionalInfo = async () => {
    const { target, isBusiness = false, opportunityId, inProfile } = this.props;
    const {
      birthLocation,
      issueLocation,
      birthdate,
      certificateNumber,
      certificateSerialNumber,
      certificateSeriesNumber,
      fathername,
      email,
      shebaNo,
      gender,
      nationality,
      emailAddress,
      enFatherName,
      enLastName,
      enName,
      websiteAddress,
    } = this.state;

    const levantId = this.state.levantId || target;
    /* this object define person or business status of (document and personal info) */
    // const identificationWithDocs = this.props.identificationWithDocs || {};

    // const { businessType } = identificationWithDocs;

    // TODO handle update for business
    const businessBody = {
      emailAddress,
      enFatherName,
      enLastName,
      enName,
      websiteAddress,
    };

    const personalBody = {
      birthLocation,
      issueLocation,
      birthdate: birthdate || null,
      certificateNumber: certificateNumber || null,
      certificateSerialNumber: certificateSerialNumber || null,
      certificateSeriesNumber: certificateSeriesNumber || null,
      fathername: fathername || null,
      email: email || null,
      shebaNo: shebaNo || null,
      gender: gender || null,
      levantId,
      nationality,
    };

    const body = isBusiness ? businessBody : personalBody;

    const id = inProfile ? levantId : opportunityId; // TODO: Refactor check type of modal. now check base on target (modal use in profile or in opportunity)
    const type = inProfile ? 'levant' : 'opportunity'; // TODO: Refactor check type of modal. now check base on target (modal use in profile or in opportunity)
    if (isBusiness) {
      try {
        await opportunityService.addBusinessPersonalAdditionalInfo(id, body);
        this.reload();
        this.props.anyModalClose();
      } catch (e) {
        console.error(e);
      }
    } else {
      const response = await this.props.putAdditionalInfoAction(body, id, type);
      if (response) {
        CPMessage('ذخیره شد.', 'success');
        this.props.anyModalClose();
        // Add crm activity log
        if (target) {
          await this.props.getCrmActivitiesAction({
            levantId,
            pagination,
          });
        }
        if (!inProfile) {
          this.reload();
        }
      } else {
        CPMessage('خطا در ذخیره اطلاعات', 'error');
      }
    }
  };

  reload = () => {
    this.props.getOpportunitiesAction();
  };

  handleChange = (key, value, justEn) => {
    if (key === 'fathername' && !isPersianAlphabet(value) && value !== '')
      return;
    if (justEn && isPersianAlphabet(value) && value !== '') return;
    this.setState({ [key]: value });
  };

  /**
   * This method renders the inputs
   * @param text: the Persian label shown in input field
   * @param name: the name of field used to change it
   * @param val: the value of input used to show
   * @param disabled
   * @param justEn
   */
  renderField = (text, name, val, disabled = false, justEn = false) => (
    <CPLabel label={text}>
      <CPInput
        disabled={disabled}
        value={val || ''}
        onChange={e => this.handleChange(name, e.target.value, justEn)}
        placeholder={text}
      />
    </CPLabel>
  );

  render() {
    const {
      birthLocation,
      issueLocation,
      birthdate,
      certificateNumber,
      registerNumber,
      certificateSerialNumber,
      certificateSeriesNumber,
      fathername,
      email,
      shebaNo,
      businessType,
      businessGroup,
      employeeSize,
      businessName,
      gender,
      nationality,
      enName,
      enLastName,
      enFatherName,
      emailAddress,
      websiteAddress,
      cities,
    } = this.state;
    const {
      statesData,
      additionalInfoLoading,
      postConfirmByQcLoading,
      className,
      isBusiness,
      modalType,
      products,
    } = this.props;

    const isConfirmByQc = modalType === 'modalForConfirmByQc';
    const identificationWithDocs = this.props.identificationWithDocs || {};
    if (!identificationWithDocs || !statesData) {
      return <div />;
    }
    const { firstName, lastName, nationalCode } = identificationWithDocs;

    const error =
      !birthLocation ||
      !issueLocation ||
      !birthdate ||
      !certificateNumber ||
      !certificateSerialNumber ||
      !certificateSeriesNumber ||
      !fathername ||
      !gender ||
      !nationality;

    const businessError = !enName || !enLastName || !enFatherName;

    return (
      <div className={cs(s.root, className)}>
        <div>
          {isBusiness && isConfirmByQc ? (
            <React.Fragment>
              <div className={s.docsHeader}>
                <span>مشخصات کسب و کار</span>
              </div>
              <div className={s.additionalInfo}>
                {this.renderField(
                  'نام کسب و کار',
                  'businessName',
                  businessName,
                  true,
                )}
                {this.renderField(
                  'شماره جواز',
                  'registerNumber',
                  registerNumber,
                  true,
                )}
                <CPLabel label="تعداد کارمندان">
                  <CPSelect
                    placeholder="تعداد کارمندان"
                    defaultValue={employeeSize}
                    dataSource={employeeSizeData}
                    onChange={e => this.handleChange('employeeSize', e)}
                    disabled={isConfirmByQc}
                  />
                </CPLabel>
                <CPLabel label="نوع کسب و کار">
                  <CPSelect
                    placeholder="نوع کسب و کار"
                    defaultValue={businessType}
                    dataSource={businessTypeData}
                    onChange={e => this.handleChange('businessType', e)}
                    disabled={isConfirmByQc}
                  />
                </CPLabel>
                <CPLabel label="دسته کسب و کار">
                  <CPSelect
                    placeholder="دسته کسب و کار"
                    defaultValue={businessGroup}
                    dataSource={businessTypeData}
                    onChange={e => this.handleChange('businessType', e)}
                    disabled={isConfirmByQc}
                  />
                </CPLabel>
              </div>
              <br />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={s.docsHeader}>
                <span>مشخصات شخصی</span>
              </div>
              <div className={s.additionalInfo}>
                {this.renderField(
                  'نام',
                  'firstName',
                  firstName,
                  isConfirmByQc || isBusiness,
                )}
                {this.renderField(
                  'نام خانوادگی',
                  'lastName',
                  lastName,
                  isConfirmByQc || isBusiness,
                )}
                {this.renderField(
                  'کد ملی',
                  'nationalCode',
                  nationalCode,
                  isConfirmByQc || isBusiness,
                )}
                {this.renderField(
                  'شماره شبا',
                  'shebaNo',
                  shebaNo,
                  isConfirmByQc || isBusiness,
                )}
                {this.renderField(
                  'پست الکترونیکی',
                  'email',
                  email,
                  isConfirmByQc || isBusiness,
                )}
                <CPLabel label="شماره شناسنامه">
                  <CPInput
                    value={certificateNumber}
                    type="number"
                    onChange={e =>
                      this.handleChange('certificateNumber', e.target.value)
                    }
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                <CPLabel label="سریال شناسنامه">
                  <CertificateSerialNumber
                    serialNumber={certificateSerialNumber}
                    seriesNumber={certificateSeriesNumber}
                    getSerialNumber={e =>
                      this.handleChange('certificateSerialNumber', e)
                    }
                    getSeriesNumber={e =>
                      this.handleChange('certificateSeriesNumber', e)
                    }
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                {this.renderField(
                  'نام پدر',
                  'fathername',
                  fathername,
                  isConfirmByQc || isBusiness,
                )}
                <CPLabel label="ملیت">
                  <CPSelect
                    placeholder="ملیت"
                    defaultValue={nationality || 'ایرانی'}
                    dataSource={nationalityData}
                    onChange={e => this.handleChange('nationality', e)}
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                <CPLabel label="جنسیت">
                  <CPSelect
                    placeholder="جنسیت"
                    defaultValue={gender}
                    dataSource={genderData}
                    onChange={e => this.handleChange('gender', e)}
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                <CPLabel label="محل صدور">
                  <CPSelect
                    placeholder="محل صدور"
                    defaultValue={Number(issueLocation)}
                    dataSource={cities}
                    onChange={e => this.handleChange('issueLocation', e)}
                    showSearch
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                <CPLabel label="محل تولد">
                  <CPSelect
                    placeholder="محل تولد"
                    defaultValue={Number(birthLocation)}
                    dataSource={cities}
                    onChange={e => this.handleChange('birthLocation', e)}
                    showSearch
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>
                <CPLabel label="تاریخ تولد">
                  <CPSimpleDatePicker
                    className={s.datePicker}
                    defaultValue={birthdate}
                    onChange={e => this.handleChange('birthdate', e.getTime())}
                    disabled={isConfirmByQc || isBusiness}
                  />
                </CPLabel>

                {isBusiness && !isConfirmByQc && (
                  <>
                    {this.renderField('نام (انگلیسی)', 'enName', enName)}
                    {this.renderField(
                      'نام خانوادگی (انگلیسی)',
                      'enLastName',
                      enLastName,
                      false,
                      true,
                    )}
                    {this.renderField(
                      'نام پدر (انگلیسی)',
                      'enFatherName',
                      enFatherName,
                      false,
                      true,
                    )}
                    {this.renderField(
                      'آدرس ایمیل',
                      'emailAddress',
                      emailAddress,
                      false,
                      true,
                    )}
                    {this.renderField(
                      'آدرس سایت',
                      'websiteAddress',
                      websiteAddress,
                      false,
                      true,
                    )}
                  </>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <div className={s.buttonWrapper}>
          {isConfirmByQc && (
            <div style={{ width: '100%' }}>
              <CPButton
                onClick={this.confirmByQc}
                type="primary"
                htmlType="button"
                className={s.button}
                disabled={
                  postConfirmByQcLoading || this.state.rejectByQcLoading
                }
                loading={postConfirmByQcLoading}
              >
                تایید نهایی
              </CPButton>
              {(envContext === 'KIAN_TRADE' &&
                products !== 'BROKERAGE_ESIGN' &&
                (envContext !== 'DEMO' || envContext !== 'KHOBREGAN')) ||
              (envContext === 'KIAN_DIGITAL' &&
                products !== 'KIAN_DIGITAL_FUNDS_ESIGN' &&
                (envContext !== 'DEMO' || envContext !== 'KHOBREGAN')) ? (
                <CPButton
                  onClick={this.rejectByQc}
                  type="danger"
                  htmlType="button"
                  loading={this.state.rejectByQcLoading}
                  disabled={
                    this.state.rejectByQcLoading ||
                    postConfirmByQcLoading ||
                    this.state.rejectByQcAllLoading
                  }
                >
                  رد اطلاعات تکمیلی
                </CPButton>
              ) : null}

              <CPButton
                onClick={() => this.rejectByQc({ rejectAll: true })}
                type="danger"
                htmlType="button"
                className="margin-r-5"
                loading={this.state.rejectByQcAllLoading}
                disabled={
                  this.state.rejectByQcAllLoading ||
                  postConfirmByQcLoading ||
                  this.state.rejectByQcLoading
                }
              >
                رد همه اطلاعات
              </CPButton>
            </div>
          )}
          {!isConfirmByQc && (
            <React.Fragment>
              <CPButton
                onClick={this.updateAdditionalInfo}
                type="primary"
                disabled={
                  isBusiness && additionalInfoLoading ? businessError : error
                }
                loading={additionalInfoLoading}
                htmlType="submit"
                className="margin-l-5"
              >
                ذخیره
              </CPButton>
              <CPButton onClick={this.closeModal} className="btn default-btn">
                انصراف
              </CPButton>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

ModalForVerifyDataRenderUserInfo.propTypes = {
  statesData: PropTypes.object,
  identificationWithDocs: PropTypes.object,
  additionalInfoLoading: PropTypes.bool.isRequired,
  postConfirmByQcLoading: PropTypes.bool.isRequired,
  isBusiness: PropTypes.bool,
  anyModalClose: PropTypes.func.isRequired,
  postConfirmByQcAction: PropTypes.func.isRequired,
  postRejectByQcAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  className: PropTypes.string,
  modalType: PropTypes.string,
  currentUser: PropTypes.object,
  inProfile: PropTypes.bool.isRequired,
  putAdditionalInfoAction: PropTypes.func.isRequired,
  postConfirmBusinessByQcAction: PropTypes.func.isRequired,
  putAdditionalBusinessPersonalInfoAction: PropTypes.func.isRequired,
  getCrmActivitiesAction: PropTypes.func.isRequired,
  opportunityId: PropTypes.string,
  target: PropTypes.string,
  shouldSaveBusinessAdditionalInfo: PropTypes.bool,
  products: PropTypes.string.isRequired,
};

ModalForVerifyDataRenderUserInfo.defaultProps = {
  className: '',
  statesData: {},
  identificationWithDocs: null,
  isBusiness: false,
  currentUser: null,
  modalType: null,
  opportunityId: null,
  target: null,
  shouldSaveBusinessAdditionalInfo: false,
};

const mapState = state => ({
  additionalInfoLoading: state.opportunities.additionalInfoLoading,
  postConfirmByQcLoading: state.opportunities.postConfirmByQcLoading,
  modalType: state.opportunities.anyModalVisible,
  identificationWithDocs:
    state.opportunities.anyModalVisible === 'modalForUserProfileEditButton'
      ? state.opportunities.getIdentificationByLevantIdData
      : state.opportunities.identificationWithDocsData,
  currentUser: state.opportunities.currentUser,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  products: state.getProducts.selected,
});

const mapDispatch = {
  anyModalClose,
  postRejectByQcAction,
  postConfirmByQcAction,
  getOpportunitiesAction,
  putAdditionalInfoAction,
  getCrmActivitiesAction,
  putAdditionalBusinessPersonalInfoAction,
  postConfirmBusinessByQcAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVerifyDataRenderUserInfo));
export const ModalForVerifyDataRenderUserInfoTest = ModalForVerifyDataRenderUserInfo;
