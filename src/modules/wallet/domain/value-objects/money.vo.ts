import { BaseValueObject } from '@libs/domain';
import { ArgumentNotProvidedException } from '@libs/exceptions';
import { Guard } from '@libs/patterns';

interface MoneyProps {
    value: number;
    currency: string;
}

export class Money extends BaseValueObject<MoneyProps> {
    constructor(props: MoneyProps) {
        super(props);
    }

    protected validate(props: MoneyProps): void {
        if (Guard.isEmpty(props.currency)) {
            throw new ArgumentNotProvidedException('Currency is required');
        }

        if (typeof props.value !== 'number' || isNaN(props.value)) {
            throw new ArgumentNotProvidedException(
                'Money value must be a valid number'
            );
        }

        if (props.value < 0) {
            throw new ArgumentNotProvidedException(
                'Money value cannot be negative'
            );
        }
    }

    public get value(): number {
        return this.props.value;
    }

    public get currency(): string {
        return this.props.currency;
    }

    public add(other: Money): Money {
        this.ensureSameCurrency(other);
        return new Money({
            value: this.props.value + other.props.value,
            currency: this.props.currency,
        });
    }

    public subtract(other: Money): Money {
        this.ensureSameCurrency(other);
        const result = this.props.value - other.props.value;

        if (result < 0) {
            throw new ArgumentNotProvidedException(
                'Resulting Money value cannot be negative'
            );
        }

        return new Money({
            value: result,
            currency: this.props.currency,
        });
    }

    public isGreaterThan(other: Money): boolean {
        this.ensureSameCurrency(other);
        return this.props.value > other.props.value;
    }

    private ensureSameCurrency(other: Money): void {
        if (this.props.currency !== other.props.currency) {
            throw new ArgumentNotProvidedException(
                'Currencies must match to operate on Money'
            );
        }
    }
}
