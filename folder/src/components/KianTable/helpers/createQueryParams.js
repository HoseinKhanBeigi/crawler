import { pageSizeInTableList } from '../../../webConfig';

// TODO: OMG! Scary helper! Please clean it ;)

export const createFilterParams = filterObject =>
  Object.keys(filterObject)
    .filter(item => filterObject[item] && String(filterObject[item]).length)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(filterObject[key])}`,
    )
    .join('&');

const addPaginationParams = pageInfo => {
  const page = pageInfo.current - 1;

  return `page=${page}&size=${pageInfo.pageSize}&`;
};

const cleanQueryParams = params =>
  params.endsWith('&') ? params.slice(0, -1) : params;

const addFilterParams = (params, filterParams) => `${params}${filterParams}&`;

const addSorterParams = (params, sorter) =>
  `${params}sortField=${sorter.field}&sortDirection=${
    sorter.order === 'ascend' ? 'ASC' : 'DESC'
  }&`;

export default function createQueryParams(pageInfo, filterParams, sorter) {
  let params = `page=0&size=${pageSizeInTableList}&`;
  if (pageInfo) params = addPaginationParams(pageInfo); // reAssign pagination params here, if page info was sent to this function, otherwise we keep default pagination params
  if (filterParams) params = addFilterParams(params, filterParams); // add filter params that returned from SearchBox here
  if (sorter && sorter.column) params = addSorterParams(params, sorter); // add sorter params
  return cleanQueryParams(params);
}
