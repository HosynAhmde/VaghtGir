import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./user.repository";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { ItemsWithMetadata } from "@Common/interfaces";
import { TWhereQuery } from "@Common/decorators";

@Injectable()
export class UserService{
    constructor(private userRepository: UserRepository) {}
    async createUser(user:UserDto):Promise<UserEntity>{
        return await this.userRepository.createUser(user);
    }

    async findUsers(whereQuery: TWhereQuery, filter?:PaginationDto):Promise<ItemsWithMetadata<UserEntity>>{
        return await this.userRepository.findUsers(filter,whereQuery);
        
    }

    async findUserById(id:string):Promise<UserEntity>{
        return await this.userRepository.findUserById(id);
    }

    async findUserByPhone(phone:string):Promise<UserEntity>{
        return await this.userRepository.findUserByPhone(phone);
    }
}