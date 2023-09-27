import React, { useEffect, useState } from 'react';
import dashboardService from '../../../../service/dashboardService';
import GeneralInfoCards from '../../../../components/GeneralInfoCards/GeneralInfoCards';

const GeneralInfoCardsContainer = () => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    dashboardService.getDashboardCards().then(({ result }) => {
      setCards(result);
    });
  }, []);

  return <GeneralInfoCards cards={cards} skeletonNumbers={5} />;
};

export default GeneralInfoCardsContainer;
