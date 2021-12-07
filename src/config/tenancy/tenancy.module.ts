import { Module, Scope, Global } from '@nestjs/common';
import { getConnectionManager, createConnection } from 'typeorm';
import * as tenantOrmConfig from './tenant-ormconfig'
import * as ormconfig from '../database/ormconfig'
import { REQUEST } from '@nestjs/core';
import { TeamEntity } from 'src/modules/public/team/team.entity';

const connectionFactory = {
    provide: 'CONNECTION',
    scope: Scope.REQUEST,
    useFactory: async (req) => {
        const codeTenant = req.headers['x-tenant'];
        const connectionManager = getConnectionManager()
        const connectionPublic = connectionManager.get('default')

        const found = await connectionPublic.getRepository(TeamEntity).findOne({code: codeTenant})

        if(!found){
            throw new Error('Tenant not found')
        }

        const tenancy = found.code

        const connectionName = `tenant_${tenancy}`

        if (connectionManager.has(connectionName)) {
            const connection = await connectionManager.get(connectionName)
            return Promise.resolve(connection.isConnected ? connection : connection.connect())
        }else{
            connectionPublic.query(`CREATE SCHEMA IF NOT EXISTS ${connectionName}`)

            await createConnection({
                ...tenantOrmConfig,
                name: connectionName,
                type: 'postgres',
                schema: connectionName,
            })

            const connection = await connectionManager.get(connectionName)
            return Promise.resolve(connection.isConnected ? connection : connection.connect())
        }
    },
    inject: [REQUEST]
}

@Global()
@Module({
    providers: [connectionFactory],
    exports: ['CONNECTION']
})
export class TenancyModule { }
