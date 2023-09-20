import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as Yup from 'yup';
import { Form, Row, Col, Input } from 'antd';
import { Formik } from 'formik';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SetPasswordForm.scss';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import CPMessage from '../../components/CP/CPMessage';
import { getSetPasswordAction } from '../../store/users/users.actions';

const { Item } = Form;
const { Password } = Input;
class SetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      password: Yup.string()
        .required('پر کردن رمز عبور الزامی می باشد.')
        .test(
          'password',
          'رمز عبور باید حداقل دارای یک حرف بزرگ یک حرف کوچک و یک عدد و حداقل 8 کاراکتر باشد.',
          val =>
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$').test(
              val,
            ),
        ),
      confirmedPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'تکرار رمز عبور باید با رمز عبور یکسان باشد.',
        )
        .required('پر کردن تکرار رمز عبور الزامی می باشد.')
        .test(
          'lastnamelen',
          ' تکرار رمز عبور باید حداقل دارای 8 کاراکتر باشد.',
          val => val && val.length >= 8,
        ),
    });
    this.state = {
      password: false,
      confirmedPassword: false,
      formData: {
        password: '',
        confirmedPassword: '',
      },
    };
  }

  setPassword = async (value, { resetForm }) => {
    const result = await this.props.getSetPasswordAction(
      {
        uuid: this.props.record.uuid,
      },
      value,
    );
    if (result.status === 200) {
      CPMessage('با موفقیت ثبت شد.', 'success');
      resetForm({});
      this.props.onSubmit(); // close modal after submit form.
    } else {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    }
  };

  changePasswordType = (e, inputName) => {
    e.preventDefault();
    if (inputName === 'password') {
      this.setState({ password: !this.state.password });
    } else if (inputName === 'confirmedPassword') {
      this.setState({ confirmedPassword: !this.state.confirmedPassword });
    }
  };

  render() {
    const { formData } = this.state;
    const { setPasswordLoading } = this.props;

    return (
      <div className="container">
        <Formik
          initialValues={formData}
          onReset={this.props.handleCancel}
          onSubmit={this.setPassword}
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
              handleReset,
              handleBlur,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <div>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={24}>
                          <span className={s.required}>*</span>
                          <span className={s.text}>رمز عبور جدید</span>
                        </Col>
                      </Row>
                      <Item
                        help={
                          errors.password && touched.password
                            ? errors.password
                            : ''
                        }
                        hasFeedback={!!(values.password && touched.password)}
                        validateStatus={
                          errors.password && touched.password
                            ? 'error'
                            : 'success'
                        }
                      >
                        <Password
                          className="margin-t-5 margin-b-5"
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          allowClear={false}
                          placeholder="رمز عبور"
                          onBlur={handleBlur}
                        />
                      </Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={24}>
                      <Row gutter={24}>
                        <Col span={24}>
                          <span className={s.required}>*</span>
                          <span className={s.text}>تکرار رمز عبور جدید</span>
                        </Col>
                      </Row>
                      <Item
                        help={
                          errors.confirmedPassword && touched.confirmedPassword
                            ? errors.confirmedPassword
                            : ''
                        }
                        hasFeedback={
                          !!(
                            values.confirmedPassword &&
                            touched.confirmedPassword
                          )
                        }
                        validateStatus={
                          errors.confirmedPassword && touched.confirmedPassword
                            ? 'error'
                            : 'success'
                        }
                      >
                        <Password
                          className="margin-t-5 margin-b-5"
                          onChange={handleChange}
                          value={values.confirmedPassword}
                          name="confirmedPassword"
                          allowClear={false}
                          placeholder="تکرار رمز عبور"
                          onBlur={handleBlur}
                        />
                      </Item>
                    </Col>
                  </Row>
                </div>
                <CPDivider />
                <div className="text-right">
                  <CPButton
                    htmlType="submit"
                    type="primary"
                    className="btn primary-btn"
                    loading={setPasswordLoading}
                  >
                    تغییر رمز عبور
                  </CPButton>
                  <CPButton
                    onClick={handleReset}
                    className="btn default-btn margin-r-10"
                  >
                    انصراف
                  </CPButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

SetPasswordForm.propTypes = {
  handleCancel: PropTypes.func,
  getSetPasswordAction: PropTypes.func.isRequired,
  record: PropTypes.object,
  onSubmit: PropTypes.func, // this props call on parent after submit.
  setPasswordLoading: PropTypes.bool.isRequired,
};

SetPasswordForm.defaultProps = {
  handleCancel: () => {},
  onSubmit: () => {},
  record: null,
};

const mapState = state => ({
  setPasswordLoading: state.users.setPasswordLoading,
});

const mapDispatch = {
  getSetPasswordAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(SetPasswordForm));
export const SetPasswordFormTest = SetPasswordForm;
