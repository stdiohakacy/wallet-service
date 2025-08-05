import { Column, Entity, OneToMany } from 'typeorm';
import { WALLET_SCHEMA } from '../../schema/wallet.schema';
import { BaseOrmEntity } from '@libs/infrastructure/persistence/typeorm/schema/base.orm';
import { LedgerEntryEntity } from './ledger-entry.entity';

@Entity(WALLET_SCHEMA.TABLE_NAME)
export class WalletEntity extends BaseOrmEntity {
    @Column({ name: WALLET_SCHEMA.COLUMNS.USER_ID, type: 'uuid' })
    userId: string;

    @Column({ name: WALLET_SCHEMA.COLUMNS.BALANCE_VALUE, type: 'numeric' })
    balanceValue: number;

    @Column({
        name: WALLET_SCHEMA.COLUMNS.BALANCE_CURRENCY,
        type: 'varchar',
        length: 10,
    })
    balanceCurrency: string;

    @OneToMany(
        () => require('./ledger-entry.entity').LedgerEntryEntity,
        (ledger: LedgerEntryEntity) => ledger.wallet
    )
    ledgers: LedgerEntryEntity[];
}
