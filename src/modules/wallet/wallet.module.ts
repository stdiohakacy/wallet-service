import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class WalletModule {}
