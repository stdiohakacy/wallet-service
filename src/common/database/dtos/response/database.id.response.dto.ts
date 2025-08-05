import { PickType } from '@nestjs/swagger';
import { DatabaseDto } from '@common/database/dtos/database.dto';

export class DatabaseIdResponseDto extends PickType(DatabaseDto, [
    '_id',
] as const) {}
