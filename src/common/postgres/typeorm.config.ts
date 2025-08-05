import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const typeormConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [
        join(
            __dirname,
            '../../**/modules/**/infrastructure/persistence/typeorm/entities/*.entity.{ts,js}'
        ),
    ],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    logging: true,
};

export default new DataSource({ ...typeormConfig, synchronize: false });
