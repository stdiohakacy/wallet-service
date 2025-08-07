import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import { IncreaseWalletCommand } from '@modules/wallet/application/inbound/commands/increase-wallet.command';
import { EventConsumerPort } from '@modules/wallet/application/inbound/events/event-consumer.port';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Kafka, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaConsumerAdapter implements EventConsumerPort, OnModuleInit {
    constructor(private readonly commandBus: CommandBus) {}
    private kafka = new Kafka({ brokers: ['localhost:9092'] });
    private consumer = this.kafka.consumer({ groupId: 'wallet-consumer' });

    async onModuleInit() {
        this.consumer.connect().then(() => {
            console.log('Kafka consumer connected');
        });
        await this.consumer.subscribe({
            topic: 'balance-change-request-events',
        });
        await this.consumer.run({
            eachMessage: async ({ message }: EachMessagePayload) => {
                const value = message.value?.toString();
                const data = JSON.parse(value);
                const command = new IncreaseWalletCommand({
                    userId: '513af0c9-79c6-4c00-a525-008a6adfda3b',
                    amount: data.amount,
                    currency: data.currency,
                    sourceRef: data.aggregateId,
                });
                await this.commandBus.execute(command);
            },
        });
    }

    async listen(
        topic: string,
        handler: (message: BaseIntegrationEvent) => Promise<void>
    ) {
        await this.consumer.subscribe({ topic });
        await this.consumer.run({
            eachMessage: async ({ message }: EachMessagePayload) => {
                const value = message.value?.toString();
                const data = JSON.parse(value);
                await handler(data);
            },
        });
    }
}
