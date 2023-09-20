/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import s from './ModalForAddTask.scss';
import CPDivider from '../CP/CPDivider';
import CPButton from '../CP/CPButton';
import CPSingleDatePicker from '../CP/CPSingleDatePicker';
import CPSelect from '../CP/CPSelect';
import { getAddTaskAction } from '../../store/task/task.actions';
import { getLeadsAssignOperatorsAction } from '../../store/leads/leads.actions';
import CPTextArea from '../CP/CPTextArea';
import CPModal from '../CP/CPModal';
import { anyModalClose } from '../../store/opportunities/opportunities.actions';
import CPMessage from '../CP/CPMessage';
import CPUploadInGluster from '../CP/CPUploadInGluster';
import { getCrmActivitiesAction } from '../../store/newActivities/newActivities.actions';
import { pageSizeInTableList } from '../../webConfig';

const { Item } = Form;
// initial data for date picker
const initialDate = Date.now();
const priority = [
  {
    text: 'بدون الویت',
    value: 'NONE',
  },
  {
    text: 'بالا',
    value: 'HIGH',
  },
];

const taskType = [
  {
    text: 'تماس',
    value: 'CALL',
  },
  {
    text: 'ایمیل',
    value: 'EMAIL',
  },
];

const pagination = `page=0&size=${pageSizeInTableList}`;

class ModalForAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.validationSchema = Yup.object().shape({
      type: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
      assigneeId: Yup.string().required('پر کردن فیلد الزامی می باشد.'),
    });
    this.state = {
      formData: {
        type: '',
        assigneeId: '',
        priority: 'NONE',
        dueDate: initialDate,
        description: '',
        levantId: '',
        status: 'OPEN', // OPEN,DOING,DONE
        path: null,
      },
    };
  }

  async componentDidMount() {
    await this.props.getLeadsAssignOperatorsAction();
  }

  submitTask = async (values, { resetForm }) => {
    const { sourceId, uploadData } = this.props;
    const dueDate = values?.dueDate?.date?.unix();
    const body = {
      type: values.type,
      assigneeId: [values.assigneeId],
      priority: values.priority,
      dueDate,
      description: values.description,
      levantId: sourceId,
      path: uploadData?.[0]?.token,
      status: values.status,
    };

    const result = await this.props.getAddTaskAction(body);
    if (result?.err) {
      CPMessage('ثبت نشد. لطفا مجددا تلاش کنید.', 'error');
    } else {
      CPMessage('با موفقیت ثبت شد.', 'success');
      this.props.anyModalClose();
      resetForm({});
      this.props.getCrmActivitiesAction({ levantId: sourceId, pagination });
    }
    return null;
  };

  closeModal = () => {
    this.props.anyModalClose();
  };

  render() {
    const { assignOperatorsList, visible } = this.props;
    const { formData } = this.state;

    const assigneeArray = assignOperatorsList?.map(item => ({
      text: `${item.firstName} ${item.lastName}`,
      value: item.levantId,
    }));

    return (
      <CPModal
        title="افزودن وظیفه"
        visible={visible}
        footer={null}
        onCancel={this.closeModal}
      >
        <Formik
          initialValues={formData}
          onReset={this.closeModal}
          onSubmit={this.submitTask}
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
              setFieldValue,
            } = props;
            return (
              <form onSubmit={handleSubmit} className={s.form}>
                <Row gutter={15}>
                  <Col span={12}>
                    <Item
                      help={errors.type && touched.type ? errors.type : ''}
                      hasFeedback={!!(values.type && touched.type)}
                      validateStatus={
                        errors.type && touched.type ? 'error' : 'success'
                      }
                    >
                      <span className={s.labels}>نوع وظیفه:</span>
                      <CPSelect
                        name="taskType"
                        className="margin-b-5"
                        value={values.type}
                        defaultValue={taskType[0].value}
                        dataSource={taskType}
                        onChange={value => {
                          setFieldValue('type', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      help={
                        errors.assigneeId && touched.assigneeId
                          ? errors.assigneeId
                          : ''
                      }
                      hasFeedback={!!(values.assigneeId && touched.assigneeId)}
                      validateStatus={
                        errors.assigneeId && touched.assigneeId
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span className={s.labels}>مختص به:</span>
                      <CPSelect
                        name="assigneeId"
                        className="margin-b-5"
                        value={values.assigneeArray}
                        dataSource={assigneeArray}
                        onChange={value => {
                          setFieldValue('assigneeId', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={15}>
                  <Col span={12}>
                    <span className={s.labels}>الویت:</span>
                    <CPSelect
                      name="priority"
                      className="margin-b-5"
                      value={values.priority}
                      defaultValue={priority[0].value}
                      dataSource={priority}
                      onChange={value => {
                        setFieldValue('priority', value);
                      }}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col span={12}>
                    <Item
                      className={s.datePicker}
                      help={
                        errors.dueDate && touched.dueDate ? errors.dueDate : ''
                      }
                      hasFeedback={!!(values.dueDate && touched.dueDate)}
                      validateStatus={
                        errors.dueDate && touched.dueDate ? 'error' : 'success'
                      }
                    >
                      <span className={s.labels}>تاریخ سررسید:</span>
                      <CPSingleDatePicker
                        date={initialDate}
                        displayFormat="jYYYY/jM/jD"
                        value={values.dueDate}
                        onChange={value => {
                          setFieldValue('dueDate', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={15}>
                  <Col span={24}>
                    <Item
                      help={
                        errors.description && touched.description
                          ? errors.description
                          : ''
                      }
                      hasFeedback={
                        !!(values.description && touched.description)
                      }
                      validateStatus={
                        errors.description && touched.description
                          ? 'error'
                          : 'success'
                      }
                    >
                      <span className={s.labels}>جزئیات:</span>
                      <CPTextArea
                        className="margin-b-5"
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        placeholder="جزئیات"
                        inline
                        onBlur={handleBlur}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row gutter={15} justify="end" type="flex">
                  <Col span={24}>
                    <CPUploadInGluster />
                  </Col>
                </Row>
                <CPDivider />
                <div className="text-right">
                  <CPButton
                    htmlType="submit"
                    type="primary"
                    className="btn primary-btn"
                  >
                    افزودن
                  </CPButton>
                  <CPButton
                    onClick={this.closeModal}
                    className="btn default-btn margin-r-10"
                  >
                    انصراف
                  </CPButton>
                </div>
              </form>
            );
          }}
        </Formik>
      </CPModal>
    );
  }
}

ModalForAddTask.propTypes = {
  sourceId: PropTypes.string,
  getAddTaskAction: PropTypes.func.isRequired,
  getLeadsAssignOperatorsAction: PropTypes.func.isRequired,
  assignOperatorsList: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  uploadData: PropTypes.arrayOf(PropTypes.object),
  getCrmActivitiesAction: PropTypes.func.isRequired,
};

ModalForAddTask.defaultProps = {
  sourceId: null,
  assignOperatorsList: null,
  uploadData: null,
};

const mapStateToProps = state => ({
  assignOperatorsList: state.leads.leadsAssignOperatorsData,
  visible: state.opportunities.anyModalVisible === 'modalForAddTask',
  uploadData: state.upload.data,
});

const mapDispatch = {
  anyModalClose,
  getAddTaskAction,
  getLeadsAssignOperatorsAction,
  getCrmActivitiesAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForAddTask));
export const AddTaskFormTest = ModalForAddTask;
