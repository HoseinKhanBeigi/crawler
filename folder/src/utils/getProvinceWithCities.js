import {
  BASE_VARIABLE_KEYS,
  BasicFetchData,
  resolveVariable,
} from '../serviceConfig';

export const getProvinceWithCities = async () => {
  const options = {
    headers: {
      'Application-Name': 'CRM',
      'App-Name': 'KIAN_CITIES',
    },
  };
  const data = await BasicFetchData(
    fetch,
    `${resolveVariable(BASE_VARIABLE_KEYS.CONFIGURATION)}/configurations`,
    options,
  );
  const cities = data?.resp?.values?.cities.map(item => ({
    ...item,
    text: item.name,
  }));
  const provinces = data?.resp?.values?.provinces.map(item => ({
    ...item,
    text: item.name,
  }));
  return { provinces, cities };
};
