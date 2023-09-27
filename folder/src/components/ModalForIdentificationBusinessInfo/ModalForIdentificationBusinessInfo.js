import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cs from 'classnames';
import s from './ModalForIdentificationBusinessInfo.scss';
import CPModal from '../CP/CPModal';
import CPInput from '../CP/CPInput';
import CPSingleDatePicker from '../CP/CPSingleDatePicker';
import CPSelect from '../CP/CPSelect';
import CPButton from '../CP/CPButton';
import { business, terminal } from './schema';
import CPDivider from '../CP/CPDivider';
import CPMessage from '../CP/CPMessage';
import {
  anyModalClose,
  postConfirmBusinessInfoAction,
} from '../../store/opportunities/opportunities.actions';

const InputGroup = Input.Group;

class ModalForIdentificationBusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // contact number is divided into two parts
      contractNumberPartOne: '',
      contractNumberPartTwo: '',
      activationDate: '',
      contractDate: '',
      businessName: '',
      rentContractNumber: '',
      additionalCode: '',
      email: '',
      terminalNumber: '',
      businessType: business[0].value,
      terminalType: terminal[0].value,
    };
  }

  setDate = (name, timestamp) => {
    this.setState({
      [name]: timestamp,
    });
  };

  closeModal = () => {
    this.props.anyModalClose();
  };

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  submitForm = async () => {
    const {
      contractNumberPartOne,
      contractNumberPartTwo,
      activationDate,
      contractDate,
      businessName,
      rentContractNumber,
      businessType,
      additionalCode,
      email,
      terminalNumber,
      terminalType,
    } = this.state;

    const body = {
      contractNumber: `${contractNumberPartOne}-${contractNumberPartTwo}`,
      activationDate,
      contractDate,
      businessName,
      rentContractNumber,
      businessType,
      additionalCode,
      email,
      terminalNumber,
      terminalType,
    };

    const result = await this.props.postConfirmBusinessInfoAction(body);
    if (result) {
      CPMessage('با موفقیت ثبت شد.', 'success');
    } else {
      CPMessage('لطفا مجددا تلاش نمایید.', 'error');
    }
  };

  validationForm = () => {
    const data = this.state;
    const {
      contractNumberPartOne,
      contractNumberPartTwo,
      activationDate,
      contractDate,
      businessName,
      rentContractNumber,
      additionalCode,
      email,
      terminalNumber,
    } = data;
    const checkEmpty = [
      contractNumberPartOne,
      contractNumberPartTwo,
      activationDate,
      contractDate,
      businessName,
      rentContractNumber,
      additionalCode,
      email,
      terminalNumber,
    ];
    return checkEmpty.every(item => item !== '');
  };

  render() {
    const { className, visible } = this.props;
    const {
      contractNumberPartOne,
      contractNumberPartTwo,
      activationDate,
      contractDate,
      businessName,
      rentContractNumber,
      businessType,
      additionalCode,
      email,
      terminalNumber,
      terminalType,
    } = this.state;
    return (
      <div className={cs('ModalForIdentificationBusinessInfo', className)}>
        <CPModal
          title="تکمیل اطلاعات کسب و کار"
          visible={visible}
          footer={null}
          onCancel={this.closeModal}
        >
          <div className="row">
            <div className="col-md-6">
              <span className={s.labels}>نام کسب و کار:</span>
              <CPInput
                value={businessName}
                onChange={e => this.handleChange('businessName', e)}
              />
            </div>
            <div className="col-md-6">
              <span className={s.labels}>شماره قرارداد:</span>
              <InputGroup compact>
                <Input
                  value={contractNumberPartOne}
                  style={{ width: '70%' }}
                  onChange={e => this.handleChange('contractNumberPartOne', e)}
                />
                <Input
                  value={contractNumberPartTwo}
                  style={{ width: '30%' }}
                  onChange={e => this.handleChange('contractNumberPartTwo', e)}
                />
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={s.labels}>تاریخ قرارداد:</span>
              <CPSingleDatePicker
                date={Date.now()}
                displayFormat="jYYYY/jM/jD"
                value={contractDate}
                onChange={e => {
                  this.setDate('contractDate', e);
                }}
              />
            </div>
            <div className="col-md-6">
              <span className={s.labels}>
                تاریخ فعال سازی سرویس بر اساس قرارداد:
              </span>
              <CPSingleDatePicker
                date={Date.now()}
                displayFormat="jYYYY/jM/jD"
                value={activationDate}
                onChange={e => {
                  this.setDate('activationDate', e);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={s.labels}>شماره قرارداد اجاره:</span>
              <CPInput
                value={rentContractNumber}
                onChange={e => this.handleChange('rentContractNumber', e)}
              />
            </div>
            <div className="col-md-6">
              <span className={s.labels}>نوع فعالیت فروشگاه:</span>
              <CPSelect
                value={businessType}
                defaultValue={business[0].value}
                dataSource={business}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={s.labels}>کد تکمیلی:</span>
              <CPInput
                value={additionalCode}
                onChange={e => this.handleChange('additionalCode', e)}
              />
            </div>
            <div className="col-md-6">
              <span className={s.labels}>پست الکترونیکی:</span>
              <CPInput
                value={email}
                onChange={e => this.handleChange('email', e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <span className={s.labels}>نوع پایانه:</span>
              <CPSelect
                defaultValue={terminal[0].value}
                value={terminalType}
                dataSource={terminal}
                disabled
              />
            </div>
            <div className="col-md-6">
              <span className={s.labels}>شماره پایانه:</span>
              <CPInput
                value={terminalNumber}
                onChange={e => this.handleChange('terminalNumber', e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <CPDivider />
              <CPButton
                onClick={this.submitForm}
                disabled={!this.validationForm()}
              >
                ثبت
              </CPButton>
            </div>
          </div>
        </CPModal>
      </div>
    );
  }
}

ModalForIdentificationBusinessInfo.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  anyModalClose: PropTypes.func.isRequired,
  postConfirmBusinessInfoAction: PropTypes.func.isRequired,
};

ModalForIdentificationBusinessInfo.defaultProps = {
  className: null,
};

const mapStateToProps = state => ({
  visible:
    state.opportunities.anyModalVisible ===
    'modalForIdentificationBusinessInfo',
});

const mapDispatch = {
  anyModalClose,
  postConfirmBusinessInfoAction,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(ModalForIdentificationBusinessInfo));
export const ModalForIdentificationBusinessInfoTest = ModalForIdentificationBusinessInfo;
