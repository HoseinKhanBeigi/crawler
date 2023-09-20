import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_ADD_CASE } from '../../repository';
import { CASE_TABLE } from '../../../../store/settings/settings.constants';
import { schema } from './schema';
import FormBuilder from '../../../FormBuilder';
import leadService from '../../../../service/leadService';
import CPMessage from '../../../CP/CPMessage';
import { postUploadFileAction } from '../../../../store/upload/upload.actions';
import { postAddCaseAction } from '../../../../store/case/case.actions';
import { getTemplatesAction } from '../../../../store/phoneCalls/phoneCalls.actions';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../../../serviceConfig';
import { kianTableApi } from '../../../KianTable/helpers/globalApi';
import SearchFilterWithDetailBox from '../../../SearchFilterWithDetailBox';

const ModalForAddCase = props => {
  const {
    applications,
    templates,
    levantId: caseReporterLevantId,
    withSearch,
  } = props;
  const [visible, setVisible] = useState(true);
  const [crmLeadUsers, setCrmLeadUsers] = useState([]);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [userInfoDetail, setUserInfoDetail] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [searchDetail, setSearchDetail] = useState([]);

  function closeModal() {
    setVisible(false);
  }

  useEffect(() => {
    leadService.getCrmUserLead('OPERATOR').then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      const crmUser = Object.values(response.result);
      setCrmLeadUsers(crmUser);
    });
    props.getTemplatesAction('CASE');
  }, []);

  useEffect(() => {
    if (!withSearch) {
      setUserInfoDetail(props.leadInfo);
    }
  }, [withSearch]);

  const handleSubmit = async form => {
    if (userInfoDetail) {
      setSubmitFormLoading(true);
      const newForm = { ...form };
      // because of the attechmentUrl is an file selected not an url from gluster, for this we first remove them then replace with uploaded file from gluster
      delete newForm?.attachmentUrl;
      const { levantId: caseOwnerLevantId } = userInfoDetail;
      const body = {
        ...form,
        caseOwnerLevantId,
        caseReporterLevantId,
        attachmentUrl: uploadedFile,
        context: resolveVariable(BASE_VARIABLE_KEYS.CONTEXT),
        caseInputType: 'MANUAL',
      };
      const result = await props.postAddCaseAction(body);
      setSubmitFormLoading(false);
      if (!result?.err) {
        CPMessage('افزودن کیس با موفقیت انجام شد.', 'success');
        closeModal();
        kianTableApi(CASE_TABLE).refreshTable();
      } else CPMessage('خطا در افزودن کیس!', 'error');
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
      const { name } = data[0];
      arr.push(name);
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

  const handleSearchItemClick = d => {
    const { firstName, lastName, name } = d;
    if (firstName || lastName) {
      setSearchDetail([
        { value: firstName, label: 'نام' },
        { value: lastName, label: 'نام خانوادگی' },
      ]);
    }
    if (name) {
      setSearchDetail([{ value: name, label: 'نام' }]);
    }
    setUserInfoDetail(d);
  };

  return (
    <CPModal
      title="افزودن درخواست جدید"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_ADD_CASE}
    >
      <>
        {withSearch && (
          <SearchFilterWithDetailBox
            lists={searchDetail}
            onClickItem={handleSearchItemClick}
          />
        )}
        <FormBuilder
          schema={schema(
            applications,
            crmLeadUsers,
            onFilePreview,
            customRequest,
            templates,
          )}
          onSubmit={handleSubmit}
          layout="vertical"
          submitLabel="ثبت درخواست"
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
    </CPModal>
  );
};

ModalForAddCase.defaultProps = {
  applications: [],
  templates: [],
  levantId: null,
  withSearch: true,
};
ModalForAddCase.propTypes = {
  applications: PropTypes.array,
  postUploadFileAction: PropTypes.func.isRequired,
  postAddCaseAction: PropTypes.func.isRequired,
  getTemplatesAction: PropTypes.func.isRequired,
  templates: PropTypes.array,
  levantId: PropTypes.string,
  withSearch: PropTypes.bool,
  leadInfo: PropTypes.object.isRequired,
};
const mapState = state => ({
  applications: state.applications.data,
  templates: state.phoneCalls.case,
  levantId: state.neshanAuth?.jwt?.levantId,
  leadInfo: state.lead?.data?.partyPerson,
});

const mapDispatch = {
  postUploadFileAction,
  postAddCaseAction,
  getTemplatesAction,
};

export default connect(mapState, mapDispatch)(ModalForAddCase);
