import { BasicFetchData } from '../serviceConfig';

export const getBanksList = async () => {
  const options = {
    headers: {
      'Application-Name': 'CRM',
      'App-Name': 'KIAN_DIGITAL',
    },
  };
  const data = await BasicFetchData(
    fetch,
    'https://api.kiandigital.com/configuration/api/v1/configurations',
    options,
  );
  return data?.resp?.values?.banks?.length ? data?.resp?.values?.banks : [];
};
