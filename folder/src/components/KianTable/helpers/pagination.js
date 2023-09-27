export const configPagination = (data, setPagination, currentPagination) => {
  const {
    pageable: { pageNumber, pageSize },
  } = data;

  setPagination({
    ...currentPagination,
    current: pageNumber + 1, // should add 1 to it to works with table pagination, our api pagination starts with 0 but table starts with 1
    total: data.totalElements,
    pageSize,
  });
};
