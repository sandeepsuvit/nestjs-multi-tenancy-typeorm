import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), JwtModule.register({ secret: 'secret' })],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule { }
