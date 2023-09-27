import { useEffect, useReducer } from 'react';
import {
  getBranchCitiesDispatchGroup,
  getBranchesRepresentativeDispatchGroup,
  getRepresentativiesCityDispatchGroup,
} from '../../../../../../service/dispatchGroupServices';

const initialState = {
  loading: 'cities',
  active: [],
  cities: [],
  cityId: undefined,
  representativies: [],
  representativieSelected: [],
  branches: [],
  branchSelected: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'insertCities':
      return { ...state, loading: 'getCities', cities: action.payload };
    case 'insertRepresentative':
      return {
        ...state,
        branches: [],
        branchSelected: [],
        loading: 'representative',
        active: ['representative'],
        representativies: action.payload.dataSource,
        cityId: action.payload.cityId,
      };
    case 'insertBranch':
      return {
        ...state,
        branchSelected: [],
        active: ['representative', 'branch'],
        branches: action.payload,
      };
    case 'representativieSelected':
      return {
        ...state,
        representativieSelected: action.payload,
      };
    case 'branchSelected':
      return {
        ...state,
        branchSelected: action.payload,
      };
    case 'clear':
      return {
        ...state,
        representativies: [],
        branches: [],
        cityId: undefined,
        representativieSelected: [],
        branchSelected: [],
        active: [],
      };
    default:
      return state;
  }
};
const useSelectBranchInAddGroup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getCities = async () => {
    const response = await getBranchCitiesDispatchGroup();
    if (response?.result) {
      const dataSource = response.result.map(item => ({
        text: item.classifier,
        value: item.id,
      }));
      dispatch({ type: 'insertCities', payload: dataSource });
    }
  };
  const onCitySelect = async city => {
    if (state.cityId !== city) {
      const response = await getRepresentativiesCityDispatchGroup({}, city);
      if (response?.result) {
        const dataSource = response.result.map(item => ({
          text: item.name,
          value: item.id,
        }));
        dispatch({
          type: 'insertRepresentative',
          payload: { dataSource, cityId: city },
        });
      }
    }
  };
  const onRepresentativeSelect = async representativies => {
    if (representativies.length > 0) {
      const response = await getBranchesRepresentativeDispatchGroup(
        {},
        representativies.join(),
      );
      if (response?.result) {
        const dataSource = response.result.map(item => ({
          text: item.name,
          value: item.code,
        }));
        dispatch({ type: 'insertBranch', payload: dataSource });
      }
    }
  };

  const onRepresentativieSelected = async representativie => {
    dispatch({ type: 'representativieSelected', payload: representativie });
  };

  const onBranchSelected = async branch => {
    dispatch({ type: 'branchSelected', payload: branch });
  };
  const onClear = async () => {
    dispatch({ type: 'clear' });
  };
  useEffect(() => {
    getCities();
  }, []);

  return {
    loading: state.loading,
    active: state.active,
    cities: state.cities,
    cityId: state.cityId,
    representativies: state.representativies,
    representativieSelected: state.representativieSelected,
    branches: state.branches,
    branchSelected: state.branchSelected,
    onCitySelect,
    onRepresentativeSelect,
    onRepresentativieSelected,
    onBranchSelected,
    onClear,
  };
};
export default useSelectBranchInAddGroup;
