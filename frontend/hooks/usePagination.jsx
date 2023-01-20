const usePagination = ({ currentPage, totalCount, pageSize }) => {
  const last = Math.ceil(totalCount / pageSize);
};

export default usePagination;
