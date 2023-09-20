/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Divider, Table, Row, Col, Button, Tag, Input } from 'antd';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PersonCreditScoreTab.scss';
import Link from '../../../../components/Link/Link';
import CPLabel from '../../../CP/CPLabel/CPLabel';
import toCommaSeparatedNumber from '../../../../utils/toCommaSeparatedNumber';
import { postSamatPersonNationalCodesList } from '../../../../service/samatIdentificationServices';
import ApproveButton from '../../../ApproveButton/ApproveButton';

const personScoreColumns = [
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
  },
  {
    title: 'امتیاز',
    dataIndex: 'score',
  },
  {
    title: 'مانده جاری',
    dataIndex: 'facilityInfoDto?.currentBalance',
    render: (value, row) =>
      toCommaSeparatedNumber(row?.facilityInfoDto.currentBalance, false),
  },
  {
    title: 'سر رسید گذشته',
    dataIndex: 'facilityInfoDto?.totalReached',
    render: (value, row) =>
      toCommaSeparatedNumber(row?.facilityInfoDto.totalReached, false),
  },
  {
    title: 'معوق',
    dataIndex: 'facilityInfoDto?.totalDelayed',
    render: (value, row) =>
      toCommaSeparatedNumber(row?.facilityInfoDto.totalDelayed, false),
  },
  {
    title: 'مشکوک الوصول',
    dataIndex: 'facilityInfoDto?.totalDoubtful',
    render: (value, row) =>
      toCommaSeparatedNumber(row?.facilityInfoDto.totalDoubtful, false),
  },
  {
    title: 'تعداد چک برگشتی',
    dataIndex: 'checkInfoDto?.count',
    render: (value, row) => row?.checkInfoDto.count,
  },
  {
    title: 'جزئیات',
    dataIndex: 'action',
    width: 100,
    render: (value, row) => (
      <Link
        to={`/samat-ilegal-details/nationalCode/${row?.nationalCode}`}
        target
      >
        <Button type="link">مشاهده جزئیات</Button>
      </Link>
    ),
  },
];

const leasingNaftScoreColumns = [
  {
    title: 'نام',
    dataIndex: 'facilityInfoDto.firstName',
  },
  {
    title: 'نام خانوادگی',
    dataIndex: 'facilityInfoDto.lastName',
  },
  {
    title: 'کد ملی',
    dataIndex: 'nationalCode',
  },
  {
    title: 'امتیاز',
    dataIndex: 'score',
  },
  {
    title: 'جزئیات',
    dataIndex: 'action',
    width: 100,
    render: (value, row) => (
      <Link
        to={`/samat-ilegal-details/nationalCode/${row?.nationalCode}`}
        target
      >
        <Button type="link">مشاهده جزئیات</Button>
      </Link>
    ),
  },
];

const PersonCreditScoreTab = props => {
  const {
    identification,
    identificationWithDocs,
    stateData,
    handleChange,
    productCode,
    opportunityId,
  } = props;
  const { personScoreStatus } = stateData;
  const columns =
    productCode === 'LEASING_KYB'
      ? personScoreColumns
      : leasingNaftScoreColumns;
  const primary = identification?.personalInfoStatus;
  const { rejectedByQC } = identificationWithDocs || {};
  const [result, setResult] = useState();
  const [nationalCodes, setNationalCodes] = useState([]);
  const [nationalCodeValue, setNationalCodeValue] = useState(null);
  const [loading, setLoading] = useState();
  const title =
    productCode === 'LEASING_KYB' ? 'اعتبارسنجی اعضای شرکت' : 'اعتبارسنجی سمات';

  const getSamatDetail = async list => {
    setLoading(true);
    try {
      const response = await postSamatPersonNationalCodesList(
        list,
        opportunityId,
      );
      setLoading(false);
      if (!response.err) {
        setResult(response?.result);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleOnEnterNationalCode = e => {
    setNationalCodeValue(e.target.value);
  };

  const handleAddNationCodeToList = () => {
    const prevNationalCode = [...nationalCodes];
    prevNationalCode.push(nationalCodeValue);
    setNationalCodes(prevNationalCode);
    setNationalCodeValue(null);
  };

  const handleRemoveNationCode = nationalCode => {
    const prevNationalCode = [...nationalCodes];
    const newList = prevNationalCode?.filter(item => item !== nationalCode);
    setNationalCodes(newList);
    getSamatDetail(newList);
  };

  const renderForm = () => (
    <>
      <div className={s.nationalCodeForm}>
        <div>
          <CPLabel label="ورود کد ملی اعضای شرکت" />
        </div>
        <div className={s.flexItemInput}>
          <Input
            placeholder="کد ملی شخص را وارد کنید"
            value={nationalCodeValue}
            onChange={handleOnEnterNationalCode}
            maxLength={10}
            allowClear
          />
        </div>
        <div>
          <Button
            type="default"
            onClick={handleAddNationCodeToList}
            disabled={
              !nationalCodeValue?.length || nationalCodeValue?.length < 10
            }
            className={s.button}
          >
            ثبت
          </Button>
        </div>
      </div>
      <Divider className={s.hDivider} />
      <div className={s.nationalCodeListSection}>
        <Row gutter={24}>
          <Col span={12}>
            {nationalCodes?.length ? (
              <div className={s.tagList}>
                {nationalCodes?.map(nationalCode => (
                  <Tag
                    className={s.tag}
                    closable
                    onClose={() => handleRemoveNationCode(nationalCode)}
                  >
                    {nationalCode}
                  </Tag>
                ))}
              </div>
            ) : (
              ''
            )}
          </Col>
        </Row>
        <Col span={12} pull={6}>
          <Button
            type="primary"
            onClick={() => getSamatDetail(nationalCodes)}
            disabled={!nationalCodes?.length}
            className={s.button}
          >
            استعلام
          </Button>
        </Col>
      </div>
      <Divider className={s.hDivider} />
    </>
  );

  useEffect(() => {
    if (productCode === 'DEMO_PERSONAL_LOAN' || productCode === 'PERSONAL_LOAN')
      getSamatDetail([]);
  }, []);

  return (
    <>
      <div className={s.root}>
        <div className={s.docsHeader}>
          <span>{title}</span>
          <div className={s.radioBox}>
            <ApproveButton
              handleChange={handleChange}
              primaryValue={primary}
              value={personScoreStatus}
              item="personScoreStatus"
              rejectedByQC={rejectedByQC}
            />
          </div>
        </div>
        <div>
          {productCode === 'LEASING_KYB' && renderForm()}
          <Table
            columns={columns}
            dataSource={result}
            bordered
            pagination={false}
            size="small"
            loading={loading}
          />
        </div>
      </div>
      {/* <GuageChart score={scoreNumber} /> */}
    </>
  );
};

PersonCreditScoreTab.propTypes = {
  stateData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  identificationWithDocs: PropTypes.object,
  identification: PropTypes.object,
  productCode: PropTypes.string.isRequired,
  opportunityId: PropTypes.string.isRequired,
};

PersonCreditScoreTab.defaultProps = {
  identificationWithDocs: null,
  identification: null,
};

const mapState = state => ({
  identificationWithDocs: state.opportunities.identificationWithDocsData,
  identification: state.opportunities.identificationData,
  productCode: state.opportunities.currentUser?.productCode,
  opportunityId: state.opportunities.currentUser?.id,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(PersonCreditScoreTab));
export const ModalForCheckIdentificationTabPersonalProfileTest = PersonCreditScoreTab;
