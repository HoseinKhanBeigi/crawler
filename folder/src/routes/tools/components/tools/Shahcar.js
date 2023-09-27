import React, { useState, useRef, useEffect } from 'react';
import { Col, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import { CheckShahCar } from '../../../../store/tools/tools.actions';
import {
  checkNationalCode,
  checkPhoneNumber,
} from '../../../../utils/validateField';
import CPMessage from '../../../../components/CP/CPMessage';
import ToolContainer from '../ToolContainer/ToolContainer';
import {persianNumToEnglishNum} from "../../../../utils";

function ShahCar(props) {
  const [shahCarStatusLoading, setshahCarStatusLoading] = useState(false);
  const [nationalCode, setNationalCode] = useState(null);
  const [phoneNumber, SetPhoneNumber] = useState(null);
  const [shahCarStatus, setShahCarStatus] = useState('');
  const [error, setError] = useState(null);

  const checkShahCar = async () => {
    if (checkNationalCode(persianNumToEnglishNum(nationalCode)) && checkPhoneNumber(persianNumToEnglishNum(phoneNumber))) {
      setshahCarStatusLoading(true);
      const response = await props.CheckShahCar({ nationalCode, phoneNumber });
      if (response && !response.err) {
        setShahCarStatus(response.inquiryResult);
      } else if (!response || (response && response.err)) {
        if (response.status === 500) {
          setError('خطای سرور اتفاق افتاده!');
        } else {
          setError('خطایی پیش أمده لطفا دقایقی دیگر تلاش کنید');
        }
      }
      setshahCarStatusLoading(false);
    } else if (!checkNationalCode(nationalCode)) {
        if (isNaN(persianNumToEnglishNum(nationalCode))) {
          CPMessage('کد ملی باید فقط شامل عدد باشد', 'warning');
        }
      CPMessage('کد ملی صحیح نیست', 'warning');
    } else {
      CPMessage('شماره تلفن صحیح نیست', 'warning');
    }
  };

  useEffect(() => {
    if (nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }
  }, [nationalCode])

  useEffect(() => {
    if (phoneNumber) {
      SetPhoneNumber(persianNumToEnglishNum(phoneNumber))
    }
  }, [phoneNumber])

  return (
    <ToolContainer
      title={props.title}
      showResult={shahCarStatus || shahCarStatus === null}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={12}>
              <div className={s.fieldTitle}>کدملی</div>
              <CPInput
                value={nationalCode}
                inputMode='numeric'
                className={s.inputField}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="کدملی را وارد نمایید"
                maxLength={10}
              />
            </Col>
            <Col span={12}>
              <div className={s.fieldTitle}>شماره موبایل</div>
              <CPInput
                inputMode='numeric'
                value={phoneNumber}
                maxLength={11}
                onChange={e => SetPhoneNumber(e.target.value)}
                placeholder="شماره موبایل را وارد نمایید"
              />
            </Col>
          </Row>
          <CPButton
            loading={shahCarStatusLoading}
            onClick={() => checkShahCar()}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        !error ? (
          <div className={s.card}>
            <Row>
              <Col span={24}>
                <div className={s.fieldTitle}>وضعیت</div>
                {shahCarStatus === 'InfoMatched' && (
                  <div className={s.wrongIban}>
                    <Icon style={{ color: 'green' }} type="check" />
                    <div style={{ color: 'green' }}>
                      شماره و کدملی تطابق دارند
                    </div>
                  </div>
                )}
                {shahCarStatus === 'InfoMismatch' && (
                  <div className={s.wrongIban}>
                    <Icon type="stop" />
                    <div>شماره و کدملی تطابق ندارند</div>
                  </div>
                )}
                {shahCarStatus === null && (
                  <div className={s.wrongIban}>
                    <Icon type="stop" />
                    جواب درستی از سرور دریافت نشد
                  </div>
                )}
              </Col>
            </Row>
          </div>
        ) : (
          <div className={s.card}>
            <Row>
              <Col span={24}>
                <div className={s.wrongIban}>
                  <Icon type="warning" />
                  <div>{error}</div>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    />
  );
}

ShahCar.propTypes = {
  CheckShahCar: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  CheckShahCar,
};

export default connect(null, mapDispatch)(withStyles(s)(ShahCar));
