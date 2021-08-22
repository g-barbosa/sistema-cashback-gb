import { IRevendedorRepository } from '../repositories/interfaces/IRevendedor.repository'
import { RevendedorDTO } from '../domain/DTO/revendedor.dto';
import { Revendedor } from '../domain/models/Revendedor';
import { IRevendedorService } from './Interfaces/IRevendedor.service'
import { badRequest, ok } from '../infra/helpers/http.helpers';
import { BaseResponse } from '../domain/DTO/base.response';

export class RevendedorService implements IRevendedorService {
    
    constructor ( 
        private repository: IRevendedorRepository
        ){}

    async cadastrar(revendedorData: RevendedorDTO): Promise<BaseResponse> {

        const existente = await this.buscarRevendedorPorCPF(revendedorData.cpf);

        if (existente) return badRequest(new Error('Já existe um revendedor cadastrado com este CPF'))

        const revendedor = new Revendedor(revendedorData);
        await this.repository.cadastrar(revendedor);
        return ok('Revendedor cadastrado com sucesso')
    }

    async buscarRevendedorPorCPF(cpf: string): Promise<Revendedor> {
        const revendedor: Revendedor = await this.repository.buscarRevendedorPorCPF(cpf);
        return revendedor
    }
}
