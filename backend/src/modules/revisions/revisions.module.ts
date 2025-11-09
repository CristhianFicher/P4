import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionsController } from './revisions.controller';
import { RevisionsService } from './revisions.service';
import { Revision } from './revision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revision])],
  controllers: [RevisionsController],
  providers: [RevisionsService],
})
export class RevisionsModule {}

