import React from 'react';
import { Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import Link from '../../../../../../components/Link/Link';
import toCommaSeparatedNumber from '../../../../../../utils/toCommaSeparatedNumber';
import s from './SamatValidationForm.scss';

const SamatValidationForm = props => {
  const { detail, id } = props;

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>وضعیت چک برگشتی</div>
              <Link to={`/samat-details/id/${id}`} target>
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
        </Col>
        <Col span={12}>
          <div className={s.details}>
            <div className={s.details_action}>
              <div className={s.details_action_title}>وضعیت تسهیلات بانکی</div>
              <Link to={`/samat-details/id/${id}`} target>
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
        </Col>
      </Row>
    </>
  );
};
SamatValidationForm.defaultProps = {
  detail: {},
  id: '',
};
SamatValidationForm.propTypes = {
  detail: PropTypes.object,
  id: PropTypes.string,
};
export default withStyles(s)(SamatValidationForm);
