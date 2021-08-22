import { ICompraRepository } from '../repositories/interfaces/ICompra.repository'
import { CompraDTO } from '../domain/DTO/compra.dto';
import { Compra } from '../domain/models/Compra';
import { IRevendedorService } from './Interfaces/IRevendedor.service'
import { Revendedor } from '../domain/models/Revendedor';
import { ICompraService } from './Interfaces/ICompra.service';
import { ICashbackService } from './Interfaces/ICashback.service';
import { ComprasResponse } from '../domain/DTO/compras.response';
import { CompraResponse } from '../domain/DTO/compra.response';
import { BaseResponse } from '../domain/DTO/base.response';
import { notfound, ok } from '../infra/helpers/http.helpers';

export class CompraService implements ICompraService {
    
    constructor (
        private revendedorService: IRevendedorService,
        private cashbackService: ICashbackService,
        private repository: ICompraRepository
        ){}

    async cadastrar(DTO: CompraDTO, cpf: string) {
        const revendedor: Revendedor = await this.revendedorService.buscarRevendedorPorCPF(cpf)

        if (!revendedor) return notfound(new Error('Não foi possível encontrar este revendedor'));

        const compra = new Compra({...DTO, revendedorId: revendedor.id});

        if (cpf = '15350946056') compra.status = 'Aprovado';

        await this.repository.cadastrar(compra);
        return ok('Compra cadastrada com sucesso')
    }

    async listar(revendedorId: any) {
        const compras = await this.repository.listar(revendedorId);

        let somaTotal = 0;
        let totalVendas = 0;
        for (const compra of compras) {
            totalVendas += 1;
            somaTotal += compra.valor;
        }

        const porcentagemCashback = this.cashbackService.receberPorcentagemCashback(somaTotal);

        const listaCompras: CompraResponse[] = compras.map((compra) => ({
            id: compra.id,
            codigo: compra.codigo,
            valor: compra.valor,
            data: compra.data,
            status: compra.status,
            porcentagemCashback: porcentagemCashback,
            cashback: (compra.valor * porcentagemCashback) / 100,
        }))

        const comprasResponse: ComprasResponse = {
            porcentagemCashback: porcentagemCashback,
            cashback: (somaTotal * porcentagemCashback) / 100,
            vendaTotal: somaTotal,
            quantidadeVendas: totalVendas,
            compras: listaCompras,
        }

        return ok(comprasResponse);
    }

    async cashbackAcumulado (cpf: any): Promise<BaseResponse> {
        return await this.cashbackService.cashbackAcumulado(cpf);
    }
}
