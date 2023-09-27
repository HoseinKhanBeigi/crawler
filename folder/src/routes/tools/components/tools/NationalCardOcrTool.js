/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Col, Upload, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import ToolContainer from '../ToolContainer/ToolContainer';
import { postUploadNationlCardOcr } from '../../../../service/toolsService';
import { getBase64 } from '../../../../utils/convertToBase64';

const NationalCardOcrTool = () => {
  const [nationalCardDetail, setNationalCardDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">آپلود کارت ملی</div>
    </div>
  );

  const handleUpload = info => {
    setLoading(true);
    postUploadNationlCardOcr(info.file).then(
      async response => {
        setNationalCardDetail(response);
        setLoading(false);
        const fileUrl = await getBase64(info?.file);
        setPreviewUrl(fileUrl);
      },
      () => {
        setLoading(false);
      },
    );
  };
  return (
    <ToolContainer
      title="نویسه خوان کارت ملی"
      showResult={nationalCardDetail}
      ToolRender={
        <>
          <Row className={s.fieldContainer} justify="center" type="flex">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={handleUpload}
            >
              {uploadButton}
            </Upload>
          </Row>
        </>
      }
      ResultRender={
        <>
          <div className={s.card} style={{ width: '50%' }}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className={s.fieldTitle}>شناسه ملی</div>
                <div className={s.fieldValue}>
                  {nationalCardDetail?.national_id}
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldTitle}>نام</div>
                <div className={s.fieldValue}>{nationalCardDetail?.name}</div>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className={s.fieldTitle}>نام خانوادگی</div>
                <div className={s.fieldValue}>
                  {nationalCardDetail?.last_name}
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldTitle}>نام پدر</div>
                <div className={s.fieldValue}>
                  {nationalCardDetail?.father_name}
                </div>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className={s.fieldTitle}>تاریخ تولد</div>
                <div className={s.fieldValue}>
                  {nationalCardDetail?.birthdate}
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldTitle}>تاریخ انقضا</div>
                <div className={s.fieldValue}>
                  {nationalCardDetail?.expire_date}
                </div>
              </Col>
            </Row>
          </div>
          <div className={s.card} style={{ width: '50%', marginTop: '20px' }}>
            <img
              src={previewUrl}
              className={s.ocrImgPreview}
              alt={nationalCardDetail?.last_name}
            />
          </div>
        </>
      }
    />
  );
};
export default withStyles(s)(NationalCardOcrTool);
