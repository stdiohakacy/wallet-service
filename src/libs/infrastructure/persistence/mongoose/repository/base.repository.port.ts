import { Option, Result } from 'oxide.ts';
import { ExceptionBase } from 'src/libs/exceptions';

export interface ReadRepositoryPort<T> {
    findOneById(id: string): Promise<Result<Option<T>, ExceptionBase>>;
    findAll(): Promise<Result<T[], ExceptionBase>>;
}

export interface WriteRepositoryPort<T> {
    insert(entity: T | T[]): Promise<Result<void, ExceptionBase>>;
    delete(entity: T): Promise<Result<boolean, ExceptionBase>>;
    update(entity: T): Promise<Result<void, ExceptionBase>>;
}

export interface BaseRepositoryPort<T>
    extends ReadRepositoryPort<T>,
        WriteRepositoryPort<T> {}
