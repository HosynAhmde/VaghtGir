import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { UserSerializer, UsersSerializer } from "./serializers";
import { AuthorityInterceptor, QueryParserInterceptor, SetCreatedByInterceptor } from "@Common/interceptors";
import { Filter } from "@Common/decorators/filter.decorator";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { UserEntity } from "./entity";
import { ResourceAction } from "@Common/decorators";
import { Action, Resource } from "@Common/constants";

@Controller('user')
@UseInterceptors(QueryParserInterceptor, ClassSerializerInterceptor)
export class UserController{
 constructor(private userService:UserService){}
 
 @Post()
 @UseInterceptors(AuthorityInterceptor,SetCreatedByInterceptor)
 @ResourceAction(Resource.User, Action.Create)
    async createUser(@Body() user:UserDto):Promise<UserSerializer>{
        return UserSerializer.build(await this.userService.createUser(user));
        
    }
    @Get()
    async findUsers(@Filter() filter:PaginationDto):Promise<UsersSerializer>{        
        return UsersSerializer.build(await this.userService.findUsers(filter));
    }
}