import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccessTokenDao } from 'src/common/dao/user-access-token.dao';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserAccessTokensRepository {
  constructor(
    @InjectRepository(UserAccessTokenDao)
    private readonly userAccessTokensRepository: Repository<UserAccessTokenDao>,
  ) {}

  insertAndGetUserAccessToken(
    userId: string,
    token: string,
  ): Promise<UserAccessTokenDao> {
    return this.userAccessTokensRepository.save({
      id: uuidv4(),
      userId: userId,
      token: token,
    });
  }

  getOneByToken(token: string): Promise<UserAccessTokenDao | null> {
    return this.userAccessTokensRepository.findOneBy({ token });
  }

  async softDeleteAccessTokenByToken(token: string): Promise<void> {
    await this.userAccessTokensRepository.softDelete({ token });
  }

  async softDeleteAccessTokensByUserId(userId: string): Promise<void> {
    await this.userAccessTokensRepository.softDelete({ userId });
  }
}
