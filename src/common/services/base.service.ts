import { BaseRepository } from "@Common/repositories/base.repository";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { ItemsWithMetadata } from "@Common/interfaces";
import { TWhereQuery } from "@Common/decorators";
import { DeepPartial } from "typeorm";

export class BaseService<T> {
    constructor(protected readonly repository: BaseRepository<T>) {}

    async findAll(
        filter: PaginationDto,
        where: TWhereQuery,
        relations?: string[]
    ): Promise<ItemsWithMetadata<T>> {
        return await this.repository.findWithPagination(filter, where, relations);
    }

    async findById(id: string): Promise<T | null> {
        return await this.repository.findById(id);
    }

    async create(data: DeepPartial<T>, createdById: string): Promise<T> {
        return await this.repository.createWithCreatedBy(data, createdById);
    }

    async update(id: string, data: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (!entity) return null;

        Object.assign(entity, data);
        return await this.repository.save(entity);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async exists(where: TWhereQuery): Promise<boolean> {
        const count = await this.repository.count({ where: where[0] });
        return count > 0;
    }
}
