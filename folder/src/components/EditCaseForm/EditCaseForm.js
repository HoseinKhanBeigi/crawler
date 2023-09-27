import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import CPMessage from '../CP/CPMessage';
import glusterService from '../../service/glusterService';
import leadService from '../../service/leadService';
import caseManagementsService from '../../service/caseManagementsService';
import { kianTableApi } from '../KianTable/helpers/globalApi';
import { CASE_TABLE } from '../../store/settings/settings.constants';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import CPLoading from '../CP/CPLoading';
import FormBuilder from '../FormBuilder';
import {
  caseManual,
  caseSystem,
} from '../ModalRoot/modals/ModalForEditCase/schema';
import { getTemplatesAction } from '../../store/phoneCalls/phoneCalls.actions';
import { postUploadFileAction } from '../../store/upload/upload.actions';

const EditCaseForm = props => {
  const {
    data,
    templates: caseTypes,
    levantId,
    applications,
    onFinish,
    onCancel,
  } = props;
  const { caseInputType, id } = data;
  const [caseDetail, setCaseDetail] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [attachment, setAttachment] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [hasDefault, setHasDefault] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [crmUserList, setCrmUserList] = useState([]);

  const onFinishHandler = newData => {
    if (onFinish) onFinish(newData);
  };

  const onFilePreview = file => {
    setPreviewVisible(true);
    setPreviewImage(file);
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    const checkInfo = async () => {
      const result = await props.postUploadFileAction({ files: file });
      if (result.err) {
        CPMessage('فایل آپلود نشد', 'error');
        onError(result);
        return;
      }
      CPMessage('فایل آپلود شد', 'success');
      const prevUploaded = [...attachment];
      const { name } = result[0];
      prevUploaded.push(name);
      setAttachment(prevUploaded);
      onSuccess(null, file);
    };
    checkInfo();
  };

  useEffect(() => {
    const initialFileList = attachmentUrl => {
      if (attachmentUrl?.length) {
        setHasDefault(true);
        setFormLoading(true);
        let promises = [];
        promises = attachmentUrl?.map(async (file, index) => {
          const { path, token } = file;
          return glusterService
            .getGlusterFile(path, token)
            .then(async response => {
              const { result } = response;
              const objectURL = await URL.createObjectURL(result);
              const name = path.split('/').pop();
              const obj = {
                path,
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
            setFormLoading(false);
          });
        } else setFormLoading(false);
      } else setFormLoading(false);
    };

    const getCrmUserLead = () => {
      leadService.getCrmUserLead('OPERATOR').then(
        response => {
          if (response.additionalInfo) {
            delete response.additionalInfo;
          }
          const crmUser = Object.values(response.result);
          setCrmUserList(crmUser);
        },
        () => {
          setFormLoading(false);
          CPMessage('خطا در دریافت لیست کاربران سی آر ام!', 'error');
        },
      );
    };
    const getCaseById = () => {
      setFormLoading(true);
      caseManagementsService.getCaseByCaseId(id).then(
        response => {
          if (response.additionalInfo) {
            delete response.additionalInfo;
          }
          const { attachmentUrl } = response;
          setCaseDetail(response);
          getCrmUserLead();
          initialFileList(attachmentUrl);
        },
        () => {
          setFormLoading(false);
          CPMessage('خطا در دریافت اطلاعات کیس!', 'error');
        },
      );
    };
    getCaseById();
  }, []);

  const refreshAndCloseTable = newData => {
    kianTableApi(CASE_TABLE).refreshTable();
    onFinishHandler(newData);
  };

  function attachmentFileFactory(files) {
    const prevAttachments = [];
    files.map(({ path }) => prevAttachments.push(path));
    return [...prevAttachments, ...attachment];
  }

  function makBody(form) {
    const { caseOwnerLevantId, caseReporterLevantId } = caseDetail;
    const body =
      caseInputType === 'MANUAL'
        ? {
            ...form,
            attachmentUrl: defaultFileList.length
              ? attachmentFileFactory(defaultFileList)
              : attachment,
            caseInputType,
            caseOwnerLevantId,
            caseReporterLevantId,
            operatorLevantId: levantId,
            context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
          }
        : {
            ...form,
            caseInputType,
            caseOwnerLevantId,
            caseReporterLevantId,
            context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
          };
    return body;
  }

  const handleSubmit = async form => {
    setSubmitFormLoading(true);
    const body = makBody(form);
    caseManagementsService.putEditCase(body).then(
      () => {
        setSubmitFormLoading(false);
        refreshAndCloseTable(body);
      },
      () => {
        setSubmitFormLoading(false);
        CPMessage('خطا در ویرایش اطلاعات کیس!');
      },
    );
  };

  const handleCancelModal = () => {
    setPreviewVisible(false);
  };

  return (
    <CPLoading spinning={formLoading} tip="در حال دریافت اطلاعات درخواست...">
      <FormBuilder
        enableReinitialize
        schema={
          caseInputType === 'MANUAL'
            ? caseManual(
                caseTypes,
                applications,
                crmUserList,
                onFilePreview,
                customRequest,
                defaultFileList,
                hasDefault,
              )
            : caseInputType === 'SYSTEM'
            ? caseSystem(crmUserList, caseTypes)
            : false
        }
        initialValues={caseDetail}
        onSubmit={handleSubmit}
        layout="vertical"
        onCancel={onCancel}
        submitLabel="ثبت تغییرات"
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
    </CPLoading>
  );
};

EditCaseForm.defaultProps = {
  templates: [],
  applications: [],
  data: {},
  levantId: null,
  onFinish: undefined,
  onCancel: undefined,
};
EditCaseForm.propTypes = {
  levantId: PropTypes.number,
  templates: PropTypes.array,
  postUploadFileAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  applications: PropTypes.array,
  onFinish: PropTypes.func,
  onCancel: PropTypes.func,
};
const mapDispatch = {
  getTemplatesAction,
  postUploadFileAction,
};
const mapStateToProps = state => ({
  templates: state.phoneCalls.call,
  applications: state.applications.data,
  levantId: state.neshanAuth?.jwt?.levantId,
});
export default connect(mapStateToProps, mapDispatch)(EditCaseForm);
