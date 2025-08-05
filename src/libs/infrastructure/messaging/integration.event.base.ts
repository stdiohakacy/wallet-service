export abstract class BaseIntegrationEvent {
    readonly id: string;
    readonly occurredAt: Date;
    readonly eventName: string;
    readonly version: number;

    constructor(props: {
        id?: string;
        occurredAt?: Date;
        eventName: string;
        version?: number;
    }) {
        this.id = props.id ?? crypto.randomUUID();
        this.occurredAt = props.occurredAt ?? new Date();
        this.eventName = props.eventName;
        this.version = props.version ?? 1;
    }
}
