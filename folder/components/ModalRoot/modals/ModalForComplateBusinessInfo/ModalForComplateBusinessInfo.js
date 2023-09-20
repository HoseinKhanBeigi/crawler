import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MODAL_FOR_COMPLATE_BUSINESS_INFO } from '../../repository';
import CPModal from '../../../CP/CPModal';
import ModalForVerifyDataRenderBusinessInfo from '../../../ModalForVerifyDataRenderUserInfo/ModalForVerifyDataRenderBusinessInfo';
import ModalForVerifyDataRenderDocs from '../../../ModalForVerifyDataRenderDocs';

const ModalForComplateBusinessInfo = ({ opportunity, ...props }) => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  const getDocuments = () => {
    const documentToken = props.documentToken || [];
    const businessDocumentToken = props.businessDocumentToken || [];

    const documents = {};
    documentToken.forEach(item => {
      documents[item.type] = item;
    });
    businessDocumentToken.forEach(item => {
      documents[item.type] = item;
    });

    return documents;
  };

  const renderUserDocs = () => (
    <>
      <ModalForVerifyDataRenderDocs
        documents={getDocuments()}
        handleChange={() => {}}
        preview={null}
        isBusiness
      />
      {/* {this.state.preview && (
        <PreviewImage
          preview={this.state.preview}
          closePreview={this.closePreview}
          imgInformation={this.state.imgInformation}
        />
      )} */}
    </>
  );

  return (
    <CPModal
      modalType={MODAL_FOR_COMPLATE_BUSINESS_INFO}
      title="تکمیل اطلاعات کسب و کار"
      onCancel={closeModal}
      visible={visible}
      footer={false}
      width={1200}
    >
      <Row type="flex" gutter={[16, 16]}>
        <Col span={10}>
          <ModalForVerifyDataRenderBusinessInfo closeModal={closeModal} />
        </Col>
        <Col span={14}>{renderUserDocs()}</Col>
      </Row>
    </CPModal>
  );
};

ModalForComplateBusinessInfo.propTypes = {
  opportunity: PropTypes.object.isRequired,
  documentToken: PropTypes.object.isRequired,
  businessDocumentToken: PropTypes.object.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

const mapState = state => ({
  documentToken: state.opportunities?.identificationWithDocsData?.documentDTOS,
  businessDocumentToken:
    state.opportunities?.identificationWithDocsData?.businessDocumentDTOS,
});

export default connect(mapState)(ModalForComplateBusinessInfo);
