import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedidos,
  Personas,
} from '../models';
import {PedidosRepository} from '../repositories';

export class PedidosPersonasController {
  constructor(
    @repository(PedidosRepository)
    public pedidosRepository: PedidosRepository,
  ) { }

  @get('/pedidos/{id}/personas', {
    responses: {
      '200': {
        description: 'Personas belonging to Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personas)},
          },
        },
      },
    },
  })
  async getPersonas(
    @param.path.string('id') id: typeof Pedidos.prototype.id,
  ): Promise<Personas> {
    return this.pedidosRepository.persona(id);
  }
}
