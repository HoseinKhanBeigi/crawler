import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Formik } from 'formik';
import momentJalaali from 'moment-jalaali';
import { connect } from 'react-redux';
import s from './KycCapacityForm.scss';
import CPInput from '../CP/CPInput';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import CPMessage from '../CP/CPMessage';
import {
  postKycCapacityManagementAction,
  getMeetingsManagementAction,
  putKycCapacityEditAction,
} from '../../store/kycCapacityManagement/kycCapacityManagement.actions';
import CPSingleDatePicker from '../CP/CPSingleDatePicker';
import CPTimePicker from '../CP/CPTimePicker';
import { filterNumbers } from '../../utils';

const { Item } = Form;

class KycCapacityForm extends React.Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      toTime: Yup.string().required('فیلد الزامی می باشد'),
      fromTime: Yup.string().required('فیلد الزامی می باشد'),
      kycDate: Yup.string().required('فیلد الزامی می باشد'),
      capacity: Yup.number()
        .required('فیلد الزامی می باشد')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
    });

    const { editModeFormData } = props;
    const kycDate = editModeFormData?.from
      ? { date: momentJalaali(editModeFormData?.from) }
      : '';
    const fromTime = editModeFormData?.from
      ? momentJalaali(editModeFormData?.from)
      : '';
    const toTime = editModeFormData?.to
      ? momentJalaali(editModeFormData?.to)
      : '';

    this.state = {
      formData: {
        kycDate,
        fromTime,
        toTime,
        capacity: editModeFormData?.capacity.toString() || '',
      },
    };
  }

  /**
   * this method call kyc capacity action.
   * @param value
   * @param resetForm  ( this params reset all input form)
   * @returns {Promise<void>}
   * @author majid savalanpour m.savalanpour@kian.dijital
   */
  addKycCapacity = async (value, { resetForm }) => {
    const { capacity } = value;
    const { editModeFormData /* selectedProduct, productList */ } = this.props;
    const kycDate = value.kycDate.date.locale('en').format('YYYY-MM-DD');
    const fromTime = value.fromTime.locale('en').format('HH:mm:00');
    const toTime = value.toTime.locale('en').format('HH:mm:00');

    let result;
    if (editModeFormData) {
      // edit mode
      const body = {
        id: editModeFormData?.id,
        capacity: Number(capacity),
        fromTime,
        kycDate,
        productId: 1, // TODO: base on meeting with crm department, decided to show all the capacities together.
        toTime,
      };

      result = await this.props.putKycCapacityEditAction(body);
    } else {
      // add new
      const body = {
        capacity: Number(capacity),
        fromTime,
        kycDate,
        productId: 1, // TODO: base on meeting with crm department, decided to show all the capacities together.
        toTime,
      };

      result = await this.props.postKycCapacityManagementAction(body);
    }

    if (result) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      resetForm({});
      this.props.getMeetingsManagementAction();
      this.props.onSubmit(); // close modal after submit form.
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }

    return true;
  };

  // fromTime date picker numbers
  disabledHoursFrom = () => filterNumbers(24, [9, 12, 15, 18]);
  // toTime date picker numbers
  disabledHoursTo = () => filterNumbers(24, [12, 15, 18, 22]);

  render() {
    const { formData } = this.state;
    const { editModeFormData, addLoading, editLoading } = this.props;
    const initialDate = editModeFormData ? editModeFormData?.from : Date.now();
    return (
      <Formik
        initialValues={formData}
        onReset={this.props.handleCancel}
        onSubmit={this.addKycCapacity}
        validationSchema={this.validationSchema}
        enableReinitialize
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            handleReset,
            handleBlur,
            isValid,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <div className="row">
                <div className="col-md-6">
                  <Item
                    help={
                      errors.capacity && touched.capacity ? errors.capacity : ''
                    }
                    hasFeedback={!!(values.capacity && touched.capacity)}
                    validateStatus={
                      errors.capacity && touched.capacity ? 'error' : 'success'
                    }
                  >
                    <span className={s.labels}>ظرفیت:</span>
                    <CPInput
                      onChange={value => {
                        setFieldValue('capacity', value);
                      }}
                      value={values.capacity}
                      name="capacity"
                      placeholder="ظرفیت"
                      inline
                      onBlur={handleBlur}
                      faToEn
                    />
                  </Item>
                </div>
                <div className="col-md-6">
                  <Item
                    help={
                      errors.kycDate && touched.kycDate ? errors.kycDate : ''
                    }
                    hasFeedback={!!(values.kycDate && touched.kycDate)}
                    validateStatus={
                      errors.kycDate && touched.kycDate ? 'error' : 'success'
                    }
                  >
                    <span className={s.labels}>تاریخ:</span>
                    <CPSingleDatePicker
                      date={initialDate}
                      displayFormat="jYYYY/jM/jD"
                      value={values.kycDate}
                      onChange={value => {
                        setFieldValue('kycDate', value);
                      }}
                      onBlur={handleBlur}
                    />
                  </Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Item
                    help={
                      errors.fromTime && touched.fromTime ? errors.fromTime : ''
                    }
                    hasFeedback={!!(values.fromTime && touched.fromTime)}
                    validateStatus={
                      errors.fromTime && touched.fromTime ? 'error' : 'success'
                    }
                  >
                    <span className={s.labels}>زمان شروع:</span>
                    <CPTimePicker
                      name="fromTime"
                      value={values.fromTime !== '' ? values.fromTime : null}
                      minuteStep={15}
                      onChange={value => {
                        setFieldValue('fromTime', value);
                      }}
                      onBlur={handleBlur}
                      disabledHours={this.disabledHoursFrom}
                      hideDisabledOptions
                    />
                  </Item>
                </div>
                <div className="col-md-6">
                  <Item
                    help={errors.toTime && touched.toTime ? errors.toTime : ''}
                    hasFeedback={!!(values.toTime && touched.toTime)}
                    validateStatus={
                      errors.toTime && touched.toTime ? 'error' : 'success'
                    }
                  >
                    <span className={s.labels}>زمان پایان:</span>
                    <CPTimePicker
                      name="toTime"
                      value={values.toTime !== '' ? values.toTime : null}
                      minuteStep={15}
                      onChange={value => {
                        setFieldValue('toTime', value);
                      }}
                      onBlur={handleBlur}
                      disabledHours={this.disabledHoursTo}
                      hideDisabledOptions
                    />
                  </Item>
                </div>
              </div>
              <CPDivider />
              <div className="text-left">
                <CPButton
                  htmlType="submit"
                  type="primary"
                  className="btn primary-btn margin-l-5"
                  disabled={!isValid}
                  loading={editModeFormData ? editLoading : addLoading}
                >
                  {editModeFormData ? 'ویرایش' : 'افزودن'}
                </CPButton>
                <CPButton onClick={handleReset} className="btn">
                  انصراف
                </CPButton>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

KycCapacityForm.propTypes = {
  handleCancel: PropTypes.func,
  postKycCapacityManagementAction: PropTypes.func.isRequired,
  putKycCapacityEditAction: PropTypes.func.isRequired,
  onSubmit: PropTypes.func, // this props call on parent after submit.
  getMeetingsManagementAction: PropTypes.func.isRequired,
  editModeFormData: PropTypes.object,
  addLoading: PropTypes.bool.isRequired,
  editLoading: PropTypes.bool.isRequired,
};

KycCapacityForm.defaultProps = {
  handleCancel: () => {},
  onSubmit: () => {},
  editModeFormData: null,
};

const mapState = state => ({
  meetingsManagementData: state.kycCapacityManagement.meetingsManagementData,
  productList: state.getProducts.data,
  selectedProduct: state.getProducts.selected,
  addLoading: state.kycCapacityManagement.loading,
  editLoading: state.kycCapacityManagement.kycCapacityEditLoading,
});

const mapDispatch = {
  postKycCapacityManagementAction,
  getMeetingsManagementAction,
  putKycCapacityEditAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(KycCapacityForm));

export const KycCapacityFormTest = KycCapacityForm;
