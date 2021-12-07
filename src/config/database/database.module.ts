import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import * as ormconfig from './ormconfig'

const databaseProviders = () => {
    return TypeOrmModule.forRoot({
        ...ormconfig
    })
};

@Global()
@Module({
    imports: [databaseProviders()],
})
export class DatabaseModule {}
