import {
    ArgumentInvalidException,
    ArgumentNotProvidedException,
    ArgumentOutOfRangeException,
} from '../exceptions';
import { Guard } from '../patterns';
import { convertPropsToObject } from '../utils';
import { UniqueEntityID } from './unique-entity-id';

export class AuditTrail {
    constructor(
        public readonly createdBy?: string,
        public readonly updatedBy?: string,
        public readonly deletedBy?: string
    ) {}
}

export interface BaseEntityProps<ID extends string | number> {
    id: UniqueEntityID<ID>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    audit: AuditTrail;
}

export interface CreateEntityProps<T, ID extends string | number = string> {
    id: UniqueEntityID<ID>;
    props: T;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

export abstract class BaseEntity<
    EntityProps,
    ID extends string | number = string,
> {
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt?: Date;
    private MAX_PROPS = 50;
    private _audit: AuditTrail;

    protected readonly props: EntityProps;
    protected _id: UniqueEntityID<ID>;

    constructor({
        id,
        createdAt,
        updatedAt,
        createdBy,
        updatedBy,
        props,
    }: CreateEntityProps<EntityProps, ID>) {
        if (!id || !(id instanceof UniqueEntityID)) {
            throw new ArgumentInvalidException('ID is invalid');
        }

        this._id = id;
        this.validateProps(props);

        const now = new Date();
        this._createdAt = createdAt ?? now;
        this._updatedAt = updatedAt ?? now;
        this._audit = new AuditTrail(createdBy, updatedBy);

        this.props = props;
        this.validate();
    }

    get id(): UniqueEntityID<ID> {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get deletedAt(): Date | undefined {
        return this._deletedAt;
    }

    get audit(): AuditTrail {
        return this._audit;
    }

    get isDeleted(): boolean {
        return !!this._deletedAt;
    }

    protected markUpdated(userId?: string): void {
        this._updatedAt = new Date();
        this._audit = new AuditTrail(
            this._audit.createdBy,
            userId,
            this._audit.deletedBy
        );
    }

    protected markDeleted(userId?: string): void {
        this._deletedAt = new Date();
        this._audit = new AuditTrail(
            this._audit.createdBy,
            this._audit.updatedBy,
            userId
        );
    }

    public getProps(): EntityProps & BaseEntityProps<ID> {
        return Object.freeze({
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            deletedAt: this._deletedAt,
            audit: this._audit,
            ...this.props,
        });
    }

    public toObject(): unknown {
        return Object.freeze({
            id: this._id.getValue(),
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            deletedAt: this._deletedAt,
            ...convertPropsToObject(this._audit),
            ...convertPropsToObject(this.props),
        });
    }

    public getSnapshot(): {
        entityType: string;
        entityId: UniqueEntityID<ID>;
        data: EntityProps & BaseEntityProps<ID>;
        timestamp: Date;
    } {
        return {
            entityType: this.constructor.name,
            entityId: this._id,
            data: this.getProps(),
            timestamp: new Date(),
        };
    }

    public abstract validate(): void;

    private validateProps(props: EntityProps): void {
        if (Guard.isEmpty(props)) {
            throw new ArgumentNotProvidedException('Props should not be empty');
        }

        if (typeof props !== 'object') {
            throw new ArgumentInvalidException('Props should be an object');
        }

        if (Object.keys(props as any).length > this.MAX_PROPS) {
            throw new ArgumentOutOfRangeException(
                `Props should not have more than ${this.MAX_PROPS} properties`
            );
        }
    }

    public toString(): string {
        return `${this.constructor.name}<${this._id.getValue()}>`;
    }
}
