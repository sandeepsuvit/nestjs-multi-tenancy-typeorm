import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { Repository, getConnectionManager, createConnection } from 'typeorm';
import { randomCode } from 'src/helpers/random-code';
import * as tenantOrmConfig from '../../../config/tenancy/tenant-ormconfig'

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

    async create({ auth, data }) {
        try {
            const connectionManager = getConnectionManager()
            const connection = connectionManager.get('default')
            data.code = randomCode(6)
            const connectionName = `tenant_${data.code}`
            return await connection.transaction(async manager => {
                await manager.query(`CREATE SCHEMA IF NOT EXISTS ${connectionName}`)
                const team = await this.teamRepository.save({ ...data, created_by: auth.id })
                createConnection({
                    ...tenantOrmConfig,
                    name: connectionName,
                    type: 'postgres',
                    schema: connectionName,
                    synchronize: true,
                })
                return this.teamRepository.findOne(team.id)
            })
        } catch (error) {
            throw new Error(error)
        }
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
