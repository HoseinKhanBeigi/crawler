/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import { Table, Row, Col, Descriptions, Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';

// eslint-disable-next-line css-modules/no-unused-class
import s from './FinancialStamentTab.scss';

const data = [
  {
    key: '1',
    name: 'بانک ملی ایران - پروین اعتصامی',
    money: '500,000,000,000 ریال',
    address: '۳۵۵۲/۴۵۳۴۴',
  },
  {
    key: '2',
    name: 'بانک ملی ایران - پروین اعتصامی',
    money: '500,000,000,000 ریال',
    address: '۳۵۵۲/۴۵۳۴۴',
  },
  {
    key: '3',
    name: 'بانک ملی ایران - پروین اعتصامی',
    money: '500,000,000,000 ریال',
    address: '۳۵۵۲/۴۵۳۴۴',
  },
  {
    key: '4',
    name: 'بانک ملی ایران - پروین اعتصامی',
    money: '500,000,000,000 ریال',
    address: '۳۵۵۲/۴۵۳۴۴',
  },
];

const FinancialStamentTab = props => {
  const { param, details } = props;
  const [isShowCardDetail, setIsShowCardDetail] = useState(false);
  const [cardDetailData, setCardDetailData] = useState(null);

  const addRowIndex = content =>
    content.map((c, i) => ({
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
      dataIndex: 'originalAmount',
      render: value => toCommaSeparatedNumber(value, false),
    },
    {
      title: 'شناسه چک',
      dataIndex: 'requestNo',
    },
    {
      title: 'جزئیات',
      render: row => (
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
                span={2}
                label={
                  <span className={s.label}>
                    <b>امتیاز وضعیت تسهیلات بانکی</b>
                  </span>
                }
              >
                320
              </Descriptions.Item>
              <Descriptions.Item label={<span className={s.label}>نام</span>}>
                {details?.firstName || '---'}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>نام خانوداگی</span>}
              >
                {details?.lastName}
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>اصل تسهیلات</span>}
              >
                {toCommaSeparatedNumber(details?.originalAmount, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>کل تسهیلات</span>}
              >
                {toCommaSeparatedNumber(details?.totalAmount, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مبلغ کل بدهی</span>}
              >
                {toCommaSeparatedNumber(details?.totalDebt, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مجموع کل مشکوک‌الوصول:</span>}
              >
                {toCommaSeparatedNumber(details?.totalDoubtful, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مجموع کل معوق:</span>}
              >
                {toCommaSeparatedNumber(details?.totalDelayed, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مجموع کل سررسید:</span>}
              >
                {toCommaSeparatedNumber(details?.totalReached, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>مجموع کل تعهد شده:</span>}
              >
                {toCommaSeparatedNumber(details?.totalPledged, false)} ریال
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className={s.label}>زمان استعلام:</span>}
              >
                {renderDate(details?.reqInquiryDate)}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <div className={s.subtitle}>لیست تسهیلات بانکی</div>
        <Row>
          <Col span={16}>
            <Table
              columns={columns}
              dataSource={addRowIndex(details?.facilityInfoItemDtos)}
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
                  title={`اطلاعات تسهیل به شماره ${cardDetailData?.requestNo}`}
                  column={1}
                >
                  <Descriptions.Item label="بانک">
                    {cardDetailData?.bankName}
                  </Descriptions.Item>
                  <Descriptions.Item label="شعبه">
                    {cardDetailData?.branchName}
                  </Descriptions.Item>
                  <Descriptions.Item label="بانک، شعبه:">
                    {cardDetailData?.bankBranch}
                  </Descriptions.Item>
                  <Descriptions.Item label="شماره درخواست">
                    {cardDetailData?.requestNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="سررسید">
                    {toCommaSeparatedNumber(
                      cardDetailData?.reachedAmount,
                      false,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="معوق">
                    {toCommaSeparatedNumber(
                      cardDetailData?.delayedAmount,
                      false,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="مشکوک‌الوصول">
                    {toCommaSeparatedNumber(
                      cardDetailData?.doubtfulAmount,
                      false,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="مبلغ کل بدهی">
                    {toCommaSeparatedNumber(
                      cardDetailData?.totalDebtAmount,
                      false,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="اصل تسهیلات">
                    {toCommaSeparatedNumber(
                      cardDetailData?.totalDebtAmount,
                      false,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="سود:">
                    {toCommaSeparatedNumber(cardDetailData?.benefit, false)}
                  </Descriptions.Item>
                  <Descriptions.Item label="نوع">
                    {cardDetailData?.type}
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
FinancialStamentTab.propTypes = {
  details: PropTypes.string,
  param: PropTypes.string,
};
FinancialStamentTab.defaultProps = {
  details: '',
  param: '',
};
export default withStyles(s)(FinancialStamentTab);
