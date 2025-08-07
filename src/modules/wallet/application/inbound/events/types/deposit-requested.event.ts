import { BaseIntegrationEvent } from '@libs/infrastructure/messaging/integration.event.base';

export class DepositRequestedIntegrationEvent extends BaseIntegrationEvent {
    constructor(
        public readonly aggregateId: string,
        public readonly userId: string,
        public readonly amount: number,
        public readonly currency: string,
        public readonly method: string
    ) {
        super({
            eventName: 'DepositRequested',
            version: 1,
        });
    }
}
