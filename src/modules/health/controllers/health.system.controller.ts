import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';
import { ApiKeySystemProtected } from 'src/modules/api-key/decorators/api-key.decorator';
import { InjectDatabaseConnection } from '@common/database/decorators/database.decorator';
import { Response } from '@common/response/decorators/response.decorator';
import { IResponse } from '@common/response/interfaces/response.interface';
import { HealthDatabaseResponseDto } from 'src/modules/health/dtos/response/health.database.response.dto';
import {
    HealthSystemCheckDatabaseDoc,
    HealthSystemCheckInstanceDoc,
} from 'src/modules/health/docs/health.system.doc';
import { HealthInstanceResponseDto } from 'src/modules/health/dtos/response/health.instance.response.dto';
@ApiTags('modules.system.health')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/health',
})
export class HealthSystemController {
    constructor(
        @InjectDatabaseConnection()
        private readonly databaseConnection: Connection,
        private readonly health: HealthCheckService,
        private readonly memoryHealthIndicator: MemoryHealthIndicator,
        private readonly diskHealthIndicator: DiskHealthIndicator,
        private readonly mongooseIndicator: MongooseHealthIndicator
    ) {}

    @HealthSystemCheckDatabaseDoc()
    @Response('health.checkDatabase')
    @HealthCheck()
    @ApiKeySystemProtected()
    @Get('/database')
    async checkDatabase(): Promise<IResponse<HealthDatabaseResponseDto>> {
        const data = await this.health.check([
            () =>
                this.mongooseIndicator.pingCheck('database', {
                    connection: this.databaseConnection,
                }),
        ]);
        return {
            data,
        };
    }

    @HealthSystemCheckInstanceDoc()
    @Response('health.checkInstance')
    @HealthCheck()
    @ApiKeySystemProtected()
    @Get('/instance')
    async checkInstance(): Promise<IResponse<HealthInstanceResponseDto>> {
        const data = await this.health.check([
            () =>
                this.memoryHealthIndicator.checkRSS(
                    'memoryRss',
                    300 * 1024 * 1024
                ),
            () =>
                this.memoryHealthIndicator.checkHeap(
                    'memoryHeap',
                    300 * 1024 * 1024
                ),
            () =>
                this.diskHealthIndicator.checkStorage('storage', {
                    thresholdPercent: 0.75,
                    path: '/',
                }),
        ]);

        return {
            data,
        };
    }
}
