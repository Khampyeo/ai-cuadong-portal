export interface IResponseListEntity<T> {
  status: number;
  data: {
    totalPages: number;
    items: T[];
  };
}
