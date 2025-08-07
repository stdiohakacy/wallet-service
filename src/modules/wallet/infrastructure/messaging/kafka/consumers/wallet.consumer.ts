import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';
import { IncreaseWalletCommand } from '@modules/wallet/application/inbound/commands/increase-wallet.command';
import {
    EVENT_CONSUMER_PORT,
    EventConsumerPort,
} from '@modules/wallet/application/inbound/events/event-consumer.port';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class WalletConsumer implements OnModuleInit {
    constructor(
        @Inject(EVENT_CONSUMER_PORT)
        private readonly consumer: EventConsumerPort,
        private readonly commandBus: CommandBus
    ) {}
    async onModuleInit() {
        // const command = new IncreaseWalletCommand({
        //     userId: '1',
        //     amount: 10,
        //     currency: 'usd',
        //     sourceRef: '123',
        // });
        // await this.commandBus.execute(command);
    }
    async listen(
        topic: string,
        handler: (message: BaseIntegrationEvent) => Promise<void>
    ) {
        await this.consumer.listen(topic, handler);
    }
}
