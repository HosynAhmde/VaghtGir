import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto";
import { UserSerializer, UsersSerializer } from "./serializers";
import { AuthorityInterceptor, QueryParserInterceptor, SetCreatedByInterceptor } from "@Common/interceptors";
import { Filter } from "@Common/decorators/filter.decorator";
import { PaginationDto } from "@Common/dto/pagination.dto";
import { User } from "./entity/user.entity";
import { ResourceAction, TWhereQuery, WhereQuery } from "@Common/decorators";
import { Action, Resource } from "@Common/constants";
import { AuthGuard, PolicyGuard } from "@Common/guards";
import { SetPolicy, SetResource } from "@Common/metadata";

@Controller('user')
@SetResource(Resource.User)
@UseGuards(AuthGuard, PolicyGuard)
@UseInterceptors(QueryParserInterceptor, ClassSerializerInterceptor)
export class UserController{
 constructor(private userService:UserService){}

 @Post()
 @UseInterceptors(AuthorityInterceptor,SetCreatedByInterceptor)
 @SetPolicy(Action.Create)
    // async createUser(@Body() user:UserDto):Promise<UserSerializer>{
    //     return UserSerializer.build(await this.userService.createUser(user));

    // }
    @Get()
    @SetPolicy(Action.Read)
    @UseInterceptors(AuthorityInterceptor)
    async findUsers(@Filter() filter:PaginationDto,@WhereQuery() whereQuery: TWhereQuery):Promise<UsersSerializer>{
        return UsersSerializer.build(await this.userService.findUsers(whereQuery, filter));
    }

    @Get(':id')
    @SetPolicy(Action.Read)
    @UseInterceptors(AuthorityInterceptor)
    async findUserById(id:string):Promise<UserSerializer>{
        return UserSerializer.build(await this.userService.findUserById(id));
    }
}