import React, {useEffect, useState} from 'react';
import { Button, Col, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import ToolContainer from '../../ToolContainer/ToolContainer';
import Link from '../../../../../components/Link/Link';
// eslint-disable-next-line css-modules/no-unused-class
import s from './SamatValidationTools.scss';
import { getSamatIdentificationInfo } from '../../../../../service/samatIdentificationServices';
import CPInput from '../../../../../components/CP/CPInput';
import CPButton from '../../../../../components/CP/CPButton';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';
import CPDivider from '../../../../../components/CP/CPDivider/CPDivider';
import CPMessage from '../../../../../components/CP/CPMessage'
import {persianNumToEnglishNum} from "../../../../../utils";

const SamatValidationTools = () => {
  const [nationalCode, setNationalCode] = useState();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetCreditScoreSamatInfo = async () => {
    if (isNaN(persianNumToEnglishNum(nationalCode))) {
      CPMessage('شناسه ملی باید فقط شامل عدد باشد', 'warning');
    } else {
    setLoading(true);
    try {
      setLoading(true);
      const result = await getSamatIdentificationInfo({ nationalCode });
      setLoading(false);
      if (!result.err) {
        setDetail(result);
      }
    } catch (e) {
      setLoading(false);
    }
    }

  };

  useEffect(() => {
    if (nationalCode) {
      setNationalCode(persianNumToEnglishNum(nationalCode))
    }
  }, [nationalCode])

  return (
    <ToolContainer
      title="اعتبار سنجی سمات - حقوقی"
      showResult={detail}
      ToolRender={
        <>
          <Row className={s.fieldContainer}>
            <Col span={24}>
              <div className={s.fieldTitle}>شناسه ملی</div>
              <CPInput
                value={nationalCode}
                onChange={e => setNationalCode(e.target.value)}
                placeholder="شناسه ملی را اینجا وارد کنید"
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
        <div className={s.card} style={{ width: '50%' }}>
          <div className={s.header}>
            <div className={s.title}>اعتبار سنجی سمات</div>
            <div className={s.title}>
              امتیاز {detail?.score}-{detail?.decisionStatus ? 'قبول' : 'رد'}
            </div>
          </div>
          <CPDivider className={s.divider} />
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>وضعیت چک برگشتی</div>
              <Link to={`/samat-details/nationalcode/${nationalCode}`} target>
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
              <Link to={`/samat-details/nationalcode/${nationalCode}`} target>
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

export default withStyles(s)(SamatValidationTools);
