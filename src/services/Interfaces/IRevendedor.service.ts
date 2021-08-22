import { BaseResponse } from '../../domain/DTO/base.response';
import { RevendedorDTO } from '../../domain/DTO/revendedor.dto';
import { Revendedor } from "../../domain/models/Revendedor";

export interface IRevendedorService {
  cadastrar(DTO: RevendedorDTO): Promise<BaseResponse>;
  buscarRevendedorPorCPF(id: string): Promise<Revendedor>
}