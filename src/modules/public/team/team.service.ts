import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(TeamEntity) private teamRepository: Repository<TeamEntity>) { }

    findAll({ auth }) {
        const where: any = {}
        if (auth.role != "superadmin") {
            where.created_by = auth.id
        }
        return this.teamRepository.find({ where: where })
    }

    findById({ auth, id }) {
        const where: any = {
            id: id
        }
        if (auth.role != "superadmin") {
            where.created_by = auth.id
        }
        return this.teamRepository.findOne({ where: where })
    }

    create({ auth, data }) {
        return this.teamRepository.save({ ...data, created_by: auth.id })
    }

    update({ auth, id, data }) {
        const where: any = {
            id: id
        }
        if (auth.role != "superadmin") {
            auth.created_by = auth.id
        }
        return this.teamRepository.update({ ...where }, { ...data, updated_by: auth.id })
    }

    delete({ auth, id }) {
        const where: any = {
            id: id
        }
        if (auth.role != "superadmin") {
            auth.created_by = auth.id
        }
        return this.teamRepository.softDelete({ ...where })
    }
}
