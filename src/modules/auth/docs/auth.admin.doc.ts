import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocResponse,
} from '@common/doc/decorators/doc.decorator';

export function AuthAdminUpdatePasswordDoc(): MethodDecorator {
    return applyDecorators(
        Doc({
            summary: 'admin update user password',
        }),
        DocAuth({
            xApiKey: true,
            jwtAccessToken: true,
        }),
        DocGuard({ role: true, policy: true }),
        DocResponse('auth.updatePassword')
    );
}
