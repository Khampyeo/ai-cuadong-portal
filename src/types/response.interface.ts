export interface IResponseListEntity<T> {
  status: number;
  data: {
    totalCount: number;
    items: T[];
  };
}
