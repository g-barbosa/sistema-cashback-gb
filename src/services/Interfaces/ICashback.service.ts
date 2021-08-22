import { BaseResponse } from '../../domain/DTO/base.response';

export interface ICashbackService {
  receberPorcentagemCashback(somaDasCompras: number): number;
  cashbackAcumulado(cpf: any): Promise<BaseResponse>;
}