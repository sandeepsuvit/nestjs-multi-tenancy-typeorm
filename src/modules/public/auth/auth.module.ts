import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({secret: 'secret'})],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
