import moment from 'moment-jalaali';
import convertToJalaliDate from '../../utils/date';

moment.locale('fa');
moment.loadPersian({ dialect: 'persian-modern' });

const useChartTranslate = ({ data: schema }) => {
  const skipped = (ctx, value) =>
    ctx.p0.skip || ctx.p1.skip ? value : undefined;

  const down = (ctx, value) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y && ctx.p0.parsed.x === ctx.p1.parsed.x
      ? value
      : undefined;

  const up = (ctx, value) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y && ctx.p0.parsed.x === ctx.p1.parsed.x
      ? value
      : undefined;

  const generateDataset = d => {
    const dataMap = [];
    d?.forEach(item => {
      const epochDate = parseInt(item.date.toString(), 10);
      const epochDataConverted = new Date(epochDate);
      const jdate = moment(epochDataConverted).format('jDD');
      dataMap.push({
        x: `${jdate} ${convertToJalaliDate(item?.date?.toString(), 'jMMMM')}`,
        y: item.totalAssetAmount,
      });
    });
    return dataMap;
  };

  // const generateLables = l => {
  //   const labels = [];
  //   l.forEach(item => {
  //     const epochDate = parseInt(item.date.toString(), 10);
  //     const epochDataConverted = new Date(epochDate);
  //     const jdate = moment(epochDataConverted).format('jYYYY/jMM/jDD');
  //     labels.push(
  //       `${convertToJalaliDate(item?.date?.toString(), 'jMMMM')} ${jdate}`,
  //     );
  //   });
  //   return labels;
  // };

  const data = {
    datasets: [
      {
        data: generateDataset(schema),
        borderColor: 'rgb(207 222 237)',
        stepped: true,
        segment: {
          borderColor: ctx => down(ctx, '#ff5252') || up(ctx, '#00b4ad'),
          borderDash: ctx => skipped(ctx, [6, 6]),
        },
      },
    ],
  };

  return {
    chartData: data,
  };
};
export default useChartTranslate;
