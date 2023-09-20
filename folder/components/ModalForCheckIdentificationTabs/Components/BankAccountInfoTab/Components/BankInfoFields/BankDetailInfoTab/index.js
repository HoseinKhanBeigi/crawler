import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPInput from '../../../../../../CP/CPInput/CPInput';
import { validateIBANAction } from '../../../../../../../store/opportunities/opportunities.actions';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../BankInfoFields.scss';
import BankAccountDetail from './BankAccountDetail';
import CPLabel from '../../../../../../CP/CPLabel/CPLabel';
import RenderFields from './RenderFields';

class BankDetailInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountDetailIban: [],
    };
  }

  componentDidMount() {
    const { bankAccounts } = this.props;
    const ibanList = bankAccounts;
    // eslint-disable-next-line array-callback-return
    ibanList.map(item => {
      const { iban } = item;
      this.props
        .validateIBANAction({
          checkSyntaxOnly: true,
          iban,
        })
        .then(response => {
          const accountDetailIbanCandidate =
            this.state.accountDetailIban.length > 0
              ? [...this.state.accountDetailIban]
              : [];
          const candidateItem = { ...item };
          candidateItem.ibanAccountDetail = response;
          accountDetailIbanCandidate.push(candidateItem);
          this.setState({ accountDetailIban: accountDetailIbanCandidate });
        });
    });
  }

  renderField = (
    text,
    name,
    val = '',
    col = 8,
    disabled = true,
    readOnly = false,
    withEdit = false,
  ) => (
    <Col className={s.input} span={col}>
      <CPLabel label={text}>
        <CPInput
          name={name}
          value={val}
          disabled={disabled}
          readOnly={readOnly}
          withEdit={withEdit}
        />
      </CPLabel>
    </Col>
  );

  renderShebaField = (value, bankAccounts) => {
    const bankAccountId = bankAccounts.length > 0 ? bankAccounts[0].id : null;
    return (
      <>
        {this.renderField(
          'شماره شبا',
          'iban',
          value || 'شماره شبا وجود ندارد',
          8,
          false,
          true,
        )}
        <BankAccountDetail
          iban={value}
          accountOwner={this.props.accountOwner}
          bankAccountId={bankAccountId}
        />
      </>
    );
  };

  renderAllFields = bankAccount =>
    bankAccount?.map(item => (
      <RenderFields
        item={item}
        accountDetailIban={this.state.accountDetailIban}
        accountOwner={this.props.accountOwner}
        opportunityId={this.props.opportunityId}
        levantId={this.props.levantId}
      />
    ));

  render() {
    const { shebaNo, defaultBankInfo, bankAccounts } = this.props;
    return (
      <>
        {this.state.accountDetailIban.length > 0 &&
          defaultBankInfo &&
          defaultBankInfo === 'bankAccounts' &&
          this.renderAllFields(this.state.accountDetailIban, shebaNo)}
        {defaultBankInfo &&
          defaultBankInfo === 'shebaNo' &&
          this.renderShebaField(shebaNo, bankAccounts)}
      </>
    );
  }
}

BankDetailInfoTab.defaultProps = {
  shebaNo: '',
  defaultBankInfo: '',
  opportunityId: '',
  levantId: '',
};
BankDetailInfoTab.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
  validateIBANAction: PropTypes.func.isRequired,
  accountOwner: PropTypes.string.isRequired,
  shebaNo: PropTypes.string,
  defaultBankInfo: PropTypes.string,
  opportunityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  levantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapState = state => ({
  levantId: state.opportunities.identificationWithDocsData.levantId,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
});

const mapDispatch = {
  validateIBANAction,
};
export default connect(mapState, mapDispatch)(withStyles(s)(BankDetailInfoTab));
