import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';
import { CreateProfileDto } from '../dto';
@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.repository.create(createProfileDto);
    return await this.repository.save(profile);
  }

  async findById(id: string): Promise<Profile> {
    return this.repository.findOne({ where: { id } });
  }

  async updateProfile(id: string, data: Partial<Profile>): Promise<Profile> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
