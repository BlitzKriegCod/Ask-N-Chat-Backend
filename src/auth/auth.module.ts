import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SessionConfig } from 'src/user/session.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionConfig],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'MEPIKAELANO!!!',
      global: true,
      signOptions: { expiresIn: '4h' },
    }),
  ],
})
export class AuthModule {}
