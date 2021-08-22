import { Revendedor } from '../../domain/models/Revendedor'
import knex from '../../infra/database/connection';
import { IRevendedorRepository } from '../interfaces/IRevendedor.repository';
export class RevendedorRepository implements IRevendedorRepository {

    async cadastrar(revendedor: Revendedor): Promise<void> {

        await knex('revendedores').insert(revendedor)

    }

    async buscarRevendedorPorCPF(cpf: string): Promise<Revendedor> {
        return await knex('revendedores').where('cpf', cpf).first();
    }

    async buscarRevendedorPorEmail(email: string): Promise<Revendedor> {
        return await knex('revendedores').where('email', email).first();
    }
}