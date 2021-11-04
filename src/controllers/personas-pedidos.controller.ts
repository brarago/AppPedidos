import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Personas,
  Pedidos,
} from '../models';
import {PersonasRepository} from '../repositories';

export class PersonasPedidosController {
  constructor(
    @repository(PersonasRepository) protected personasRepository: PersonasRepository,
  ) { }

  @get('/personas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Personas has many Pedidos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedidos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedidos>,
  ): Promise<Pedidos[]> {
    return this.personasRepository.pedidos(id).find(filter);
  }

  @post('/personas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Personas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedidos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Personas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {
            title: 'NewPedidosInPersonas',
            exclude: ['id'],
            optional: ['personasId']
          }),
        },
      },
    }) pedidos: Omit<Pedidos, 'id'>,
  ): Promise<Pedidos> {
    return this.personasRepository.pedidos(id).create(pedidos);
  }

  @patch('/personas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Personas.Pedidos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedidos, {partial: true}),
        },
      },
    })
    pedidos: Partial<Pedidos>,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.personasRepository.pedidos(id).patch(pedidos, where);
  }

  @del('/personas/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Personas.Pedidos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedidos)) where?: Where<Pedidos>,
  ): Promise<Count> {
    return this.personasRepository.pedidos(id).delete(where);
  }
}
