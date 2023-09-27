import React from 'react';
import { Col, Row, Divider } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import momentJalaali from 'moment-jalaali';
import toCommaSeparatedNumber from '../../../../../../utils/toCommaSeparatedNumber';
import s from './LegalValidationLeasingForm.scss';

const LegalValidationLeasingForm = props => {
  const { validationResult } = props;

  return (
    <>
      <Row>
        <Col span={24}>
          <div className={s.header} style={{ paddingTop: 0 }}>
            <div className={s.title}>اطلاعات کلی</div>
          </div>
        </Col>
        <Divider className={s.divider} />
      </Row>
      <Row gutter={24}>
        <Col span={16}>
          <Row gutter={[24, 24]} type="flex">
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>نام شرکت</div>
                <div className={s.fieldValue}>{validationResult?.name}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>امتیاز نهایی</div>
                <div className={s.fieldValue}>
                  {validationResult?.finalGrade}
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>وضعیت</div>
                <div className={s.fieldValue}>
                  {validationResult?.riskRateTitle || '0'}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>شاخص نسبت به ریسک</div>
                <div className={s.fieldValue}>
                  {validationResult?.riskRateIndex || '0'}
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>نسخه استعلام</div>
                <div className={s.fieldValue}>
                  {validationResult?.version || '---'}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={s.field}>
                <div className={s.fieldTitle}>تاریخ استعلام</div>
                <div className={s.fieldValue}>
                  {momentJalaali(validationResult?.requestDate).format(
                    'dddd jD jMMMM jYYYY',
                  ) || '---'}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={s.header}>
            <div className={s.title}>اطلاعات صورت های مالی</div>
          </div>
        </Col>
        <Divider className={s.divider} />
      </Row>
      <Row gutter={24}>
        <Col span={16}>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>جمع دارایی های غیرجاری</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto
                      ?.totalNonCurrentAssets,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto
                    ?.totalNonCurrentAssets,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>جمع کل بدهی</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.totalDebt,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.totalDebt,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>حقوق صاحبان سهم به دارایی</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.equityToAsset,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.equityToAsset,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>Net Gearing Ratio</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.netGearingRatio,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.netGearingRatio,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>گردش دارایی</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.assetTurnover,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.assetTurnover,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>حاشیه سود</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.ebitMargin,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.ebitMargin,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>نسبت پوشش بهره</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto
                      ?.interestCoverageRatio,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto
                    ?.interestCoverageRatio,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>نسبت جاری</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.currentRatio,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.currentRatio,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>Ebit to debit</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.ebitToDebit,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>0</div>
            </Col>
          </Row>
          <Row gutter={[24, 24]} type="flex">
            <Col span={20}>
              <div className={s.field}>
                <div className={s.fieldTitle}>فروش</div>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementDto?.sale,
                    false,
                  ) || '0'}
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={s.fieldValue}>
                {toCommaSeparatedNumber(
                  validationResult?.financialStatementGradeDto?.sale,
                  false,
                ) || '0'}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
LegalValidationLeasingForm.defaultProps = {
  validationResult: {},
};
LegalValidationLeasingForm.propTypes = {
  validationResult: PropTypes.object,
};
export default withStyles(s)(LegalValidationLeasingForm);
