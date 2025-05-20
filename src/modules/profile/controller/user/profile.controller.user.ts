import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { ProfileService } from '../../service/profile.service';
import { CreateProfileDto } from '../../dto/create-profile.dto';
import { UpdateProfileDto } from '../../dto/update-profile.dto';
import { AuthGuard } from '@Common/guards/jwt.guard';
import { Resource } from '@Common/constants';
import { ApiTags } from '@nestjs/swagger';
import { PolicyGuard } from '@Common/guards';
import { SetResource, SetPolicy } from '@Common/metadata';
import { Action } from '@Common/constants';
import { ApiGetProfileById } from '../../doc/get-user-biy-id.doc';

@Controller({ path: 'api/profiles', version: '1' })
@ApiTags('User - Profiles')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard,PolicyGuard)
@SetResource(Resource.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @SetPolicy(Action.Read)
  @ApiGetProfileById()
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.findById(id);
  }

  @Patch(':id')
  @SetPolicy(Action.Update)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @SetPolicy(Action.Delete)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.delete(id);
  }
}
