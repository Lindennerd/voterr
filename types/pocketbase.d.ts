export interface ListRequest<T> {
  page: number;
  perPage: number;
  totalItems: number;
  items: T[];
}
