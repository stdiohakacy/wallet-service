import { BaseValueObject } from '../../../../libs/domain';
import { LedgerEntryType } from '../enums/ledger-entry.enum';
import { ArgumentNotProvidedException } from '../../../../libs/exceptions';
import { UniqueEntityID } from '../../../../libs/domain/unique-entity-id';
import { Money } from './money.vo';

export interface LedgerEntryProps {
    type: LedgerEntryType;
    amount: Money;
    balanceAfter: Money;
    timestamp: Date;
    sourceRef: UniqueEntityID<string>;
    remark?: string;
}

export class LedgerEntry extends BaseValueObject<LedgerEntryProps> {
    constructor(props: LedgerEntryProps) {
        super(props);
    }

    protected validate(props: LedgerEntryProps): void {
        if (!props.type) {
            throw new ArgumentNotProvidedException('type is required');
        }
        if (!props.amount) {
            throw new ArgumentNotProvidedException('amount is required');
        }
        if (!props.balanceAfter) {
            throw new ArgumentNotProvidedException('balanceAfter is required');
        }
        if (!props.timestamp) {
            throw new ArgumentNotProvidedException('timestamp is required');
        }
        if (!props.sourceRef) {
            throw new ArgumentNotProvidedException('sourceRef is required');
        }
    }

    get type(): LedgerEntryType {
        return this.props.type;
    }

    get amount(): Money {
        return this.props.amount;
    }

    get balanceAfter(): Money {
        return this.props.balanceAfter;
    }

    get timestamp(): Date {
        return this.props.timestamp;
    }

    get sourceRef(): UniqueEntityID<string> {
        return this.props.sourceRef;
    }

    get remark(): string | undefined {
        return this.props.remark;
    }
}
