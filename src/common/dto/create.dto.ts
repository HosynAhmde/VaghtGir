export class CreateDto<T> {
  createdBy: string;

  createdAt?: Date;


  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, data);
  }
}