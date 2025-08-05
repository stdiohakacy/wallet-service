import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseOrmEntity } from '../../../../../../libs/infrastructure/persistence/typeorm/schema/base.orm';
import { LEDGER_ENTRY_SCHEMA } from '../../schema/ledger-entry.schema';
import { WalletEntity } from './wallet.entity';

@Entity(LEDGER_ENTRY_SCHEMA.TABLE_NAME)
export class LedgerEntryEntity extends BaseOrmEntity {
    @Column({ name: LEDGER_ENTRY_SCHEMA.COLUMNS.WALLET_ID, type: 'uuid' })
    walletId: string;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.TYPE,
        type: 'varchar',
        length: 20,
    })
    type: string;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.AMOUNT_VALUE,
        type: 'numeric',
    })
    amountValue: number;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.AMOUNT_CURRENCY,
        type: 'varchar',
        length: 10,
    })
    amountCurrency: string;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.BALANCE_AFTER,
        type: 'numeric',
    })
    balanceAfter: number;

    @Column({ name: LEDGER_ENTRY_SCHEMA.COLUMNS.TIMESTAMP, type: 'timestamp' })
    timestamp: Date;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.REMARK,
        type: 'text',
        nullable: true,
    })
    remark?: string;

    @Column({
        name: LEDGER_ENTRY_SCHEMA.COLUMNS.SOURCE_REF,
        type: 'uuid',
        nullable: true,
    })
    sourceRef: string;

    @ManyToOne(
        () => require('./wallet.entity').WalletEntity,
        wallet => wallet.ledgers
    )
    @JoinColumn({ name: LEDGER_ENTRY_SCHEMA.COLUMNS.WALLET_ID })
    wallet: WalletEntity;
}
