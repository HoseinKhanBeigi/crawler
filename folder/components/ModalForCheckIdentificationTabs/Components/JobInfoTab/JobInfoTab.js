import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from './JobInfoTab.scss';
import CPInput from '../../../CP/CPInput/CPInput';
import ApproveButton from '../../../ApproveButton/ApproveButton';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import CPButton from '../../../CP/CPButton/CPButton';
import CPAlert from '../../../CP/CPAlert/CPAlert';
import CPDivider from '../../../CP/CPDivider/CPDivider';
import {
  getAddressStringByPostCodeAction,
  getOpportunitiesAction,
} from '../../../../store/opportunities/opportunities.actions';
import opportunityService from '../../../../service/opportunityService';
import { getProvinceWithCities } from '../../../../utils/getProvinceWithCities';

import CPSelect from '../../../CP/CPSelect/CPSelect';
import CPTextArea from '../../../CP/CPTextArea/CPTextArea';

const JobInfoTab = props => {
  const [addressByPostCode, setAddressByPostCode] = useState(null);
  const [loadingPostalCodeAddress, setLoadingPostalCodeAddress] = useState(
    false,
  );
  const [cities, setCities] = useState(null);
  const [currentCitites, setCurrentCitites] = useState([]);
  const [provinces, setProvinces] = useState(null);
  const [cityEditMode, setCityEditMode] = useState(false);
  const [addressType, setAddressType] = useState(null);
  const { identification, identificationWithDocs, stateData } = props;
  const { workInfoStatus } = stateData;
  const {
    jobInfo,
    personContacts,
    rejectedByQC,
    levantId,
  } = identificationWithDocs;
  const { email, jobDescription } = jobInfo;
  const primary = identification?.workInfoStatus;

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
      const currentContact = personContacts.filter(p => p.type === 'WORK');
      const candidateCitites = convertedCities.filter(
        c => c.province_id === Number(currentContact[0].state, 10),
      );
      setProvinces(convertedProvinces);
      setCities(convertedCities);
      setCurrentCitites(candidateCitites);
    });
  }, []);

  const reload = () => {
    props.getOpportunitiesAction();
  };

  const handleOnProvinceSelected = v => {
    const candidate = cities.filter(c => c.province_id === v);
    setCurrentCitites(candidate);
  };

  const onEditAction = async (value, name) => {
    let body = {};
    if (typeof name === 'object') {
      body = {
        personContacts: [
          {
            [name.name]: value,
            type: name.type,
          },
        ],
      };
    } else {
      body = {
        jobInfo: {
          [name]: value,
        },
      };
    }
    await opportunityService.editIdentificationInfo(
      levantId,
      props.opportunityId,
      body,
    );
    reload();
    setCityEditMode(true);
  };

  const renderField = (
    text,
    name,
    val,
    col = 8,
    hasValidation = false,
    withEdit = true,
  ) => (
    <Col span={col}>
      <CPLabel label={text}>
        <CPInput
          value={val || ''}
          disabled
          name={name}
          onEditAction={onEditAction}
          withEdit={withEdit}
          hasValidation={hasValidation}
        />
      </CPLabel>
    </Col>
  );

  const renderTextArea = (
    text,
    name,
    val,
    col = 8,
    hasValidation = false,
    withEdit = true,
  ) => (
    <Col span={col}>
      <CPLabel label={text}>
        <CPTextArea
          value={val || ''}
          disabled
          rows={3}
          hasValidation={hasValidation}
          name={name}
          onEditAction={onEditAction}
          withEdit={withEdit}
        />
      </CPLabel>
    </Col>
  );

  async function checkPostCode(postCode, type) {
    setLoadingPostalCodeAddress(true);
    setAddressType(type);
    const response = await props.getAddressStringByPostCodeAction(postCode);
    setLoadingPostalCodeAddress(false);

    setAddressByPostCode({
      postCode,
      message: response?.ErrorMessage || response?.Value,
    });
  }

  /**
   * A method to render the address documents
   * @param array
   */
  function renderContacts(array) {
    return array?.map(item => {
      const { postalCode, street, tel, type, city, state, telPrefix } = item;
      const model = {
        WORK: 'آدرس محل کار:',
      };

      if (type === 'WORK') {
        return (
          <CPLabel className={s.address} label={model[type]} position="right">
            <div>
              <Row className={s.address_item_mBottom}>
                <Col span={8}>
                  {provinces && (
                    <CPLabel label="استان">
                      <CPSelect
                        onChange={handleOnProvinceSelected}
                        placeholder="استان را انتخاب کنید"
                        dataSource={provinces}
                        showSearch
                        name={{ type, name: 'state' }}
                        onEdit={onEditAction}
                        defaultValue={Number(state)}
                        disabled
                        withEdit
                      />
                    </CPLabel>
                  )}
                </Col>
                <Col span={8}>
                  {cities && (
                    <CPLabel label="شهر">
                      <CPSelect
                        placeholder="شهر را انتخاب کنید"
                        dataSource={currentCitites}
                        showSearch
                        name={{ type, name: 'city' }}
                        onEdit={onEditAction}
                        defaultValue={Number(city)}
                        editMode={cityEditMode}
                        withEdit
                        disabled
                      />
                    </CPLabel>
                  )}
                </Col>
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {renderTextArea(
                  model[type],
                  { type, name: 'street' },
                  street,
                  16,
                  true,
                )}
              </Row>
              <Row gutter={24} className={s.address_item_mBottom}>
                {renderField(
                  'کد پستی : ',
                  { type, name: 'postalCode' },
                  postalCode,
                  8,
                  true,
                )}
                <CPButton
                  type="ghost"
                  size="small"
                  onClick={() => {
                    checkPostCode(postalCode, type);
                  }}
                  loading={loadingPostalCodeAddress}
                  className={s.postCodeCheck}
                >
                  بررسی کد پستی
                </CPButton>
              </Row>
              <Row className={s.address_item_mBottom}>
                {renderField('شماره تماس: ', { type, name: 'tel' }, tel, 8)}
                {renderField(
                  'کد شهر  : ',
                  { type, name: 'telPrefix' },
                  telPrefix,
                  8,
                )}
              </Row>
              <br />
              <Row>
                {addressByPostCode?.postCode === postalCode &&
                  addressType === type && (
                    <CPAlert
                      type="warning"
                      message={addressByPostCode?.message}
                    />
                  )}
              </Row>
            </div>
          </CPLabel>
        );
      }
      return null;
    });
  }

  return (
    <div className={s.root}>
      <div className={s.docsHeader}>
        <span>مشخصات شغلی</span>
        <div className={s.radioBox}>
          <ApproveButton
            handleChange={props.handleChange}
            primaryValue={primary}
            value={workInfoStatus}
            item="workInfoStatus"
            rejectedByQC={rejectedByQC}
          />
        </div>
      </div>
      <div className="row">
        {renderField('ایمیل محل کار', 'email', email, 8, true)}
        {renderField(
          'عنوان شغلی',
          'jobDescription',
          jobDescription,
          false,
          false,
          false,
        )}
        <div className="col-md-12">
          <CPDivider />
          {renderContacts(personContacts)}
        </div>
      </div>
    </div>
  );
};

JobInfoTab.propTypes = {
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  getAddressStringByPostCodeAction: PropTypes.func.isRequired,
  opportunityId: PropTypes.string,
  getOpportunitiesAction: PropTypes.func.isRequired,
};

JobInfoTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
  opportunityId: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  opportunityId: state.opportunities.identificationWithDocsOpportunityId,
});

const mapDispatch = {
  getAddressStringByPostCodeAction,
  getOpportunitiesAction,
};

export default connect(mapState, mapDispatch)(withStyles(s)(memo(JobInfoTab)));
export const ModalForCheckIdentificationTabBusinessInfoProfileTest = JobInfoTab;
