import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './modules/public/team/team.entity';
import { Repository, getConnectionManager, createConnection } from 'typeorm';
import * as tenantOrmConfig from './config/tenancy/tenant-ormconfig';

@Injectable()
export class AppService {
  constructor(@InjectRepository(TeamEntity) private teamRepository: Repository<TeamEntity>) { }

  async syncDb() {
    const teams = await this.teamRepository.find();
    const connectionManager = getConnectionManager();
    const team_codes = ['example'];
    for (const team of teams) {
      team_codes.push(team.code);
    }

    for (const code of team_codes) {
      const connectionName = `tenant_${code}`;

      if (connectionManager.has(connectionName)) {
        const connection = await connectionManager.get(connectionName)
        await connection.isConnected ? connection : connection.connect()
        await connection.close();
      } else {
        await createConnection({
          ...tenantOrmConfig,
          name: connectionName,
          type: 'postgres',
          schema: connectionName,
        });
        const connection = await connectionManager.get(connectionName)
        await connection.isConnected ? connection : connection.connect()
        await connectionManager.get(connectionName).close();
      }
    }
    return { message: 'db synced' };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
