import { MapperInterface } from '@libs/domain/mapper.interface';
import { Wallet } from '@modules/wallet/domain/aggregates/wallet.aggregate';
import { Injectable } from '@nestjs/common';
import { WalletEntity } from '../typeorm/entities/wallet.entity';
import { Money } from '@modules/wallet/domain/value-objects/money.vo';
import { UniqueEntityID } from '@libs/domain/unique-entity-id';
import { LedgerEntry } from '@modules/wallet/domain/value-objects/ledger-entry.vo';
import { LedgerEntryType } from '@modules/wallet/domain/enums/ledger-entry.enum';
import { LedgerEntryEntity } from '../typeorm/entities/ledger-entry.entity';

@Injectable()
export class WalletMapper implements MapperInterface<Wallet, WalletEntity> {
    toDomain(entity: WalletEntity): Wallet {
        return new Wallet({
            id: new UniqueEntityID(entity.id),
            props: {
                userId: entity.userId,
                balance: new Money({
                    value: entity.balanceValue,
                    currency: entity.balanceCurrency,
                }),
                ledgers: entity.ledgers.map(
                    ledger =>
                        new LedgerEntry({
                            type: ledger.type as LedgerEntryType,
                            amount: new Money({
                                value: ledger.amountValue,
                                currency: ledger.amountCurrency,
                            }),
                            sourceRef: new UniqueEntityID(ledger.sourceRef),
                            balanceAfter: new Money({
                                value: ledger.balanceAfter,
                                currency: ledger.amountCurrency,
                            }),
                            timestamp: ledger.timestamp,
                            remark: ledger.remark,
                        })
                ),
            },
            createdAt: entity.createdDate,
            updatedAt: entity.updatedDate,
            createdBy: entity.createdUserId,
            updatedBy: entity.updatedUserId,
        });
    }
    toPersistence(entity: Wallet): WalletEntity {
        const walletEntity = new WalletEntity();
        walletEntity.id = entity.id.toString();
        walletEntity.userId = entity.userId;
        walletEntity.balanceValue = entity.balance.value;
        walletEntity.balanceCurrency = entity.balance.currency;

        walletEntity.ledgers = entity.ledgers.map((ledger: LedgerEntry) => {
            const ledgerEntry = new LedgerEntryEntity();
            ledgerEntry.type = ledger.type;
            ledgerEntry.amountValue = ledger.amount.value;
            ledgerEntry.amountCurrency = ledger.amount.currency;
            ledgerEntry.balanceAfter = ledger.balanceAfter.value;
            ledgerEntry.timestamp = ledger.timestamp;
            ledgerEntry.remark = ledger.remark;
            ledgerEntry.sourceRef = ledger.sourceRef.toString();
            return ledgerEntry;
        });

        walletEntity.createdDate = entity.createdAt;
        walletEntity.updatedDate = entity.updatedAt;
        walletEntity.createdUserId = entity.userId;
        walletEntity.updatedUserId = entity.userId;

        return walletEntity;
    }
}
