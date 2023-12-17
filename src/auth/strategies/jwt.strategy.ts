import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigsService } from 'src/config/configs.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configsService: ConfigsService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configsService.jwtConfig.secretKye,
        });
    }

    async validate(payload: any) {
        if (payload) {
            return { username: payload.username };
        }
        throw new UnauthorizedException('Did not found the payload');
    }
}
