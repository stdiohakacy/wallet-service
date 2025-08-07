import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';
import { Money } from '../value-objects/money.vo';

export class WalletDecreasedDomainEvent extends BaseDomainEvent {
    readonly amount: Money;
    readonly balanceAfter: Money;
    readonly sourceRefId?: string;
    readonly decreasedAt: Date;

    public get eventName(): string {
        return 'WalletDecreased';
    }

    constructor(props: DomainEventProps<WalletDecreasedDomainEvent>) {
        super(props);
        this.amount = props.amount;
        this.balanceAfter = props.balanceAfter;
        this.sourceRefId = props.sourceRefId;
        this.decreasedAt = props.decreasedAt;
    }
}
