import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPModal from '../../../CP/CPModal/CPModal';
import CPButton from '../../../CP/CPButton/CPButton';
import CPLoading from '../../../CP/CPLoading/CPLoading';
import CPDivider from '../../../CP/CPDivider/CPDivider';
import s from './ModalForViewKYCReportsStatus.scss';
import { MODAL_FOR_VIEW_KYC_REPORTS_STATUS } from '../../repository';
import videoAuthenticationService from '../../../../service/videoAuthenticationService';

const ModalForViewKYCReportsStatus = props => {
  const [visible, setVisible] = useState(true);
  const { title, type, data } = props;
  const { kycId } = data;
  const [loading, setLoading] = useState(false);
  const [statusesReports, setStatusesReports] = useState([]);

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    videoAuthenticationService.getKYCReportStatuses(kycId).then(
      response => {
        if (response?.result) {
          setStatusesReports(response?.result);
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  }, []);

  const renderVidoStatusReports = item => (
    <>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>آیا تصویر کاربر جعلی است؟</div>
        </Col>
        <Col span={8}>
          <div>{item?.isSpoof === 1 ? 'بله' : 'خیر'}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            درصد جعلی بودن ویدیو کاربر چقدر است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.spoofProbability}%</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>آیا کاربر پلک زده است؟</div>
        </Col>
        <Col span={8}>
          <div>{item?.isBlinkVerified === 1 ? 'بله' : 'خیر'}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>تعداد دفعات پلک زدن؟</div>
        </Col>
        <Col span={8}>
          <div>{item?.blinkCount}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>ایا کاربر سر خود را حرکت داده است؟</div>
        </Col>
        <Col span={8}>
          <div>{item?.isHeadVerified}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            حداقل زاویه چرخش سر در راستای افقی چند درجه است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.minAngleX}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            حداکثر زاویه چرخش سر در راستای عمودی چند درجه است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.maxAngleX}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            میزان فاصله بین حداقل و حداکثر زاویه چرخش سر در راستای افقی چند درجه
            است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.difAngleX}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            حداقل زاویه چرخش سر در راستای عمودی چند درجه است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.minAngleY}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            حداکثر زاویه چرخش سر در راستای افقی چند درجه است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.maxAngleY}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            میزان فاصله بین حداقل و حداکثر زاویه چرخش سر در راستای عمودی چند
            درجه است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.difAngleY}</div>
        </Col>
      </Row>
    </>
  );

  const renderImageStatusReports = item => (
    <>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>آیا تصویر کاربر جعلی است؟</div>
        </Col>
        <Col span={8}>
          <div>{item?.isSpoof === 1 ? 'بله' : 'خیر'}</div>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <div className={s.statusText}>
            درصد جعلی بودن تصویر کاربر چقدر است؟
          </div>
        </Col>
        <Col span={8}>
          <div>{item?.spoofProbability}%</div>
        </Col>
      </Row>
    </>
  );

  return (
    <CPModal
      modalType={MODAL_FOR_VIEW_KYC_REPORTS_STATUS}
      visible={visible}
      title={title}
      footer={false}
      onCancel={closeModal}
    >
      <CPLoading spinning={loading} tip="در حال دریافت لیست گزاراشات...">
        <div className={s.wrapper}>
          {statusesReports?.map(item =>
            item?.documentType === 'video' && type === 'video'
              ? renderVidoStatusReports(item)
              : item?.documentType === 'image' && type === 'image'
              ? renderImageStatusReports(item)
              : '',
          )}
        </div>
        <CPDivider />
        <div className={s.footer}>
          <div className={s.footer__buttons}>
            <CPButton onClick={closeModal} type="primary">
              انصراف
            </CPButton>
          </div>
        </div>
      </CPLoading>
    </CPModal>
  );
};

ModalForViewKYCReportsStatus.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
};
ModalForViewKYCReportsStatus.defaultProps = {
  title: '',
  type: 'image',
  data: {},
};

export default withStyles(s)(ModalForViewKYCReportsStatus);
