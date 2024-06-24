export interface IResponseListEntity<T> {
  status: number;
  data: {
    pageNo: number;
    pageSize: number;
    totalPages: number;
    data: T[];
  };
}
