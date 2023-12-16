import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUserByUsername(@Query('username') username: string) {
    try {
      return await this.usersService.findUserByUsername(username);
    } catch (err) {
      throw err;
    }
  }
}
