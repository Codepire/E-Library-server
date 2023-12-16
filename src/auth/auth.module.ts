import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [LocalStrategy],
})
export class AuthModule {}
