/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line jsx-a11y/click-events-have-key-events

import React, { useEffect, useState } from 'react';
import { Col, Divider, Form, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Field, FieldArray, Formik } from 'formik';
import PropTypes from 'prop-types';
import CPButton from '../../../CP/CPButton/CPButton';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForKYBBusinessCompleteInformation.scss';
import CPInput from '../../../CP/CPInput';
import CPLabel from '../../../CP/CPLabel';
import CPSimpleDatePicker from '../../../CP/CPSimpleDatePicker';
import { getDocAction } from '../../../../store/docDownload/docDownload.actions';
import CPLoading from '../../../CP/CPLoading';

const { Item } = Form;
const docTitle = {
  BUSINESS_LICENSE: 'آگهی رسمی',
  BUSINESS_PERMIT: 'جواز کسب و کار',
};
const CompleteInfoForm = props => {
  const {
    onSubmit,
    onCancel,
    companyDocData,
    productCode,
    onHandlePreveiw,
    stakHolders,
  } = props;
  const companyType = productCode === 'KYM' ? 'کسب و کار' : 'شرکت';
  const [initialValues, setInitialValues] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getDocument(path, objectToken) {
    const blob = await props.getDocAction({
      path,
      objectToken,
    });
    const objectURL = await URL.createObjectURL(blob);
    return objectURL;
  }

  useEffect(() => {
    // get and set stackholder document for show in section
    function stackHolderFactory() {
      const list = [];
      stakHolders?.map(async item => {
        const temp =
          item?.documents?.find(
            d => d?.documentType === 'NATIONAL_CARD_FRONT',
          ) || {};
        const { documentId, documentToken } = temp;
        setLoading(true);
        const doc = await getDocument(documentId, documentToken);
        setLoading(false);
        list.push({
          ...item,
          stackHolderDoc: doc,
        });
        setInitialValues({ businessStakeholdersDto: list });
      });
    }
    stackHolderFactory();
  }, []);

  // const docFactory = async data => {
  //   if (data?.type === 'NATIONAL_CARD_FRONT') {
  //     const { path, token } = data?.obj;
  //     const doc = await getDocument(path, token);
  //     return doc;
  //   }
  //   return false;
  // };
  function renderCard(name, data) {
    return (
      <div className={s.card}>
        <span>{name}</span>
        <div className={s.card_container}>
          <img
            src={data?.src}
            alt={name}
            onClick={() => onHandlePreveiw({ src: data?.src, ...data })}
          />
        </div>
      </div>
    );
  }

  const renderLabel = text => (
    <div
      style={{
        fontSize: '12px',
        color: '#7a7a7a',
        marginBottom: '4px',
        minWidth: '130px',
        display: 'inline-block',
      }}
    >
      {text}
      <span style={{ color: 'red' }}>*</span>
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {formProps => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        } = formProps;
        return (
          <form onSubmit={handleSubmit}>
            <Row gutter={24}>
              <Col span={24}>
                <h4>مشخصات {companyType}</h4>
                <Divider className={s.divider} />
              </Col>
              <Col span={5}>
                <div className={s.section_item}>
                  {renderCard(docTitle[companyDocData?.type], companyDocData)}
                </div>
              </Col>
              <Col span={19}>
                <Col span={24} className={s.input_container}>
                  <Item
                    help={
                      errors.businesssNameEn && touched.businesssNameEn
                        ? errors.businesssNameEn
                        : ''
                    }
                    hasFeedback={
                      !!(values.businesssNameEn && touched.businesssNameEn)
                    }
                    validateStatus={
                      errors.businesssNameEn && touched.businesssNameEn
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPInput
                      className={s.input}
                      label={`نام انگلیسی ${companyType}`}
                      isRequired
                      placeholder={`نام انگلیسی ${companyType} را واد کنید`}
                      name="businessNameEn"
                      onChange={handleChange}
                      value={values.businessNameEn}
                      onBlur={handleBlur}
                    />
                  </Item>
                </Col>
                <Col span={24} className={s.input_container}>
                  <Item
                    help={
                      errors.registrationPlace && touched.registrationPlace
                        ? errors.registrationPlace
                        : ''
                    }
                    hasFeedback={
                      !!(values.registrationPlace && touched.registrationPlace)
                    }
                    validateStatus={
                      errors.registrationPlace && touched.registrationPlace
                        ? 'error'
                        : 'success'
                    }
                  >
                    <CPInput
                      className={s.input}
                      label="محل ثبت شرکت"
                      isRequired
                      placeholder="محل ثبت شرکت را وارد کنید"
                      name="registrationPlace"
                      onChange={handleChange}
                      value={values.registrationPlace}
                      onBlur={handleBlur}
                    />
                  </Item>
                </Col>
                {productCode === 'KYM' && (
                  <Col span={24} className={s.input_container}>
                    <Item
                      help={
                        errors.licenseDate && touched.licenseDate
                          ? errors.licenseDate
                          : ''
                      }
                      hasFeedback={
                        !!(values.licenseDate && touched.licenseDate)
                      }
                    >
                      {/* <div style={{ display: 'flex' }}>
                        <CPSingleDatePicker
                          label="تاریخ صدور جواز"
                          placeholder="تاریخ صدور جواز را مشخص کنید"
                          required
                          date={values?.licenseDate}
                          displayFormat="jYYYY/jM/jD"
                          onChange={value =>
                            setFieldValue(
                              'licenseDate',
                              Date.parse(value?.date),
                            )
                          }
                        />
                      </div> */}
                      <CPLabel
                        label="تاریخ صدور جواز"
                        labelClasses={s.datePickerLabel}
                      >
                        <CPSimpleDatePicker
                          defaultValue={values?.licenseDate}
                          onChange={e =>
                            setFieldValue('licenseDate', e.getTime())
                          }
                        />
                      </CPLabel>
                    </Item>
                  </Col>
                )}
                {productCode !== 'KYM' && (
                  <Col span={24} className={s.input_container}>
                    <Item
                      help={
                        errors.businessNameEn && touched.businessNameEn
                          ? errors.businessNameEn
                          : ''
                      }
                      hasFeedback={
                        !!(values.businessNameEn && touched.businessNameEn)
                      }
                    >
                      {/* <div style={{ display: 'flex' }}>
                        <CPSingleDatePicker
                          label={`تاریخ ثبت ${companyType}`}
                          placeholder="تاریخ ثبت شرکت را مشخص کنید"
                          required
                          date={values?.businessRegisterDate}
                          displayFormat="jYYYY/jM/jD"
                          onChange={value =>
                            setFieldValue(
                              'businessRegisterDate',
                              Date.parse(value?.date),
                            )
                          }
                        />
                      </div> */}
                      <CPLabel
                        labelClasses={s.datePickerLabel}
                        label={`تاریخ ثبت ${companyType}`}
                      >
                        <CPSimpleDatePicker
                          defaultValue={values?.businessRegisterDate}
                          onChange={e =>
                            setFieldValue('businessRegisterDate', e.getTime())
                          }
                        />
                      </CPLabel>
                    </Item>
                  </Col>
                )}
                {productCode === 'KYM' && (
                  <Col span={24} className={s.input_container}>
                    <Item
                      help={
                        errors.licenseExpirationDate &&
                        touched.licenseExpirationDate
                          ? errors.licenseExpirationDate
                          : ''
                      }
                      hasFeedback={
                        !!(
                          values.licenseExpirationDate &&
                          touched.licenseExpirationDate
                        )
                      }
                      validateStatus={
                        errors.licenseExpirationDate &&
                        touched.licenseExpirationDate
                          ? 'error'
                          : 'success'
                      }
                    >
                      {/* <div style={{ display: 'flex' }}>
                        <CPSingleDatePicker
                          label="تاریخ انقضای جواز"
                          placeholder="تاریخ انقضای جواز را مشخص کنید"
                          required
                          date={values?.licenseExpirationDate}
                          displayFormat="jYYYY/jM/jD"
                          onChange={value =>
                            setFieldValue(
                              'licenseExpirationDate',
                              Date.parse(value?.date),
                            )
                          }
                        />
                      </div> */}
                      <CPLabel
                        label="تاریخ انقضای جواز"
                        labelClasses={s.datePickerLabel}
                      >
                        <CPSimpleDatePicker
                          defaultValue={values?.licenseExpirationDate}
                          onChange={e =>
                            setFieldValue(
                              'licenseExpirationDate',
                              Date.parse(e.getTime()),
                            )
                          }
                        />
                      </CPLabel>
                    </Item>
                  </Col>
                )}
              </Col>
            </Row>
            <CPLoading spinning={loading} tip="در حال دریافت اعضا">
              <FieldArray
                name="businessStakeholdersDto"
                validateOnChange={false}
              >
                {() => (
                  <>
                    {values?.businessStakeholdersDto?.map((item, index) => (
                      <Row
                        gutter={24}
                        style={{ marginTop: '32px' }}
                        key={index}
                      >
                        <Col span={24} key={index}>
                          <h4>{`${item?.firstName} ${item?.lastName}`}</h4>
                          <Divider className={s.divider} />
                        </Col>
                        <Col span={5}>
                          <div className={s.section_item}>
                            {renderCard('تصویر روی کارت ملی', {
                              type: item?.document?.documentType,
                              obj: {
                                path: item?.document?.documentId,
                                token: item?.document?.documentToken,
                                thumbnail: null,
                              },
                              src: item?.stackHolderDoc,
                            })}
                          </div>
                        </Col>
                        <Col span={19}>
                          <Col span={24} className={s.input_container}>
                            <Item
                              help={
                                errors.firstNameEn && touched.firstNameEn
                                  ? errors.firstNameEn
                                  : ''
                              }
                              hasFeedback={
                                !!(item.firstNameEn && touched.firstNameEn)
                              }
                              validateStatus={
                                errors.title && touched.firstNameEn
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <div style={{ display: 'flex' }}>
                                {renderLabel('نام انگلیسی')}
                                <Field
                                  value={item?.firstNameEn}
                                  name={`businessStakeholdersDto.${index}.firstNameEn`}
                                  className="ant-input"
                                  placeholder="نام انگلیسی را وارد کنید"
                                  type="text"
                                />
                              </div>
                            </Item>
                          </Col>
                          <Col span={24} className={s.input_container}>
                            <Item
                              help={
                                errors.lastNameEn && touched.lastNameEn
                                  ? errors.lastNameEn
                                  : ''
                              }
                              hasFeedback={
                                !!(item.lastNameEn && touched.lastNameEn)
                              }
                              validateStatus={
                                errors.title && touched.lastNameEn
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <div style={{ display: 'flex' }}>
                                {renderLabel('"نام خانوادگی انگلیسی')}
                                <Field
                                  name={`businessStakeholdersDto.${index}.lastNameEn`}
                                  className="ant-input"
                                  placeholder="نام خانوادگی انگلیسی را وارد کنید"
                                  type="text"
                                />
                              </div>
                            </Item>
                          </Col>
                          <Col span={24} className={s.input_container}>
                            <Item
                              help={
                                errors.fatherNameEn && touched.fatherNameEn
                                  ? errors.fatherNameEn
                                  : ''
                              }
                              hasFeedback={
                                !!(item.fatherNameEn && touched.fatherNameEn)
                              }
                              validateStatus={
                                errors.fatherNameEn && touched.fatherNameEn
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <div style={{ display: 'flex' }}>
                                {renderLabel('"نام پدر انگلیسی')}
                                <Field
                                  name={`businessStakeholdersDto.${index}.fatherNameEn`}
                                  className="ant-input"
                                  placeholder="نام پدر انگلیسی را وارد کنید"
                                  type="text"
                                />
                              </div>
                            </Item>
                          </Col>
                          <Col span={24} className={s.input_container}>
                            <Item>
                              {/* <div style={{ display: 'flex' }}>
                                <CPSingleDatePicker
                                  label="تاریخ تولد"
                                  required
                                  placeholder="تاریخ تولد را مشخص کنید"
                                  displayFormat="jYYYY/jM/jD"
                                  date={item?.birthDate}
                                  onChange={value =>
                                    setFieldValue(
                                      `businessStakeholdersDto.${index}.birthDate`,
                                      Date.parse(value?.date),
                                    )
                                  }
                                />
                              </div> */}
                              <CPLabel
                                label="تاریخ تولد"
                                labelClasses={s.datePickerLabel}
                              >
                                <CPSimpleDatePicker
                                  defaultValue={values?.birthDate}
                                  onChange={e =>
                                    setFieldValue(
                                      `businessStakeholdersDto.${index}.birthDate`,
                                      e.getTime(),
                                    )
                                  }
                                />
                              </CPLabel>
                            </Item>
                          </Col>
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </FieldArray>
            </CPLoading>
            <Row type="flex" gutter={24} justify="end" className={s.footer}>
              <CPButton onClick={onCancel} style={{ marginLeft: '8px' }}>
                انصراف
              </CPButton>
              <CPButton type="primary" htmlType="submit" onClick={handleSubmit}>
                ثبت تغییرات
              </CPButton>
            </Row>
          </form>
        );
      }}
    </Formik>
  );
};
CompleteInfoForm.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  onHandlePreveiw: () => {},
  companyDocData: null,
  productCode: null,
};
CompleteInfoForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  companyDocData: PropTypes.object,
  productCode: PropTypes.string,
  onHandlePreveiw: PropTypes.func,
  getDocAction: PropTypes.func.isRequired,
  stakHolders: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  stakHolders:
    state.opportunities?.identificationWithDocsData?.businessStakeholdersDto
      ?.stakeholders,
});

const mapDispatch = {
  getDocAction,
};
export default connect(
  mapStateToProps,
  mapDispatch,
)(withStyles(s)(CompleteInfoForm));
