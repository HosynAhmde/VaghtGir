import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repository';
import { User } from '../entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginationService } from '@Common/modules/pagination/service';
import { PaginationDto } from '@Common/modules/pagination/dto/inedx';
import { UserSerializer } from '../serializers/user.serializer';
import { paginateAndSerialize } from '@Common/modules/pagination/helper/pagination.helper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,private readonly paginationService:PaginationService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }

  async findAllUsers(paginationDto: PaginationDto) {
    const paginationOptions = this.paginationService.getPaginationOptions(paginationDto);

   const [items,totalItems]=await Promise.all([
    this.userRepository.findAllUsers({skip:paginationOptions.skip,take:paginationOptions.limit}),
    this.userRepository.count()
   ])
   return this.paginationService.createPaginationResponse(
      items,
      totalItems,
      paginationOptions,
    );

  }

  async findByPhone(phone: string): Promise<User> {
    return this.userRepository.findByPhone(phone);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findUserByPhone(phone);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(id, user);
  }
}
