import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';

@Module({
    imports: [CqrsModule, ApplicationModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class PresentationModule {}
