import { ICommand } from '@nestjs/cqrs';

export class IncreaseWalletCommandProps {
    userId: string;
    amount: number;
    currency: string;
    sourceRef: string;
}

export class IncreaseWalletCommand implements ICommand {
    constructor(public readonly props: IncreaseWalletCommandProps) {}
}
