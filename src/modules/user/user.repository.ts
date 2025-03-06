import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { createPaginationMetadata } from "@Common/utils";
import { ItemsWithMetadata } from "@Common/interfaces";
import { TWhereQuery } from "@Common/decorators";


export class UserRepository extends Repository<UserEntity>{
    constructor(@InjectRepository(UserEntity) private userRepository:Repository<UserEntity>){
        super(userRepository.target,userRepository.manager,userRepository.queryRunner);
    }
    async createUser(userDto:UserDto):Promise<UserEntity>{
        const user=await this.userRepository.create({
            ...userDto
        })
        const newUser= await this.userRepository.save(user);
        newUser.createdBy=newUser.id
        return await this.userRepository.save(newUser)        
    }

    async findUsers(filter:PaginationDto,where:TWhereQuery):Promise<ItemsWithMetadata<UserEntity>>{    
       const {limit,page,skip}=filter;
                const[user,count]=await this.userRepository.findAndCount({
                    take:limit,
                    skip,
                    where:{
                        ...where[0]
                    }
                });
                const metadata=createPaginationMetadata(count,limit,page);
                return {items:user,metadata};
    }

    async findUserById(id:string):Promise<UserEntity>{
        return await this.userRepository.findOneBy({id});
    }

    async findUserByPhone(phone:string):Promise<UserEntity>{
        return await this.userRepository.findOneBy({phone});
    }
}