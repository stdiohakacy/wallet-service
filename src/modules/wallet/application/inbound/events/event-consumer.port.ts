import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';

export const EVENT_CONSUMER_PORT = Symbol('EVENT_CONSUMER_PORT');
export interface EventConsumerPort {
    listen(
        topic: string,
        handler: (event: BaseIntegrationEvent) => Promise<void>
    ): Promise<void>;
}
