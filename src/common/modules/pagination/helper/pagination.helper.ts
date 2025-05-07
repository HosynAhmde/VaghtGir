import { PaginationResponseSerializer } from "../serializer/pagination.serializer";

export async function paginateAndSerialize<T, S>(
  findItems: () => Promise<T[]>,
  countItems: () => Promise<number>,
  page: number,
  limit: number,
  serializer: new (entity: T) => S
): Promise<PaginationResponseSerializer<S>> {
  const [items, totalItems] = await Promise.all([findItems(), countItems()]);

  return new PaginationResponseSerializer<S>(
    {
      items: items.map(item => new serializer(item)),
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    },
    serializer
  );
}