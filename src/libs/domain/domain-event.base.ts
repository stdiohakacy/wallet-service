import {
    ArgumentInvalidException,
    ArgumentNotProvidedException,
} from '../exceptions';
import { Guard } from '../patterns';

type DomainEventMetadata = {
    /** Timestamp when this domain event occurred */
    readonly timestamp: number;
    /**
     * Causation id used to reconstruct execution order if needed
     */
    readonly causationId?: string;
    /**
     * User ID for debugging and logging purposes
     */
    readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
    aggregateId: string;
    metadata?: DomainEventMetadata;
};

export abstract class BaseDomainEvent {
    /** Aggregate ID where domain event occurred */
    public readonly aggregateId: string;
    public readonly version: number = 1; // Support for event sourcing versioning
    public readonly metadata: DomainEventMetadata;
    public abstract get eventName(): string;

    get occurredAt(): Date {
        return new Date(this.metadata.timestamp);
    }

    constructor(props: DomainEventProps<unknown>) {
        if (!props.aggregateId || typeof props.aggregateId !== 'string') {
            throw new ArgumentInvalidException('Invalid aggregateId');
        }

        if (Guard.isEmpty(props)) {
            throw new ArgumentNotProvidedException(
                'BaseDomainEvent props should not be empty'
            );
        }
        this.aggregateId = props.aggregateId;
        this.metadata = {
            causationId: props?.metadata?.causationId,
            timestamp: props?.metadata?.timestamp || Date.now(),
            userId: props?.metadata?.userId,
        };
    }
}
