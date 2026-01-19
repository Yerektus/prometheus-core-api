import { Injectable } from '@nestjs/common';
import { AuthEntity } from 'src/common/entities/auth.entity';

@Injectable()
export class AuthResource {
  convert(payload: AuthEntity) {
    return {
      accessToken: payload.accessToken,
    };
  }
}
