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

@Module({
  imports: [UserModule, TenancyModule, TeamModule, DatabaseModule, PlayerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
  }
}
