import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartsModule } from './modules/parts/parts.module';
import { RevisionsModule } from './modules/revisions/revisions.module';
import { TeamModule } from './modules/team/team.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    PartsModule,
    RevisionsModule,
    TeamModule,
    ClientsModule,
    SuppliersModule,
    DashboardModule,
  ],
})
export class AppModule {}

