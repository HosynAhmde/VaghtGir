import { Repository, FindOptionsWhere, DeepPartial } from "typeorm";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { createPaginationMetadata } from "@Common/utils";
import { ItemsWithMetadata } from "@Common/interfaces";
import { TWhereQuery } from "@Common/decorators";

export class BaseRepository<T> extends Repository<T> {
    constructor(protected readonly repository: Repository<T>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findWithPagination(
        filter: PaginationDto,
        where: TWhereQuery,
        relations?: string[]
    ): Promise<ItemsWithMetadata<T>> {
        const { limit, page, skip } = filter;
        const [items, count] = await this.repository.findAndCount({
            take: limit,
            skip,
            where: {
                ...where[0]
            },
            relations
        });
        const metadata = createPaginationMetadata(count, limit, page);
        return { items, metadata };
    }

    async findById(id: string): Promise<T | null> {
        return await this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
    }

    async createWithCreatedBy(entity: DeepPartial<T>, createdById: string): Promise<T> {
        const newEntity = this.repository.create({
            ...entity,
            createdBy: createdById
        } as DeepPartial<T>);
        return await this.repository.save(newEntity);
    }
}
