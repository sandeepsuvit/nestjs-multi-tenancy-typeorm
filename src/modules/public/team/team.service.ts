import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(TeamEntity) private teamRepository: Repository<TeamEntity>) { }
}
