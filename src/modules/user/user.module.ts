import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserRepository,UserService],
    controllers: [UserController],
    exports: [UserRepository,UserService]
})
export class UserModule{}