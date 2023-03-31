import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (await this.bcrypt.comparePassword(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async generateToken({ name, role, email, id }: User): Promise<any> {
    return {
      accessToken: this.jwtService.sign({ sub: id, email, role }),
      user: { email, name, role, id },
    };
  }

  async decodeToken(token) {
    try {
      const decoded = this.jwtService.decode(token);

      if (decoded) {
        return decoded;
      }
      return new BadRequestException('Erro no Token do usuário');
    } catch (error) {
      return new BadRequestException('Erro no Token do usuário');
    }
  }
}
