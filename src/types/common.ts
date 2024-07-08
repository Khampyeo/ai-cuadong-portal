export type PagedAndSortedResultRequestDto = {
  sorting?: string;
  skipCount?: number;
  maxResultCount: number;
};

export type PagedResultDto<T> = {
  totalCount: number;
  items: T[];
};

export interface IParamsList {
  sorting?: string;
  skipCount: number;
  maxResultCount: number;
}

export type PaginationType = {
  page: number;
  size: number;
};
