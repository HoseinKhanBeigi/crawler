import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_KYB_BUSINESS_COMPLETE_INFORMATION } from '../../repository';
import PreviewImage from '../../../PreviewImage/PreviewImage';
import {
  getOpportunitiesAction,
  putAdditionalInfoAction,
} from '../../../../store/opportunities/opportunities.actions';
import { getDocAction } from '../../../../store/docDownload/docDownload.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForKYBBusinessCompleteInformation.scss';
import CPMessage from '../../../CP/CPMessage';
import CompleteInfoForm from './CompleteInfoForm';

const ModalForKYBBusinessCompleteInformation = props => {
  const { opportunittyId, businessDocumentDTOS, productCode } = props;
  const [visible, setVisible] = useState(true);
  const [companyDocData, setCompanyDocData] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  async function getDocument(path, objectToken) {
    const blob = await props.getDocAction({
      path,
      objectToken,
    });
    const objectURL = await URL.createObjectURL(blob);
    return objectURL;
  }

  async function getCompanyDocument() {
    const file = businessDocumentDTOS?.find(
      item => item.type === 'BUSINESS_LICENSE',
    );
    const kymFile = businessDocumentDTOS?.find(
      item => item.type === 'BUSINESS_PERMIT',
    );
    const businessLicenseDoc =
      productCode === 'KYM' ? kymFile.files[0] : file?.files[0];
    const doc = await getDocument(
      businessLicenseDoc?.path,
      businessLicenseDoc?.token,
    );
    setCompanyDocData({
      src: doc,
      type: productCode === 'KYM' ? kymFile?.type : file?.type,
      obj: productCode === 'KYM' ? kymFile?.files[0] : file?.files[0],
    });
  }

  useEffect(() => {
    getCompanyDocument();
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const stackHolderMapper = stackHoldersMapper =>
    stackHoldersMapper?.map(item => {
      // for service dto we must prevent send this value
      // eslint-disable-next-line no-param-reassign
      delete item?.stackHolderDoc;
      return item;
    });

  const onSubmit = async values => {
    const body = {
      businessRegisterDate: values?.businessRegisterDate,
      licenseDate: values?.licenseDate,
      registrationPlace: values?.registrationPlace,
      licenseExpirationDate: values?.licenseExpirationDate,
      businessNameEn: values?.businessNameEn,
      personStakeholders: stackHolderMapper(values?.businessStakeholdersDto),
    };
    const response = await props.putAdditionalInfoAction(
      body,
      opportunittyId,
      'opportunity',
    );
    if (response) {
      CPMessage('اطلاعات ذخیره شد.', 'success');
      reload();
      closeModal();
    } else {
      CPMessage('خطا در ذخیره اطلاعات', 'error');
    }
  };

  const closePreview = () => {
    setPreviewData(null);
  };

  const onHandlePreveiw = data => {
    const docInfo = data?.obj ? { ...data, ...data?.obj } : { ...data };
    setPreviewData(docInfo);
  };

  return (
    <CPModal
      title="تکمیل اطلاعات"
      visible={visible}
      onCancel={closeModal}
      width="60%"
      footer={false}
      className={s.MODAL_FOR_KYB_BUSINESS_COMPLETE_INFORMATION}
      modalType={MODAL_FOR_KYB_BUSINESS_COMPLETE_INFORMATION}
    >
      <div className={s.modal_container}>
        <div style={{ display: previewData ? 'none' : 'block' }}>
          <CompleteInfoForm
            onSubmit={onSubmit}
            onCancel={closeModal}
            companyDocData={companyDocData}
            productCode={productCode}
            onHandlePreveiw={onHandlePreveiw}
          />
        </div>
        {previewData && (
          <PreviewImage
            closePreview={closePreview}
            preview={previewData.src}
            imgInformation={previewData}
          />
        )}
      </div>
    </CPModal>
  );
};
ModalForKYBBusinessCompleteInformation.defaultProps = {
  opportunittyId: '',
};
ModalForKYBBusinessCompleteInformation.propTypes = {
  getDocAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  putAdditionalInfoAction: PropTypes.func.isRequired,
  businessDocumentDTOS: PropTypes.array.isRequired,
  productCode: PropTypes.string.isRequired,
  opportunittyId: PropTypes.string,
};

const mapStateToProps = state => ({
  identificationWithDocsData: state?.opportunities?.identificationWithDocsData,
  businessDocumentDTOS:
    state?.opportunities?.identificationWithDocsData?.businessDocumentDTOS,
  productCode: state.opportunities.currentUser?.productCode,
  opportunittyId: state?.opportunities?.currentUser?.id,
});

const mapDispatch = {
  getOpportunitiesAction,
  getDocAction,
  putAdditionalInfoAction,
};
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForKYBBusinessCompleteInformation));
