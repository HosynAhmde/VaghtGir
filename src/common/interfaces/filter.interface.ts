export interface Pagination<K = any> {
  skip: number;
  limit: number;
  page: number;
  
}

export interface Query{
  createdBy?:string
  shares?:string
}

export interface Filter<T = any, K = T> {
  query: Query;
  pagination?: Pagination<K>;
}