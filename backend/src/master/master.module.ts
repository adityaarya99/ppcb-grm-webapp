import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { District } from './entities/district.entity';
import { Gender } from './entities/gender.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { GroupType } from './entities/group_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([District, Gender, Role, User, GroupType])],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}