export const convertPagination = (
  pageNo: number,
  pageSize: number,
  sorting?: string
) => {
  const skipCount = (pageNo - 1) * pageSize;
  const maxResultCount = pageSize;

  return {
    skipCount,
    maxResultCount,
    sorting,
  };
};
