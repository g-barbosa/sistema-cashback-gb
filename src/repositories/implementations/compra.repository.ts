import { Compra } from '../../domain/models/Compra'
import knex from '../../infra/database/connection';
import { ICompraRepository } from '../interfaces/ICompra.repository';
export class CompraRepository implements ICompraRepository {

    async cadastrar(compra: Compra): Promise<void> {
        await knex('compras').insert(compra)
    }

    async listar(cpf: string): Promise<Compra[]> {
      return await knex('compras')
    }
}