import { useEffect, useRef, useState } from 'react';
import IndexedDb from '../utils/IndexedDb';
import { getProvinceWithCities } from '../utils/getProvinceWithCities';
import { asyncPipeline } from '../utils/pipeline';

const ProvinceAndCitiesDBName = 'ProvinceAndCitiesStore';
const ProvinceAndCitiesDBVersion = 1;
const citiesStoreName = 'cities';
const provincesStoreName = 'provinces';

const sortServerData = data => {
  const sortData = list => list.sort((a, b) => a.name.localeCompare(b.name));
  return {
    cities: sortData(data.cities),
    provinces: sortData(data.provinces),
  };
};

const createObjectStoresIfNotExists = db => {
  db.createObjectStore(citiesStoreName, { autoIncrement: true });
  db.createObjectStore(provincesStoreName, { autoIncrement: true });
};

const cacheResultInIndexedDB = dbInstance => async data => {
  await Promise.all([
    dbInstance.addAll(data.cities)(citiesStoreName),
    dbInstance.addAll(data.provinces)(provincesStoreName),
  ]);
  return data;
};

const getProvincesAndCitiesFromServer = async () => {
  try {
    const data = await getProvinceWithCities();
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const requestForDbInstance = async () =>
  new IndexedDb(
    ProvinceAndCitiesDBName,
    ProvinceAndCitiesDBVersion,
    createObjectStoresIfNotExists,
  );

const useProvincesAndCities = () => {
  const [data, setData] = useState({
    cities: [],
    provinces: [],
  });
  const [loading, setLoading] = useState(false);
  const dbInstanceRef = useRef();

  const startLoading = () => setLoading(true);
  const saveDbInstance = dbInstance => {
    dbInstanceRef.current = dbInstance;
    return dbInstance;
  };
  const retrieveDbData = async dbInstance =>
    Promise.all([
      dbInstance.getAll(citiesStoreName),
      dbInstance.getAll(provincesStoreName),
    ]);
  const handleData = async dbData => {
    const haveDataInDB = dbData.every(list => list.length);
    if (haveDataInDB) {
      const [citiesListFromDB = [], provincesListFromDB = []] = dbData;
      setData({
        cities: citiesListFromDB,
        provinces: provincesListFromDB,
      });
    } else {
      await asyncPipeline(
        getProvincesAndCitiesFromServer,
        sortServerData,
        cacheResultInIndexedDB(dbInstanceRef.current),
        setData,
      )();
    }
  };

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await asyncPipeline(
        startLoading,
        requestForDbInstance,
        saveDbInstance,
        retrieveDbData,
        handleData,
        stopLoading,
      )();
    })();
  }, []);

  const filter = type => {
    const storeNames = {
      province: provincesStoreName,
      city: citiesStoreName,
    };
    const statePropertyName = {
      province: 'provinces',
      city: 'cities',
    };
    return async filterCallback => {
      if (dbInstanceRef.current) {
        const searchDbData = async callback =>
          dbInstanceRef.current.search(storeNames[type])(callback);
        const setSearchedData = filteredItems => {
          setData(prevState => ({
            ...prevState,
            [statePropertyName[type]]: filteredItems,
          }));
          return filteredItems;
        };
        return asyncPipeline(searchDbData, setSearchedData)(filterCallback);
      }
      return [];
    };
  };

  const filterCities = filter('city');

  const filterProvinces = filter('province');

  return {
    loading,
    filterCities,
    filterProvinces,
    ...data,
  };
};

export default useProvincesAndCities;
