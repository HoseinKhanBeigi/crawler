import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import s from './AddPersonForm.scss';
import CPInput from '../../components/CP/CPInput';
import CPButton from '../../components/CP/CPButton';
import CPDivider from '../CP/CPDivider';
import {
  getAddPersonAction,
  postCreatePartyPersonAction,
} from '../../store/person/person.actions';
import CPMessage from '../../components/CP/CPMessage';
import { checkNationalCode } from '../../utils/validateField';

const { Item } = Form;

class AddPersonForm extends React.Component {
  static propTypes = {
    handleCancel: PropTypes.func,
    getAddPersonAction: PropTypes.func.isRequired,
    postCreatePartyPersonAction: PropTypes.func.isRequired,
    onSubmit: PropTypes.func, // this props call on parent after submit.
    editMode: PropTypes.bool.isRequired,
    personByMobileData: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    handleCancel: () => {},
    onSubmit: () => {},
    personByMobileData: null,
  };

  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      firstname: Yup.string()
        .required('پر کردن فیلد الزامی می باشد.')
        .test(
          'len',
          'نام باید حداقل دارای 3 کاراکتر باشد.',
          val => val && val.length >= 3,
        ),
      lastname: Yup.string()
        .required('پر کردن فیلد الزامی می باشد.')
        .test(
          'lastnamelen',
          'نام خانوادگی باید حداقل دارای 3 کاراکتر باشد.',
          val => val && val.length >= 3,
        ),
      mobileNumber: Yup.number()
        .required('پر کردن فیلد الزامی می باشد.')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.')
        .positive('شماره موبایل نمی تواند یک عدد منفی باشد.')
        .test('len', 'شماره موبایل وارد شده صحیح نیست.', val =>
          new RegExp('^(0)?9\\d{9}$').test(val),
        ),
      nationalCode: Yup.string()
        .required('پر کردن فیلد الزامی می باشد.')
        .test('nationalCodeCorrect', 'کد ملی وارد شده صحیح نیست.', val =>
          checkNationalCode(val),
        ),
      email: Yup.string().email('ایمیل معتبر نیست.'),
    });

    if (props.editMode && props.personByMobileData) {
      const {
        firstName,
        lastName,
        mobilePhone,
        nationalCode,
      } = props.personByMobileData;
      this.state = {
        formData: {
          firstname: firstName || '',
          lastname: lastName || '',
          mobileNumber: mobilePhone || '',
          nationalCode: nationalCode || '',
          email: '',
        },
      };
    } else {
      this.state = {
        formData: {
          firstname: '',
          lastname: '',
          mobileNumber: '',
          nationalCode: '',
          email: '',
        },
      };
    }
    this.editPerson = ::this.editPerson;
    this.addPerson = ::this.addPerson;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.personByMobileData !== nextProps.personByMobileData &&
      nextProps.personByMobileData
    ) {
      const {
        firstName,
        lastName,
        mobilePhone,
        nationalCode,
      } = nextProps.personByMobileData;
      this.setState({
        formData: {
          firstname: firstName || '',
          lastname: lastName || '',
          mobileNumber: mobilePhone || '',
          nationalCode: nationalCode || '',
          email: '',
        },
      });
    }
  }

  /**
   * this method call add person action.
   * @param value
   * @param resetForm  ( this params reset all input form)
   * @returns {Promise<void>}
   */
  async addPerson(value, { resetForm }) {
    const result = await this.props.getAddPersonAction(value);
    if (result === 'OK') {
      CPMessage('با موفقیت ثبت شد.', 'success');
      resetForm({});
      this.props.onSubmit(); // close modal after submit form.
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }
  }

  /**
   * this method call edit person action.
   * @param value
   * @param resetForm ( this params reset all input form)
   * @returns {Promise<void>}
   */
  async editPerson(value, { resetForm }) {
    const { firstname, lastname, mobileNumber, nationalCode } = value;
    const { personByMobileData } = this.props;
    const body = {
      ...personByMobileData,
      firstName: firstname,
      lastName: lastname,
      mobilePhone: mobileNumber,
      nationalCode,
    };
    const result = await this.props.postCreatePartyPersonAction(body);
    if (result) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      resetForm({});
      this.props.onSubmit(); // close modal after submit form.
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }
  }
  render() {
    const { formData } = this.state;
    const { editMode } = this.props;
    return (
      <Formik
        initialValues={formData}
        onReset={this.props.handleCancel}
        onSubmit={editMode ? this.editPerson : this.addPerson}
        validationSchema={this.validationSchema}
        enableReinitialize
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isValid,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <div className="row">
                  <div className={cs('col-md-3', s.label)}>
                    نام <span className={s.required}>*</span>
                  </div>
                  <div className="col-md-9">
                    <Item
                      help={
                        errors.firstname && touched.firstname
                          ? errors.firstname
                          : ''
                      }
                      hasFeedback={!!(values.firstname && touched.firstname)}
                      validateStatus={
                        errors.firstname && touched.firstname
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-5"
                        onChange={handleChange}
                        value={values.firstname}
                        name="firstname"
                        placeholder="نام"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                </div>
                <div className="row">
                  <div className={cs('col-md-3', s.label)}>
                    نام خانوادگی<span className={s.required}>*</span>
                  </div>
                  <div className="col-md-9">
                    <Item
                      help={
                        errors.lastname && touched.lastname
                          ? errors.lastname
                          : ''
                      }
                      hasFeedback={!!(values.lastname && touched.lastname)}
                      validateStatus={
                        errors.lastname && touched.lastname
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-5"
                        onChange={handleChange}
                        value={values.lastname}
                        name="lastname"
                        placeholder="نام خانوادگی"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                </div>
                <div className="row">
                  <div className={cs('col-md-3', s.label)}>
                    موبایل<span className={s.required}>*</span>
                  </div>
                  <div className="col-md-9">
                    <Item
                      help={
                        errors.mobileNumber && touched.mobileNumber
                          ? errors.mobileNumber
                          : ''
                      }
                      hasFeedback={
                        !!(values.mobileNumber && touched.mobileNumber)
                      }
                      validateStatus={
                        errors.mobileNumber && touched.mobileNumber
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-5"
                        onChange={handleChange}
                        value={values.mobileNumber}
                        name="mobileNumber"
                        placeholder="موبایل"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                </div>
                <div className="row">
                  <div className={cs('col-md-3', s.label)}>
                    کد ملی<span className={s.required}>*</span>
                  </div>
                  <div className="col-md-9">
                    <Item
                      help={
                        errors.nationalCode && touched.nationalCode
                          ? errors.nationalCode
                          : ''
                      }
                      hasFeedback={
                        !!(values.nationalCode && touched.nationalCode)
                      }
                      validateStatus={
                        errors.nationalCode && touched.nationalCode
                          ? 'error'
                          : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-5"
                        onChange={handleChange}
                        value={values.nationalCode}
                        name="nationalCode"
                        placeholder="کد ملی"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                </div>
                <div className="row">
                  <div className={cs('col-md-3', s.label)}>ایمیل</div>
                  <div className="col-md-9">
                    <Item
                      help={errors.email && touched.email ? errors.email : ''}
                      hasFeedback={!!(values.email && touched.email)}
                      validateStatus={
                        errors.email && touched.email ? 'error' : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-5"
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        placeholder="ایمیل"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                </div>
              </div>
              <CPDivider />
              <div className="text-left">
                <CPButton
                  htmlType="submit"
                  type="primary"
                  className="btn primary-btn margin-l-5"
                  disabled={!(isValid || editMode)}
                >
                  {editMode ? 'ویرایش' : 'افزودن'}
                </CPButton>
                <CPButton onClick={this.props.closeModal} className="btn">
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

const mapState = state => ({
  personByMobileData: state.person.personByMobileData,
});

const mapDispatch = {
  getAddPersonAction,
  postCreatePartyPersonAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(AddPersonForm));

export const AddPersonFormTest = AddPersonForm;
