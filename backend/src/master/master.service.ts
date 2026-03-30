import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { Gender } from './entities/gender.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { GroupType } from './entities/group_type.entity';
import { DISTRICT_SEED } from './data/districts.seed';
import { GENDER_SEED } from './data/gender.seed';
import { ROLE_SEED } from './data/role.seed';
import { USER_SEED } from './data/user.seed';
import { GROUP_TYPE_SEED } from './data/group-type.seed';

@Injectable()
export class MasterService implements OnModuleInit {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Gender)
    private genderRepository: Repository<Gender>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(GroupType)
    private groupTypeRepository: Repository<GroupType>,
  ) { }

  async onModuleInit() {
    await this.seedDistricts();
    await this.seedGender();
    await this.seedGroupTypes();
    await this.seedRoles();
    await this.seedUsers();
  }

  async seedDistricts() {
    const count = await this.districtRepository.count();
    if (count > 0) return;
    const districts = this.districtRepository.create(DISTRICT_SEED);
    await this.districtRepository.save(districts);
    console.log('Punjab districts seeded successfully');
  }

  async seedGender() {
    for (const item of GENDER_SEED) {
      const exists = await this.genderRepository.findOne({
        where: { name: item.name },
      });
      if (!exists) {
        const gender = this.genderRepository.create(item);
        await this.genderRepository.save(gender);
      }
    }
  }

  async seedRoles() {
    const count = await this.roleRepository.count();
    if (count > 0) return;
    const roles = this.roleRepository.create(ROLE_SEED);
    await this.roleRepository.save(roles);
    console.log('Roles seeded successfully');
  }
  async seedUsers() {
    const count = await this.userRepository.count();
    if (count > 0) return;
    const users = this.userRepository.create(USER_SEED);
    await this.userRepository.save(users);
    console.log('Users seeded successfully');
  }
  async seedGroupTypes() {
    const count = await this.groupTypeRepository.count();
    if (count > 0) return;
    const groupTypes = this.groupTypeRepository.create(GROUP_TYPE_SEED);
    await this.groupTypeRepository.save(groupTypes);
    console.log('Group types seeded successfully');
  }


  // Districts
  async findAllDistricts(): Promise<District[]> {
    return await this.districtRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }

  async findDistrictsByState(state_id: number): Promise<District[]> {
    return await this.districtRepository.find({
      where: { state_id: state_id, status: true },
      order: { name: 'ASC' },
    });
  }

  // Gender
  async findAllGenders(): Promise<Gender[]> {
    return await this.genderRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }

  // Group Types
  async findAllGroupTypes(): Promise<GroupType[]> {
    return await this.groupTypeRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }

  async findGroupTypeById(id: number): Promise<GroupType> {
    const data = await this.groupTypeRepository.findOne({ where: { id } });

    if (!data) {
      throw new Error('GroupType not found');
    }

    return data;
  }

  async createGroupType(data: Partial<GroupType>): Promise<GroupType> {
    const groupType: GroupType = this.groupTypeRepository.create(data);
    return await this.groupTypeRepository.save(groupType);
  }

  async updateGroupType(id: number, data: any): Promise<GroupType> {
    await this.groupTypeRepository.update(id, data);
    return await this.findGroupTypeById(id);
  }

  async deleteGroupType(id: number): Promise<void> {
    await this.groupTypeRepository.delete(id);
  }

  // Roles
  async findAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find({
      where: { status: true },
      order: { name: 'ASC' },
    });
  }
}