import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.admin.auth')
@Controller({
    version: '1',
    path: '/auth',
})
export class AuthAdminController {}
