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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdDto } from './dto/FindById.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
    console.log(params.id)
    return this.userService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id') params: FindByIdDto) {
    return this.userService.remove(params.id);
  }
}
