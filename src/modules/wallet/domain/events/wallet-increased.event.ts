import { BaseDomainEvent, DomainEventProps } from '../../../../libs/domain';
import { Money } from '../value-objects/money.vo';

export class WalletIncreasedDomainEvent extends BaseDomainEvent {
    readonly amount: Money;
    readonly balanceAfter: Money;
    readonly sourceRefId?: string;
    readonly increasedAt: Date;

    public get eventName(): string {
        return 'WalletIncreased';
    }

    constructor(props: DomainEventProps<WalletIncreasedDomainEvent>) {
        super(props);
        this.amount = props.amount;
        this.balanceAfter = props.balanceAfter;
        this.sourceRefId = props.sourceRefId;
        this.increasedAt = props.increasedAt;
    }
}
