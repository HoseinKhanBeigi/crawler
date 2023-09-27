import request from '../utils/request';

// GET /api/v3/{context}/dashboard/cardList/products
const getDashboardCards = (interval = 'MONTHLY') =>
  request({
    url: 'dashboard/cardList/products',
    params: {
      interval,
    },
  }).get({
    message: {
      error: 'خطای دریافت اطلاعات داشبورد',
    },
  });

export default {
  getDashboardCards,
};
