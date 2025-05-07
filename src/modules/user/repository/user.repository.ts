import { Repository } from "typeorm";
import { User } from "../entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async findByPhone(phone: string): Promise<User> {
    return this.findOne({ where: { phone } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.save(user);
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    await this.update({
      id
    }, user);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async findAllUsers(options: { skip: number; take: number }): Promise<User[]> {
    return this.find({
      skip: options.skip,
      take: options.take,
    });
  }

  async countAllUsers(): Promise<number> {
    return this.count();
  }

  async findUserById(id: string): Promise<User> {
    return this.findOne({ where: { id } });
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.findOne({ where: { phone } });
  }

}
