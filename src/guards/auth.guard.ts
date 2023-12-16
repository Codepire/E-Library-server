import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ConfigsService } from 'src/config/configs.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configsService: ConfigsService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const jwtToken = request.headers.authorization.split(' ')[1];

      const response = this.jwtService.verify(jwtToken, {
        secret: this.configsService.jwtConfig.secretKye,
      });

      const metaData = this.reflector.get<string>(
        'roles',
        context.getHandler(),
      );

      if (metaData.includes(response.role)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      // console.log(err);
      return false;
    }
  }
}
