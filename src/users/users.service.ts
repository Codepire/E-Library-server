import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { apiResponse } from 'src/common/interfaces/apiResponse.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<apiResponse> {
    const foundUser: User = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    return {
      statusCode: HttpStatus.OK,
      response: 'success',
      data: foundUser,
    };
  }
}
