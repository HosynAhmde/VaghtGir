import { Expose, Type } from 'class-transformer';
import { PaginationMetaSerializer } from './meta-data.serializer';

export class PaginationResponseSerializer<T> {
  @Expose()
  @Type((options) => options?.newObject?.itemType || Object)
  items: T[];

  @Expose()
  @Type(() => PaginationMetaSerializer)
  meta: PaginationMetaSerializer;

  constructor(partial: Partial<PaginationResponseSerializer<T>>, itemType?: Function) {
    Object.assign(this, partial);
    if (itemType) {
      (this as any).itemType = itemType;
    }
  }
}