import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import moment from 'moment';
import { schema } from './schema';
import glusterService from '../../service/glusterService';
import FormBuilder from '../FormBuilder/FormBuilder';
import { TASK_MANAGEMENT_TABLE } from '../../store/settings/settings.constants';
import branchManagementService from '../../service/branchManagementService';
import CPMessage from '../CP/CPMessage/CPMessage';
import { postUploadFileAction } from '../../store/upload/upload.actions';
import taskManagementService from '../../service/taskManagementService';
import { kianTableApi } from '../KianTable/helpers/globalApi';

const TaskForm = props => {
  const {
    onSuccessSubmit,
    onCancel,
    initialFormValues,
    editMode,
    byCard,
    cardTitle,
    cardId,
  } = props;
  const [crmLeadUsers, setCrmLeadUsers] = useState([]);
  const [crmFilteredUsers, setCrmFilteredUsers] = useState([]);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploadedFile, setUploadedFile] = useState([]);
  const [searchDetail, setSearchDetail] = useState(
    initialFormValues?.assigneeLevantId || null,
  );
  const [hasDefault, setHasDefault] = useState(false);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [taskDetailData, setTaskDetailDatal] = useState(null);

  const [isSelectDueDateChange, setIsSelectDueDateChange] = useState(
    initialFormValues?.dueDate || false,
  );
  const [relationData, setRelationData] = useState({});

  const indexOfTaskFromCard = initialFormValues?.taskDetails.indexOf(
    initialFormValues?.taskDetails.find(
      detail => detail?.detailType === 'CARD',
    ),
  );

  useEffect(() => {
    branchManagementService.getAllCurrentUnitEmployee().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmLeadUsers(crmUser);
      setCrmFilteredUsers(crmUser);
    });
  }, []);

  const createDueDateTime = (date, time) => {
    const hours = time?.hours() || 0;
    const minutes = time?.minutes() || 0;

    const currentDate = new Date(date);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    const dueDate = new Date(currentDate).getTime();
    // devided by 1000 to return based on second not milisecond
    return dueDate;
  };

  const handleSubmit = async form => {
    if (searchDetail) {
      setSubmitFormLoading(true);
      let body = {};
      if (byCard) {
        const {
          assigneeLevantId,
          dueConvertedDate,
          dueTime,
          title,
          taskManagementPriority,
          description,
          tag,
        } = form;
        const generatedDueDate = createDueDateTime(dueConvertedDate, dueTime);
        const RelationData = {
          detailType: 'CARD',
          detailValue: cardId,
        };
        body = {
          assigneeLevantId,
          dueDate: generatedDueDate,
          title,
          taskManagementPriority,
          description,
          tag,
          taskDetails: [...uploadedFile, RelationData],
        };
      } else {
        const {
          assigneeLevantId,
          dueConvertedDate,
          dueTime,
          title,
          taskManagementPriority,
          description,
        } = form;
        const generatedDueDate = createDueDateTime(dueConvertedDate, dueTime);
        body = {
          assigneeLevantId,
          dueDate: generatedDueDate,
          title,
          taskManagementPriority,
          description,
          taskDetails: uploadedFile,
        };
      }
      if (!editMode) {
        const result = await taskManagementService.putAddTask(body);
        setSubmitFormLoading(false);
        if (!result?.err) {
          onSuccessSubmit();
          kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
        } else CPMessage('خطا در افزودن تسک!', 'error');
      }
      if (editMode) {
        const result = await taskManagementService.postUpdateTask({
          ...body,
          id: taskDetailData.id,
        });
        setSubmitFormLoading(false);
        if (!result?.err) {
          CPMessage('ویرایش کار با موفقیت انجام شد.', 'success');
          onSuccessSubmit();
          kianTableApi(TASK_MANAGEMENT_TABLE).refreshTable();
        } else CPMessage('خطا در ویرایش تسک!', 'error');
      }
    } else
      CPMessage('لطفا از کادر جستجو بالا یک شخص را انتخاب کنید!', 'warning');
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    const checkInfo = async () => {
      const data = await props.postUploadFileAction({ files: file });
      if (data.err) {
        CPMessage('فایل آپلود نشد', 'error');
        onError(data);
        return;
      }
      CPMessage('فایل آپلود شد', 'success');
      const arr = [...uploadedFile];
      arr.push({
        detailType: 'ATTACHMENT',
        detailValue: data[0]?.name,
        attachmentToken: data[0]?.token,
      });
      setUploadedFile(arr);
      onSuccess(null, file);
    };
    checkInfo();
  };

  const onFilePreview = file => {
    setPreviewVisible(true);
    setPreviewImage(file);
  };

  const handleCancelModal = () => {
    setPreviewVisible(false);
  };

  const handleSearch = value => {
    if (!value) {
      setCrmFilteredUsers(crmLeadUsers);
      return;
    }
    let newList = [];
    newList = crmLeadUsers.filter(item => item.fullName.includes(value));
    setCrmFilteredUsers(newList);
  };

  useEffect(() => {
    const initialFileList = attachmentUrl => {
      if (attachmentUrl?.length) {
        setHasDefault(true);
        setSubmitFormLoading(true);
        let promises = [];
        promises = attachmentUrl?.map(async (file, index) => {
          const { detailValue, attachmentToken } = file;
          return glusterService
            .getGlusterFile(detailValue, attachmentToken)
            .then(async response => {
              const { result } = response;
              const objectURL = await URL.createObjectURL(result);
              const name = detailValue.split('/').pop();
              const obj = {
                detailValue,
                uid: index,
                url: objectURL,
                name,
                thumbUrl: objectURL,
                status: 'done',
              };
              return obj;
            });
        });
        if (promises.length) {
          Promise.all(promises).then(results => {
            setDefaultFileList(results);
            setSubmitFormLoading(false);
          });
        } else setSubmitFormLoading(false);
      } else setSubmitFormLoading(false);
    };
    const getTaskById = () => {
      setSubmitFormLoading(true);
      const { id } = initialFormValues;
      taskManagementService.getTaskById(id).then(
        response => {
          if (response.additionalInfo) {
            delete response.additionalInfo;
          }
          const { taskDetails, dueDate } = response;
          setTaskDetailDatal({
            dueTime: moment(dueDate),
            dueConvertedDate: dueDate,
            ...response,
          });
          setRelationData({
            relation: taskDetails[indexOfTaskFromCard]?.detailType,
            relationName: taskDetails[indexOfTaskFromCard]?.detailValue,
          });
          initialFileList(taskDetails.find(detail => detail?.attachmentToken));
          setSubmitFormLoading(false);
        },
        () => {
          setSubmitFormLoading(false);
          CPMessage('خطا در دریافت اطلاعات کیس!', 'error');
        },
      );
    };
    if (initialFormValues) getTaskById();
  }, []);

  return (
    <>
      <FormBuilder
        enableReinitialize
        schema={schema(
          onFilePreview,
          customRequest,
          handleSearch,
          crmFilteredUsers,
          searchDetail,
          setSearchDetail,
          isSelectDueDateChange,
          setIsSelectDueDateChange,
          defaultFileList,
          hasDefault,
          byCard,
          cardTitle,
        )}
        onSubmit={handleSubmit}
        initialValues={{ ...taskDetailData, ...relationData }}
        onCancel={onCancel}
        layout="vertical"
        submitLabel="ثبت"
        cancelLabel="انصراف"
        loading={submitFormLoading}
      />
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancelModal}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

TaskForm.defaultProps = {
  onSuccessSubmit: () => {},
  onCancel: () => {},
  initialFormValues: null,
  editMode: false,
  byCard: false,
  cardTitle: '',
  cardId: '',
};
TaskForm.propTypes = {
  postUploadFileAction: PropTypes.func.isRequired,
  onSuccessSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  initialFormValues: PropTypes.object,
  editMode: PropTypes.bool,
  byCard: PropTypes.bool,
  cardTitle: PropTypes.string,
  cardId: PropTypes.string,
};
const mapState = state => ({
  applications: state.applications.data,
  templates: state.phoneCalls.call,
  levantId: state.neshanAuth?.jwt?.levantId,
  leadInfo: state.lead?.data?.partyPerson,
});

const mapDispatch = {
  postUploadFileAction,
};

export default connect(mapState, mapDispatch)(TaskForm);
