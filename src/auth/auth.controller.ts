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
import { AuthGuard } from '../Guards/auth.guards';
import { Response } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async Login(@Body() lgDto: LoginDto, @Res() res: Response) {
    const { authorization, id } = await this.authService.login(lgDto);
    res.cookie('sessionId', id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    res.setHeader('authorization', authorization);
    res.send({ msg: 'login con exito' });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  Logout(@Request() req) {
    return this.authService.logout(req);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.userE;
  }
}
