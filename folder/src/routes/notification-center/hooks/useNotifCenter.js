import { useEffect, useState } from 'react';
import { notifCenterServices } from '../../../service/notificationCenterService';

const useNotifCenter = () => {
  const [showAddNotifForm, setShowAddNotifForm] = useState(false);
  const [organizationSections, setOrganizationSections] = useState([]);
  useEffect(() => {
    notifCenterServices.getAllOrganizationSections().then(response => {
      setOrganizationSections(response.content);
    });
  }, []);

  const handleShowAddNotifForm = () => setShowAddNotifForm(true);

  const handleSubmitNewNotif = sectionData => {
    notifCenterServices.addNewOrganizationSection(sectionData).then(res => {
      const { communicationList, id, name } = res;
      const cloneState = [...organizationSections];
      cloneState.unshift({ communicationList, id, name });
      setOrganizationSections(cloneState);
      setShowAddNotifForm(false);
    });
  };

  const handleEditNotifForm = (sectionData, closeEditMode) => {
    notifCenterServices.editOrganizationSection(sectionData).then(() => {
      const cloneState = [...organizationSections];
      cloneState[
        cloneState.findIndex(section => section.id === sectionData.id)
      ] = sectionData;
      setOrganizationSections(cloneState);
      closeEditMode();
    });
  };
  const handleDeleteNotifForm = id => {
    notifCenterServices.deleteOrganizationSection(id).then(() => {
      const cloneState = [...organizationSections];
      cloneState.splice(
        cloneState.findIndex(section => section.id === id),
        1,
      );
      setOrganizationSections(cloneState);
    });
  };

  const handleCloseAddNotifForm = () => setShowAddNotifForm(false);
  return {
    handleCloseAddNotifForm,
    handleDeleteNotifForm,
    handleShowAddNotifForm,
    handleEditNotifForm,
    handleSubmitNewNotif,
    organizationSections,
    showAddNotifForm,
  };
};

export default useNotifCenter;
