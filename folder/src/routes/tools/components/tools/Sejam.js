import React, { useState, useEffect } from 'react';
import { Col, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import { checkSEJAMAction } from '../../../../store/tools/tools.actions';
import translateSejamStatus from '../../constants';
import CopyableField from '../../../../components/CopyableField/CopyableField';
import { checkNationalCode } from '../../../../utils/validateField';
import CPMessage from '../../../../components/CP/CPMessage';
import ToolContainer from '../ToolContainer/ToolContainer';
import {persianNumToEnglishNum} from "../../../../utils";

function Sejam(props) {
  const [sejamStatusLoading, setSejamStatusLoading] = useState(false);
  const [nationalCode, setNationalCode] = useState(null);
  const [sejamStatus, setSejamStatus] = useState(null);
  const [error, setError] = useState(null);

  const checkSJM = async () => {
    if (checkNationalCode(persianNumToEnglishNum(nationalCode))) {
      setSejamStatusLoading(true);
      const response = await props.checkSEJAMAction({ nationalCode });
      if (response && !response.err) {
        const status = translateSejamStatus(response?.status);
        if (status) setSejamStatus(status);
        if (!status) setError('وضعیت نامشخص');
      } else if (!response || (response && response.err)) {
        if (response.status === 500) {
          setError('خطای سرور اتفاق افتاده!');
        } else if (response.status === 429) {
          setError('تعداد استعلام بیش از حد مجاز، لطفا دقایقی دیگر تلاش کنید');
        }
      }
      setSejamStatusLoading(false);
    } else {
      if (isNaN(persianNumToEnglishNum(nationalCode))) {
        CPMessage('کد ملی باید فقط شامل عدد باشد', 'warning');
      }
      CPMessage('کد ملی صحیح نیست', 'warning');
    }
  };

  useEffect(() => {
    if(nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }
  }, [nationalCode])

  return (
    <ToolContainer
      title={props.title}
      showResult={sejamStatus}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>کدملی</div>
              <CPInput
                value={nationalCode}
                inputMode='numeric'
                min={0}
                maxLength={10}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="کدملی را وارد نمایید"
              />
            </Col>
          </Row>
          <CPButton
            loading={sejamStatusLoading}
            onClick={() => checkSJM()}
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
                <CopyableField className={s.fieldTitle} copyText={sejamStatus}>
                  <div className={s.fieldTitle}>وضعیت</div>
                </CopyableField>
                <div className={s.fieldValue}>{sejamStatus}</div>
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

Sejam.propTypes = {
  checkSEJAMAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  checkSEJAMAction,
};

export default connect(null, mapDispatch)(withStyles(s)(Sejam));
