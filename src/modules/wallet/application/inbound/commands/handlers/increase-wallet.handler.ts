import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseWalletCommand } from '../increase-wallet.command';
import { Inject } from '@nestjs/common';
import {
    WALLET_REPOSITORY_PORT,
    WalletRepositoryPort,
} from '@modules/wallet/application/outbound/repositories/wallet.repository.port';
import { Money } from '@modules/wallet/domain/value-objects/money.vo';

@CommandHandler(IncreaseWalletCommand)
export class IncreaseWalletHandler
    implements ICommandHandler<IncreaseWalletCommand>
{
    constructor(
        @Inject(WALLET_REPOSITORY_PORT)
        private readonly walletRepositoryPort: WalletRepositoryPort
    ) {}
    async execute(command: IncreaseWalletCommand) {
        console.log(command.props.userId);
        // const wallet = await this.walletRepositoryPort.findOneByUserId(
        //     command.props.userId
        // );

        // if (wallet.isErr()) {
        // }

        // const walletEntity = wallet.unwrap().unwrap();
        // walletEntity.increase(
        //     new Money({
        //         value: command.props.amount,
        //         currency: command.props.currency,
        //     }),
        //     command.props.sourceRef
        // );

        // console.log(walletEntity);
    }
}
