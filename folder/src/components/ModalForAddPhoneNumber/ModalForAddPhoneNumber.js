import React from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForAddPhoneNumber.scss';
import CPModal from '../CP/CPModal';
import CPInput from '../CP/CPInput';
import CPSelect from '../CP/CPSelect';
import {
  // getAllContactsAction,
  postContactAction,
} from '../../store/newActivities/newActivities.actions';
import CPMessage from '../CP/CPMessage';
import CPButton from '../CP/CPButton';
import CPDivider from '../CP/CPDivider';
import { anyModalClose } from '../../store/opportunities/opportunities.actions';

export const typeList = [
  {
    text: 'شماره موبایل',
    value: 'MOBILE',
  },
  {
    text: 'شماره ثابت',
    value: 'LIVING',
  },
  {
    text: 'سایر',
    value: 'OTHER',
  },
];

const { Item } = Form;

class ModalForAddPhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        value: null,
        type: typeList?.[0]?.value,
      },
    };
  }

  closeModal = () => {
    this.props.anyModalClose();
  };

  submit = async (values, { resetForm }) => {
    const { levantId } = this.props;
    const body = {
      levantId,
      value: values.value,
      type: values.type,
    };
    const response = await this.props.postContactAction(body);
    if (response?.status === 400) {
      CPMessage('اطلاعات کاربر ناقص می باشد.', 'error');
      resetForm({
        value: '',
        type: typeList?.[0]?.value,
      });
      this.props.handleCancel();
    } else if (response.err) {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
      this.props.anyModalClose();
      resetForm({
        value: '',
        type: typeList?.[0]?.value,
      });
      this.props.handleCancel();
    } else {
      CPMessage('با موفقیت ثبت شد.', 'success');
      // this.props.getAllContactsAction({
      //   levantId,
      //   locationTypes: `MOBILE&locationTypes=OTHER&locationTypes=LIVING`,
      // });
      this.props.anyModalClose();
      resetForm({
        value: '',
        type: typeList?.[0]?.value,
      });
      this.props.handleCancel();
    }
  };

  render() {
    const { className, visible, handleCancel } = this.props;
    const { formData } = this.state;
    const validationSchema = Yup.object().shape({
      value: Yup.number()
        .required('پر کردن فیلد الزامی می باشد.')
        .typeError('تنها وارد کردن اعداد مجاز می باشد.')
        .positive('شماره موبایل نمی تواند یک عدد منفی باشد.'),
    });

    return (
      <CPModal
        title="افزودن شماره تماس"
        visible={visible}
        onCancel={this.closeModal}
        className={cs(s.modalForAddPhoneNumber, className)}
        width={370}
        footer={null}
      >
        <Formik
          initialValues={formData}
          onReset={handleCancel}
          onSubmit={this.submit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {props => {
            const {
              errors,
              touched,
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <Item
                      help={errors.value && touched.value ? errors.value : ''}
                      hasFeedback={!!(values.value && touched.value)}
                      validateStatus={
                        errors.value && touched.value ? 'error' : 'success'
                      }
                    >
                      <CPInput
                        className="margin-t-10"
                        label="شماره تماس را وارد نمایید"
                        name="value"
                        type="text"
                        value={values.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </div>
                  <div className="col-md-12">
                    <CPSelect
                      className="margin-t-10"
                      label="نوع شماره تماس را انتخاب نمایید"
                      value={values.type}
                      dataSource={typeList}
                      name="type"
                      onChange={e => {
                        setFieldValue('type', e);
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CPDivider />
                    <CPButton
                      // loading={activityLoading}
                      htmlType="submit"
                      className="btn primary-btn"
                    >
                      ثبت
                    </CPButton>
                    <CPButton
                      onClick={handleCancel}
                      htmlType="submit"
                      className="btn default-btn margin-r-5"
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

ModalForAddPhoneNumber.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  anyModalClose: PropTypes.func.isRequired,
  postContactAction: PropTypes.func.isRequired,
  levantId: PropTypes.string,
  // getAllContactsAction: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
};

ModalForAddPhoneNumber.defaultProps = {
  className: null,
  visible: null,
  levantId: null,
  handleCancel: () => {},
};

const mapStateToProps = state => ({
  visible: state.opportunities.anyModalVisible === 'modalForAddPhoneNumber',
});

const mapDispatch = {
  anyModalClose,
  postContactAction,
  // getAllContactsAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForAddPhoneNumber));
export const ModalForAddPhoneNumberTest = ModalForAddPhoneNumber;
