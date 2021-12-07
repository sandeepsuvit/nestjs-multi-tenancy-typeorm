import { Controller } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}
}
