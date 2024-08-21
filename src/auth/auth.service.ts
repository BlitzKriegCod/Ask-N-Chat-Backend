import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async login(lgDto: LoginDto): Promise<{ authorization: string }> {
    try {
      const user = await this.userModel.findOne({ name: lgDto.name });
      const isMatch = await MatchPassword(lgDto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }
      if (user.status) {
        throw new BadRequestException('no necesita loguearse nuevamente');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, email, google, status, _id, img, role } = user;
      const payload = { id: _id, name, email, google, img, status, role };
      return {
        authorization: await this.jwt.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ' Error al iniciar seccion ' + error,
      );
    }
  }
}
