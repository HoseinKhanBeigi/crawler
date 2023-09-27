import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AsemanPanelGeneralInfoCards from '../AsemanPanelGeneralInfoCards/AsemanPanelGeneralInfoCards';
import ChartLoader from '../../../../components/ChartsRoot/ChartLoader/ChartLoader';
import { AsemanPanelContext } from '../../store';
import {
  getMockGeneralInfoCardsData,
  getMockStackedChartData,
} from '../../mock/services';
import {
  groupByFilters,
  groupByLevelOptionsNames,
} from '../../utils/groupBySchema';
import {
  mockChannels,
  mockProducts,
  mockProviders,
} from '../../mock/constants';

const StackedColumnChart = React.lazy(() => import('../StackedColumnChart'));
const categories = {
  [groupByLevelOptionsNames.PRODUCTS]: [mockProducts, 'کانال فروش'],
  [groupByLevelOptionsNames.SALE_CHANNELS]: [mockChannels, 'محصول'],
  [groupByLevelOptionsNames.PROVIDERS]: [mockProviders, 'محصول'],
};

const prepareDataForChart = data =>
  data.map(({ category, data: d }) => ({
    category: category.title,
    ...Object.fromEntries(d.map(({ title, value }) => [title, value])),
  }));

const AggregateChartContainer = ({ withoutLegend }) => {
  const { state } = useContext(AsemanPanelContext);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    setCards(null);
    getMockGeneralInfoCardsData().then(setCards);
  }, [state]);

  const service = useCallback(
    () =>
      getMockStackedChartData(
        categories[state.groupBy[groupByFilters.LEVEL]][0],
        categories[state.groupBy[groupByFilters.LEVEL]][1],
      ),
    [state],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AsemanPanelGeneralInfoCards cards={cards} />
      <div style={{ flexGrow: 1 }}>
        <ChartLoader>
          <StackedColumnChart
            withLegend={!withoutLegend}
            category="category"
            service={service}
            valuesTitle="اعداد به میلیارد ریال"
            dataTransformBeforeInject={prepareDataForChart}
          />
        </ChartLoader>
      </div>
    </div>
  );
};

AggregateChartContainer.propTypes = {
  withoutLegend: PropTypes.bool,
};

AggregateChartContainer.defaultProps = {
  withoutLegend: false,
};

export default AggregateChartContainer;
