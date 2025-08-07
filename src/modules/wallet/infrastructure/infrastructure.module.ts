import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './persistence/typeorm/entities/wallet.entity';
import { LedgerEntryEntity } from './persistence/typeorm/entities/ledger-entry.entity';
import { WalletRepositoryAdapter } from './persistence/repository/wallet.repository.adapter';
import { WalletMapper } from './persistence/mappers/wallet.mapper';
import { WALLET_REPOSITORY_PORT } from '../application/outbound/repositories/wallet.repository.port';
import { EVENT_CONSUMER_PORT } from '../application/inbound/events/event-consumer.port';
import { KafkaConsumerAdapter } from './messaging/kafka/consumers/kafka.consumer.adapter';

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity, LedgerEntryEntity])],
    providers: [
        WalletMapper,
        {
            provide: WALLET_REPOSITORY_PORT,
            useClass: WalletRepositoryAdapter,
        },
        {
            provide: EVENT_CONSUMER_PORT,
            useClass: KafkaConsumerAdapter,
        },
    ],
    exports: [WALLET_REPOSITORY_PORT, WalletMapper],
})
export class InfrastructureModule {}
