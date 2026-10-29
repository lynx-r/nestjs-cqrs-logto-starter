export interface BaseMapper<DomainAggregate, OrmEntity> {
  toDomain(ormEntity: OrmEntity): DomainAggregate;
  toPersistence(domainAggregate: DomainAggregate): OrmEntity;
}
