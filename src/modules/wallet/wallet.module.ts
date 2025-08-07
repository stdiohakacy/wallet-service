import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './infrastructure/persistence/typeorm/entities/wallet.entity';
import { LedgerEntryEntity } from './infrastructure/persistence/typeorm/entities/ledger-entry.entity';
import { WalletRepositoryAdapter } from './infrastructure/persistence/repository/wallet.repository.adapter';
import { WalletMapper } from './infrastructure/persistence/mappers/wallet.mapper';
import { IncreaseWalletHandler } from './application/inbound/commands/handlers/increase-wallet.handler';
import { WALLET_REPOSITORY_PORT } from './application/outbound/repositories/wallet.repository.port';
import { WalletConsumer } from './infrastructure/messaging/kafka/consumers/wallet.consumer';
import { EVENT_CONSUMER_PORT } from './application/inbound/events/event-consumer.port';
import { KafkaConsumerAdapter } from './infrastructure/messaging/kafka/consumers/kafka.consumer.adapter';

const providers = [
    WalletConsumer,
    WalletMapper,
    {
        provide: WALLET_REPOSITORY_PORT,
        useClass: WalletRepositoryAdapter,
    },
    {
        provide: EVENT_CONSUMER_PORT,
        useClass: KafkaConsumerAdapter,
    },
    IncreaseWalletHandler,
];
@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([WalletEntity, LedgerEntryEntity]),
    ],
    controllers: [],
    providers,
    exports: [...providers],
})
export class WalletModule implements OnModuleInit {
    onModuleInit() {}
}
