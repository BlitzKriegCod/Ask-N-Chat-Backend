import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdDto } from './dto/FindById.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/auth.guards';
import { Role } from 'src/helpers/RBAC/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const body = await this.userService.create(createUserDto);
    res.cookie('sessionId', body.user.id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    });
    res.setHeader('authorization', body.authorization);
    res.send(body.user);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Public()
  @UsePipes(new ValidationPipe({ transform: false }))
  findOne(@Param() params: FindByIdDto) {
    return this.userService.findOne(params.id);
  }

  @Patch(':id')
  @Public()
  @UsePipes(new ValidationPipe())
  update(@Param() params: FindByIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(params.id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  remove(@Param() params: FindByIdDto) {
    return this.userService.remove(params.id);
  }
}
