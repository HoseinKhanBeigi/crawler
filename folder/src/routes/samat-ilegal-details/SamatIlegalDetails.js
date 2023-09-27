import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import momentJalaali from 'moment-jalaali';
import { Table, Row, Col, Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CPTab from '../../components/CP/CPTab/CPTab';
import CreditReportTab from './components/CreditReportTab/CreditReportTab';
import FinancialStamentTab from './components/FinancialStamentTab/FinancialStamentTab';
import { getSamatIlegalIdentificationInfo } from '../../service/samatIdentificationServices';
import toCommaSeparatedNumber2 from '../../utils/toCommaSeparatedNumber2';
import s from './SamatDetails.scss';

const columns = [
  {
    title: 'ردیف',
    dataIndex: 'rowIndex',
    key: 'rowIndex',
    width: 50,
  },
  {
    title: 'عنوان',
    dataIndex: 'variableDescription',
  },
  {
    title: 'توضیح',
    dataIndex: 'scoreDescription',
  },
  {
    title: 'امتیاز',
    dataIndex: 'scoreValue',
  },
];

export const addRowIndex = content =>
  content?.map((c, i) => ({
    rowIndex: i + 1,
    ...c,
  }));

const SamatIlegalDetails = props => {
  // eslint-disable-next-line no-unused-vars
  const { param } = props;
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);

  function exportToCSV(
    extraFieldHeader1,
    extraFieldData1,
    extraFieldHeader2,
    extraFieldData2,
    headerSectionThreeExtraDataCheckInfoDto,
    sectionThreeExtraDataCheckInfoDto,
    facilityInfoItemDtosListHeaders,
    facilityInfoItemDtosList,
    data,
    headers,
    fileName,
  ) {
    let csv = '';

    // Add the headers
    if (Array.isArray(headers) && headers.length > 0) {
      csv += `${headers.join(',')}\n`;
    }

    // Create the data rows
    data.forEach(item => {
      const row = Object.keys(item).map(field => item[field]);
      csv += `${row.join(',')}\n`;
    });

    if (extraFieldHeader2 !== undefined) {
      csv += `${extraFieldHeader2},\n`; // Add the extra field header as a separate row
    }

    // Add the extra field data if provided
    if (extraFieldData2 !== undefined) {
      extraFieldData2.forEach(item => {
        const row = Object.keys(item).map(field => item[field]);
        csv += `${row.join(',')}\n`;
      });
    }

    // Add the extra field header if provided
    if (extraFieldHeader1 !== undefined) {
      csv += `${extraFieldHeader1},\n`; // Add the extra field header as a separate row
    }

    // Add the extra field data if provided
    if (extraFieldData1 !== undefined) {
      extraFieldData1.forEach(item => {
        const row = Object.keys(item).map(field => item[field]);
        csv += `${row.join(',')}\n`;
      });
      // csv += `${extraFieldData},\n`; // Add the extra field data as a separate row
    }

    // Add the extra field header if provided
    if (headerSectionThreeExtraDataCheckInfoDto !== undefined) {
      csv += `${headerSectionThreeExtraDataCheckInfoDto},\n`; // Add the extra field header as a separate row
    }

    // Add the extra field data if provided
    if (sectionThreeExtraDataCheckInfoDto !== undefined) {
      sectionThreeExtraDataCheckInfoDto.forEach(item => {
        const row = Object.keys(item).map(field => item[field]);
        csv += `${row.join(',')}\n`;
      });
      // csv += `${extraFieldData},\n`; // Add the extra field data as a separate row
    }

    // Add the extra field header if provided
    if (facilityInfoItemDtosListHeaders !== undefined) {
      csv += `${facilityInfoItemDtosListHeaders},\n`; // Add the extra field header as a separate row
    }

    // Add the extra field data if provided
    if (facilityInfoItemDtosList !== undefined) {
      facilityInfoItemDtosList.forEach(item => {
        const row = Object.keys(item).map(field => item[field]);
        csv += `${row.join(',')}\n`;
      });
      // csv += `${extraFieldData},\n`; // Add the extra field data as a separate row
    }
    // Create a Blob containing the CSV data
    const blob = new Blob([`\ufeff${csv}`], {
      type: 'text/xls;charset=utf-8',
    });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xls`;
    link.style.display = 'none';

    // Add the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  }

  // Example usage with an extra field and header:
  // const headers = ['Header1', 'Header2', 'Header3'];
  const headers = ['عنوان', 'امتیاز', 'توضیح'];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getSamatIlegalIdentificationInfo(param);
      setLoading(false);
      if (!result.err) {
        setDetail(result);
      }
    })();
  }, []);

  const handleDownload = () => {
    const res = [];
    const facilityInfoItemDtosList = [];
    const sectionThreeExtraDataCheckInfoDto = [];
    const { facilityInfoDto, checkInfoDto } = detail;
    const facilityInfoDtoHeader = [
      'نام',
      'نام خانوادگی',
      'اصل تسهیلات',
      'کل تسهیلات',
      'مبلغ کل بدهی',
      'مجموع کل مشکوک الوصول',
      'مجموع کل معوق',
      'مجموع کل سررسید',
      'مجموع کل تعهد شده',
      'زمان استعلام',
    ];
    const facilityInfoItemDtosListHeaders = [
      'بانک',
      'شعبه',
      'بانک، شعبه',
      'شماره درخواست',
      'سررسید',
      'معوق',
      'مشکوک‌الوصول',
      'مبلغ کل بدهی',
      'اصل تسهیلات',
      'سود',
      'نوع',
    ];
    const headerSectionThreeExtraDataCheckInfoDto = [
      'شماره حساب',
      'مبلغ',
      'تاریخ برگشت',
      'بانک',
      'تاریخ چک',
      'شناسه',
    ];

    const checkInfoDtoHeader = [
      'تعداد چک برگشتی',
      'مجموع مبالغ',
      'نام',
      'زمان استعلام ',
    ];

    const extraFieldDatafacilityInfoDto = [
      {
        firstName: facilityInfoDto.firstName,
        lastName: facilityInfoDto.lastName,
        originalAmount: toCommaSeparatedNumber2(facilityInfoDto.originalAmount),
        totalAmount: toCommaSeparatedNumber2(facilityInfoDto.totalAmount),
        totalDebt: toCommaSeparatedNumber2(facilityInfoDto.totalDebt),
        totalDoubtful: toCommaSeparatedNumber2(facilityInfoDto.totalDoubtful),
        totalDelayed: toCommaSeparatedNumber2(facilityInfoDto.totalDelayed),
        totalReached: toCommaSeparatedNumber2(facilityInfoDto.totalReached),
        totalPledged: toCommaSeparatedNumber2(facilityInfoDto.totalPledged),

        reqInquiryDate: momentJalaali(facilityInfoDto.reqInquiryDate).format(
          'dddd jD jMMMM jYYYY',
        ),
      },
    ];

    const extraFieldDatacheckInfoDto = [
      {
        numberOfCheck: checkInfoDto.count,
        totalAmount: toCommaSeparatedNumber2(checkInfoDto.checkAmountSum),
        name: checkInfoDto.name,
        reqInquiryDate: momentJalaali(checkInfoDto.reqInquiryDate).format(
          'dddd jD jMMMM jYYYY',
        ),
      },
    ];
    detail.creditReportDto?.map(e =>
      e?.creditReportModels?.map(item => res.push(item)),
    );

    facilityInfoDto.facilityInfoItemDtos.map(e =>
      facilityInfoItemDtosList.push({
        bankName: e.bankName,
        branchName: e.branchName,
        bankBranch: e.bankBranch,
        requestNo: e.requestNo,
        reachedAmount: toCommaSeparatedNumber2(e.reachedAmount),
        delayedAmount: toCommaSeparatedNumber2(e.delayedAmount),
        doubtfulAmount: toCommaSeparatedNumber2(e.doubtfulAmount),
        totalDebtAmount: toCommaSeparatedNumber2(e.totalDebtAmount),
        originalAmount: toCommaSeparatedNumber2(e.originalAmount),
        benefit: toCommaSeparatedNumber2(e.benefit),
        type: e.type,
      }),
    );
    detail.checkInfoDto.fcheckInformationItems.map(e =>
      sectionThreeExtraDataCheckInfoDto.push({
        accountNo: toCommaSeparatedNumber2(e.accountNo),
        checkAmount: toCommaSeparatedNumber2(e.checkAmount),
        checkBackDate: momentJalaali(e.checkBackDate).format(
          'dddd jD jMMMM jYYYY',
        ),
        bankBranch: e.bankBranch,
        checkDate: momentJalaali(e.checkDate).format('dddd jD jMMMM jYYYY'),
        checkId: e.checkId,
      }),
    );
    exportToCSV(
      facilityInfoDtoHeader,
      extraFieldDatafacilityInfoDto,
      checkInfoDtoHeader,
      extraFieldDatacheckInfoDto,
      headerSectionThreeExtraDataCheckInfoDto,
      sectionThreeExtraDataCheckInfoDto,
      facilityInfoItemDtosListHeaders,
      facilityInfoItemDtosList,
      res,
      headers,
      'xlsSamat',
    );
  };

  const tabs = [
    {
      key: 2,
      tab: 'جزئیات تسهیلات بانکی',
      children: <FinancialStamentTab details={detail?.facilityInfoDto} />,
    },
    {
      key: 1,
      tab: 'جزئیات چک‌های برگشتی',
      children: <CreditReportTab details={detail?.checkInfoDto} />,
    },
  ];

  return (
    <>
      <div className={s.content}>
        <div className={s.title}>{`اعتبارسنجی سمات (امتیاز ${detail?.score ||
          '--'})`}</div>
        <Button type="link" onClick={handleDownload}>
          دانلود گزارش اعتبار سنجی
        </Button>

        <div className={s.subtitle}>
          {detail?.creditReportDto?.[0]?.creditReportName}
        </div>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={addRowIndex(
                detail?.creditReportDto?.[0]?.creditReportModels,
              )}
              bordered
              pagination={false}
              size="middle"
              loading={loading}
            />
          </Col>
        </Row>
        <div className={s.subtitle}>
          {detail?.creditReportDto?.[1]?.creditReportName}
        </div>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={addRowIndex(
                detail?.creditReportDto?.[1]?.creditReportModels,
              )}
              bordered
              pagination={false}
              size="middle"
              loading={loading}
            />
          </Col>
        </Row>
        <div className={s.subtitle}>
          {detail?.creditReportDto?.[2]?.creditReportName}
        </div>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={addRowIndex(
                detail?.creditReportDto?.[2]?.creditReportModels,
              )}
              bordered
              pagination={false}
              size="middle"
              loading={loading}
            />
          </Col>
        </Row>
        <CPTab className={s.tab} type="card" defaultKey="1" tabPane={tabs} />
      </div>
    </>
  );
};
SamatIlegalDetails.propTypes = {
  param: PropTypes.string,
};
SamatIlegalDetails.defaultProps = {
  param: '',
};
export default withStyles(s)(SamatIlegalDetails);
