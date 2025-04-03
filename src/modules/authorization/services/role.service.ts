import { Injectable } from "@nestjs/common";
import { BaseService } from "@Common/services/base.service";
import { Role } from "../entity/role.entity";
import { RoleRepository } from "../repositories/role.repository";

@Injectable()
export class RoleService extends BaseService<Role> {
    constructor(private readonly roleRepository: RoleRepository) {
        super(roleRepository);
    }
}
