import { ExceptionBase } from '@libs/exceptions';
import { BaseRepositoryPort } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.port';
import { Wallet } from '@modules/wallet/domain/aggregates/wallet.aggregate';
import { Option, Result } from 'oxide.ts';

export const WALLET_REPOSITORY_PORT = Symbol('WALLET_REPOSITORY_PORT');
export interface WalletRepositoryPort extends BaseRepositoryPort<Wallet> {
    findOneByUserId(
        userId: string
    ): Promise<Result<Option<Wallet>, ExceptionBase>>;
}
