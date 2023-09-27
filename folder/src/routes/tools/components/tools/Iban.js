import React, { useState } from 'react';
import { Col, Icon, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import CPDivider from '../../../../components/CP/CPDivider';
import CPInput from '../../../../components/CP/CPInput';
import CPButton from '../../../../components/CP/CPButton';
import CPMessage from '../../../../components/CP/CPMessage';
import { validateIBANAction } from '../../../../store/opportunities/opportunities.actions';
import CopyableField from '../../../../components/CopyableField/CopyableField';
import { checkIban } from '../../../../utils/validateField';
import ToolContainer from '../ToolContainer/ToolContainer';

function Iban(props) {
  const [ibanValidateLoading, setIbanValidateLoading] = useState(false);
  const [iban, setIban] = useState(null);
  const [ibanDetail, setIbanDetail] = useState(null);

  const validateIbanAction = () => {
    if (checkIban(iban)) {
      setIbanValidateLoading(true);
      props
        .validateIBANAction({ checkSyntaxOnly: false, iban: checkIban(iban) })
        .then(response => {
          setIbanValidateLoading(false);
          const { status } = response;
          if (status && status >= 500 && status <= 504) {
            CPMessage('خطا در استعلام از سیتاد', 'error');
          } else {
            setIbanDetail(response);
          }
        });
    } else {
      CPMessage('شماره شبا صحیح نیست.', 'warning');
    }
  };

  return (
    <ToolContainer
      title={props.title}
      showResult={ibanDetail}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>IBAN</div>
              <CPInput
                value={iban}
                onChange={e => setIban(e.target.value)}
                placeholder="شماره شبا"
              />
            </Col>
          </Row>
          <CPButton
            loading={ibanValidateLoading}
            onClick={() => validateIbanAction()}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        ibanDetail?.ibanSyntaxIsValid ? (
          <div className={s.card}>
            <Row>
              <Col span={12}>
                <div className={s.fieldTitle}>توضیح حساب</div>
                <div className={s.fieldValue}>
                  {ibanDetail?.accountDescription}
                </div>
              </Col>
              <Col span={12}>
                <CopyableField
                  className={s.fieldTitle}
                  copyText={ibanDetail?.accountNumber}
                >
                  <div className={s.fieldTitle}>شماره حساب</div>
                </CopyableField>
                <div className={s.fieldValue}>{ibanDetail?.accountNumber}</div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <div className={s.fieldTitle}>نام بانک</div>
                <img
                  style={{
                    height: '22px',
                    paddingLeft: '9px',
                    marginBottom: '4px',
                  }}
                  src={ibanDetail?.accountBankLogoUrl}
                  alt="bankPic"
                />
                <span className={s.fieldValue}>
                  {ibanDetail?.accountBankName}
                </span>
              </Col>
              <Col span={12}>
                <div className={s.fieldTitle}>وضعیت حساب</div>
                <div className={s.fieldValue}>{ibanDetail?.accountStatus}</div>
              </Col>
            </Row>
            {ibanDetail?.accountOwners?.map(person => (
              <div key={person.nationalCode}>
                <CPDivider className={s.divider} />
                <Row>
                  <Col span={12}>
                    <div className={s.fieldTitle}>نام</div>
                    <div className={s.fieldValue}>{person.firstName}</div>
                  </Col>
                  <Col span={12}>
                    <div className={s.fieldTitle}>نام خانوادگی</div>
                    <div className={s.fieldValue}>{person.lastName}</div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className={s.fieldTitle}>نوع مشتری</div>
                    <div className={s.fieldValue}>{person.customerType}</div>
                  </Col>
                  <Col span={12}>
                    <div className={s.fieldTitle}>کد ملی صاحب حساب</div>
                    <div className={s.fieldValue}>{person.nationalCode}</div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.card}>
            <Row>
              <Col span={24}>
                <div className={s.wrongIban}>
                  <Icon type="warning" />
                  <div>شماره شبا معتبر نمی باشد</div>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    />
  );
}

Iban.propTypes = {
  validateIBANAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapDispatch = {
  validateIBANAction,
};

export default connect(null, mapDispatch)(withStyles(s)(Iban));
