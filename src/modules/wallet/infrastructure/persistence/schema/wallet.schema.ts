import { BASE_SCHEMA } from '@libs/infrastructure/persistence/typeorm/schema/base.schema';

export const WALLET_SCHEMA = {
    TABLE_NAME: 'wallets',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        USER_ID: 'user_id',
        BALANCE_VALUE: 'balance_value',
        BALANCE_CURRENCY: 'balance_currency',
    },
};
