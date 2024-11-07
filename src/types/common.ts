export type PaginationDto = {
  sorting?: string;
  skipCount?: number;
  maxResultCount: number;
};

export type PagedResultDto<T> = {
  totalCount: number;
  items: T[];
};

export type PaginationData = {
  current?: number;
  pageSize?: number;
};

export type ResponseError = {
  error?: {
    details?: string;
    message?: string;
    validationErrors?: { message?: string }[];
  };
};
