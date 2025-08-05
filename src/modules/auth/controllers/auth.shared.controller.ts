import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.shared.auth')
@Controller({
    version: '1',
    path: '/auth',
})
export class AuthSharedController {}
