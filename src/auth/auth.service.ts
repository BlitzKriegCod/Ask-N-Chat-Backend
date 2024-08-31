import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
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
  async logout(req: Request): Promise<{ msg: string }> {
    const user = req['userE'];
    const id = user.id;
    try {
      await this.userModel.findByIdAndUpdate(id, { status: false }).exec();

      return { msg: 'Cierre de sesión exitoso' };
    } catch (error) {
      throw new UnprocessableEntityException(
        'No se pudo cerrar sesión. Intrntalo de nuevo mas tarde.',
      );
    }
  }

  async login(lgDto: LoginDto): Promise<{ authorization: string; id: string }> {
    const user = await this.userModel.findOne({ name: lgDto.name });
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const isMatch = await MatchPassword(lgDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    if (user.status) {
      throw new UnauthorizedException('no necesita loguearse nuevamente');
    }

    const { _id, name, email, google, img, status, role } = user;
    const payload = { id: _id, name, email, google, img, status, role };
    await this.userModel.findByIdAndUpdate(_id, { status: true });
    try {
      return {
        authorization: await this.jwt.signAsync(payload),
        id: _id.toString(),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        ' Error al iniciar sesión ' + error.message,
      );
    }
  }
}
