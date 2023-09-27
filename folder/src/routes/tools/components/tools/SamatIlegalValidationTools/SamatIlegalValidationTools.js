import React, {useState, useEffect} from 'react';
import {Button, Col, Row} from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import ToolContainer from '../../ToolContainer/ToolContainer';
import Link from '../../../../../components/Link/Link';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SamatIlegalValidationTools.scss';
import {getSamatIlegalIdentificationInfo} from '../../../../../service/samatIdentificationServices';
import CPInput from '../../../../../components/CP/CPInput/CPInput';
import CPMessage from '../../../../../components/CP/CPMessage'
import CPButton from '../../../../../components/CP/CPButton/CPButton';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';
import CPDivider from '../../../../../components/CP/CPDivider/CPDivider';
import {persianNumToEnglishNum} from "../../../../../utils";
import {checkNationalCode} from "../../../../../utils/validateField";

const SamatIlegalValidationTools = () => {
  const [nationalCode, setNationalCode] = useState();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetCreditScoreSamatInfo = async () => {
    if (checkNationalCode(persianNumToEnglishNum(nationalCode))) {
      setLoading(true);
      try {
        setLoading(true);
        const result = await getSamatIlegalIdentificationInfo({nationalCode});
        setLoading(false);
        if (isNaN(persianNumToEnglishNum(nationalCode))) {
          CPMessage('کد ملی باید فقط شامل عدد باشد', 'warning');
        }
        if (!result.err) {
          setDetail(result);
        }
      } catch (e) {
        setLoading(false);
      }
    } else if (!checkNationalCode(persianNumToEnglishNum(nationalCode))) {
      if (isNaN(persianNumToEnglishNum(nationalCode))) {
        CPMessage('کد ملی باید فقط شامل عدد باشد', 'warning');
      }
      CPMessage('کد ملی صحیح نیست', 'warning');
    }
  };

  useEffect(() => {
    if (nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }

  }, [nationalCode])

  // const renderDate = d => {
  //   const m = momentJalaali(new Date(d) * 1000);
  //   if (m.isValid()) {
  //     return m.format('dddd jD jMMMM jYYYY ');
  //   }
  //   return 'تاریخ معتبر نیست';
  // };

  return (
    <ToolContainer
      title="اعتبار سنجی سمات - حقیقی"
      showResult={detail}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>کد ملی</div>
              <CPInput
                value={nationalCode}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="کد ملی را اینجا وارد کنید"
                maxLength={10}
              />
            </Col>
          </Row>
          <CPButton
            loading={loading}
            onClick={handleGetCreditScoreSamatInfo}
            type="primary"
            block
          >
            استعلام
          </CPButton>
        </>
      }
      ResultRender={
        <div className={s.card} style={{width: '50%'}}>
          <div className={s.header}>
            <div className={s.title}>اعتبارسنجی سمات-حقیقی</div>
            <div className={s.title}>
              امتیاز {detail?.score}-{detail?.decisionStatus ? 'قبول' : 'رد'}
            </div>
          </div>
          <CPDivider className={s.divider}/>
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>وضعیت چک برگشتی</div>
              <Link
                to={`/samat-ilegal-details/nationalcode/${nationalCode}`}
                target
              >
                <Button size="small" type="primary">
                  مشاهده جزئیات
                </Button>
              </Link>
            </div>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>تعداد چک برگشتی</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {detail?.checkInfoDto?.count}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مجموع مبالغ</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(detail?.checkInfoDto?.count, false)}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>نام</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>{detail?.checkInfoDto?.name}</div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>زمان استعلام</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {momentJalaali(detail?.checkInfoDto?.reqInquiryDate).format(
                    'dddd jD jMMMM jYYYY',
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>وضعیت تسهیلات بانکی</div>
              <Link
                to={`/samat-ilegal-details/nationalcode/${nationalCode}`}
                target
              >
                <Button size="small" type="primary">
                  مشاهده جزئیات
                </Button>
              </Link>
            </div>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>نام</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {detail?.facilityInfoDto?.firstName}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>نام خانوادگی</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {detail?.facilityInfoDto?.lastName}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>اصل تسهیلات</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.originalAmount,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>کل تسهیلات</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalAmount,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مبلغ کل بدهی</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalDebt,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مجموع کل مشکوک الوصول</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalDoubtful,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مجموع کل معوق</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalDelayed,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مجموع کل سررسید</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalReached,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>مجموع کل تعهد شده</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    detail?.facilityInfoDto?.totalPledged,
                    false,
                  )}
                </div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={9}>
                <div className={s.fieldTitle}>زمان استعلام</div>
              </Col>
              <Col span={15}>
                <div className={s.fieldValue}>
                  {momentJalaali(detail?.checkInfoDto?.reqInquiryDate).format(
                    'dddd jD jMMMM jYYYY',
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      }
    />
  );
};

export default withStyles(s)(SamatIlegalValidationTools);
