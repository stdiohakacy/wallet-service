import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './persistence/typeorm/entities/wallet.entity';
import { LedgerEntryEntity } from './persistence/typeorm/entities/ledger-entry.entity';
import {
    EVENT_CONSUMER_PORT,
    EventConsumerPort,
} from '../application/inbound/events/event-consumer.port';
import { KafkaConsumerAdapter } from './messaging/kafka/consumers/kafka.consumer.adapter';
import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';

const providers = [
    {
        provide: EVENT_CONSUMER_PORT,
        useClass: KafkaConsumerAdapter,
    },
];

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity, LedgerEntryEntity])],
    providers,
    exports: [...providers],
})
export class InfrastructureModule implements OnModuleInit {
    constructor(
        @Inject(EVENT_CONSUMER_PORT)
        private readonly eventConsumer: EventConsumerPort
    ) {}
    async onModuleInit() {
        await this.eventConsumer.listen(
            'balance-change-request-events',
            async (event: BaseIntegrationEvent) => {}
        );
    }
}
