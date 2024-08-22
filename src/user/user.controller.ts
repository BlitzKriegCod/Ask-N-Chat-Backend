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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdDto } from './dto/FindById.dto';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const body = await this.userService.create(createUserDto);
    res.cookie('sessionId', body.user.id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.setHeader('authorization', body.authorization);
    res.send(body.user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') params: FindByIdDto) {
    return this.userService.findOne(params.id);
  }
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') params: FindByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id') params: FindByIdDto) {
    return this.userService.remove(params.id);
  }
}
