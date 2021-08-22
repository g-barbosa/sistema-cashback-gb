import { BaseResponse } from '../../domain/DTO/base.response';

export interface IAutenticacaoService {
  login(email: string, senha: string): Promise<BaseResponse>
}