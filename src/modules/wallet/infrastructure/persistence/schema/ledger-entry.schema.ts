import { BASE_SCHEMA } from '@libs/infrastructure/persistence/typeorm/schema/base.schema';

export const LEDGER_ENTRY_SCHEMA = {
    TABLE_NAME: 'ledger_entries',
    COLUMNS: {
        ...BASE_SCHEMA.COLUMNS,
        WALLET_ID: 'wallet_id',
        TYPE: 'type',
        AMOUNT_VALUE: 'amount_value',
        AMOUNT_CURRENCY: 'amount_currency',
        BALANCE_AFTER: 'balance_after',
        TIMESTAMP: 'timestamp',
        REMARK: 'remark',
        SOURCE_REF: 'source_ref',
    },
};
