export interface ItemsWithMetadata<T = any> {
  items: T[];
  metadata?: Metadata;
}

export interface Metadata {
  count: number;
  page: number;
  pages: number;
  nextPage: number;
  prevPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
