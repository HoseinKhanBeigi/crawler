import { useEffect, useState } from 'react';
import useCrmUsers from '../../../hooks/useCrmUsers';

const useSessionForm = (getFullSearchAction, getTemplatesAction) => {
  const [sessionForUsersList, setSessionForUsersList] = useState([]);
  const { crmUsers } = useCrmUsers(['OPERATOR']);
  const [attendeesList, setAttendeesList] = useState([]);

  useEffect(() => {
    getTemplatesAction('SESSION');
  }, []);

  const handleSessionForSearch = async value => {
    if (value) {
      const searchData = await getFullSearchAction(value, false);
      if (searchData) {
        setSessionForUsersList(searchData.content);
      }
    } else {
      setSessionForUsersList([]);
    }
  };
  const handleAttendeesSearch = async value => {
    if (value) {
      const searchData = await getFullSearchAction(value, false);
      if (searchData) {
        setAttendeesList(searchData.content);
      }
    } else {
      setAttendeesList([]);
    }
  };
  return {
    sessionForUsersList,
    crmUsers,
    attendeesList,
    handleAttendeesSearch,
    handleSessionForSearch,
  };
};
export default useSessionForm;
