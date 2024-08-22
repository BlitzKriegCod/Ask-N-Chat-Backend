import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { AuthGuard } from './auth.guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('logout')
  Logout(@Request() req) {
    return this.authService.logout(req);
  }

  @Post('login')
  async Login(@Body() lgDto: LoginDto, @Res() res: Response) {
    const { authorization, id } = await this.authService.login(lgDto);
    res.cookie('sessionId', id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.setHeader('authorization', authorization);
    res.send({ msg: 'login con exito' });
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
