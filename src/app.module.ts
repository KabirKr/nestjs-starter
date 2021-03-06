import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AppController } from '@AppRoot/app.controller';
import { AppService } from '@AppRoot/app.service';
import { DatabaseModule } from '@Database/database.module';
import { CookieAuthenticationGuard } from '@Auth/guards';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CaslModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CookieAuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
