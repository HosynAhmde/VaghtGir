import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from '../repository/profile.repository';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async create(userId: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profileRepository.createProfile({
      ...createProfileDto,
      createdBy: userId,
    });
  }

  async findById(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findById(id);
    return await this.profileRepository.updateProfile(id, updateProfileDto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.profileRepository.deleteProfile(id);
  }
}
