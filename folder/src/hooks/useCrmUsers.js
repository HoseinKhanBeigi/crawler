import { useEffect, useState } from 'react';
import leadService from '../service/leadService';
import CPMessage from '../components/CP/CPMessage';

const useCrmUsers = (...aclCodes) => {
  const [crmUsers, setCrmUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCrmUserLead = () => {
    setLoading(true);
    leadService
      .getCrmUserLead(...aclCodes)
      .then(response => {
        setLoading(false);
        if (response.additionalInfo) {
          delete response.additionalInfo;
        }
        const crmUser = Object.values(response.result);
        setCrmUsers(crmUser);
      })
      .catch(() => {
        CPMessage('خطا در دریافت لیست حساب های سی آر ام!', 'error');
      });
  };

  useEffect(() => {
    getCrmUserLead();
  }, []);

  return {
    loading,
    crmUsers,
  };
};

export default useCrmUsers;
