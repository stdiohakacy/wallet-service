import { Repository } from 'typeorm';
import { Err, None, Ok, Option, Result, Some } from 'oxide.ts';
import { BASE_SCHEMA } from '../schema/base.schema';
import { BaseEntity } from '../../../../domain/entity.base';
import { BaseOrmEntity } from '../schema/base.orm';
import { MapperInterface } from '../../../../domain/mapper.interface';
import { BaseRepositoryPort } from './base.repository.port';
import {
    ArgumentNotProvidedException,
    ExceptionBase,
    RepositoryException,
} from 'src/libs/exceptions';
import { Void } from 'src/libs/types';

export abstract class BaseRepositoryImpl<
    TProps,
    EDomain extends BaseEntity<TProps>,
    EOrm extends BaseOrmEntity,
> implements BaseRepositoryPort<EDomain>
{
    constructor(
        private readonly repository: Repository<EOrm>,
        private readonly schema: { TABLE_NAME: string } & typeof BASE_SCHEMA,
        protected readonly mapper: MapperInterface<EDomain, EOrm>
    ) {}

    async findOneById(
        id: string
    ): Promise<Result<Option<EDomain>, ExceptionBase>> {
        if (!id) {
            return Err(new ArgumentNotProvidedException('ID must be provided'));
        }

        try {
            const entity = await this.repository.findOneBy({ id } as any);
            return Ok(entity ? Some(this.mapper.toDomain(entity)) : None);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to find entity by id ${id}: ${error.message}`
                )
            );
        }
    }

    async findAll(): Promise<Result<EDomain[], ExceptionBase>> {
        try {
            const query = await this.repository.createQueryBuilder(
                this.schema.TABLE_NAME
            );
            const entities = await query.getMany();

            const domainEntities = entities.map(entity =>
                this.mapper.toDomain(entity)
            );

            return Ok(domainEntities);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to find all entities: ${error.message}`
                )
            );
        }
    }

    async insert(
        entity: EDomain | EDomain[]
    ): Promise<Result<void, ExceptionBase>> {
        if (!entity) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }

        try {
            const ormEntities = Array.isArray(entity)
                ? entity.map(e => this.mapper.toPersistence(e))
                : [this.mapper.toPersistence(entity)];

            await this.repository.save(ormEntities);
            return Ok(Void);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to insert entity/entities: ${error.message}`
                )
            );
        }
    }

    async delete(entity: EDomain): Promise<Result<boolean, ExceptionBase>> {
        if (!entity || !entity.id) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }

        try {
            const result = await this.repository.delete(entity.id.getValue());
            return Ok(result.affected !== 0);
        } catch (error) {
            return Err(
                new RepositoryException(
                    `Failed to delete entity: ${error.message}`
                )
            );
        }
    }

    async update(entity: EDomain): Promise<Result<void, ExceptionBase>> {
        if (!entity || !entity.id) {
            return Err(
                new ArgumentNotProvidedException('Entity must be provided')
            );
        }

        try {
            const ormEntity = this.mapper.toPersistence(entity);
            await this.repository.save(ormEntity);
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
