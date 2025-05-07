import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { IPaginationOptions, IPaginationResponse } from '../interface/pagination.interface';


@Injectable()
export class PaginationService {
  getPaginationOptions(paginationDto: PaginationDto): IPaginationOptions {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
    };
  }

  createPaginationResponse<T>(
    items: T[],
    totalItems: number,
    options: IPaginationOptions,
  ): IPaginationResponse<T> {
    const { page, limit } = options;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }
}
