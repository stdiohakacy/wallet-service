import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './persistence/typeorm/entities/wallet.entity';
import { LedgerEntryEntity } from './persistence/typeorm/entities/ledger-entry.entity';

const providers = [];

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity, LedgerEntryEntity])],
    providers,
    exports: [...providers],
})
export class InfrastructureModule {}
