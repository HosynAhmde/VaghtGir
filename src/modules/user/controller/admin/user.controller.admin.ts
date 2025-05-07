import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Action, Resource } from '@Common/constants';
import { AuthGuard, PolicyGuard } from '@Common/guards';

import { UserService } from '../../service';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { SetPolicy, SetResource } from '@Common/metadata';
import { UserSerializer, UsersSerializer } from '@Modules/user/serializers';
import { PaginationDto } from '@Common/modules/pagination/dto/pagination.dto';
import { ApiGetUsers,ApiCreateUser, ApiGetUserById, ApiUpdateUser, ApiDeleteUser } from '@Modules/user/doc';


@ApiTags('Admin - Users')
@Controller('admin/users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard,PolicyGuard)
@SetResource(Resource.User)
@ApiBearerAuth()
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreateUser()
  @SetPolicy(Action.Create)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserSerializer> {
    return UserSerializer.build(await this.userService.createUser(createUserDto));
  }

  @Get()
  @ApiGetUsers()
  @SetPolicy(Action.Read)
  async findAll(@Query() paginationDto: PaginationDto): Promise<UsersSerializer> {
    return UsersSerializer.build(await this.userService.findAllUsers(paginationDto));
  }

  @Get(':id')
  @ApiGetUserById()
  @SetPolicy(Action.Read)
  async findById(@Param('id') id: string): Promise<UserSerializer> {
    return UserSerializer.build(await this.userService.findUserById(id));
  }

  @Put(':id')
  @ApiUpdateUser()
  @SetPolicy(Action.Update)
  async update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserSerializer> {
    return UserSerializer.build(await this.userService.updateUser(id, updateUserDto));
  }

  @Delete(':id')
  @ApiDeleteUser()
  @SetPolicy(Action.Delete)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
