/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Form } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import cs from 'classnames';
import moment from 'moment-jalaali';
import { connect } from 'react-redux';
import s from './ModalForSetMeeting.scss';
import { getCityName, getProvinceName, unixToDate } from '../../utils';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import CPLabel from '../CP/CPLabel';
import CPSelect from '../CP/CPSelect';
import { getProvinceWithCities } from '../../utils/getProvinceWithCities';
import CPInput from '../CP/CPInput';
import CPMessage from '../CP/CPMessage';
import CPAlert from '../CP/CPAlert';
import {
  anyModalClose,
  getApplicationAction,
  getAvailableTimeAction,
  getOpportunitiesAction,
  postSetMeetingLocationAction,
  postSetMeetingTimeAction,
  putAccountLocationAction,
  getAddressesForSetMeeting,
} from '../../store/opportunities/opportunities.actions';

const { Item } = Form;

const addressType = {
  LIVING: 'آدرس محل سکونت:',
  WORK: 'آدرس محل کار:',
  OTHER: 'دیگر:',
  OFFICE: 'محل کارگزاری:',
};

class ModalForSetMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      city: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
      province: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
      street: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
      postalCode: Yup.string()
        .max(10, 'کد پستی حداکثر ۱۰ رقم می‌باشد.')
        .required('پر کردن فیلد الزامی می باشد.'),
      tel: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    });
    this.state = this.initialState();
  }

  componentDidMount() {
    getProvinceWithCities().then(data =>
      this.setState({ cities: data?.cities, provinces: data?.provinces }),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && this.props.visible !== nextProps.visible) {
      this.setState({
        inPerson: this.props.currentUser?.meeting?.inPerson,
      });
      this.props.getAvailableTimeAction();
      this.getMeetingAddressList();
    }
  }

  getMeetingAddressList() {
    const { id } = this.props.currentUser;
    this.props.getAddressesForSetMeeting(id).then(data => {
      if (data && data.length > 0) {
        this.setState({ addressesForSetMeeting: data });
      }
    });
  }

  initialState = () => ({
    time: null,
    location: null,
    editAddressFormVisible: false,
    editAddressFormType: null,
    inPerson: false,
    loading: false,
    addressesForSetMeeting: null,
  });

  closeModal = (update = false) => {
    this.props.anyModalClose();
    if (update) {
      this.props.getOpportunitiesAction();
    }
    this.setState(this.initialState());
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // add new address
  submitNewAddress = async values => {
    const { editAddressFormType } = this.state;
    const { currentUser } = this.props;
    const { isBrokerage, ...bodyValues } = values;
    const { applicationId } = this.props.currentUser;
    // todo validate data
    const body = {
      ...bodyValues,
      addressType: !isBrokerage ? editAddressFormType : 'OFFICE',
      applicationId,
      country: '',
      state: values.province,
      submitState: 'NEW',
      update: true,
    };
    const response = await this.props.putAccountLocationAction(body);
    if (response) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      this.handleChange('editAddressFormVisible', false);
      this.getMeetingAddressList();
      this.props.getApplicationAction(currentUser.applicationId);
    } else {
      CPMessage('خطا در افزودن آدرس', 'error');
    }
  };

  submitMeeting = async () => {
    this.setState({ loading: true });
    const { currentUser } = this.props;
    const { time, location } = this.state;
    const timeBody = {
      applicationId: currentUser.applicationId,
      scheduleId: time,
    };
    const locationBody = {
      applicationId: currentUser.applicationId,
      addressType: location,
    };
    const brokerageAddressBody = {
      // province: 108,
      // city: 304,
      // postalCode: '1514944834',
      // tel: '47180400',
      street: 'شعب کارگزاری',
      isBrokerage: true,
    };

    if (location === 'OFFICE') {
      await this.submitNewAddress(brokerageAddressBody);
    }

    const responseLocation = await this.props.postSetMeetingLocationAction(
      locationBody,
    );

    await this.props.postSetMeetingTimeAction(timeBody);

    this.setState({ loading: false });

    if (responseLocation) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      this.closeModal(true);
    } else {
      CPMessage('خطا در ثبت قرار ملاقات', 'error');
    }
  };

  openEditForm = type => {
    this.setState({
      editAddressFormVisible: true,
      editAddressFormType: type,
    });
  };

  // render available times
  renderTimes = () => {
    const { availableTimes } = this.props;
    const { time } = this.state;
    if (!availableTimes) {
      return <div />;
    }

    const array = [];
    availableTimes.forEach(item => {
      const found = array.find(i => i.day === item.kycDate);
      if (found && item.capacity > 0) {
        found.times.push({ ...item });
      } else if (!found) {
        array.push({
          day: item.kycDate,
          times: [{ ...item }],
        });
      }
    });

    if (array.length === 0) {
      return (
        <CPAlert
          type="info"
          description="هیچ بازه زمانی قابل انتخابی وجود ندارد."
          message="خطا"
        />
      );
    }

    const times = array.map(item => {
      const unix = moment(item.day, 'YYYY-MM-DD').unix();
      const day = unixToDate(unix * 1000).fullText;
      return (
        <CPLabel
          position="right"
          className={s.dates}
          key={item.day}
          label={day}
        >
          {item.times.map(value => (
            <CPButton
              key={value.id}
              className={s.btn}
              type={time === value.id ? 'primary' : 'default'}
              onClick={() => {
                this.setState({ time: value.id });
              }}
              disabled={!value.capacity}
            >
              {`${value.fromTime} الی ${value.toTime}`}
            </CPButton>
          ))}
        </CPLabel>
      );
    });

    const header = (
      <CPLabel position="right" className={cs(s.dates, s.header)} label="تاریخ">
        <p>بازه های زمانی موجود</p>
      </CPLabel>
    );

    return (
      <div className={s.timesWrapper}>
        {header}
        {times}
      </div>
    );
  };

  // render available locations or add new one.
  renderLocations = () => {
    if (
      this.state.addressesForSetMeeting?.length === 0 ||
      !this.state.addressesForSetMeeting
    ) {
      return (
        <CPAlert
          type="info"
          description="آدرسی برای نمایش وجود ندارد."
          message="خطا"
        />
      );
    }
    // location types: LIVING/OTHER
    const {
      location,
      editAddressFormVisible,
      editAddressFormType,
      inPerson,
    } = this.state;
    const { applicationData } = this.props;
    if (!applicationData || !applicationData.stages) {
      return (
        <CPAlert
          type="info"
          message="خطا"
          description="هیچ اطلاعاتی از کاربر یافت نشد."
        />
      );
    }
    // contact.data.address is not null in this stage.
    const { addressesForSetMeeting } = this.state;
    const contactLocations = [...addressesForSetMeeting];
    // if there is no OTHER address show it for edit purpose.
    if (!contactLocations.find(value => value.type === 'OTHER')) {
      contactLocations.push({ type: 'OTHER', added: true });
    }
    if (!contactLocations.find(value => value.type === 'OFFICE') && inPerson) {
      contactLocations.push({
        country: null,
        street: 'شعب کارگزاری',
        type: 'OFFICE',
      });
    }
    return contactLocations?.map((value, index) => {
      const state = value.state !== null ? getProvinceName(value.state) : '---';
      const city = value.city !== null ? getCityName(value.city) : '---';
      const indexKey = index + 1;
      const { street, tel, postalCode } = value;
      return (
        <div key={indexKey}>
          <CPLabel
            label={
              value.added ? (
                <Icon type="plus-circle" className={s.icon} />
              ) : (
                <Icon
                  type={
                    location === value.type ? 'check-circle' : 'minus-circle'
                  }
                  className={cs(s.icon, location === value.type && s.active)}
                />
              )
            }
            position="right"
            className={s.addresses}
            onClick={() => {
              this.setState({ location: value.type });
            }}
          >
            <p className={s.addressTitle}>
              {addressType[value.type] || 'آدرس:'}{' '}
              {value.type !== 'OFFICE' && (
                <span
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <span
                    className={s.editBtn}
                    onClick={() => {
                      this.openEditForm(value.type);
                    }}
                  >
                    ویرایش
                  </span>
                </span>
              )}
            </p>
            {value.type !== 'OFFICE' && street && (
              <p>{`${state}, ${city}, ${street}`}</p>
            )}
            {(tel || postalCode) && (
              <p>{`تلفن: ${tel}, کد پستی: ${postalCode}`}</p>
            )}
          </CPLabel>
          {editAddressFormVisible &&
            editAddressFormType === value.type &&
            this.renderAddNewLocationForm()}
        </div>
      );
    });
  };

  renderAddNewLocationForm = () => {
    const { cities, provinces } = this.state;
    return (
      <Formik
        initialValues={{}}
        onSubmit={this.submitNewAddress}
        validationSchema={this.validationSchema}
        enableReinitialize
      >
        {prop => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
          } = prop;
          return (
            <form onSubmit={handleSubmit}>
              <div className={s.addNewAddress}>
                <div className={s.wrapper50}>
                  <CPLabel label="استان" className={s.mb15}>
                    <Item
                      help={
                        errors.province && touched.province
                          ? errors.province
                          : ''
                      }
                      hasFeedback={!!(values.province && touched.province)}
                      validateStatus={
                        errors.province && touched.province
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPSelect
                        placeholder="استان"
                        value={values.province}
                        name="province"
                        dataSource={provinces.map(p => ({
                          text: p.name,
                          value: p.id,
                        }))}
                        onChange={value => {
                          setFieldValue('province', value);
                          setFieldValue('city', null);
                        }}
                        onBlur={handleBlur}
                        showSearch
                      />
                    </Item>
                  </CPLabel>
                </div>
                <div className={s.wrapper50}>
                  <CPLabel label="شهر" className={cs(s.mb15, s.secondLabel)}>
                    <Item
                      help={errors.city && touched.city ? errors.city : ''}
                      hasFeedback={!!(values.city && touched.city)}
                      validateStatus={
                        errors.city && touched.city ? 'error' : 'success'
                      }
                    >
                      <CPSelect
                        placeholder="شهر"
                        value={values.city}
                        name="city"
                        dataSource={cities
                          .filter(c => c.province_id === values.province)
                          .map(p => ({
                            text: p.name,
                            value: p.id,
                          }))}
                        disabled={!values.province}
                        onChange={value => setFieldValue('city', value)}
                        onBlur={handleBlur}
                        showSearch
                      />
                    </Item>
                  </CPLabel>
                </div>
                <div className={s.wrapper50}>
                  <CPLabel label="کدپستی" className={s.mb15}>
                    <Item
                      help={
                        errors.postalCode && touched.postalCode
                          ? errors.postalCode
                          : ''
                      }
                      hasFeedback={!!(values.postalCode && touched.postalCode)}
                      validateStatus={
                        errors.postalCode && touched.postalCode
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPInput
                        value={values.postalCode}
                        name="postalCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </CPLabel>
                </div>
                <div className={s.wrapper50}>
                  <CPLabel
                    label="تلفن ثابت"
                    className={cs(s.mb15, s.secondLabel)}
                  >
                    <Item
                      help={errors.tel && touched.tel ? errors.tel : ''}
                      hasFeedback={!!(values.tel && touched.tel)}
                      validateStatus={
                        errors.tel && touched.tel ? 'error' : 'success'
                      }
                    >
                      <CPInput
                        value={values.tel}
                        name="tel"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </CPLabel>
                </div>
                <CPLabel label="آدرس" className={s.mb15}>
                  <Item
                    help={errors.street && touched.street ? errors.street : ''}
                    hasFeedback={!!(values.street && touched.street)}
                    validateStatus={
                      errors.street && touched.street ? 'error' : 'success'
                    }
                  >
                    <CPInput
                      value={values.street}
                      name="street"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Item>
                </CPLabel>
                <CPButton type="primary" htmlType="submit">
                  ویرایش
                </CPButton>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  };

  renderButtons = () => {
    const { time, location, loading } = this.state;
    return (
      <div className="text-right">
        <CPButton
          type="primary"
          onClick={this.submitMeeting}
          {...(!time || !location ? { disabled: true } : {})}
          loading={loading}
        >
          افزودن
        </CPButton>
        <CPButton
          type="default"
          className="btn default-btn margin-r-10"
          onClick={() => {
            this.closeModal(true);
          }}
        >
          لغو
        </CPButton>
      </div>
    );
  };

  render() {
    const { className, visible } = this.props;
    return (
      <CPModal
        title="افزودن قرار ملاقات جدید"
        visible={visible}
        footer={false}
        onCancel={() => {
          this.closeModal();
        }}
        className={cs(s.root, className)}
        width={700}
      >
        <div className={s.simpleCard}>
          <p className={s.title}>تعیین زمان مراجعه</p>
          {visible && this.renderTimes()}
        </div>
        <div className={s.simpleCard}>
          <p className={s.title}>تعیین مکان مراجعه</p>
          {visible && this.renderLocations()}
          {/* {visible && editAddressFormVisible && this.renderAddNewLocationForm()} */}
        </div>
        {visible && this.renderButtons()}
      </CPModal>
    );
  }
}

ModalForSetMeeting.propTypes = {
  className: PropTypes.string,
  getAvailableTimeAction: PropTypes.func.isRequired,
  postSetMeetingLocationAction: PropTypes.func.isRequired,
  postSetMeetingTimeAction: PropTypes.func.isRequired,
  putAccountLocationAction: PropTypes.func.isRequired,
  getApplicationAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  applicationData: PropTypes.object,
  availableTimes: PropTypes.array,
  visible: PropTypes.bool,
  currentUser: PropTypes.object,
  anyModalClose: PropTypes.func.isRequired,
  getAddressesForSetMeeting: PropTypes.func.isRequired,
};

ModalForSetMeeting.defaultProps = {
  className: null,
  visible: false,
  availableTimes: null,
  applicationData: null,
  currentUser: null,
};

const mapState = state => ({
  currentUser: state.opportunities.currentUser,
  visible: state.opportunities.anyModalVisible === 'modalForSetMeeting',
  availableTimes: state.opportunities.availableTimeData,
  applicationData: state.opportunities.applicationData,
});

const mapDispatch = {
  getOpportunitiesAction,
  getAvailableTimeAction,
  postSetMeetingLocationAction,
  postSetMeetingTimeAction,
  putAccountLocationAction,
  getApplicationAction,
  anyModalClose,
  getAddressesForSetMeeting,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForSetMeeting));
export const ModalForSetMeetingTest = ModalForSetMeeting;
