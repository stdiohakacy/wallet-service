import { Option, Result } from 'oxide.ts';
import { ExceptionBase } from 'src/libs/exceptions';

export type OrderDirection = 'asc' | 'desc';

export type OrderBy = {
    field: string;
    direction: OrderDirection;
};

export class Paginated<T> {
    readonly count: number;
    readonly limit: number;
    readonly page: number;
    readonly data: readonly T[];

    constructor(props: Paginated<T>) {
        this.count = props.count;
        this.limit = props.limit;
        this.page = props.page;
        this.data = props.data;
    }
}

export type PaginatedQueryParams = {
    limit: number;
    page: number;
    offset: number;
    orderBy?: OrderBy;
};

// Read side
export interface ReadRepositoryPort<T> {
    findOneById(id: string): Promise<Result<Option<T>, ExceptionBase>>;
    findAll(): Promise<Result<T[], ExceptionBase>>;
}

// Write side
export interface WriteRepositoryPort<T> {
    insert(entity: T | T[]): Promise<Result<void, ExceptionBase>>;
    delete(entity: T): Promise<Result<boolean, ExceptionBase>>;
    update(entity: T): Promise<Result<void, ExceptionBase>>;
}

export interface BaseRepositoryPort<T>
    extends ReadRepositoryPort<T>,
        WriteRepositoryPort<T> {}
