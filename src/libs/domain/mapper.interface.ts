export interface MapperInterface<EDomain, EOrm> {
    toDomain(entity: EOrm): EDomain;
    toPersistence(entity: EDomain): EOrm;
}
