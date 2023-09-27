import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Alert, Button, Col, Divider, Row } from 'antd';
import CPModal from '../../../CP/CPModal';
import { MODAL_FOR_COMPLETE_SAYA_DATA } from '../../repository';
import FormBuilder from '../../../FormBuilder';
import s from './ModalForCompleteSayaData.scss';
import { imageTabs, importantDetails, schema } from './schema';
import opportunityService from '../../../../service/opportunityService';
import { getOpportunitiesAction } from '../../../../store/opportunities/opportunities.actions';
import { collateralTypes } from '../../../ModalForCheckIdentificationTabs/Components/CollateralInfoTab/schema';
import LazyImage from '../../../LazyImage';
import PreviewImage from '../../../PreviewImage';

const ModalForCompleteSayaData = props => {
  const { identificationWithDocs, id } = props;
  const {
    firstName,
    lastName,
    collateralInfo: { amount, collateralType },
  } = identificationWithDocs;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [contactTypes, setContractTypes] = useState([]);
  const [activeImageTab, setActiveImageTab] = useState('PAYROLL');
  const [contractMaxAmount, setContractMaxAmount] = useState(null);

  useEffect(() => {
    opportunityService.sayaContractTypes().then(({ result }) => {
      setContractTypes(
        result?.map(ct => ({
          label: ct.title,
          value: ct.id,
          maxAmount: ct.maxAmount,
        })),
      );
    });
  }, []);

  function closeModal() {
    setVisible(false);
  }

  const onSubmit = async formData => {
    setLoading(true);
    const {
      description,
      shareValue,
      worth,
      documentIdentifier,
      creditContractTypeId,
    } = formData;
    const body = {
      assets: [
        {
          description,
          documentIdentifier,
          shareValue,
          type: identificationWithDocs?.collateralInfo?.collateralType,
          worth: {
            value: worth,
            date: Date.now(),
          },
        },
      ],
      creditAmount: amount,
      creditContractTypeId,
    };
    try {
      await opportunityService.completeSayaCreditData(id, body);
      props.getOpportunitiesAction();
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const activeDocument = () => {
    const { collateralDocumentDTOS: docs } = identificationWithDocs;
    const active = docs.find(d => d.type === activeImageTab);
    return active?.files[0];
  };

  const isValidContract = () =>
    contractMaxAmount && contractMaxAmount >= amount;

  return (
    <CPModal
      title="تکمیل اطلاعات سایا"
      footer={false}
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_COMPLETE_SAYA_DATA}
    >
      <FormBuilder
        schema={importantDetails}
        initialValues={{
          name: `${firstName} ${lastName}`,
          amount: amount?.toLocaleString(),
        }}
        hideSubmit
      />
      <Divider />
      {preview ? (
        <PreviewImage preview={preview} closePreview={() => setPreview(null)} />
      ) : (
        <Row type="flex" gutter={[8, 8]}>
          <Col span={8}>
            {imageTabs.map(tab => (
              <Button
                key={tab.name}
                block
                type="default"
                onClick={() => setActiveImageTab(tab.name)}
                icon={activeImageTab === tab.name ? 'check' : ''}
                className={s.tabButton}
              >
                {tab.title}
              </Button>
            ))}
          </Col>
          <Col span={16} className={s.tabImage}>
            <LazyImage
              path={activeDocument()?.path}
              objectToken={{ token: activeDocument()?.token }}
              onClick={image => setPreview(image)}
            />
          </Col>
        </Row>
      )}
      <Divider />
      <p className={s.hint}>
        اطلاعات مربوط به <strong>{collateralTypes[collateralType]}</strong> را
        در این قسمت وارد نمایید.
      </p>
      {contractMaxAmount ? (
        <Alert
          className={s.alert}
          showIcon
          type={isValidContract() ? 'success' : 'error'}
          message={`حداکثر اعتبار تخصیص داده شده به قرارداد انتخابی ${contractMaxAmount.toLocaleString()} ریال بوده و ${
            isValidContract() ? '' : 'غیر'
          } مجاز می‌باشد.`}
        />
      ) : null}
      <FormBuilder
        schema={schema(
          contactTypes,
          collateralTypes[collateralType],
          setContractMaxAmount,
        )}
        loading={loading}
        onSubmit={onSubmit}
        disableSubmit={!isValidContract()}
      />
    </CPModal>
  );
};

ModalForCompleteSayaData.propTypes = {
  identificationWithDocs: PropTypes.object.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapState = ({ opportunities }) => ({
  identificationWithDocs: opportunities.identificationWithDocsData,
});

const mapDispatch = {
  getOpportunitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForCompleteSayaData));
