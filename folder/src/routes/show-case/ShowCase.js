import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import ShowCaseDetailSection from '../../components/ShowCaseDetailSection';
import ShowCaseListSection from '../../components/ShowCaseListSection';
import ShowCaseTicketSection from '../../components/ShowCaseTicketSection';
import caseManagementsService from '../../service/caseManagementsService';
import CPMessage from '../../components/CP/CPMessage';
import CPLoading from '../../components/CP/CPLoading';

const ShowCase = props => {
  const { id } = props;
  const [caseDetail, setCaseDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    caseManagementsService.getCaseByCaseId(id).then(
      response => {
        if (response.additionalInfo) {
          delete response.additionalInfo;
        }
        setLoading(false);
        setCaseDetail(response);
      },
      () => {
        setLoading(false);
        CPMessage('خطا در دریافت اطلاعات درخواست!', 'error');
      },
    );
  }, []);

  return (
    <>
      <Row gutter={24}>
        <Col span={9}>
          <Row gutter={24}>
            <Col span={24}>
              <ShowCaseDetailSection data={caseDetail} />
            </Col>
            <Col span={24}>
              <CPLoading
                spinning={loading}
                tip="در حال دریافت لیست درخواست های این درخواست...."
              >
                <ShowCaseListSection id={caseDetail?.caseOwnerLevantId} />
              </CPLoading>
            </Col>
          </Row>
        </Col>
        <Col span={15}>
          <ShowCaseTicketSection id={id} />
        </Col>
      </Row>
    </>
  );
};

ShowCase.propTypes = {
  id: PropTypes.string,
};
ShowCase.defaultProps = {
  id: null,
};

export default ShowCase;
