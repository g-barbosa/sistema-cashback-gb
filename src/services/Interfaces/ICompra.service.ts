import { BaseResponse } from '../../domain/DTO/base.response';
import { CompraDTO } from '../../domain/DTO/compra.dto';

export interface ICompraService {
  cadastrar(DTO: CompraDTO, cpf: string): Promise<BaseResponse>;
  listar(cpf: string): Promise<BaseResponse>;
}