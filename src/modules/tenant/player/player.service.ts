import { Injectable, Inject } from '@nestjs/common';
import { PlayerEntity } from './player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
    playerRepository: Repository<PlayerEntity>;

    constructor(@Inject('CONNECTION') connection) {
        this.playerRepository = connection.getRepository(PlayerEntity);
    }

    getAllPlayers() {
        return this.playerRepository.find();
    }
}
