import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { createPaginationMetadata } from "@Common/utils";
import { ItemsWithMetadata } from "@Common/interfaces";
import { TWhereQuery } from "@Common/decorators";


export class UserRepository extends Repository<User>{
    constructor(@InjectRepository(User) private userRepository:Repository<User>){
        super(userRepository.target,userRepository.manager,userRepository.queryRunner);
    }
    async createUser(userDto: UserDto): Promise<User> {
        const user = this.userRepository.create({
            ...userDto,
            role: { id: parseInt(userDto.role) } // Convert role string to number for Role id
        });
        const newUser = await this.userRepository.save(user);
        const updatedUser = await this.userRepository.findOne({ where: { id: newUser.id } });
        if (updatedUser) {
            updatedUser.createdBy = updatedUser.id;
            return this.userRepository.save(updatedUser);
        }
        throw new Error('Failed to create user');
    }


    async findUsers(filter:PaginationDto,where:TWhereQuery):Promise<ItemsWithMetadata<User>>{
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

    async findUserById(id:string):Promise<User>{
        return await this.userRepository.findOneBy({id});
    }

    async findUserByPhone(phone:string):Promise<User>{
        return await this.userRepository.findOneBy({phone});
    }
}