import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SessionConfig } from './user/session.config';
import config from './helpers/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/Guards/auth.guards';
import { QuestModule } from './quest/quest.module';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Debugs'),
    AuthModule,
    QuestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionConfig,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
