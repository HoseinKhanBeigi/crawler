/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Col, Upload, Icon, Row } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line css-modules/no-unused-class
import s from '../sharedToolsStyles.scss';
import ToolContainer from '../ToolContainer/ToolContainer';
import { postBankCreditCardOcr } from '../../../../service/toolsService';
import { getBase64 } from '../../../../utils/convertToBase64';

const BankCreditCardOcrTool = () => {
  const [creditCardNumber, setCreditCardNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">آپلود کارت بانکی</div>
    </div>
  );

  const handleUpload = info => {
    setLoading(true);
    postBankCreditCardOcr(info.file).then(
      async response => {
        setCreditCardNumber(response.result);
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
      title="نویسه خوان کارت بانکی"
      showResult={creditCardNumber}
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
                <div className={s.fieldTitle}>شماره کارت</div>
                <div className={s.fieldValue}>{creditCardNumber}</div>
              </Col>
            </Row>
          </div>
          <div className={s.card} style={{ width: '50%', marginTop: '20px' }}>
            <img
              src={previewUrl}
              className={s.ocrImgPreview}
              alt={creditCardNumber}
            />
          </div>
        </>
      }
    />
  );
};
export default withStyles(s)(BankCreditCardOcrTool);
