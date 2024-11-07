import { PaginationDto } from "@/types/common";

const DEFAULT_PAGE_SIZE = 10;

export const convertPagination = (
  pageIndex?: number,
  pageSize?: number,
  sorting?: string
): PaginationDto => {
  const skipCount = ((pageIndex || 1) - 1) * (pageSize || DEFAULT_PAGE_SIZE);
  const maxResultCount = pageSize || DEFAULT_PAGE_SIZE;

  return {
    skipCount,
    maxResultCount,
    sorting,
  };
};
