import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { HashPassword } from 'src/helpers/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ name: createUserDto.name }, { email: createUserDto.email }],
    });

    if (existingUser) {
      throw new ConflictException(
        'El nombre o el correo electrónico ya están en uso',
      );
    }
    const { password } = createUserDto;
    const hash = HashPassword(password);
    createUserDto.password = hash;
    const userCreated = new this.userModel(createUserDto);
    try {
      return userCreated.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userUpdt = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
      );
      return userUpdt;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar usuario: ' + error,
      );
    }
  }

  async remove(id: string): Promise<{ [key: string]: any }> {
    try {
      const userdel = await this.userModel.findByIdAndDelete(id);
      return { Usuario: userdel.name, msg: 'eliminado correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
