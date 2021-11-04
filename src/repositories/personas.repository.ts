import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Personas, PersonasRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class PersonasRepository extends DefaultCrudRepository<
  Personas,
  typeof Personas.prototype.id,
  PersonasRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Personas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Personas, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
