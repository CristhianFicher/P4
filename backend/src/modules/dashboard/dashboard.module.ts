import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { Part } from '../parts/part.entity';
import { Revision } from '../revisions/revision.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Revision, Client])],
  controllers: [DashboardController],
})
export class DashboardModule {}

