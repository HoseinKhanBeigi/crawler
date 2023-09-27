import React, { useState } from 'react';
import { Col, Upload, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../sharedToolsStyles.scss';
import ToolContainer from '../ToolContainer/ToolContainer';
import { postChequQrOcr } from '../../../../service/toolsService';

import { getBase64 } from '../../../../utils/convertToBase64';

const ChequeQrOcr = () => {
  const [createChequeQr, setCreateChequeQr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">آپلود چک صیاد</div>
    </div>
  );

  const handleUpload = info => {
    setLoading(true);
    postChequQrOcr(info.file).then(
      async response => {
        setCreateChequeQr(response);
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
      title="نویسه خوان چک صیاد"
      showResult={createChequeQr}
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
          <div className={s.card} style={{ width: '60%' }}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className={s.fieldTitle}>شماره برگه چک:</div>
                <div className={s.fieldValue}>
                  {createChequeQr?.paperNumber}
                </div>
                <div className={s.fieldTitle}>کد شعبه:</div>
                <div className={s.fieldValue}>{createChequeQr?.branchBode}</div>
                <div className={s.fieldTitle}>شناسه ملی صاحب چک:</div>
                <div className={s.fieldValue}>
                  {createChequeQr?.nationalCode}
                </div>
              </Col>
              <Col span={12}>
                <div className={s.fieldTitle}>شناسه چک صیادی:</div>
                <div className={s.fieldValue}>
                  {createChequeQr?.sayadChequeNumber}
                </div>
                <div className={s.fieldTitle}>شماره شبا:</div>
                <div className={s.fieldValue}>{createChequeQr?.sheba}</div>
              </Col>
            </Row>
          </div>
          <div className={s.card} style={{ width: '60%', marginTop: '20px' }}>
            <img
              src={previewUrl}
              className={s.ocrImgPreview}
              alt={createChequeQr?.additionalInfo?.url}
            />
          </div>
        </>
      }
    />
  );
};
export default withStyles(s)(ChequeQrOcr);
