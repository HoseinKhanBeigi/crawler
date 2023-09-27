const randNum = offset => Math.floor(Math.random() * offset);

/* eslint-disable no-plusplus */

export const getMockXYChartData = (categories, negative) =>
  new Promise(resolve => {
    const data = {
      categories,
      data: [],
    };
    const lastNum = {};
    for (let i = 10; i <= 12; i++) {
      for (let j = 1; j < 30; j++) {
        data.data.push({
          date: `1400/${i.toString().padStart(2, '0')}/${j
            .toString()
            .padStart(2, '0')}`,
          ...Object.fromEntries(
            data.categories.map(item => {
              const randNumber = randNum(500);
              if (!lastNum[item.code]) {
                lastNum[item.code] = 0;
              }
              if (randNumber % 5) {
                // eslint-disable-next-line no-unused-expressions
                negative
                  ? (lastNum[item.code] -= randNumber)
                  : (lastNum[item.code] += randNumber);
              } else {
                lastNum[item.code] = randNumber;
              }
              return [
                item.code,
                randNumber + (lastNum[item.code] - randNum(lastNum[item.code])),
              ];
            }),
          ),
        });
      }
    }
    setTimeout(() => {
      resolve(data);
    }, 200);
  });

export const getMockStackedChartData = (categories, faType) =>
  new Promise(resolve => {
    const data = [];
    categories.forEach(({ code, title }) => {
      const category = { name: code, title };
      const categoryData = [...new Array(4)].map((_, index) => ({
        name: `TEST_${index}`,
        title: `${faType} ${index + 1}`,
        value: randNum(1000),
      }));
      data.push({ category, data: categoryData });
    });
    setTimeout(() => {
      resolve(data);
    }, 200);
  });

const generateMockCardsData = () => [
  {
    count: randNum(100000000),
    faName: 'مبلغ کل (ریال)',
    name: 'total_amount',
  },
  {
    count: randNum(10),
    faName: 'کانال‌های فروش',
    name: 'total_sale_channels',
  },
  {
    count: randNum(10),
    faName: 'محصولات',
    name: 'total_products',
  },
  {
    count: randNum(5000),
    faName: 'افراد فعال شده',
    name: 'activeUser',
  },
];

export const getMockGeneralInfoCardsData = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(generateMockCardsData());
    }, 300);
  });
