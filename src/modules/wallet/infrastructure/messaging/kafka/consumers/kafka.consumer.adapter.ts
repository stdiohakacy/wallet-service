import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import { EventConsumerPort } from '@modules/wallet/application/inbound/events/event-consumer.port';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaConsumerAdapter implements EventConsumerPort, OnModuleInit {
    private kafka = new Kafka({ brokers: ['localhost:9092'] });
    private consumer = this.kafka.consumer({ groupId: 'wallet-consumer' });

    async onModuleInit() {
        await this.consumer.connect();
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
