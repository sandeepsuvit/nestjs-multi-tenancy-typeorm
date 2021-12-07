import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private playerService: PlayerService) {}

    @Get('/')
    async getAllPlayers() {
        return await this.playerService.getAllPlayers();
    }
}
