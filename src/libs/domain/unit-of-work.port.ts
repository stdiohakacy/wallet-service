export interface UnitOfWorkPort {
    transaction<T>(callback: () => Promise<T>): Promise<T>;
}
