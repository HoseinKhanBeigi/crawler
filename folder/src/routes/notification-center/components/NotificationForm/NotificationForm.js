import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPencilOutline } from '@mdi/js';
import PropTypes from 'prop-types';
import s from './NotificationForm.scss';
import { channelDataSource } from '../../constants/channelDataSource';
import EditableNotificationForm from '../EditableNotificationForm/EditableNotificationForm';
import CPPopConfirm from '../../../../components/CP/CPPopConfirm';
import serverMockData from '../../constants/serverMockData';
import HandleAclPermission from '../../../../components/HandleAclPermission';
import { Actions } from '../../../../utils/aclActions';

const NotificationForm = ({
  sectionData = serverMockData,
  editFormHandler,
  deleteFormHandler,
}) => {
  const [editable, setEditable] = useState(false);
  const mapChannelTypeToFa = (type, dataSource) =>
    dataSource.reduce(
      (title, data) =>
        data.value === type.notificationChannel ? data.text : title,
      '',
    );

  const renderSectionView = section => (
    <div className={s.NotifForm}>
      <div className={s.title}>
        <p>دپارتمان</p>
        <strong>{section.name}</strong>
        <div className={s.icons}>
          <HandleAclPermission wich={Actions.organizationSectionUpdate}>
            <span
              onClick={() => setEditable(true)}
              role="button"
              onKeyPress={() => setEditable(true)}
              tabIndex="0"
            >
              <Icon path={mdiPencilOutline} color="#1c92ff" size="16px" />
            </span>
          </HandleAclPermission>
          <HandleAclPermission wich={Actions.organizationSectionDelete}>
            <CPPopConfirm
              title="آیا مطمئنید که میخواهید این بخش را حذف کنید؟"
              cancelText="انصراف"
              okText="حذف"
              okType="danger"
              icon={null}
              onConfirm={() => deleteFormHandler(section.id)}
            >
              <span>
                <Icon path={mdiTrashCanOutline} color="#ff4d4f" size="16px" />
              </span>
            </CPPopConfirm>
          </HandleAclPermission>
        </div>
      </div>
      {section.communicationList.map(type => {
        const notifChannelName = mapChannelTypeToFa(type, channelDataSource);
        return (
          <div className={s.title} style={{ marginTop: 18 }} key={type.id}>
            <p>{notifChannelName}</p>
            {type.receipts.map(receipt => (
              <span className={s.receipts}>{receipt}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
  return editable ? (
    <EditableNotificationForm
      initialValues={sectionData}
      onSubmit={values => editFormHandler(values, () => setEditable(false))}
      closeFormHandler={() => setEditable(false)}
    />
  ) : (
    renderSectionView(sectionData)
  );
};

NotificationForm.defaultProps = {
  sectionData: serverMockData,
};

NotificationForm.propTypes = {
  sectionData: PropTypes.object,
  editFormHandler: PropTypes.func.isRequired,
  deleteFormHandler: PropTypes.func.isRequired,
};

export default withStyles(s)(NotificationForm);
