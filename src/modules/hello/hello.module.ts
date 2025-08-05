import { Module } from '@nestjs/common';
import { HelloPublicController } from './controllers/hello.public.controller';

@Module({
    controllers: [HelloPublicController],
    providers: [],
    imports: [],
})
export class HelloModule {}
