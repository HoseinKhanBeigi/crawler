import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row, Spin } from 'antd';
import CPModal from '../../../CP/CPModal';
import { rejectionReasonTranslate } from './rejectionReasonTranslate';
import opportunityService from '../../../../service/opportunityService';
import { MODAL_FOR_REJECTION_REASON } from '../../repository';
import CPAlert from '../../../CP/CPAlert';

const ModalForRejectionReason = props => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [rejectedReasons, setRejectedReasons] = useState([]);
  const [rejectDesc, setRejectDesc] = useState(null);
  const {
    data: { id, firstName, lastName },
  } = props;

  const closeModal = () => {
    setVisible(false);
  };

  const getRejectionReasons = async () => {
    try {
      const result = await opportunityService.getIdentification(id);
      const reasons = [];
      Object.entries(result).forEach(([key, value]) => {
        if (value === 'REJECTED') reasons.push(key);
      });
      setRejectedReasons(reasons);
      setRejectDesc(result?.rejectDesc);
      setLoading(false);
    } catch (e) {
      closeModal();
    }
  };

  useEffect(() => {
    getRejectionReasons();
  }, []);

  return (
    <CPModal
      title={`دلایل ریجکت شدن ${firstName || ''} ${lastName || ''}`}
      visible={visible}
      onCancel={closeModal}
      footer={false}
      modalType={MODAL_FOR_REJECTION_REASON}
    >
      <Row>
        <Col span={24}>
          <Spin tip="بارگزاری..." spinning={loading}>
            <Divider orientation="left">دلایل:</Divider>
            <ul style={{ color: 'red' }}>
              {rejectedReasons.map(r => (
                <li key={r}>{rejectionReasonTranslate[r] || r}</li>
              ))}
            </ul>
            {rejectDesc && (
              <>
                <Divider orientation="left">توضیحات:</Divider>
                <CPAlert type="warning" description={rejectDesc} />
              </>
            )}
          </Spin>
        </Col>
      </Row>
    </CPModal>
  );
};

ModalForRejectionReason.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ModalForRejectionReason;
