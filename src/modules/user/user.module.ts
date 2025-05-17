import { Module } from "@nestjs/common";
import { UserAdminController } from "./controller/admin";
import { UserService } from "./service";
import { UserRepository } from "./repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity";
import { PaginationModule } from "@Common/modules/pagination";
import { ProfileModule } from "@Modules/profile/profile.module";

@Module({
  controllers:[UserAdminController],
  imports:[
    PaginationModule,
    TypeOrmModule.forFeature([User]),
    ProfileModule
  ],
  exports:[UserRepository,UserService],
  providers:[
    UserService,
    UserRepository
  ]
})
export class UserModule {}
