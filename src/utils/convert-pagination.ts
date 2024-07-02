export const convertPagination = (
  pageNo: number,
  pageSize: number,
  sorting?: string
) => {
  const SkipCount = (pageNo - 1) * pageSize;
  const MaxResultCount = pageSize;
  const Sorting = sorting;
  return { SkipCount, MaxResultCount, Sorting };
};
