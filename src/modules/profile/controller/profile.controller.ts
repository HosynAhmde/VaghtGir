import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from '../service/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

import { User } from '@Modules/user/entity/user.entity';
import { ProfileControllerDoc } from '../doc/profile.controller.doc';
import { Profile } from '../entity/profile.entity';


@Controller('profiles')
// @UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // create(@CurrentUser() user: User, @Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(user.id, createProfileDto);
  // }

  // @Get()
  // findOne(@CurrentUser() user: User) {
  //   return this.profileService.findById(user.id);
  // }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.profileService.findById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.delete(id);
  // }
}
