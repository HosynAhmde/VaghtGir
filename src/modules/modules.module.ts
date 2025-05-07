import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
@Module({
  imports: [UserModule,AuthModule],
})
export class Modules {}
