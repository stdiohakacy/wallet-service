import { BaseDomainEvent } from './domain-event.base';
import { BaseEntity } from './entity.base';
import { EventEmitter2 } from 'eventemitter2';

export abstract class BaseAggregateRoot<
    EntityProps,
> extends BaseEntity<EntityProps> {
    private _domainEvents: BaseDomainEvent[] = [];

    get domainEvents(): BaseDomainEvent[] {
        return this._domainEvents;
    }

    protected addEvent(domainEvent: BaseDomainEvent): void {
        this._domainEvents.push(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }

    public async publishEvents(eventEmitter: EventEmitter2): Promise<void> {
        this.domainEvents.forEach((event: BaseDomainEvent) => {
            eventEmitter.emit(event.constructor.name, event);
        });
        this.clearEvents();
    }
}
