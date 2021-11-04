import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Personas} from '../models';
import {PersonasRepository} from './personas.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.id,
  PedidosRelations
> {

  public readonly persona: BelongsToAccessor<Personas, typeof Pedidos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonasRepository') protected personasRepositoryGetter: Getter<PersonasRepository>,
  ) {
    super(Pedidos, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personasRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
