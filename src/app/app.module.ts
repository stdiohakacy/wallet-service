import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { AppMiddlewareModule } from '@app/app.middleware.module';
import { HelloModule } from '@modules/hello/hello.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    controllers: [],
    providers: [],
    imports: [
        CqrsModule,
        CommonModule,
        AppMiddlewareModule,
        HelloModule,
        WalletModule,
    ],
})
export class AppModule {}
