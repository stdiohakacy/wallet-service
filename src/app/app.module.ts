import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { AppMiddlewareModule } from '@app/app.middleware.module';
import { HelloModule } from '@modules/hello/hello.module';

@Module({
    controllers: [],
    providers: [],
    imports: [CommonModule, AppMiddlewareModule, HelloModule],
})
export class AppModule {}
