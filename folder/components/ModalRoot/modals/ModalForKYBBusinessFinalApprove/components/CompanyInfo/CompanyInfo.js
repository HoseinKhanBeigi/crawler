import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Upload } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CompanyInfo.scss';
import CPLabel from '../../../../../CP/CPLabel/CPLabel';
import { returnAddress } from '../../../../../../utils/index';
import convertToJalaliDate from '../../../../../../utils/date';
import CPInput from '../../../../../CP/CPInput/CPInput';
import glusterService from '../../../../../../service/glusterService';

const CompanyInfo = props => {
  const { identificationWithDocsData, productCode } = props;
  const { businessDocumentDTOS } = identificationWithDocsData || {};
  const [defaultFileList, setDefaultFileList] = useState([]);
  const {
    businessName,
    businessNameEn,
    registerNumber,
    businessRegisterDate,
    taxPayerCode,
    boardName,
    licenseDate,
    licenseExpirationDate,
    nationalCode,
    category,
    subcategory,
    businessContacts,
    businessStakeholdersDto,
  } = identificationWithDocsData || {};
  const { businessAdminFullName, businessAdminNationalCode } =
    businessStakeholdersDto || {};
  const {
    city,
    state,
    street,
    emailAddress,
    postalCode,
    tel,
    telPrefix,
    webSite,
  } = businessContacts?.length ? businessContacts[0] : {};

  const translatedType = {
    AGENT_SENTENCE: 'حکم نماینده',
    BUSINESS_LICENSE: 'روزنامه رسمی',
    BUSINESS_PERMIT: 'جواز کسب و کار',
    SIGN_OFFICERS: 'آگهی آخرین امضاداران مجاز',
  };
  useEffect(() => {
    const initialFileList = () => {
      if (businessDocumentDTOS?.length) {
        let promises = [];
        promises = businessDocumentDTOS?.map(async (file, index) => {
          const { type } = file;
          const { path, token } = file?.files[0];
          return glusterService
            .getGlusterFile(path, token)
            .then(async response => {
              const { result } = response;
              const objectURL = await URL.createObjectURL(result);
              const obj = {
                uid: index,
                url: objectURL,
                name: translatedType[type],
                status: 'done',
              };
              return obj;
            });
        });
        if (promises.length) {
          Promise.all(promises).then(results => {
            setDefaultFileList(results);
          });
        }
      }
    };
    initialFileList();
  }, []);
  const renderField = (text, val) => (
    <CPLabel
      label={text}
      className={cs('col-md-12', s.input)}
      labelClasses={s.label}
    >
      <CPInput value={val || '---'} disabled className={s.i} />
    </CPLabel>
  );

  const renderKYMField = () => (
    <>
      {renderField('نام تابلو', boardName)}
      {renderField(
        'تاریخ صدور جواز',
        licenseDate ? convertToJalaliDate(licenseDate) : null,
      )}
      {renderField(
        'تاریخ انقضای جواز',
        licenseExpirationDate
          ? convertToJalaliDate(licenseExpirationDate)
          : null,
      )}
    </>
  );

  return (
    <>
      {renderField(
        productCode === 'KYM' ? 'نام کسب و کار' : 'نام تجاری',
        businessName,
      )}
      {renderField('نام کسب و کار (انگلیسی)', businessNameEn)}
      {productCode !== 'KYM' &&
        renderField(
          'تاریخ ثبت',
          businessRegisterDate
            ? convertToJalaliDate(businessRegisterDate)
            : null,
        )}
      {productCode !== 'KYM' && renderField('شماره مالیاتی', taxPayerCode)}
      {renderField(
        productCode === 'KYM' ? 'شماره پروانه کسب و کار' : 'شماره ثبت',
        registerNumber,
      )}
      {productCode === 'KYM' && renderKYMField()}
      {renderField('شناسه ملی', nationalCode)}
      {productCode !== 'KYM' && renderField('دسته‌بندی', subcategory)}
      {renderField('نوع کسب‌ و کار', category)}
      {productCode === 'KYM' &&
        renderField('نام نماینده', businessAdminFullName)}
      {productCode === 'KYM' &&
        renderField('کد ملی نماینده', businessAdminNationalCode)}
      {renderField('آدرس', returnAddress(state, city, street))}
      {renderField('کد پستی', postalCode)}
      {renderField('تلفن', tel)}
      {renderField('کد شهر', telPrefix)}
      {emailAddress &&
        emailAddress !== 'null' &&
        renderField('ایمیل', emailAddress)}
      {webSite && webSite !== 'null' && renderField('وبسایت', webSite)}
      <div className={s.upload}>
        {defaultFileList?.length > 0 && (
          <Upload defaultFileList={defaultFileList} />
        )}
      </div>
    </>
  );
};

CompanyInfo.propTypes = {
  identificationWithDocsData: PropTypes.array.isRequired,
  productCode: PropTypes.string.isRequired,
};

const mapState = state => ({
  identificationWithDocsData: state.opportunities?.identificationWithDocsData,
  productCode: state.opportunities?.currentUser?.productCode,
});

export default connect(mapState, null)(memo(withStyles(s)(CompanyInfo)));
