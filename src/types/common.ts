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
  Sorting?: string;
  SkipCount: number;
  MaxResultCount: number;
}
