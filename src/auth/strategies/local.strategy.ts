import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { apiResponse } from 'src/common/interfaces/apiResponse.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const response: apiResponse =
      await this.usersService.findUserByUsername(username);
    
    const { data: foundUser } = response;

    if (foundUser && foundUser.password === password) {
      const { password, ...user } = foundUser;
      return user;
    }

    throw new UnauthorizedException();
  }
}
