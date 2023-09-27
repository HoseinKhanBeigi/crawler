import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, message, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ToolContainer from '../ToolContainer/ToolContainer';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import CPMessage from '../../../../components/CP/CPMessage'
import { inquiryIbanWithCardNumber } from '../../../../service/toolsService';
import CopyableField from '../../../../components/CopyableField/CopyableField';
import {persianNumToEnglishNum} from "../../../../utils";

const CardNumberToIban = ({ title }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const validateCardNumber = () => {
    const cardNumberValidationRegex = /^\d{16}$/g;
    if (!cardNumberValidationRegex.test(persianNumToEnglishNum(cardNumber))) {
      if (isNaN(persianNumToEnglishNum(cardNumber))) {
        CPMessage('شماره کارت باید فقط شامل عدد باشد', 'warning');
      }
      const errorText = 'شماره کارت نامعتبر است';
      message.error(errorText);
      throw new Error(errorText);
    }
  };

  const handleInquiry = async () => {
    setLoading(true);
    try {
      validateCardNumber();
      const {
        additionalInfo,
        ...inquiryData
      } = await inquiryIbanWithCardNumber(cardNumber);
      setData(inquiryData);
    } catch (e) {
      // ...
    }
    setLoading(false);
  };

  useEffect(() => {
    if (cardNumber) {
      setCardNumber(persianNumToEnglishNum(cardNumber))
    }
  }, [cardNumber])

  return (
    <ToolContainer
      title={title}
      showResult={data}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>شماره کارت</div>
              <CPInput
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                maxLength={16}
                placeholder="شماره کارت"
              />
            </Col>
          </Row>
          <CPButton
            loading={loading}
            onClick={handleInquiry}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        <div className={s.card}>
          <Row>
            <Col span={12}>
              <div className={s.fieldTitle}>نام</div>
              {/* eslint-disable-next-line camelcase */}
              <div className={s.fieldValue}>{data?.first_name}</div>
            </Col>
            <Col span={12}>
              <div className={s.fieldTitle}>نام خانوادگی</div>
              {/* eslint-disable-next-line camelcase */}
              <div className={s.fieldValue}>{data?.last_name}</div>
            </Col>
          </Row>
          <Row className="margin-t-10">
            <Col span={12}>
              <CopyableField className={s.fieldTitle} copyText={data?.iban}>
                <div className={s.fieldTitle}>شماره شبا</div>
              </CopyableField>
              <div className={s.fieldValue}>{data?.iban}</div>
            </Col>
          </Row>
        </div>
      }
    />
  );
};

CardNumberToIban.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(CardNumberToIban);
