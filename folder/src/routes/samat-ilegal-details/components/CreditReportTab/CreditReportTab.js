/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import { Table, Row, Col, Descriptions, Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
// eslint-disable-next-line css-modules/no-unused-class
import s from './CreditReportTab.scss';

const CreditReportTab = props => {
  const { param, details } = props;
  const [isShowCardDetail, setIsShowCardDetail] = useState(false);
  const [cardDetailData, setCardDetailData] = useState(null);

  const addRowIndex = content =>
    content?.map((c, i) => ({
      rowIndex: i + 1,
      ...c,
    }));

  const activateDetailCard = row => {
    setIsShowCardDetail(true);
    setCardDetailData(row);
  };

  const closeCardDetail = () => {
    setIsShowCardDetail(false);
  };

  useEffect(
    () => () => {
      setIsShowCardDetail(false);
    },
    [],
  );

  const columns = [
    {
      title: 'ردیف',
      dataIndex: 'rowIndex',
      key: 'rowIndex',
      width: 50,
    },
    {
      title: 'بانک',
      dataIndex: 'bankBranch',
    },
    {
      title: 'مبلغ',
      dataIndex: 'checkAmount',
      render: value => toCommaSeparatedNumber(value, false),
    },
    {
      title: 'شناسه چک',
      dataIndex: 'checkId',
    },
    {
      title: 'جزئیات',
      dataIndex: 'address',
      render: (value, row) => (
        <Button type="link" onClick={() => activateDetailCard(row)}>
          مشاهده جزئیات
        </Button>
      ),
    },
  ];

  const renderDate = d => {
    const m = momentJalaali(new Date(d) * 1000);
    if (m.isValid()) {
      return m.format('dddd jD jMMMM jYYYY ');
    }
    return 'تاریخ معتبر نیست';
  };
  return (
    <>
      <div className={s.content}>
        <Row>
          <Col span={16}>
            <Descriptions column={2}>
              <Descriptions.Item
                label={<span className={s.label}>تعداد جک های برگشتی</span>}
              >
                {details?.count || '---'}
              </Descriptions.Item>
              <Descriptions.Item label={<span className={s.label}>نام</span>}>
                {details?.name}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مجموع مبالغ</span>}
              >
                {toCommaSeparatedNumber(details?.checkAmountSum, false)}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>زمان استعلام</span>}
              >
                {renderDate(details?.reqInquiryDate)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <div className={s.subtitle}>لیست چک های برگشتی</div>
        <Row>
          <Col span={16}>
            <Table
              columns={columns}
              dataSource={addRowIndex(details?.fcheckInformationItems)}
              bordered
              pagination={false}
              size="middle"
            />
          </Col>
          {isShowCardDetail && (
            <Col span={8}>
              <div className={s.cardDetail}>
                <Button
                  className={s.closeIcon}
                  icon="close"
                  type="link"
                  onClick={closeCardDetail}
                />
                <Descriptions
                  title={`اطلاعات چک به شناسه ${cardDetailData?.checkId}`}
                  column={1}
                >
                  <Descriptions.Item label="شماره حساب">
                    {cardDetailData?.accountNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="مبلغ">
                    {toCommaSeparatedNumber(cardDetailData?.checkAmount)} ریال
                  </Descriptions.Item>
                  <Descriptions.Item label="تاریخ برگشت">
                    {cardDetailData?.checkBackDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="بانک">
                    {cardDetailData?.bankBranch}
                  </Descriptions.Item>
                  <Descriptions.Item label="تاریخ چک">
                    {renderDate(cardDetailData?.checkDate)}
                  </Descriptions.Item>
                  <Descriptions.Item label="شناسه">
                    {cardDetailData?.checkId}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};
CreditReportTab.propTypes = {
  details: PropTypes.string,
  param: PropTypes.string,
};
CreditReportTab.defaultProps = {
  details: '',
  param: '',
};
export default withStyles(s)(CreditReportTab);
