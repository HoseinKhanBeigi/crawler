import React, { useState, useEffect } from 'react';
import { Col, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import CopyableField from '../../../../components/CopyableField/CopyableField';
import { getAddressStringByPostCodeAction } from '../../../../store/opportunities/opportunities.actions';
import CPMessage from '../../../../components/CP/CPMessage';
import { checkPostalCode } from '../../../../utils/validateField';
import ToolContainer from '../ToolContainer/ToolContainer';
import {persianNumToEnglishNum} from "../../../../utils";

function PostalCode(props) {
  const [postCodeValidateLoading, setPostCodeValidateLoading] = useState(false);
  const [postCode, setPostCode] = useState(null);
  const [postCodeDetail, setPostCodeDetail] = useState(null);
  const [errorCode, setErrorCode] = useState(null);

  const validatePostalCode = () => {
    if (checkPostalCode(persianNumToEnglishNum(postCode))) {
      setPostCodeValidateLoading(true);
      props.getAddressStringByPostCodeAction(postCode).then(response => {
        setPostCodeValidateLoading(false);
        const { status } = response;
        if (status && status >= 500 && status <= 504) {
          CPMessage('خطا در استعلام', 'error');
        } else {
          setPostCodeDetail(response?.Value);
          setErrorCode(response?.ErrorCode);
        }
      });
    } else {
      if (isNaN(persianNumToEnglishNum(postCode))) {
        CPMessage('کد پستی باید فقط شامل عدد باشد', 'warning');
      }
      CPMessage('طول کد پستی صحیح نیست.', 'warning');
    }
  };

  useEffect(() => {
    if(postCode) {
      setPostCode(persianNumToEnglishNum(postCode))
    }
  }, [postCode])

  return (
    <ToolContainer
      title={props.title}
      showResult={postCodeDetail}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>کدپستی</div>
              <CPInput
                value={postCode}
                onChange={e => setPostCode(e.target.value)}
                placeholder="کدپستی را وارد نمایید"
                maxLength={10}
              />
            </Col>
          </Row>
          <CPButton
            loading={postCodeValidateLoading}
            onClick={() => validatePostalCode()}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        !errorCode ? (
          <div className={s.card}>
            <Row>
              <Col span={24}>
                <CopyableField
                  className={s.fieldTitle}
                  copyText={postCodeDetail}
                >
                  آدرس
                </CopyableField>
                <div className={s.fieldValue}>{postCodeDetail}</div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className={s.card}>
            <Row>
              <Col span={24}>
                <div className={s.wrongIban}>
                  <Icon type="warning" />
                  <div>کدپستی معتبر نمی باشد</div>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    />
  );
}

PostalCode.propTypes = {
  getAddressStringByPostCodeAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  getAddressStringByPostCodeAction,
};

export default connect(null, mapDispatch)(withStyles(s)(PostalCode));
