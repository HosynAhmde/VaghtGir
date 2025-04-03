import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@Common/repositories/base.repository";
import { Role } from "../entity/role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
        super(roleRepository);
    }
}
