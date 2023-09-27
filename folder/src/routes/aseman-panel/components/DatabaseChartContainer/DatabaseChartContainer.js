import React, { useCallback, useContext, useEffect, useState } from 'react';
import momentJalaali from 'moment-jalaali';
import {
  getMockGeneralInfoCardsData,
  getMockXYChartData,
} from '../../mock/services';
import { AsemanPanelContext } from '../../store';
import AsemanPanelGeneralInfoCards from '../AsemanPanelGeneralInfoCards/AsemanPanelGeneralInfoCards';
import {
  groupByFilters,
  groupByLevelOptionsNames,
  groupByTypeOptionsNames,
} from '../../utils/groupBySchema';
import {
  mockChannels,
  mockProducts,
  mockProviders,
} from '../../mock/constants';
import ChartLoader from '../../../../components/ChartsRoot/ChartLoader/ChartLoader';

const MultiSeriesDateAxisChart = React.lazy(() =>
  import('../MultiSeriesDateAxisChart'),
);

const selectChartData = data => data.data;

const convertShamsiDates = data =>
  data.map(d => ({
    ...d,
    date: new Date(
      momentJalaali(d.date, 'jYYYY/jMM/jDD').format('YYYY/MM/DD'),
    ).getTime(),
  }));

const categories = {
  [groupByLevelOptionsNames.PRODUCTS]: mockProducts,
  [groupByLevelOptionsNames.SALE_CHANNELS]: mockChannels,
  [groupByLevelOptionsNames.PROVIDERS]: mockProviders,
};

const DatabaseChartContainer = () => {
  const { state } = useContext(AsemanPanelContext);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    setCards(null);
    getMockGeneralInfoCardsData().then(setCards);
  }, [state]);

  const service = useCallback(
    () =>
      getMockXYChartData(
        categories[state.groupBy[groupByFilters.LEVEL]],
        state.groupBy[groupByFilters.TYPE] === groupByTypeOptionsNames.ISSUANCE,
      ),
    [state],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AsemanPanelGeneralInfoCards cards={cards} />
      <div style={{ flexGrow: 1 }}>
        <ChartLoader>
          <MultiSeriesDateAxisChart
            serviceCallback={service}
            dataTransformBeforeInject={data =>
              convertShamsiDates(selectChartData(data))
            }
            sortDate
            valueAxisTitle="اعداد به میلیارد ریال"
          />
        </ChartLoader>
      </div>
    </div>
  );
};

export default DatabaseChartContainer;
