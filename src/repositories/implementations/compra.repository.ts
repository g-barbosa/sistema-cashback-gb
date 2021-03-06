import { Compra } from '../../domain/models/Compra'
import knex from '../../infra/database/connection';
import { ICompraRepository } from '../interfaces/ICompra.repository';
export class CompraRepository implements ICompraRepository {

    async cadastrar(compra: Compra): Promise<void> {
        await knex('compras').insert(compra)
    }

    async listar(id: string, mes: string): Promise<Compra[]> {

      mes = mes ? mes : (new Date().getMonth() + 1).toString();

      return await knex('compras').where('revendedorId', id).andWhereRaw('MONTH(DATA) = ?', mes)
    }
}