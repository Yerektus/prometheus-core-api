import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../domain/auth.service';
import { getJwtConfig } from 'src/config/jwt.config';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const jwtConfig = getJwtConfig();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      algorithms: ['HS256'],
      passReqToCallback: true,
    });
  }

  async validate(request: Request) {
    const headers = request.headers;

    if (!headers.authorization) {
      return null;
    }

    const accessToken = headers.authorization.replace('Bearer', '').trim();

    if (!accessToken) {
      return null;
    }

    return await this.authService.validate(accessToken);
  }
}
