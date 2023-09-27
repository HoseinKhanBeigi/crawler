import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import EditableNotifForm from '../components/EditableNotificationForm/EditableNotificationForm';
import CPButton from '../../../components/CP/CPButton';
import s from './NotificationCenter.scss';
import NotifForm from '../components/NotificationForm/NotificationForm';
import useNotifCenter from '../hooks/useNotifCenter';
import HandleAclPermission from '../../../components/HandleAclPermission';
import { Actions } from '../../../utils/aclActions';

const NotificationCenter = () => {
  const {
    showAddNotifForm,
    handleCloseAddNotifForm,
    handleSubmitNewNotif,
    handleEditNotifForm,
    organizationSections,
    handleShowAddNotifForm,
    handleDeleteNotifForm,
  } = useNotifCenter();

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.container__titleSection}>
          <div>
            <h2>اطلاع رسانی</h2>
            <p>{`${organizationSections.length} مورد`}</p>
          </div>
          <HandleAclPermission wich={Actions.organizanizationSectionCreate}>
            <CPButton
              type="primary"
              icon="plus"
              onClick={handleShowAddNotifForm}
            >
              افزودن سکشن جدید
            </CPButton>
          </HandleAclPermission>
        </div>
        {showAddNotifForm && (
          <EditableNotifForm
            onSubmit={handleSubmitNewNotif}
            closeFormHandler={handleCloseAddNotifForm}
          />
        )}
        {organizationSections.map(section => (
          <NotifForm
            sectionData={section}
            key={section.id}
            editFormHandler={handleEditNotifForm}
            deleteFormHandler={handleDeleteNotifForm}
          />
        ))}
      </div>
    </div>
  );
};
export default withStyles(s)(NotificationCenter);
