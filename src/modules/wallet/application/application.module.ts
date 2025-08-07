import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IncreaseWalletHandler } from './inbound/commands/handlers/increase-wallet.handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const CommandHandlers = [IncreaseWalletHandler];

const QueryHandlers = [];

const EventHandlers = [];

@Module({
    imports: [CqrsModule, InfrastructureModule],
    providers: [...CommandHandlers, ...QueryHandlers, ...EventHandlers],
    exports: [
        CqrsModule,
        InfrastructureModule,
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers,
    ],
})
export class ApplicationModule {}
