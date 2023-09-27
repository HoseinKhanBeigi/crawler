import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Input, Row } from 'antd';
import CPModal from '../../../CP/CPModal';
import {
  getOpportunitiesAction,
  getSejamTradingCodeAction,
  putDoActionByLevantAndCommandAction,
  updateSejamTracingCodeAction,
} from '../../../../store/opportunities/opportunities.actions';
import CPMessage from '../../../CP/CPMessage';
import { MODAL_FOR_VERIFY_SEJAM_TRACE_CODE } from '../../repository';

const ModalForVerifySejamTraceCode = props => {
  const { opportunityData } = props;
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState(null);

  useEffect(() => {
    props.getSejamTradingCodeAction(opportunityData.id).then(r => {
      setCode(r.sejamCode);
    });
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const handleClickButton = () => {
    if (editMode) {
      setLoading(true);
      props
        .updateSejamTracingCodeAction({
          code,
          opportunityId: opportunityData.id,
        })
        .then(r => {
          setLoading(false);
          if (r.status === 200) {
            setEditMode(false);
            CPMessage('کد پیگیری سجام اصلاح گردید.', 'success');
          } else {
            CPMessage('خطایی در اصلاح کد پیگیری سجام رخ داده است!', 'error');
          }
        });
    } else {
      setEditMode(true);
    }
  };

  const onConfirmAndCloseModal = async () => {
    await props.putDoActionByLevantAndCommandAction({
      code: 'VERIFY_SEJAM_TRACE_CODE',
      opportunityId: opportunityData.id,
    });
    props.getOpportunitiesAction();
    closeModal();
  };

  return (
    <CPModal
      title="تایید کد پیگیری سجام"
      visible={visible}
      onCancel={closeModal}
      modalType={MODAL_FOR_VERIFY_SEJAM_TRACE_CODE}
      okText="بله"
      okButtonProps={{
        disabled: editMode || loading,
      }}
      onOk={onConfirmAndCloseModal}
    >
      <>
        <form>
          <Row type="flex" gutter={[8, 8]}>
            <Col span={24}>
              <p>
                کد پیگیری سجام{' '}
                <strong>{`(${opportunityData.firstName} ${opportunityData.lastName})`}</strong>{' '}
                صحیح است؟
              </p>
            </Col>
            <Col span={20}>
              <Input
                required
                disabled={!editMode}
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Button
                type={editMode ? 'primary' : 'default'}
                onClick={handleClickButton}
                loading={loading}
              >
                {editMode ? 'ذخیره' : 'ویرایش'}
              </Button>
            </Col>
          </Row>
        </form>
      </>
    </CPModal>
  );
};

ModalForVerifySejamTraceCode.propTypes = {
  putDoActionByLevantAndCommandAction: PropTypes.func.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  opportunityData: PropTypes.object.isRequired,
  updateSejamTracingCodeAction: PropTypes.func.isRequired,
  getSejamTradingCodeAction: PropTypes.func.isRequired,
};

const mapDispatch = {
  updateSejamTracingCodeAction,
  putDoActionByLevantAndCommandAction,
  getSejamTradingCodeAction,
  getOpportunitiesAction,
};
export default connect(null, mapDispatch)(ModalForVerifySejamTraceCode);
