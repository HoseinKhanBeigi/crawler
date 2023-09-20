import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPLabel from '../../../../../../CP/CPLabel/CPLabel';
import CPInput from '../../../../../../CP/CPInput/CPInput';
import CPSelect from '../../../../../../CP/CPSelect/CPSelect';
import CPButton from '../../../../../../CP/CPButton/CPButton';
import CPAlert from '../../../../../../CP/CPAlert/CPAlert';
import opportunityService from '../../../../../../../service/opportunityService';
import CPTab from '../../../../../../CP/CPTab';
import {
  getOpportunitiesAction,
  getAddressStringByPostCodeAction,
  getIdentificationWithDocsAction,
} from '../../../../../../../store/opportunities/opportunities.actions';
import { fullName } from '../../../../../../../utils';
import CheckIdentificationTabsDocuments from '../../../../../../CheckIdentificationTabsDocuments/CheckIdentificationTabsDocuments';
import BankDetailInfoTab from '../../../../BankAccountInfoTab/Components/BankInfoFields/BankDetailInfoTab';
// import BankInfoFields from '../../../../BankAccountInfoTab/Components/BankInfoFields';
import { getProvinceWithCities } from '../../../../../../../utils/getProvinceWithCities';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../SejamInfoFields.scss';

const SejamDetailInfoTab = props => {
  const {
    firstName,
    lastName,
    nationalCode,
    email,
    fathername,
    certificateNumber,
    certificateSerialNumber,
    certificateSeriesChar,
    certificateSeriesDigits,
    birthLocation,
    issueLocation,
    nationality,
  } = props.identificationWithDocs;

  const [cities, setCities] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [citiesEditMode, setCitiesEditMode] = useState(false);
  const [infoCities, setInfoCities] = useState(null);
  const [messagePostCode, setMessage] = useState(null);
  const reload = () => {
    props.getOpportunitiesAction();
    props.getIdentificationWithDocsAction(props.opportunityId);
  };

  useEffect(() => {
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities.map(c => ({
        value: c.id,
        text: `${data.provinces.find(p => p.id === c.province_id)?.name} - ${
          c.text
        }`,
      }));
      setInfoCities(convertedCities);
    });
  }, []);
  useEffect(() => {
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities?.map(c => ({
        value: c.id,
        text: c.name,
        province_id: c.province_id,
      }));
      const convertedProvinces = data?.provinces?.map(p => ({
        value: p.id,
        text: p.name,
      }));
      setCities(convertedCities);
      setProvinces(convertedProvinces);
    });
  }, []);

  const onEditDispatch = async (value, name, key, type) => {
    let body = '';
    if (key === 'personContacts') {
      body = {
        [key]: [
          {
            [name]: value,
            type,
          },
        ],
      };
    } else if (key !== 'personContacts') {
      body = {
        [key]: {
          [name]: value,
          type,
        },
      };
    } else if (!body.type) {
      delete body.type;
    }

    await opportunityService.editIdentificationInfo(
      props.levantId,
      props.opportunityId,
      body,
    );
    reload();
    setCitiesEditMode(true);
  };

  const checkPostCode = async postCode => {
    props.getIdentificationWithDocsAction(props.opportunityId);
    const response = await props.getAddressStringByPostCodeAction(postCode);
    setMessage(response?.ErrorMessage || response?.Value);
  };

  const handleOnProvinceSelected = v => {
    const list = [...cities];
    const candidate = list?.filter(c => c.province_id === v);
    setCities(candidate);
  };

  const renderField = (
    text,
    name,
    val,
    span,
    disabled,
    readOnly,
    withEdit,
    onEdit,
    key,
    type,
  ) => (
    <Col className={s.input} span={span}>
      <CPLabel label={text} />

      <CPInput
        name={name}
        value={val}
        disabled={disabled}
        readOnly={readOnly}
        withEdit={withEdit}
        onEditAction={e => onEdit(e, name, key, type)}
      />
    </Col>
  );

  const defaultBankInfo = props.stateData.stages.find(
    value => value === 'shebaNo' || value === 'bankAccounts',
  );
  const { shebaNo } = props.identificationWithDocs;
  const tabs = [
    {
      tabName: 'مشخصات فردی',
      children: (
        <>
          <div>
            <Col span={24}>
              {renderField(
                'نام',
                'firstName',
                firstName,
                12,
                true,
                false,
                false,
                onEditDispatch,
                'personalInfo',
              )}
              {renderField(
                'نام خانوادگی',
                'lastName',
                lastName,
                12,
                true,
                false,
                false,
                onEditDispatch,
                'personalInfo',
              )}
            </Col>
            <Col span={24}>
              {renderField(
                'کد ملی',
                'nationalCode',
                nationalCode,
                12,
                true,
                false,
                false,
                onEditDispatch,
                'personalInfo',
              )}
              {renderField(
                'نام پدر',
                'fathername',
                fathername,
                12,
                true,
                false,
                true,
                onEditDispatch,
                'personalInfo',
              )}
            </Col>
            <Col span={24}>
              {renderField(
                'شماره شناسنامه',
                'shNumber',
                certificateNumber,
                12,
                true,
                false,
                true,
                onEditDispatch,
                'personalInfo',
              )}
              {renderField(
                'سریال شناسنامه',
                'serial',
                certificateSerialNumber,
                12,
                true,
                false,
                true,
                onEditDispatch,
                'personalInfo',
              )}
            </Col>
            <Col span={24}>
              {renderField(
                'سری حرفی شناسنامه',
                'seriShChar',
                certificateSeriesChar,
                12,
                true,
                false,
                true,
                onEditDispatch,
                'personalInfo',
              )}
              {renderField(
                'سری عددی شناسنامه',
                'seriSh',
                certificateSeriesDigits,
                12,
                true,
                false,
                true,
                onEditDispatch,
                'personalInfo',
              )}
            </Col>

            {infoCities && (
              <Col span={24}>
                <Col span={12} className={s.address_item_mBottom}>
                  <CPLabel label="محل تولد" />
                  <CPSelect
                    dataSource={infoCities}
                    showSearch
                    name="placeOfBirth"
                    defaultValue={Number(birthLocation)}
                    disabled
                    onEdit={e =>
                      onEditDispatch(e, 'placeOfBirth', 'personalInfo')
                    }
                    withEdit
                  />
                </Col>
                <Col span={12} className={s.address_item_mBottom}>
                  <CPLabel label="محل صدورشناسنامه" />
                  <CPSelect
                    dataSource={infoCities}
                    showSearch
                    name="placeOfIssue"
                    defaultValue={Number(issueLocation)}
                    disabled
                    onEdit={e =>
                      onEditDispatch(e, 'placeOfBirth', 'personalInfo')
                    }
                    withEdit
                  />
                </Col>
              </Col>
            )}
            <Col span={24}>
              <Col span={12} className={s.address_item_mBottom}>
                <CPLabel label="ملیت" />
                <CPSelect
                  dataSource={[
                    {
                      text: 'ایرانی',
                      value: 'ایرانی',
                    },
                    {
                      text: 'اتباع خارجی',
                      value: 'اتباع خارجی',
                    },
                  ]}
                  showSearch
                  name="nationality"
                  defaultValue={Number(nationality)}
                  disabled
                  onEdit={e =>
                    onEditDispatch(e, 'nationality', 'additionalInfo')
                  }
                  withEdit
                />
              </Col>
            </Col>
          </div>
        </>
      ),
    },
    {
      tabName: 'نشانی محل سکونت',
      children: (
        <>
          <Col span={24}>
            {renderField(
              'ایمیل',
              'emailAddress',
              email,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'LIVING',
            )}
          </Col>

          {cities && provinces && (
            <Col span={24}>
              <Col span={12} className={s.address_item_mBottom}>
                <CPLabel label="استان" />
                <CPSelect
                  dataSource={provinces}
                  showSearch
                  name="state"
                  defaultValue={Number(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'LIVING',
                    ).state,
                  )}
                  onChange={handleOnProvinceSelected}
                  disabled
                  onEdit={e =>
                    onEditDispatch(e, 'state', 'personContacts', 'LIVING')
                  }
                  withEdit
                />
              </Col>
              <Col span={12} className={s.address_item_mBottom}>
                <CPLabel label="شهر" />
                <CPSelect
                  dataSource={cities}
                  showSearch
                  name="city"
                  defaultValue={Number(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'LIVING',
                    ).city,
                  )}
                  disabled
                  onEdit={e =>
                    onEditDispatch(e, 'city', 'personContacts', 'LIVING')
                  }
                  withEdit
                  editMode={citiesEditMode}
                />
              </Col>
            </Col>
          )}

          <Col span={24}>
            {renderField(
              'نشانی منزل',
              'street',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'LIVING',
              ).street,
              24,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'LIVING',
            )}
          </Col>
          <Col span={24}>
            {renderField(
              'شماره تلفن',
              'tel',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'LIVING',
              ).tel,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'LIVING',
            )}
            {renderField(
              'پیش شماره',
              'telPrefix',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'LIVING',
              ).telPrefix,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'LIVING',
            )}
          </Col>

          <Col span={24}>
            {renderField(
              'کد پستی',
              'postalCode',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'LIVING',
              ).postalCode,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'LIVING',
            )}
            <Col span={12}>
              <CPButton
                type="ghost"
                size="small"
                onClick={() => {
                  checkPostCode(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'LIVING',
                    ).postalCode,
                  );
                }}
                className={s.postCodeCheck}
              >
                بررسی کد پستی
              </CPButton>
            </Col>
          </Col>
          <br />
          {messagePostCode && (
            <Col span={24}>
              {' '}
              <CPAlert type="warning" message={messagePostCode} />
            </Col>
          )}
        </>
      ),
    },
    {
      tabName: 'مشخصات شغلی',
      children: (
        <>
          <Col span={24}>
            {renderField(
              'ایمیل',
              'emailAddress',
              props.identificationWithDocs.jobInfo.email,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}

            {renderField(
              'عنوان شغلی',
              'jobDescription',
              props.identificationWithDocs.jobInfo.jobDescription,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}
          </Col>
          {cities && provinces && (
            <Col span={24}>
              <Col span={12} className={s.address_item_mBottom}>
                <CPLabel label="استان" />
                <CPSelect
                  dataSource={provinces}
                  showSearch
                  name="state"
                  defaultValue={Number(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'WORK',
                    ).state,
                  )}
                  onChange={handleOnProvinceSelected}
                  disabled
                  onEdit={e =>
                    onEditDispatch(e, 'state', 'personContacts', 'WORK')
                  }
                  withEdit
                />
              </Col>
              <Col span={12} className={s.address_item_mBottom}>
                <CPLabel label="شهر" />
                <CPSelect
                  dataSource={cities}
                  showSearch
                  name="city"
                  defaultValue={Number(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'WORK',
                    ).city,
                  )}
                  disabled
                  onEdit={e =>
                    onEditDispatch(e, 'city', 'personContacts', 'WORK')
                  }
                  withEdit
                  editMode={citiesEditMode}
                />
              </Col>
            </Col>
          )}
          <Col span={24}>
            {renderField(
              'نشانی محل کار',
              'street',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'WORK',
              ).street,
              24,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}
          </Col>
          <Col span={24}>
            {renderField(
              'کد پستی',
              'postalCode',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'WORK',
              ).postalCode,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}
            <Col span={12}>
              <CPButton
                type="ghost"
                size="small"
                onClick={() => {
                  checkPostCode(
                    props.identificationWithDocs.personContacts.find(
                      item => item.type === 'WORK',
                    ).postalCode,
                  );
                }}
                className={s.postCodeCheck}
              >
                بررسی کد پستی
              </CPButton>
            </Col>
          </Col>
          <Col span={24}>
            {renderField(
              'شماره تلفن',
              'tel',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'WORK',
              ).tel,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}
            {renderField(
              'پیش شماره',
              'telPrefix',
              props.identificationWithDocs.personContacts.find(
                item => item.type === 'WORK',
              ).telPrefix,
              12,
              true,
              false,
              true,
              onEditDispatch,
              'personContacts',
              'WORK',
            )}
          </Col>
          <br />
          {messagePostCode && (
            <Col span={24}>
              {' '}
              <CPAlert type="warning" message={messagePostCode} />
            </Col>
          )}
        </>
      ),
    },
    {
      tabName: 'مدارک شخصی',
      children: (
        <>
          <CheckIdentificationTabsDocuments
            documentToken={props.documents}
            stateData={props.stateData}
            handleChange={props.handleChange}
          />
        </>
      ),
    },
    !defaultBankInfo &&
      props.identificationWithDocs.bankAccounts && {
        tabName: 'مشخصات بانکی',
        children: (
          <>
            <BankDetailInfoTab
              bankAccounts={props.identificationWithDocs.bankAccounts}
              shebaNo={shebaNo}
              defaultBankInfo={
                !props.stateData.stages.find(
                  value => value === 'bankAccounts',
                ) && props.identificationWithDocs.bankAccounts
                  ? 'bankAccounts'
                  : defaultBankInfo
              }
              accountOwner={fullName(props.identificationWithDocs)}
            />
          </>
        ),
      },
  ]?.map((item, index) => ({
    key: index + 1,
    tab: <span> {item.tabName}</span>,
    children: <>{item.children}</>,
  }));

  return (
    <Row key="iban" type="flex" gutter={15} className={s.bankInfoRow}>
      <CPTab type="card" defaultKey="1" position="right" tabPane={tabs} />
    </Row>
  );
};

SejamDetailInfoTab.propTypes = {
  identificationWithDocs: PropTypes.object.isRequired,
  levantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  opportunityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getOpportunitiesAction: PropTypes.func.isRequired,
  getAddressStringByPostCodeAction: PropTypes.func.isRequired,
  getIdentificationWithDocsAction: PropTypes.func.isRequired,
  documents: PropTypes.array,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

SejamDetailInfoTab.defaultProps = {
  levantId: '',
  opportunityId: '',
  documents: [],
};

const mapDispatch = {
  getAddressStringByPostCodeAction,
  getOpportunitiesAction,
  getIdentificationWithDocsAction,
};
const mapState = state => ({
  levantId: state.opportunities.identificationWithDocsData.levantId,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
  documents: state.opportunities?.identificationWithDocsData?.documentDTOS,
});
export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(SejamDetailInfoTab));
