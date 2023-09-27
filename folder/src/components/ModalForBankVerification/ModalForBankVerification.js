import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForBankVerification.scss';
import CPModal from '../CP/CPModal';
import CPButton from '../CP/CPButton';
import CPMessage from '../CP/CPMessage';
import CPSelect from '../CP/CPSelect';
import CPRadio from '../CP/CPRadio';
import {
  verificationStatus,
  deniedOptions,
  BANK_DENIED_FOR_OTHER_REASON,
  banks,
} from './schema';
import CPInput from '../CP/CPInput';
import {
  anyModalClose,
  getOpportunitiesAction,
  postSetBankInfoAction,
} from '../../store/opportunities/opportunities.actions';

const { Item } = Form;

class ModalForBankVerification extends React.Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      shebaNo: Yup.string().required('فیلد الزامی می باشد'),
      bankAccountNumber: Yup.number()
        .required('فیلد الزامی می باشد')
        .min(3, 'شماره حساب حداکثر ۳ عدد می باشد')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
      bankCode: Yup.number()
        .required('فیلد الزامی می باشد')
        .min(3, 'کد بانک حداکثر ۳ عدد می باشد')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
      bankBranchName: Yup.string().required('فیلد الزامی می باشد'),
      bankBranchCode: Yup.number()
        .required('فیلد الزامی می باشد')
        .min(3, 'کد شعبه حداکثر ۳ عدد می باشد')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.'),
      otherReason: Yup.string().required('فیلد الزامی می باشد'),
    });
    this.state = {
      verificationStatus: true,
      deniedReason: null,
      shebaNo: this.props.bankInfo?.shebaNo,
      bankAccountNumber: this.props.bankInfo?.bankAccountNumber,
      bankCode: this.props.bankInfo?.bankCode,
      bankBranchName: this.props.bankInfo?.bankBranchName,
      bankBranchCode: this.props.bankInfo?.bankBranchCode,
      otherReason: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        shebaNo: nextProps.bankInfo?.shebaNo,
        bankAccountNumber: nextProps.bankInfo?.bankAccountNumber,
        bankCode: nextProps.bankInfo?.bankCode,
        bankBranchName: nextProps.bankInfo?.bankBranchName,
        bankBranchCode: nextProps.bankInfo?.bankBranchCode,
      });
    }
  }

  onChangeState = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  closeModal = () => {
    this.props.anyModalClose();
  };

  handleCancel = () => {
    this.closeModal();
  };

  handleSubmit = async () => {
    const {
      bankCode,
      bankBranchCode,
      bankBranchName,
      shebaNo,
      bankAccountNumber,
    } = this.state;
    const body = {
      bankCode,
      bankBranchCode,
      bankBranchName,
      shebaNo,
      bankAccountNumber,
    };
    const response = await this.props.postSetBankInfoAction(body);
    if (response) {
      CPMessage('عملیات با موفقیت انجام شد', 'success');
    }
    this.closeModal();
    this.reload();
  };

  reload = () => {
    this.props.getOpportunitiesAction();
  };

  handleFormSubmit = () => {};

  render() {
    const { className, visible, isVerification, isLoading } = this.props;
    const {
      bankCode,
      bankBranchCode,
      bankBranchName,
      shebaNo,
      bankAccountNumber,
      otherReason,
    } = this.state;
    const formData = {
      bankCode,
      bankBranchCode,
      bankBranchName,
      shebaNo,
      bankAccountNumber,
      otherReason,
    };
    return (
      <CPModal
        title={isVerification ? 'تایید اطلاعات بانکی' : 'تکمیل اطلاعات بانکی'}
        visible={visible}
        footer={false}
        onCancel={() => {
          this.closeModal();
        }}
        className={className}
        width={700}
      >
        {isVerification && (
          <div>
            <CPRadio
              onChange={e =>
                this.onChangeState(e.target.value, 'verificationStatus')
              }
              model={verificationStatus}
              value={this.state.verificationStatus}
            />
          </div>
        )}

        <Formik
          initialValues={formData}
          onSubmit={this.handleFormSubmit}
          validationSchema={this.validationSchema}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={s.formBankVerification}>
                <div className="row bank-form-row">
                  <div className="col-md-12">
                    <Item
                      help={
                        errors.shebaNo && touched.shebaNo ? errors.shebaNo : ''
                      }
                      hasFeedback={!!(values.shebaNo && touched.shebaNo)}
                      validateStatus={
                        errors.shebaNo && touched.shebaNo ? 'error' : 'success'
                      }
                    >
                      <span>شماره شبا</span>
                      <CPInput
                        onChange={e =>
                          this.onChangeInput(e.target.value, 'shebaNo')
                        }
                        value={values.shebaNo}
                        name="capacity"
                        placeholder="شماره شبا"
                        inline
                        onBlur={handleBlur}
                        disabled
                      />
                    </Item>
                  </div>
                  <div className="col-md-12">
                    <Item
                      help={
                        errors.bankAccountNumber && touched.bankAccountNumber
                          ? errors.bankAccountNumber
                          : ''
                      }
                      hasFeedback={
                        !!(
                          values.bankAccountNumber && touched.bankAccountNumber
                        )
                      }
                      validateStatus={
                        errors.bankAccountNumber && touched.bankAccountNumber
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span>شماره حساب</span>
                      <CPInput
                        onChange={e =>
                          this.onChangeInput(
                            e.target.value,
                            'bankAccountNumber',
                          )
                        }
                        value={values.bankAccountNumber}
                        name="capacity"
                        placeholder="شماره حساب"
                        inline
                        onBlur={handleBlur}
                        disabled={isVerification}
                      />
                    </Item>
                  </div>
                  <div className="col-md-12">
                    <Item
                      help={
                        errors.bankCode && touched.bankCode
                          ? errors.bankCode
                          : ''
                      }
                      hasFeedback={!!(values.bankCode && touched.bankCode)}
                      validateStatus={
                        errors.bankCode && touched.bankCode
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span>نام بانک</span>
                      <CPSelect
                        dataSource={banks}
                        value={values.bankCode}
                        name="capacity"
                        placeholder="نام بانک"
                        inline
                        onBlur={handleBlur}
                        onChange={e =>
                          this.onChangeInput(e.target.value, 'bankCode')
                        }
                        disabled={isVerification}
                      />
                    </Item>
                  </div>
                  <div className="col-md-12">
                    <Item
                      help={
                        errors.bankBranchName && touched.bankBranchName
                          ? errors.bankBranchName
                          : ''
                      }
                      hasFeedback={
                        !!(values.bankBranchName && touched.bankBranchName)
                      }
                      validateStatus={
                        errors.bankBranchName && touched.bankBranchName
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span>نام شعبه</span>
                      <CPInput
                        onChange={e =>
                          this.onChangeInput(e.target.value, 'bankBranchName')
                        }
                        value={values.bankBranchName}
                        name="capacity"
                        placeholder="نام شعبه"
                        inline
                        onBlur={handleBlur}
                        disabled={isVerification}
                      />
                    </Item>
                  </div>
                  <div className="col-md-12">
                    <Item
                      help={
                        errors.bankBranchCode && touched.bankBranchCode
                          ? errors.bankBranchCode
                          : ''
                      }
                      hasFeedback={
                        !!(values.bankBranchCode && touched.bankBranchCode)
                      }
                      validateStatus={
                        errors.bankBranchCode && touched.bankBranchCode
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span>کد شعبه</span>
                      <CPInput
                        onChange={e =>
                          this.onChangeInput(e.target.value, 'bankBranchCode')
                        }
                        value={values.bankBranchCode}
                        name="capacity"
                        placeholder="کد شعبه"
                        inline
                        onBlur={handleBlur}
                        disabled={isVerification}
                      />
                    </Item>
                  </div>
                  {isVerification && !this.state.verificationStatus && (
                    <div className="col-md-12">
                      <div>
                        <div>
                          <CPRadio
                            onChange={e =>
                              this.onChangeState(e.target.value, 'deniedReason')
                            }
                            model={deniedOptions}
                            value={this.state.deniedReason}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {isVerification &&
                    this.state.deniedReason ===
                      BANK_DENIED_FOR_OTHER_REASON && (
                      <div className="col-md-12">
                        <Item
                          help={
                            errors.otherReason && touched.otherReason
                              ? errors.otherReason
                              : ''
                          }
                          hasFeedback={
                            !!(values.otherReason && touched.otherReason)
                          }
                          validateStatus={
                            errors.otherReason && touched.otherReason
                              ? 'error'
                              : 'success'
                          }
                        >
                          <span>دلیل رد شدن</span>
                          <CPInput
                            onChange={handleChange}
                            value={values.otherReason}
                            name="capacity"
                            placeholder="دلیل رد شدن"
                            inline
                            onBlur={handleBlur}
                          />
                        </Item>
                      </div>
                    )}
                  <div className="col-md-12 text-right actions-col">
                    <CPButton
                      htmlType="submit"
                      type="primary"
                      className="btn primary-btn"
                      onClick={() => {
                        this.handleSubmit();
                      }}
                      loading={isLoading}
                    >
                      ثبت
                    </CPButton>
                    <CPButton
                      onClick={() => {
                        this.handleCancel();
                      }}
                      className="btn default-btn margin-r-10"
                    >
                      انصراف
                    </CPButton>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </CPModal>
    );
  }
}

ModalForBankVerification.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  isVerification: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  bankInfo: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  postSetBankInfoAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

ModalForBankVerification.defaultProps = {
  className: null,
  bankInfo: null,
};

const mapState = state => ({
  visible: state.opportunities.anyModalVisible === 'modalForBankVerification',
  isVerification: state.opportunities.isBankInVerificationMode,
  isLoading: state.opportunities.bankInfoLoading,
  bankInfo: state.opportunities.bankInfoData,
});

const mapDispatch = {
  anyModalClose,
  postSetBankInfoAction,
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForBankVerification));
