export interface IPaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
