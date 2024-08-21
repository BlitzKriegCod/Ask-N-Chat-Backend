import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { LoginDto } from './dto/Login.dto';
import { MatchPassword } from 'src/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}
  logout() {
    return 'This action adds a new auth';
  }

  async login(lgDto: LoginDto): Promise<{ Authorization: string }> {
    try {
      const user = await this.userModel.findOne({ name: lgDto.name });
      const hash = MatchPassword(lgDto.password, user.password);
      if (!hash) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }
      const { __v, password, ...payload } = user;

      return { Authorization: await this.jwt.signAsync(payload) };
    } catch (error) {
      throw new UnauthorizedException(' Error al iniciar seccion ');
    }
  }
}
