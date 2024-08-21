import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  Logout() {
    return this.authService.logout();
  }

  @Post('login')
  Login(@Body() lgDto: LoginDto) {
    return this.authService.login(lgDto);
  }
}
