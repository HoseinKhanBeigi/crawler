import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Tooltip, Icon } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  validateIBANAction,
  postModifyBankAccountNumberAction,
} from '../../../../../../../store/opportunities/opportunities.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../BankInfoFields.scss';
import CPMessage from '../../../../../../CP/CPMessage/CPMessage';
import {
  fullName,
  replaceArabicCharactersWithPersian,
} from '../../../../../../../utils';
import CPAlert from '../../../../../../CP/CPAlert/CPAlert';
import CPPopConfirm from '../../../../../../CP/CPPopConfirm/CPPopConfirm';
import CPButton from '../../../../../../CP/CPButton/CPButton';

class BankAccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ibanAccountDetail: null,
      ibanValidateLoading: false,
      replaceBankAccountNumberLoading: false,
    };
  }

  setIbanAccountDetailState = data => {
    this.setState({ ibanAccountDetail: data });
  };

  replaceBankAccountNumber = async () => {
    this.setState({ replaceBankAccountNumberLoading: true });
    const { bankAccountId, opportunityId } = this.props;
    const { accountNumber } = this.state.ibanAccountDetail;
    const result = await this.props.postModifyBankAccountNumberAction(
      opportunityId,
      bankAccountId,
    );
    this.setState({ replaceBankAccountNumberLoading: false });
    if (!result.err && result) {
      CPMessage('جایگذاری شماره حساب با موفقیت انجام شد.', 'success');
      this.props.onChangeAccountNumber(accountNumber, bankAccountId);
    } else CPMessage('خطا در انجام جایگذاری شماره حساب!', 'error');
  };

  validateIbanAction = iban => {
    if (iban) {
      this.setState({ ibanValidateLoading: true });
      this.props
        .validateIBANAction({ checkSyntaxOnly: false, iban })
        .then(response => {
          this.setState({ ibanValidateLoading: false });
          if (
            response.status &&
            (response.status === 500 ||
              response.status === 504 ||
              response.status === 503)
          ) {
            CPMessage('خطا در استعلام از سیتاد', 'error');
          } else {
            this.setIbanAccountDetailState(response);
          }
        });
    } else {
      CPMessage('شماره شبا برای استعلام وجود ندارد.', 'warning');
    }
  };

  isValidName = () => {
    const { accountOwner } = this.props;
    const { ibanAccountDetail } = this.state;
    return (
      replaceArabicCharactersWithPersian(
        fullName(ibanAccountDetail?.accountOwners[0]),
      ) === replaceArabicCharactersWithPersian(accountOwner)
    );
  };

  isValidAccountNumber = () => {
    const { accountNumber } = this.props;
    const { ibanAccountDetail } = this.state;
    return (
      accountNumber &&
      ibanAccountDetail.accountNumber &&
      ibanAccountDetail.accountNumber === accountNumber
    );
  };

  renderIsSame = (isSame = true) => (
    <span style={{ color: isSame ? 'green' : 'red' }}>
      {' '}
      {isSame ? 'مطابق است' : 'مطابق نیست'}
      <Icon
        type={isSame ? 'check-circle' : 'close-circle'}
        style={{
          verticalAlign: 'middle',
          paddingRight: '5px',
        }}
      />
    </span>
  );

  renderBankAccountDetail = accountDetail => {
    const {
      ibanSyntaxIsValid,
      accountNumber,
      accountStatus,
      accountDescription,
      accountOwners,
      accountBankName,
    } = accountDetail;
    return (
      <div>
        <ul>
          <li>
            {ibanSyntaxIsValid ? 'شماره شبا معتبر است' : 'شماره شبا معتبر نیست'}
          </li>
          <li>
            شماره حساب:{' '}
            <strong style={{ direction: 'ltr', display: 'inline-block' }}>
              {accountNumber || 'فاقد اطلاعات'}
            </strong>
            {this.props.accountNumber && (
              <Tooltip
                title={`شماره حساب وارد شده مطابقت ${
                  this.isValidAccountNumber() ? 'دارد' : 'ندارد'
                }`}
              >
                {' '}
                <Icon
                  type={this.isValidAccountNumber() ? 'check' : 'stop'}
                  style={{
                    color: this.isValidAccountNumber() ? 'green' : 'red',
                  }}
                />{' '}
              </Tooltip>
            )}
            {this.props.accountNumber && !this.isValidAccountNumber() ? (
              <span>
                شماره حساب وارد شده:{' '}
                <strong style={{ direction: 'ltr', display: 'inline-block' }}>
                  {this.props.accountNumber}
                </strong>
                {this.renderIsSame(false)}
              </span>
            ) : (
              this.renderIsSame()
            )}
          </li>
          <li>
            <b>نام صاحب حساب:</b>
            {accountOwners.length ? (
              <>
                {accountOwners.map(owner => (
                  <ul>
                    <li>
                      {owner.firstName} {owner.lastName}{' '}
                      {this.isValidName()
                        ? this.renderIsSame()
                        : this.renderIsSame(false)}
                    </li>
                    <li>نوع مشتری: {owner.customerType}</li>
                    <li>
                      <span style={{ direction: 'ltr' }}>
                        {' '}
                        کد ملی صاحب حساب : {owner.nationalCode}
                      </span>
                    </li>
                  </ul>
                ))}
              </>
            ) : null}
          </li>
          <li>نام بانک: {accountBankName}</li>
          {accountStatus && <li>وضعیت حساب: {accountStatus}</li>}
          {accountDescription && <li>جزئیات: {accountDescription}</li>}
        </ul>
      </div>
    );
  };

  render() {
    const { iban } = this.props;
    const alertMessageTitle =
      this.state.ibanAccountDetail?.accountOwners?.length > 1 ? (
        <span style={{ color: 'red' }}>اطلاعات حساب مشترک</span>
      ) : (
        'اطلاعات حساب'
      );
    return (
      <Col span={24}>
        <span className={s.label}>اطلاعات بانک</span>
        <Button
          onClick={() => this.validateIbanAction(iban)}
          loading={this.state.ibanValidateLoading}
        >
          استعلام مشخصات بانکی
        </Button>
        {this.state.ibanAccountDetail && (
          <div style={{ marginTop: 10 }}>
            <CPAlert
              message={alertMessageTitle}
              description={this.renderBankAccountDetail(
                this.state.ibanAccountDetail,
              )}
              type={
                this.state.ibanAccountDetail?.ibanSyntaxIsValid
                  ? 'info'
                  : 'error'
              }
              showIcon
            />
            <div>
              <CPPopConfirm
                okText="بلی"
                title="مایل به جایگذاری کردن شماره حساب استعلام شده با شماره حساب فعلی هستید؟"
                onConfirm={() => this.replaceBankAccountNumber()}
                placement="topRight"
              >
                <CPButton
                  loading={this.state.replaceBankAccountNumberLoading}
                  className="btn primary-btn margin-t-10"
                  type="primary"
                >
                  جایگذاری شماره حساب
                </CPButton>
              </CPPopConfirm>
            </div>
          </div>
        )}
      </Col>
    );
  }
}

BankAccountDetail.propTypes = {
  iban: PropTypes.string.isRequired,
  validateIBANAction: PropTypes.func.isRequired,
  postModifyBankAccountNumberAction: PropTypes.func.isRequired,
  accountNumber: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  accountOwner: PropTypes.string.isRequired,
  bankAccountId: PropTypes.string,
  opportunityId: PropTypes.string,
  onChangeAccountNumber: PropTypes.func,
};

BankAccountDetail.defaultProps = {
  accountNumber: null,
  bankAccountId: null,
  opportunityId: null,
  onChangeAccountNumber: () => {},
};

const mapState = state => ({
  opportunityId: state.opportunities?.currentUser?.id,
});
const mapDispatch = {
  validateIBANAction,
  postModifyBankAccountNumberAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(BankAccountDetail));
