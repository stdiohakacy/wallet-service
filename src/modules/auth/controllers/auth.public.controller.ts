import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { InjectDatabaseConnection } from '@common/database/decorators/database.decorator';
import { Connection } from 'mongoose';
import { MessageService } from '@common/message/services/message.service';

@ApiTags('modules.public.auth')
@Controller({
    version: '1',
    path: '/auth',
})
export class AuthPublicController {
    constructor(
        @InjectDatabaseConnection()
        private readonly databaseConnection: Connection,
        private readonly authService: AuthService,
        private readonly messageService: MessageService
    ) {}
}
