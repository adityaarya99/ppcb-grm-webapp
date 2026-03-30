import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrievancesController } from './grievances.controller';
import { GrievancesService } from './grievances.service';
import { Grievance } from './grievance.entity';
import { PublicAccessModule } from '../public-access/public-access.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Grievance]), PublicAccessModule,AuthModule],
  controllers: [GrievancesController],
  providers: [GrievancesService],
})
export class GrievancesModule {}

