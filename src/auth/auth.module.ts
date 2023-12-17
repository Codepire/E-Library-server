import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigsModule } from 'src/config/configs.module';
import { ConfigsService } from 'src/config/configs.service';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigsModule,
        JwtModule.registerAsync({
            imports: [ConfigsModule],
            inject: [ConfigsService],
            useFactory: (configsService: ConfigsService) => {
                const { secretKye: secret, expiresIn } =
                    configsService.jwtConfig;
                return {
                    secret,
                    signOptions: { expiresIn },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
