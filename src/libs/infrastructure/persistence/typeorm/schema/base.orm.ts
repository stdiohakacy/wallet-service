import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BASE_SCHEMA } from './base.schema';

export class BaseOrmEntity {
    @PrimaryGeneratedColumn('uuid', { name: BASE_SCHEMA.COLUMNS.ID })
    id: string;

    @CreateDateColumn({
        name: BASE_SCHEMA.COLUMNS.CREATED_DATE,
        type: 'timestamp',
    })
    createdDate: Date;

    @Column({ name: BASE_SCHEMA.COLUMNS.CREATED_USER_ID, type: 'uuid' })
    createdUserId: string;

    @UpdateDateColumn({
        name: BASE_SCHEMA.COLUMNS.UPDATED_DATE,
        type: 'timestamp',
        nullable: true,
    })
    updatedDate?: Date;

    @Column({
        name: BASE_SCHEMA.COLUMNS.UPDATED_USER_ID,
        type: 'uuid',
        nullable: true,
    })
    updatedUserId?: string;

    @DeleteDateColumn({
        name: BASE_SCHEMA.COLUMNS.DELETED_DATE,
        type: 'timestamp',
        nullable: true,
    })
    deletedDate?: Date;

    @Column({
        name: BASE_SCHEMA.COLUMNS.DELETED_USER_ID,
        type: 'uuid',
        nullable: true,
    })
    deletedUserId?: string;
}
