import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Row, Descriptions, Divider, Col } from 'antd';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import dataTranslatorExport from './dataTypesTranslator';
// eslint-disable-next-line css-modules/no-unused-class
import s from './ModalForEntityActivityTabMoreDetail.scss';
import CPModal from '../CP/CPModal';
import CPAlert from '../CP/CPAlert';
import DateTime from '../CrmActivityTable/tableDataComponents/DateTime';

function ModalForEntityActivityTabMoreDetail(props) {
  const { visible, data, onCancel, actionTypes } = props;
  const { Item } = Descriptions;
  const { activityDto: activity } = data;
  const isValidTypeForRender = (value, key) =>
    typeof value === 'string' ||
    typeof value === 'number' ||
    key === 'innerPayload';

  const renderItemType = (key, value) => {
    const label = key !== 'action' ? dataTranslatorExport(key) : null;
    const isValidDate = moment(value).isValid();
    return label !== false && key !== 'action' ? (
      <Item key={key} label={label} span={12}>
        {isValidDate && value.toString().length > 10 ? (
          <DateTime text={value} />
        ) : (
          value
        )}
      </Item>
    ) : null;
  };

  const printActorDetail = () => `${data.actorName} ${data.actorFamilyName}`;

  /**
   * show all details in raw format
   */
  function showDetails() {
    return (
      <>
        <Row type="flex" gutter={[16]}>
          <Descriptions title={`جزئیات : ${activity.action}`} column={2}>
            <Item label="نوع فعالیت:">
              {actionTypes[activity.action] || activity.action}
            </Item>
            <Item label=" ایجاد کننده:">
              {data.actorName ? printActorDetail() : 'سیستم'}
            </Item>
          </Descriptions>
          <div className={s.description_container}>
            <Divider orientation="center">سایر اطلاعات</Divider>
            {activity.payloadObj ? (
              <Descriptions size="middle" column={24}>
                {Object.entries(activity.payloadObj)?.map(([key, value]) => {
                  if (value && typeof value === 'object') {
                    return Object.entries(
                      value,
                    )?.map(([innerKey, innerValue]) =>
                      isValidTypeForRender(innerValue, innerKey) && 'number'
                        ? renderItemType(innerKey, innerValue)
                        : null,
                    );
                  }
                  return isValidTypeForRender(value, key) && 'number'
                    ? renderItemType(key, value)
                    : null;
                })}
              </Descriptions>
            ) : (
              <Col span={24}>
                <CPAlert
                  type="info"
                  message="با عرض پوزش اطلاعات کافی برای نمایش وجود ندارد!"
                />
              </Col>
            )}
          </div>
        </Row>
      </>
    );
  }

  return (
    <CPModal
      title="جزئیات فعالیت"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={760}
    >
      {showDetails()}
    </CPModal>
  );
}

ModalForEntityActivityTabMoreDetail.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  actionTypes: PropTypes.object,
};

ModalForEntityActivityTabMoreDetail.defaultProps = {
  data: null,
  visible: false,
  actionTypes: {},
};

export default connect(null)(
  withStyles(s)(ModalForEntityActivityTabMoreDetail),
);
export const ModalForEntityActivityTabMoreDetailTest = ModalForEntityActivityTabMoreDetail;
