import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Divider, Row, Col } from 'antd';
import momentJalaali from 'moment-jalaali';
import ToolContainer from '../../ToolContainer/ToolContainer';
import toCommaSeparatedNumber from '../../../../../utils/toCommaSeparatedNumber';
import { putAddLegalValidation } from '../../../../../service/samatIdentificationServices';

import LegalValidationForm from './LegalValidationForm';

// eslint-disable-next-line css-modules/no-unused-class
import s from './LegalValidationTool.scss';

const LegalValidationTool = () => {
  const [validationResult, setValidationResult] = useState();
  const [loading, setLoading] = useState(false);

  function createBody(item) {
    return {
      activityType: item?.activityType,
      name: item?.name,
      nationalCode: item?.nationalCode,
      financialYear: item?.financialYear,
      creditParameterDto: {
        equities: item?.equities,
        financialExpenses: item?.financialExpenses,
        operatingProfit: item?.operatingProfit,
        sale: item?.sale,
        totalAssets: item?.totalAssets,
        totalCurrentAsset: item?.totalCurrentAsset,
        totalCurrentDebt: item?.totalCurrentDebt,
        totalFacilities: item?.totalFacilities,
      },
    };
  }
  const handleOnSubmit = valuse => {
    setLoading(true);
    putAddLegalValidation(createBody(valuse)).then(
      response => {
        setLoading(false);
        setValidationResult(response);
      },
      () => {
        setLoading(false);
        setValidationResult(null);
      },
    );
  };

  return (
    <ToolContainer
      title="اعتبار سنجی حقوقی"
      showResult={validationResult}
      ToolRender={
        <LegalValidationForm
          onSubmit={handleOnSubmit}
          isViewMode={!!validationResult}
          loading={loading}
          onResetForm={setValidationResult}
        />
      }
      ResultRender={
        <>
          <div className={s.card} style={{ width: '60%' }}>
            <div className={s.header}>
              <div className={s.title}>وضعیت اعتبارسنجی</div>
            </div>
            <Divider className={s.divider} />
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>نام شرکت</div>
                  <div className={s.fieldValue}>
                    {validationResult?.name || '---'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>امتیاز نهایی</div>
                  <div className={s.fieldValue}>
                    {validationResult?.finalGrade || '---'}
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>وضعیت</div>
                  <div className={s.fieldValue}>
                    {validationResult?.riskRateTitle || '---'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>شاخص نسبت به ریسک</div>
                  <div className={s.fieldValue}>
                    {validationResult?.riskRateIndex || '---'}
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
            <Row type="flex" gutter={[24, 24]}>
              <Col span={12}>
                <div className={s.sectionTitle}>اطلاعات صورت های مالی</div>
              </Col>
              <Col span={12}>
                <div className={s.sectionTitle}>
                  نمره صورت مالی براساس تنظیمات معادل سازی
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>جمع دارایی های غیرجاری</div>
                  <div className={s.fieldValue}>
                    {toCommaSeparatedNumber(
                      validationResult?.financialStatementDto
                        ?.totalNonCurrentAssets,
                      false,
                    ) || '---'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto
                      ?.totalNonCurrentAssets,
                    false,
                  ) || '---'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>جمع کل بدهی</div>
                  <div className={s.fieldValue}>
                    {toCommaSeparatedNumber(
                      validationResult?.financialStatementDto?.totalDebt,
                      false,
                    ) || '---'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.totalDebt,
                    false,
                  ) || '---'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.equityToAsset,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto
                      ?.netGearingRatio,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.assetTurnover,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.ebitMargin,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.currentRatio,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
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
              <Col span={12}>
                <div className={s.fieldValue}>0</div>
              </Col>
            </Row>
            <Row gutter={[24, 24]} type="flex">
              <Col span={12}>
                <div className={s.field}>
                  <div className={s.fieldTitle}>فروش</div>
                  <div className={s.fieldValue}>
                    {toCommaSeparatedNumber(
                      validationResult?.financialStatementDto?.sale,
                      false,
                    ) || '---'}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldValue}>
                  {toCommaSeparatedNumber(
                    validationResult?.financialStatementGradeDto?.sale,
                    false,
                  ) || '0'}
                </div>
              </Col>
            </Row>
          </div>
        </>
      }
    />
  );
};
export default withStyles(s)(LegalValidationTool);
