import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/public/user/user.module';
import { TenancyModule } from './config/tenancy/tenancy.module';
import { TeamModule } from './modules/public/team/team.module';
import { DatabaseModule } from './config/database/database.module';
import { PlayerModule } from './modules/tenant/player/player.module';
import { AuthModule } from './modules/public/auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { TeamEntity } from './modules/public/team/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), JwtModule.register({ secret: 'secret' }), UserModule, TenancyModule, TeamModule, DatabaseModule, PlayerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
  }
}
