import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { MasterService } from './master.service';
import { District } from './entities/district.entity';
import { Gender } from './entities/gender.entity';
import { Role } from './entities/role.entity';
import { GroupType } from './entities/group_type.entity';
import { CreateGroupTypeDto, UpdateGroupTypeDto } from './dto';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  // Districts
  @Get('districts')
  async findAllDistricts(): Promise<District[]> {
    return await this.masterService.findAllDistricts();
  }

  @Get('districts/state/:state_id')
  async findDistrictsByState(
    @Param('state_id', ParseIntPipe) state_id: number,
  ): Promise<District[]> {
    return await this.masterService.findDistrictsByState(state_id);
  }

  // Gender
  @Get('gender')
  async findAllGenders(): Promise<Gender[]> {
    return await this.masterService.findAllGenders();
  }

  // Roles
  @Get('roles')
  async findAllRoles(): Promise<Role[]> {
    return await this.masterService.findAllRoles();
  }

  // Group Types
  @Get('group-types')
  async findAllGroupTypes(): Promise<GroupType[]> {
    return await this.masterService.findAllGroupTypes();
  }

  @Get('group-types/:id')
  async findGroupTypeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GroupType> {
    return await this.masterService.findGroupTypeById(id);
  }

  @Post('group-types')
  async createGroupType(
    @Body() createGroupTypeDto: CreateGroupTypeDto,
  ): Promise<GroupType> {
    return await this.masterService.createGroupType(createGroupTypeDto);
  }

  @Put('group-types/:id')
  async updateGroupType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupTypeDto: UpdateGroupTypeDto,
  ): Promise<GroupType> {
    return await this.masterService.updateGroupType(id, updateGroupTypeDto);
  }

  @Delete('group-types/:id')
  async deleteGroupType(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.masterService.deleteGroupType(id);
  }
}