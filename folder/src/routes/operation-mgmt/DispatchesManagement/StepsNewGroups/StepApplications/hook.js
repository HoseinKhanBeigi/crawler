import { useEffect, useState } from 'react';
import PropType from 'prop-types';
import {
  getAplicationsDispatchGroup,
  updateDispatchGroup,
} from '../../../../../service/dispatchGroupServices';

const useSelectApplications = (onNextStep, data) => {
  const [selectedApp, setSelectedApp] = useState([]);
  const [appList, setAppList] = useState([]);
  const onSubmit = async () => {
    await updateDispatchGroup({
      id: data?.current?.id,
      applications: selectedApp.map(item => ({ id: item.id })),
    });
    onNextStep({ applications: selectedApp });
  };
  const getApplicationList = async () => {
    const response = await getAplicationsDispatchGroup();
    if (response?.result) setAppList(response.result);
  };
  useEffect(() => {
    getApplicationList();
  }, []);

  const onChangeStatus = (e, item) => {
    if (e.target.checked === true)
      setSelectedApp(prev => [...prev, { name: item.name, id: item.id }]);
    if (e.target.checked === false)
      setSelectedApp(prev => prev.filter(({ id }) => id !== item.id));
  };
  return { applications: appList, onChangeStatus, selectedApp, onSubmit };
};
useSelectApplications.propTypes = {
  onNextStep: PropType.func.isRequired,
  data: PropType.object.isRequired,
};
export default useSelectApplications;
