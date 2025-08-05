import { Model } from 'mongoose';
import { Err, None, Ok, Option, Result, Some } from 'oxide.ts';
import { BaseRepositoryPort } from './base.repository.port';
import {
    ExceptionBase,
    ArgumentNotProvidedException,
    RepositoryException,
} from 'src/libs/exceptions';
import { Void } from 'src/libs/types';
import { MapperInterface } from '@libs/domain/mapper.interface';

export abstract class BaseRepositoryImpl<TDomain, TDocument>
    implements BaseRepositoryPort<TDomain>
{
    constructor(
        protected readonly model: Model<TDocument>,
        protected readonly mapper: MapperInterface<TDomain, TDocument>
    ) {}

    async findOneById(
        id: string
    ): Promise<Result<Option<TDomain>, ExceptionBase>> {
        if (!id) {
            return Err(new ArgumentNotProvidedException('ID must be provided'));
        }
        try {
            const doc = await this.model.findById(id).exec();
            return Ok(doc ? Some(this.mapper.toDomain(doc)) : None);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to find entity by id ${id}: ${error.message}`
                )
            );
        }
    }

    async findAll(): Promise<Result<TDomain[], ExceptionBase>> {
        try {
            const docs = await this.model.find({ deleted: false }).exec();
            return Ok(docs.map(doc => this.mapper.toDomain(doc)));
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to find all entities: ${error.message}`
                )
            );
        }
    }

    async insert(
        entity: TDomain | TDomain[]
    ): Promise<Result<void, ExceptionBase>> {
        if (!entity) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }
        try {
            const docs = Array.isArray(entity)
                ? entity.map(e => this.mapper.toPersistence(e))
                : [this.mapper.toPersistence(entity)];
            await this.model.insertMany(docs);
            return Ok(Void);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to insert entity/entities: ${error.message}`
                )
            );
        }
    }

    async delete(entity: TDomain): Promise<Result<boolean, ExceptionBase>> {
        if (!entity || !(entity as any)._id) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }
        try {
            const result = await this.model
                .deleteOne({ _id: (entity as any)._id })
                .exec();
            return Ok(result.deletedCount !== 0);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to delete entity: ${error.message}`
                )
            );
        }
    }

    async update(entity: TDomain): Promise<Result<void, ExceptionBase>> {
        if (!entity || !(entity as any)._id) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }
        try {
            const doc = this.mapper.toPersistence(entity);
            await this.model
                .updateOne({ _id: (entity as any)._id }, doc)
                .exec();
            return Ok(Void);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to update entity: ${error.message}`
                )
            );
        }
    }
}
