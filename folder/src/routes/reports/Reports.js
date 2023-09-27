import React, { useEffect, useState } from 'react';
import KianTable from '../../components/KianTable';
import activityService from '../../service/activityService';
import { columns } from './columns';
import { searchData } from './searchData';
import { BASE_VARIABLE_KEYS, resolveVariable } from '../../serviceConfig';
import { REPORT_USER_ACTIVITY_TABLE } from '../../store/settings/settings.constants';
import { getProvinceWithCities } from '../../utils/getProvinceWithCities';
import history from '../../history';

const Reports = () => {
  const [actionTypes, setActionTypes] = useState({});
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const baseUrl = resolveVariable(BASE_VARIABLE_KEYS.BASE_URL);
  const url = `${baseUrl}/report/activity-parties`;
  useEffect(() => {
    activityService.getActivitiesActionTypes().then(response => {
      if (response.additionalInfo) {
        delete response.additionalInfo;
      }
      setActionTypes(response);
    });
    getProvinceWithCities().then(data => {
      const convertedCities = data?.cities?.map(c => ({
        value: c.id,
        text: c.name,
      }));
      const convertedProvinces = data?.provinces?.map(p => ({
        value: p.id,
        text: p.name,
      }));
      setCities(convertedCities);
      setProvinces(convertedProvinces);
    });
  }, []);

  const goToProfile = row => {
    const to = `/reports/${row?.levantId}`;
    history.push(to);
  };

  return (
    <>
      <KianTable
        searchData={searchData(cities, provinces, actionTypes)}
        endpoint={url}
        withSort={false}
        tableId={REPORT_USER_ACTIVITY_TABLE}
        columns={columns}
        onRowClick={goToProfile}
        persistInLocalStorage={false}
      />
    </>
  );
};

export default Reports;
