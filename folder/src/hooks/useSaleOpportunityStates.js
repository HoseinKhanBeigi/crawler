import { useEffect, useState } from 'react';
import { saleOpportunityServices } from '../service/saleOpportunityService';

const generateSaleStatesColor = code => {
  switch (code) {
    case 'WON':
      return 'cyan';
    case 'LOST':
      return 'red';
    default:
      return 'blue';
  }
};

const useSaleOpportunityStates = () => {
  const [saleStates, setSaleStates] = useState([]);
  useEffect(() => {
    (async () => {
      const saleOpportunityStates = await saleOpportunityServices.getAllSaleOpportunityStates();
      const { result } = saleOpportunityStates;
      const saleStateWithColor = result.map(state => ({
        ...state,
        color: generateSaleStatesColor(state.code),
      }));
      setSaleStates(saleStateWithColor);
    })();
  }, []);
  return saleStates;
};
export default useSaleOpportunityStates;
