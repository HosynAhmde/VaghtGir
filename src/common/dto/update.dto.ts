export class UpdateDto<T> {
  updatedBy: string;

  updatedAt: Date;

  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}