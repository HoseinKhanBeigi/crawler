import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForVerifyDataRenderUserInfo.scss';
import CPLabel from '../CP/CPLabel';
import CPInput from '../CP/CPInput';
import CPSelect from '../CP/CPSelect';
import { getCrmActivitiesAction } from '../../store/newActivities/newActivities.actions';

import { typeOfOwnerShipSchema } from './schema';

import {
  anyModalClose,
  getOpportunitiesAction,
  postConfirmByQcAction,
  postRejectByQcAction,
} from '../../store/opportunities/opportunities.actions';
import CPSimpleDatePicker from '../CP/CPSimpleDatePicker';
import partyService from '../../service/partyService';
import CPButton from '../CP/CPButton';
import opportunityService from '../../service/opportunityService';

class ModalForVerifyDataRenderBusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enStoreName: null,
      leaseCompletionDate: null,
      leaseContractNumber: null,
      licenseExpirationDate: null,
      licenseDate: null,
      subCategory: null,
      typeOfOwnerShip: null,
      subCategoryFields: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { category } = this.props.identificationWithDocs;
    partyService.getClassificationSubcategories(category).then(({ items }) => {
      const subCategoryFields = items.map(i => ({
        text: i.title,
        value: i.id,
      }));

      this.setState({ subCategoryFields });
    });
  }

  validForPutBusinessAdditionalInfo = () => {
    const {
      enStoreName,
      licenseExpirationDate,
      licenseDate,
      subCategory,
      typeOfOwnerShip,
      leaseCompletionDate,
      leaseContractNumber,
    } = this.state;

    const validForTenantType =
      licenseExpirationDate &&
      leaseContractNumber &&
      leaseCompletionDate &&
      enStoreName &&
      licenseDate &&
      typeOfOwnerShip &&
      subCategory;

    const validForOwnerType =
      licenseExpirationDate &&
      enStoreName &&
      licenseDate &&
      subCategory &&
      typeOfOwnerShip;

    return typeOfOwnerShip === 'TENANT'
      ? !!validForTenantType
      : !!validForOwnerType;
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    const {
      currentUser: { id },
    } = this.props;
    const {
      enStoreName,
      licenseExpirationDate,
      licenseDate,
      subCategory,
      typeOfOwnerShip,
      leaseCompletionDate,
      leaseContractNumber,
    } = this.state;

    const body = {
      enStoreName,
      licenseExpirationDate,
      licenseDate,
      subCategory,
      typeOfOwnerShip,
    };

    if (typeOfOwnerShip === 'TENANT') {
      body.leaseCompletionDate = leaseCompletionDate;
      body.leaseContractNumber = leaseContractNumber;
    }

    try {
      await opportunityService.addBusinessAdditionalInfo(id, body);
      this.props.getOpportunitiesAction();
      this.props.closeModal();
    } finally {
      this.setState({ loading: false });
    }
  };

  /**
   * This method renders the inputs
   * @param text: the Persian label shown in input field
   * @param name: the name of field used to change it
   * @param val: the value of input used to show
   * @param disabled
   */
  renderField = (text, name, val, disabled = false) => (
    <CPLabel label={text}>
      <CPInput
        disabled={disabled}
        value={val || ''}
        onChange={e => this.handleChange(name, e.target.value)}
        placeholder={text}
      />
    </CPLabel>
  );

  render() {
    const {
      enStoreName,
      licenseExpirationDate,
      licenseDate,
      subCategoryFields,
      typeOfOwnerShip,
      leaseCompletionDate,
      leaseContractNumber,
      loading,
    } = this.state;

    const { identificationWithDocs } = this.props;

    return (
      <div className={cs(s.root)}>
        <div className={s.docsHeader}>
          <span>مشخصات کسب و کار</span>
        </div>

        <div className={s.additionalInfo}>
          {this.renderField(
            'نام فروشگاه',
            'storeName',
            identificationWithDocs?.businessName,
            true,
          )}
          <CPLabel label="نوع پذیرنده">
            <CPSelect
              placeholder="نوع پذیرنده"
              dataSource={[{ text: 'حقیقی', value: 'PERSON' }]}
              disabled
              defaultValue="PERSON"
            />
          </CPLabel>
          {this.renderField(
            'نام فروشگاه (انگلیسی)',
            'enStoreName',
            enStoreName,
          )}
          <CPLabel label="تاریخ صدور جواز کسب">
            <CPSimpleDatePicker
              className={s.datePicker}
              defaultValue={licenseDate}
              onChange={e => this.handleChange('licenseDate', e.getTime())}
            />
          </CPLabel>
          <CPLabel label="تاریخ اعتبار جواز کسب">
            <CPSimpleDatePicker
              className={s.datePicker}
              defaultValue={licenseExpirationDate}
              onChange={e =>
                this.handleChange('licenseExpirationDate', e.getTime())
              }
            />
          </CPLabel>
          <CPLabel label="کد تکمیلی صنف">
            <CPSelect
              placeholder="کد تکمیلی صنف"
              dataSource={subCategoryFields}
              onChange={e => this.handleChange('subCategory', e)}
            />
          </CPLabel>
          <CPLabel label="نوع مالکیت فروشگاه">
            <CPSelect
              placeholder="نوع مالکیت فروشگاه"
              dataSource={typeOfOwnerShipSchema}
              onChange={e => this.handleChange('typeOfOwnerShip', e)}
            />
          </CPLabel>
          {typeOfOwnerShip === 'TENANT' && (
            <>
              {this.renderField(
                'شماره قرارداد اجاره',
                'leaseContractNumber',
                leaseContractNumber,
              )}
              <CPLabel label="تاریخ اتمام قرارداد اجاره">
                <CPSimpleDatePicker
                  className={s.datePicker}
                  defaultValue={leaseCompletionDate}
                  onChange={e =>
                    this.handleChange('leaseCompletionDate', e.getTime())
                  }
                />
              </CPLabel>
            </>
          )}

          <div className={s.buttonWrapper}>
            <CPButton
              onClick={this.handleSubmit}
              disabled={!this.validForPutBusinessAdditionalInfo()}
              type="primary"
              htmlType="button"
              className={s.button}
              loading={loading}
            >
              تایید نهایی
            </CPButton>
            <CPButton onClick={this.props.closeModal}>انصراف</CPButton>
          </div>
        </div>
      </div>
    );
  }
}

ModalForVerifyDataRenderBusinessInfo.propTypes = {
  identificationWithDocs: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getOpportunitiesAction: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  currentUser: state.opportunities.currentUser,
});

const mapDispatch = {
  anyModalClose,
  postRejectByQcAction,
  postConfirmByQcAction,
  getOpportunitiesAction,
  getCrmActivitiesAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(ModalForVerifyDataRenderBusinessInfo));
