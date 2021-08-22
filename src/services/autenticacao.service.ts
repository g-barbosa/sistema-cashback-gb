import { IRevendedorRepository } from '../repositories/interfaces/IRevendedor.repository';
import { IAutenticacaoService } from './Interfaces/IAutenticacao.service';
import bcrypt from 'bcrypt';
import { Revendedor } from '../domain/models/Revendedor';
import jwt from 'jsonwebtoken';
import { AutenticacaoResponse } from '../domain/DTO/autenticacao.response';
import { badRequest, ok } from '../infra/helpers/http.helpers';
import { BaseResponse } from '../domain/DTO/base.response';

export class AutenticacaoService implements IAutenticacaoService {

    constructor (private repository: IRevendedorRepository) {}

    async login (email: string, senha: string): Promise<BaseResponse> {
      const revendedor: Revendedor = await this.repository.buscarRevendedorPorEmail(email);

      if (!revendedor) return badRequest(new Error('Usuário ou senha inválidos'))

      if (!await bcrypt.compare(senha, revendedor.senha)) return badRequest(new Error('Usuário ou senha inválidos'))

      const token = this.getToken(revendedor);

      const response: AutenticacaoResponse = {
        id: revendedor.id,
        email: revendedor.email,
        cpf: revendedor.cpf,
        token: `Bearer ${token}`,
      }

      return ok(response);
    } 

    private getToken (revendedor: Revendedor): string {
      const token = jwt.sign(
        { id: revendedor.id, email: revendedor.email, cpf: revendedor.cpf }, 
        process.env.APP_AUTH_SECRET!,
        {
          expiresIn: 86400,
        }
        )

      return token;
    }

}
