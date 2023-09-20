import { useState } from 'react';
import useLeadSearch from '../../../hooks/useLeadSearch';
import useProvincesAndCities from '../../../hooks/useProvincesAndCities';

const useUnit = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchLeadResult, onSearchLead] = useLeadSearch();
  const { provinces, filterCities } = useProvincesAndCities();

  const filterCitiesBasedOnProvince = async selected => {
    const filtered = await filterCities(city => city.province_id === selected);
    setSelectedCities(filtered);
  };

  return {
    cities: selectedCities,
    searchLeadResult,
    provinces,
    searchLeadHandler: onSearchLead,
    filterCitiesHandler: filterCitiesBasedOnProvince,
  };
};
export default useUnit;
