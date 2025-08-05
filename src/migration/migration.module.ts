import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { CommonModule } from '@common/common.module';
import { MigrationApiKeySeed } from 'src/migration/seeds/migration.api-key.seed';
import { ApiKeyModule } from 'src/modules/api-key/api-key.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
    imports: [CommonModule, CommandModule, ApiKeyModule, AuthModule],
    providers: [MigrationApiKeySeed],
    exports: [],
})
export class MigrationModule {}
