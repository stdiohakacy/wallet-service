import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryImpl } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.impl';
import { WalletEntity } from '../typeorm/entities/wallet.entity';
import { WALLET_SCHEMA } from '../schema/wallet.schema';
import {
    Wallet,
    WalletProps,
} from '@modules/wallet/domain/aggregates/wallet.aggregate';
import { WalletRepositoryPort } from '@modules/wallet/application/outbound/repositories/wallet.repository.port';
import { WalletMapper } from '../mappers/wallet.mapper';
import { ExceptionBase } from '@libs/exceptions';
import { Result, Option, Ok, Some, None } from 'oxide.ts';

@Injectable()
export class WalletRepositoryAdapter
    extends BaseRepositoryImpl<WalletProps, Wallet, WalletEntity>
    implements WalletRepositoryPort
{
    constructor(
        @InjectRepository(WalletEntity)
        public readonly walletRepository: Repository<WalletEntity>,
        public readonly walletMapper: WalletMapper
    ) {
        super(walletRepository, WALLET_SCHEMA, walletMapper);
    }
    async findOneByUserId(
        userId: string
    ): Promise<Result<Option<Wallet>, ExceptionBase>> {
        return this.walletRepository
            .findOne({
                where: { userId },
            })
            .then(wallet => {
                if (wallet) {
                    return Ok(Some(this.walletMapper.toDomain(wallet)));
                }
                return Ok(None);
            });
    }
}
